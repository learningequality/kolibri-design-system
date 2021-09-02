<template>

  <DocsPageTemplate>

    <DocsPageSection title="Motivations" anchor="#motivations">
      <p>For users of the design system who are contributing to Kolibri product ecosystem development, two needs are in conflict:</p>
      <ol>
        <li><strong>Rapid iteration</strong> allows the design system to rapidly respond to needs with new and improved components, new and improved design patterns, and rapid fixes</li>
        <li><strong>Long-term stability</strong> allows the design system to form a stable and predictable foundation on which contributors can confidently build, with the expectation that the resulting work will not need to be revisited or break in the future</li>
      </ol>
      <p>Our release process is designed to support both of these needs by being precise about what kinds of changes can happen in which types of releases, and also and facilitating an upgrade process to help all Kolibri products (specifically the Learning Platform, Studio, and Data Portal) stay up-to-date.</p>
    </DocsPageSection>

    <DocsPageSection title="Semantic versioning" anchor="#semver">
      <p>
        We use <DocsExternalLink text="semantic versioning" href="https://semver.org/" /> to help define what kinds of changes go in different kinds of releases.
      </p>
      <p>
        Given a version number <code>MAJOR.MINOR.PATCH</code>, we increment the:
      </p>
      <ul>
        <li>
          <code>MAJOR</code> version for incompatible or breaking changes. For example:
          <ul>
            <li>A previously optional prop becomes required</li>
            <li>New design guidance is added that contradicts previous guidance or creates a new fixed rule</li>
            <li>Layout updates are made to a component, e.g. a CSS <code>display</code> prop changes from <code>block</code> to <code>inline</code> or the default width changes</li>
            <li>Clarifying question: an update would potentially require someone updating their code, e.g. renaming a component</li>
          </ul>
        </li>
        <li>
          <code>MINOR</code> version for new or backwards-compatible functionality. For example:
          <ul>
            <li>A new component is added</li>
            <li>Documentation or design guidance conventions (as opposed to rules) are added</li>
            <li>Purely stylistic updates are made to a component or a new prop is added</li>
          </ul>
        </li>
        <li>
          <code>PATCH</code> version for backwards compatible bug fixes. For example:
          <ul>
            <li>A minor bug is fixed</li>
            <li>Documentation and design guidance fixes or clarifications are made</li>
          </ul>
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Design patterns and APIs" anchor="#design-patterns">

      <p>The design system provides two kinds of "contracts" which may change from release to release:</p>

      <ul>
        <li>The set of design patterns and guidance describe the current UX/UI conventions and best practices</li>
        <li>The set of library components and their configuration options describe the current API</li>
      </ul>

      <p>
        Significant changes to design patterns can be as important as API changes. For example, if we were to introduce strict new guidance that says "No text should ever be smaller than 11px", this would be considered a <code>MAJOR</code> version change because it requires us to go through the Learning Platform, Studio, and Data Portal to ensure that this new guidance is actually being followed.
      </p>

    </DocsPageSection>


    <DocsPageSection title="Technical details" anchor="#technical-details">

      <h3>Git branches and tags</h3>
      <p>
        The design system is currently developed and released from a single <code>main</code> branch. Updates are made in transient feature branches, tested, and merged into <code>main</code>. Specific releases (such as <code>v1.2.3</code>) are represented as <DocsExternalLink text="Github releases" href="https://docs.github.com/en/github/administering-a-repository/releasing-projects-on-github/managing-releases-in-a-repository" /> and <DocsExternalLink text="Git tags" href="https://git-scm.com/book/en/v2/Git-Basics-Tagging" />.
      </p>
      <p>
        The single-branch model does not support maintaining multiple releases in parallel – for example, releasing a new <code>v1.2.3</code> after <code>v1.3.0</code> has already happened. If this becomes necessary at some point we would make a dedicated release branch called <code>v1.2.x</code> for the purpose, similar to Kolibri's <DocsExternalLink text="branching model" href="https://kolibri-dev.readthedocs.io/en/develop/release_process.html#branches-and-tags" />.
      </p>

      <h3>Update policies</h3>
      <ul>
        <li>All user-facing changes for each release should be documented in the <DocsGithubLink text="changelog" href="https://github.com/learningequality/kolibri-design-system/blob/main/CHANGELOG.md" />.</li>
        <li>The unstable or develop branches of product repos should track the <code>HEAD</code> of the design system <code>main</code> branch. It is the responsibility of the Design System Circle to make sure this happens.</li>
        <li>The stable or release branches of product repos should be pinned to a stable, tagged version of the design system.</li>
      </ul>

      <h3>'Next' and 'Deprecated' components</h3>
      <p>
        To help smooth upgrades, the design system has a process for making both pre-release and deprecated versions of individual components available from a single monorepo:
      </p>
      <p>
        Within a major design system release, components always have a current stable version. Components may also optionally have a <code>next</code> and/or <code>deprecated</code> version available, allowing access to newer or older major versions respectively.
      </p>
      <p>For illustration, assume that the current stable version of the design system is <code>2.3.4</code>. All importable modules are by default the 'current' version. For example:</p>
      <DocsShowCode language="javascript">
        // imports KButton version 2.3.4 (current stable)
        import KModal from 'kolibri-design-system/lib/KButton';
      </DocsShowCode>
      <p>
        If <strong>(and only if)</strong> we plan on introducing breaking changes to a component, we would add a sub-directory called <code>next</code> to house this work and allow people to test or even use the alpha version while they are still mostly using <code>2.x.y</code> stable:
      </p>
      <DocsShowCode language="javascript">
        // imports KButton version 3.0.0-alpha (next unstable)
        import KModal from 'kolibri-design-system/lib/KButton/next';
      </DocsShowCode>
      <p>
        An update to <code>next</code> code might count as a patch release bump for the current stable semantic version. For example, we might release <code>2.3.5</code> with a changelog entry like:
      </p>
      <p>
        <em><strong>Version 2.3.5</strong>: Renamed the <code>text</code> prop in <code>lib/KButton/next</code> to <code>label</code></em>
      </p>
      <p>
        Once we release KDS version <code>3.0.0</code> stable, code in <code>next</code> becomes stable, and stable becomes <code>deprecated</code>:
      </p>
      <p>
        <em><strong>Version 3.0.0</strong>: Added a new version of <code>KButton</code> addressing API inconsistency</em>
      </p>
      <DocsShowCode language="javascript">
        // imports KButton version 2.3.5 (deprecated)
        import KModal from 'kolibri-design-system/lib/KButton/deprecated';

        // imports KButton version 3.0.0 (current stable)
        import KModal from 'kolibri-design-system/lib/KButton';
      </DocsShowCode>
      <p>
        It's unlikely that at this point a new <code>next</code> version of <code>KButton</code> would also be introduced, because we want to minimize churn and and unnecessary breaking changes. However, in rare cases we might need to do this, and there be three versions all available simultaneously:
      </p>
      <p>
        <em><strong>Version 3.0.1</strong>: Added a new alpha version of <code>KButton</code> to address unexpected issue</em>
      </p>
      <DocsShowCode language="javascript">
        // imports KButton version 2.3.5 (deprecated)
        import KModal from 'kolibri-design-system/lib/KButton/deprecated';

        // imports KButton version 3.0.1 (current stable)
        import KModal from 'kolibri-design-system/lib/KButton';

        // imports KButton version 4.0.0-alpha (next unstable)
        import KModal from 'kolibri-design-system/lib/KButton/next';
      </DocsShowCode>

    </DocsPageSection>



  </DocsPageTemplate>

</template>


<style lang="scss" scoped></style>
