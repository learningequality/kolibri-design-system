<template>

  <DocsPageTemplate>
    <DocsPageSection>
      <p>
        The design system's <strong>browser support is determined by Kolibri</strong>, which often
        runs offline, on older devices, and with limited insight into browser usage.
      </p>
      <p>
        <strong>Each library update must be strictly compatible with
          <DocsExternalLink
            href="https://github.com/learningequality/kolibri/blob/develop/packages/browserslist-config-kolibri/index.js"
            text="Kolibri's browserslist"
          /></strong>.
      </p>

      <p>The following areas require extra care to maintain compatibility:</p>
      <ul>
        <li>
          Floating UI (<code>@floating-ui/dom</code>) version updates (<DocsInternalLink
            href="/usekfloatingposition#version-update"
            text="guidance"
          />)
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
