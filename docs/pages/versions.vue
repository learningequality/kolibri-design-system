<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Releases are specified as tags in the <DocsExternalLink text="Github releases page" href="https://github.com/learningequality/kolibri-design-system/releases" />
      </p>
    </DocsPageSection>

    <DocsPageSection title="Version 0.2" anchor="#0.2">
      <h3>0.2.1</h3>
      <h4>Content updates</h4>
      <ul>
        <li>Added design principles documentation - <DocsGithubLink pull="95" /></li>
        <li>Added errors documentation - <DocsGithubLink pull="97" /></li>
        <li>Added switches documentation - <DocsGithubLink pull="105" /></li>
        <li>Added menu documentation - <DocsGithubLink pull="106" /></li>
      </ul>
      <h4>Library updates</h4>
      <ul>
        <li>Added 'email', 'sidebar', and 'add' icons - <DocsGithubLink pull="110" /></li>
        <li>Updated 'clipboard' icon - <DocsGithubLink pull="121" /></li>
        <li>Fixed z-order bug in icon button - <DocsGithubLink pull="95" />, <DocsGithubLink pull="122" /></li>
      </ul>
      <h4>Docs site updates</h4>
      <ul>
        <li>Added support for exporting icons to user documentation - <DocsGithubLink pull="104" /></li>
        <li>Documentation bugs and improvements - <DocsGithubLink pull="112" />, <DocsGithubLink pull="114" />, <DocsGithubLink pull="115" /></li>
      </ul>
      <h3>0.2.1</h3>
      <h4>Library updates</h4>
      <ul>
        <li>Fixed regression related to external links opening in new tabs - <DocsGithubLink pull="93" /></li>
      </ul>
      <h3>0.2.0</h3>
      <p>
        This was the first release of the Design System, with documentation written in a Nuxt-based statically-generated site. The focus was on migrating components out of the Kolibri and making them reusable in a shared component library.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Version 0.1" anchor="#0.1">
      <p>
        The design system was originally based on a set of internal Kolibri components and their use as documented in the Kolibri Style Guide, which was first introduced into the Kolibri code base <DocsExternalLink text="in version 0.6" href="https://github.com/learningequality/kolibri/tree/release-v0.6.x/kolibri/plugins/style_guide" />. This remained until <DocsExternalLink text="version 0.13" href="https://github.com/learningequality/kolibri/tree/release-v0.13.x/kolibri/plugins/style_guide" /> after which the content was migrated here.
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
