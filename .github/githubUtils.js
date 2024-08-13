const fs = require('fs');
const path = require('path');

async function generateComment(github, context) {
    const percyUrl = context.outputs.percy_url;
    
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

module.exports = {
  findComment,
  generateComment,
}