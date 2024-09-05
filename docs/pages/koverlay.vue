<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Use <code>KOverlay</code> to move an element from its original place in the DOM to the overlay container element <code>#k-overlay</code> that is inserted to an application's document body automatically <DocsInternalLink href="/installation#install-plugin" text="during the KDS installation process" />. This is often useful for modals, tooltips, dropdowns, or other elements that should appear on top of other content.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>First, check whether you need <code>KOverlay</code>. Some KDS components already utilize it internally and you only need to instruct them to activate it, typically via the <code>appendToOverlay</code> prop.</p>

      <p>If you need to use <code>KOverlay</code>, simply wrap an element or a component in it:</p>

      <DocsShowCode language="html">
        <KOverlay>
          <YourComponent />
        </KOverlay>
      </DocsShowCode>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink href="/installation#install-plugin" text="KDS installation step" /> that attaches the overlay container element <code>#k-overlay</code> to an application's document body
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
