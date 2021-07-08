<template>

  <DocsPageTemplate>

    <DocsPageSection title="Purpose" anchor="#purpose">
      <p>
        The Kolibri Design System contains resources for designers and developers building Kolibri products. The purpose is to:
      </p>
      <ul>
        <li>Reduce the time it takes to design and build our products</li>
        <li>Create consistent and predictable end-user experiences</li>
        <li>Ensure accessibility, responsiveness, and cross-browser compatibility</li>
      </ul>
      <p>
        The design system includes both documentation design patterns and a shared front-end UI library. Together, these provide solutions to common design and implementation needs in Kolibri products.
      </p>
      <p>
        If the design system is failing to achieve the objectives above, it needs to be updated. Your contributions and input are appreciated. For more information, see the <DocsInternalLink text="Updates" href="#updates" /> section below, the <DocsExternalLink text="GitHub repository" href="https://github.com/learningequality/kolibri-design-system" />, or the <DocsExternalLink text="Notion project" href="https://www.notion.so/learningequality/Kolibri-Design-System-for-LE-products-976ea82b50f844ea9149a7abed497ea9" />.
      </p>
    </DocsPageSection>
    <DocsPageSection title="Scope" anchor="#scope">
      <p>
        The Kolibri Design System contains guidance and functionality that reflects very common design patterns across all of our products. It also gives guidance about patterns and component that are consistently different between products, for example due to different user needs or browser requirements.
      </p>
      <p>
        It should <em>not</em> contain design patterns, UI components, or configuration parameters that are rarely used or liable to change in the future.
      </p>
      <p>
        The public API of the shared UI library is <em>only</em> that which is documented in this site. Functionality which is not documented here should be considered either experimental or a private implementation detail.
      </p>
    </DocsPageSection>
    <DocsPageSection title="Exceptions" anchor="#exceptions">
      <p>
        If using an existing pattern or component would <em>significantly</em> degrade the user experience compared to designing and building an alternate user interface, we should prioritize the user experience and build the custom UI.
      </p>
      <p>
        On the other hand, if using an existing pattern or component would not significantly degrade the UX, we should prioritize consistency and reuse. The benefits of standardization here outweigh the marginal benefits of a UI customized for a narrow need.
      </p>
      <p>
        Decisions to deviate from the design system should be made intentionally, and the justification to do so should be documented. Undocumented deviations may be mistakes, oversights, or technical/UX debt.
      </p>
      <p>
        Over time we should be able to observe patterns in the intentional deviations, and use them as guidance for implementing updates to the design system that benefit the rest of the product ecosystem.
      </p>
    </DocsPageSection>
    <DocsPageSection title="Contributing" anchor="#contributing">
      <p>
        We welcome feedback and contributions! It's important that the Design System works for you, so please help shape it. Feel free to submit a <DocsExternalLink text="pull request" href="https://github.com/learningequality/kolibri-design-system/pulls" /> or <DocsExternalLink text="issue" href="https://github.com/learningequality/kolibri-design-system/issues" /> to the GitHub repo.
      </p>
      <p>
        To get started, see the <DocsInternalLink text="release process" href="/release-process" /> and the <DocsExternalLink text="project readme" href="https://github.com/learningequality/kolibri-design-system#readme" />.
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<style lang="scss" scoped></style>
