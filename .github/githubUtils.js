const GithubAPI = require('./GithubAPI');

async function generateComment(percyUrl) {
  return `
### Percy Visual Test Results

**Percy Dashboard:** [View Detailed Report](${percyUrl})

**Environment:**
- **Node.js Version:** 18.x
- **OS:** Ubuntu-latest

**Instructions for Reviewers:**
- Click on the [Percy Dashboard](${percyUrl}) link to view detailed visual diffs.
- Review the visual changes highlighted in the report.
- Approve or request changes based on the visual differences.
`;
}

async function findComment(github, context, issue_number) {
  let comment;
  let page = 1
  while (!comment) {
    const request = await github.rest.issues.listComments({
      issue_number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      page,
    })
    const comments = request.data
    if (!comments.length) {
      return;
    }
    comment = comments.find(c => c.body && c.body.includes('### Percy Visual Test Results'));
    if (comment) {
      return comment.id.toString()
    }
    page += 1;
  }
}

/**
 * Will synchronize the KDS Roadmap project statuses synced
 * with the Iteration backlog project items statuses. So if an issue belongs to
 * both projects. The status of the issue in the KDS Roadmap project will be updated
 * to match the status of the issue in the Iteration backlog project.
 * 
 * All issues in KDS Roadmap that already had a status of "RELEASED" will be ignored.
 */
const synchronizeProjectsStatuses = async ({context, github, sourceNumber, targetNumber}) => {
  const getTargetStatus = (sourceStatus) => {
    const statusMap = {
      "IN REVIEW": "IN REVIEW",
      "IN PROGRESS": "IN PROGRESS",
      "NEEDS QA": "IN REVIEW",
      "DONE": "DONE",
      // All other statuses are mapped to "BACKLOG"
    };

    const targetStatus = Object.keys(statusMap).find((key) =>
      sourceStatus.toUpperCase().includes(key)
    );

    return targetStatus ? statusMap[targetStatus] : "BACKLOG";
  }

  sourceNumber = parseInt(sourceNumber);
  targetNumber = parseInt(targetNumber);
  const githubAPI = new GithubAPI(context.repo.owner, github);
  const { sourceProject, targetProject } = await githubAPI.getSourceAndTargetProjects({ sourceNumber, targetNumber });

  const targetStatusField = targetProject.fields.nodes.find((field) => field.name === "Status");

  const targetProjectItems = await githubAPI.getProjectItems(targetProject.id);
  const itemsToUpdate = targetProjectItems.filter((item) => {
    const statusToByPass = "RELEASED";
    const currentTargetStatusName = item.status?.value;
    if (currentTargetStatusName?.toUpperCase().includes(statusToByPass)) {
      return false;
    }

    const sourceProjectItem = item.content.projectItems?.nodes.find((sourceItem) => (
      sourceItem.project.id === sourceProject.id
    ));
    // Status that the issue has in the source project
    const sourceStatus = sourceProjectItem?.status?.value;
    if (!sourceStatus) {
      return false;
    }

    const newTargetStatus = getTargetStatus(sourceStatus);
    const newTargetStatusId = targetStatusField.options.find((option) => option.name.toUpperCase().includes(newTargetStatus))?.id;

    if (!newTargetStatusId) {
      return false;
    }

    item.newStatusId = newTargetStatusId;

    const currentTargetStatusId = item.status?.valueOptionId;
    return newTargetStatusId !== currentTargetStatusId;
  });

  if (itemsToUpdate.length === 0) {
    return;
  }

  const itemsPayload = itemsToUpdate.map(item => ({
    projectId: targetProject.id,
    projectItemId: item.id,
    fieldId: targetStatusField.id,
    newValue: {
      singleSelectOptionId: item.newStatusId
    },
    url: item.content.url
  }))

  await githubAPI.updateProjectItemsFields(itemsPayload);
  console.log(`${itemsToUpdate.length} items updated: `, itemsPayload.map(item => item.url));
}

