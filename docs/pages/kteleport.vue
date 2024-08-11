<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Wrapping a component in <code>KTeleport</code> will teleport it to the teleport root element that is inserted to an application's document body automatically <DocsInternalLink href="/installation#install-plugin" text="during the KDS installation process" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>First, check whether you need <code>KTeleport</code>. Some KDS components already utilize it internally and you only need to instruct them to activate it, typically via the <code>appendToRoot</code> prop.</p>

      <p>If you need to use <code>KTeleport</code>, simply wrap your component in it:</p>

      <DocsShowCode language="html">
        <KTeleport>
          <YourComponent />
        </KTeleport>
      </DocsShowCode>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink href="/installation#install-plugin" text="KDS installation step" /> that attaches the teleport root element to an application's document body
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
