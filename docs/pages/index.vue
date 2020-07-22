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
        If the design system is failing to achieve the objectives above, it needs to be updated. Your contributions and input are appreciated. For more information, see the <DocsInternalLink href="#updates">
          Updates
        </DocsInternalLink> section below, the <DocsExternalLink href="https://github.com/learningequality/kolibri-design-system">
          GitHub repository
        </DocsExternalLink>, or the <DocsExternalLink href="https://www.notion.so/learningequality/Kolibri-Design-System-for-LE-products-976ea82b50f844ea9149a7abed497ea9">
          Notion project
        </DocsExternalLink>.
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
    <DocsPageSection title="Updates" anchor="#updates">
      <p>
        The process for making updates to the design system is still being formulated. There are a number of factors that need to be taken into consideration, including:
      </p>
      <ul>
        <li>The need for rapid and easy iteration and improvement</li>
        <li>Protection against unexpected and hard-to-test regressions</li>
        <li>Sustainability, maintainability, and prevention of bloat</li>
        <li>Input from all relevant stakeholders</li>
        <li>Smooth update and migration paths</li>
      </ul>
      <p>
        In the meantime, we welcome direct feedback and contributions! It's important that the Design System works for you, so please help shape it.
      </p>
      <ul>
        <li>Share ideas or concerns with Devon, Jessica, Khang, and Jacob directly, or file issues in this repo.</li>
        <li>
          Submit a <DocsExternalLink href="https://github.com/learningequality/kolibri-design-system/pulls">
            pull request
          </DocsExternalLink> or <DocsExternalLink href="https://github.com/learningequality/kolibri-design-system/issues">
            issue
          </DocsExternalLink> to the GitHub repo
        </li>
        <li>
          Leave a comment in the <DocsExternalLink href="https://www.notion.so/learningequality/Kolibri-Design-System-for-LE-products-976ea82b50f844ea9149a7abed497ea9">
            Notion project
          </DocsExternalLink>
        </li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<style lang="scss" scoped></style>