const extractPullRequestNumbers = (releaseBody, owner) => {
  const prRegex = new RegExp(`github\\.com/${owner}/[a-zA-Z0-9-_]+/pull/(\\d+)`, "g");
  const prNumbers = [];
  let match;
  while ((match = prRegex.exec(releaseBody)) !== null) {
    prNumbers.push(parseInt(match[1]));
  }

  const uniquePrNumbers = [...new Set(prNumbers)];
  return uniquePrNumbers;
};

/**
 * Run on release published event. Will update these items in the KDS Roadmap project:
 * * the status of the PRs' linked issues to "Released"
 * * update the "Released in" field with the release version.
 *   * If the issue or pr already has a "Released in" value, the release version will be
 *     appended to it (e.g. "v4.6.0,v5.0.0-rc7")
 * 
 * If a PR doesn't have a linked issue, we will take the PR as reference instead of an issue.
 * 
 * If an issue or a PR doesnt belong to the KDS Roadmap project, it will be added to the project.
 * 
 */
const updateReleasedItemsStatuses = async ({context, github, projectNumber}) => {
  projectNumber = parseInt(projectNumber);
  const body = context.payload.release.body;
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const release = context.payload.release.name;
  const prNumbers = extractPullRequestNumbers(body, owner);

  if (prNumbers.length === 0) {
    console.log("No PRs found in release body");
    return;
  }

  const githubAPI = new GithubAPI(owner, github);
  const prs = await githubAPI.getPRsWithLinkedIssues(prNumbers, repo);
  const project = await githubAPI.getProject(projectNumber); 

  const contentItemsToAddToProject = [];
  const projectItemsToUpdate = [];

  prs.forEach((pr) => {
    const closingIssues = pr.closingIssuesReferences.nodes;
    if (closingIssues.length === 0) {
      const prProjectItems = pr.projectItems.nodes;
      const projectItem = prProjectItems.find((item) => item.project.id === project.id);
      if (!projectItem) {
        contentItemsToAddToProject.push({
          contentId: pr.id,
        });
        return;
      }
      projectItemsToUpdate.push(projectItem);
      return;
    }

    closingIssues.forEach((issue) => {
      const issueProjectItems = issue.projectItems.nodes;
      const projectItem = issueProjectItems.find((item) => item.project.id === project.id);
      if (!projectItem) {
        contentItemsToAddToProject.push({
          contentId: issue.id,
        });
        return;
      }
      projectItemsToUpdate.push(projectItem);
    });
  });

  if (contentItemsToAddToProject.length > 0) {
    await Promise.all(contentItemsToAddToProject.map(async ({ contentId }) => {
      const projectItemId = await githubAPI.addContentToProject(project.id, contentId);
      projectItemsToUpdate.push({ id: projectItemId });
    }));
  }

  const projectItemsChanges = [];

  if (projectItemsToUpdate.length > 0) {
    const releasedInFieldId = project.releasedIn.id;
    const statusFieldId = project.status.id;
    const statusReleasedOption = project.status.options.find((option) => option.name === "Released");
    const statusReleasedId = statusReleasedOption.id;

    projectItemsToUpdate.map(async (item) => {
      // Update "Released in" field with the release version
      const releasedIn = item.releasedIn?.text;
      const releasedInValue = releasedIn ? `${releasedIn},${release}` : release;
      projectItemsChanges.push({
        projectId: project.id,
        projectItemId: item.id,
        fieldId: releasedInFieldId,
        newValue: {
          text: releasedInValue,
        },
      });

      // Update status field to "Released"
      projectItemsChanges.push({
        projectId: project.id,
        projectItemId: item.id,
        fieldId: statusFieldId,
        newValue: {
          singleSelectOptionId: statusReleasedId,
        },
      });
    });
  }

  if (projectItemsChanges.length > 0) {
    await githubAPI.updateProjectItemsFields(projectItemsChanges);
  }
}


module.exports = {
  findComment,
  generateComment,
  synchronizeProjectsStatuses,
  updateReleasedItemsStatuses,
};
