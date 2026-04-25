<template>

  <DocsPageTemplate>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        A <strong>candidate component</strong> is a component whose accessibility, visual design,
        and interactions are largely established, and which has been identified as useful to include
        in the design system, but whose user experience or implementation details need more time to
        mature. This means that the following are expected to be refined:
      </p>
      <ul>
        <li>Visual and interaction details</li>
        <li>Props, slots, events, sub-components</li>
        <li>What parts belong in the design system versus consuming applications</li>
      </ul>

      <p>
        Candidate components are <strong>in active use</strong> in consuming applications.
        Therefore, they need to follow the
        <strong>same release planning as regular components</strong>, particularly regarding
        breaking changes. Thorough unit and visual test coverage is expected to allow for smooth
        iteration.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Criteria"
      anchor="#criteria"
    >
      <p>
        A component
        <strong>can be considered for candidacy when one or more of the following are true:</strong>
      </p>
      <ul>
        <li>
          It maps to a well-established accessibility pattern or is a collection of such patterns
          (e.g.
          <DocsExternalLink
            href="https://www.w3.org/WAI/ARIA/apg/patterns/"
            text="APG patterns"
          />)
        </li>
        <li>The overall user experience is unlikely to change significantly</li>
      </ul>

      <p>
        For example, consider a modal side panel component. Its accessibility requirements (focus
        management, ARIA roles, and keyboard handling) apply uniformly to all use cases, and the
        main parts of its visual layout are well-defined. Even with some visual or implementation
        details still unresolved, a single component ensures a more reliable and consistent user
        experience, avoids duplicated work, and lets real use cases strengthen its robustness across
        a wide variety of contexts.
      </p>

      <p>A component <strong>is unlikely to become a candidate when:</strong></p>
      <ul>
        <li>The accessibility pattern is still being explored</li>
        <li>The user experience is expected to change significantly</li>
        <li>It is highly specific to a single application</li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    name: 'CandidateComponents',
  };

</script>
