<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Kolibri products use a large number of icons that have a special meaning within our ecosystem. They generally draw from <DocsExternalLink text="Material Icons" href="https://material.io/resources/icons/" />, but may also include custom icons.
      </p>
      <p>
        Importantly, we reference icons by a token specific to the Kolibri Design System rather than Material's names, in order to make token references more meaningful to designers and developers.
      </p>
      <p>
        You can use the <DocsLibraryLink component="KIcon" /> and <DocsLibraryLink component="KLabeledIcon" /> components to easily insert any icon. Some other components such as links and buttons also provide props as shortcuts for easily inserting icons by token name.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Size and text" anchor="#size-text">
      <p>
        Icons should be scaled relative to their surrounding text size. Use the <code>KLabeledIcon</code> component to automatically set a consistent sizing and spacing with associated text:
      </p>
      <DocsShow>
        <h3>
          <KLabeledIcon icon="lesson" label="Header 3" />
        </h3>
        <h4>
          <KLabeledIcon icon="lesson" label="Header 4" />
        </h4>
        <h5>
          <KLabeledIcon icon="lesson" label="Header 5" />
        </h5>
      </DocsShow>

    </DocsPageSection>

    <DocsPageSection title="Color" anchor="#color">
      <p>
        Many of these icons also are used with <DocsInternalLink href="/colors" text="conventional colors" /> in the design system. For example, the <DocsInternalLink href="#tokens-coachContent" text="coachContent" code /> icon is often shown using the <DocsInternalLink href="/colors#tokens-coachContent" text="coachContent" code /> color, e.g. <KIcon icon="coachContent" />. Icons often have a default color associated with them, and this can be overridden as needed.
      </p>
      <p>
        When inline with text, icons should usually be the same color as the text:
      </p>
      <DocsDoNot>
        <template #do>
          <h4>
            <KLabeledIcon icon="video" label="Awesome video" />
          </h4>
        </template>
        <template #not>
          <h4>
            <KLabeledIcon icon="video" color="green" label="Awesome video" class="wrong-colors" />
          </h4>
        </template>
      </DocsDoNot>
      <p>
        There are exceptions to this pattern, however. For example in the columns of coach reports, most text is dark gray for readibility color while the icons for Mastered, In-progress, etc are colored.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Internationalization" anchor="#i18n">
      <p>
        Avoid using icons that are culture- or context-specific.
      </p>
      <p>
        Icons which in some sense relate to the passage of time must be mirrored when viewed in a right-to-left language. Read more about <DocsExternalLink href="https://material.io/design/usability/bidirectionality.html#mirroring-elements" text="icon bidirectionality" /> from the Material design guidelines.
      </p>
      <p>
        When used with the <code>KIcon</code> component, icons will be automatically flipped when appropriate.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Accessibility" anchor="#a11y">
      <p>
        If it is not purely decorative, ensure that the icon or its parent component has associated text that can be read by a screen reader.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Icons" anchor="#icons">
      <p>These icons have special meaning in Kolibri products</p>
      <IconTable />
    </DocsPageSection>

    <DocsPageSection title="Custom icons" anchor="#custom-icons">
      <p>If the default Material icon library and/or community-contributed libraries are insufficient, use <DocsExternalLink href="https://material.io/design/iconography/system-icons.html" text="Material's icon creation guidelines" /> to create a new one.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage in documentation" anchor="#rst">
      <p>
        For use in documentation such as the <DocsExternalLink href="https://kolibri.readthedocs.io/" text="Kolibri User Docs" />, all icons above have substitutions available in <DocsExternalLink href="https://docutils.sourceforge.io/docs/ref/rst/directives.html#directives-for-substitution-definitions" text="reStructuredText replacement syntax" /> below:
      </p>
      <textarea v-model="text" class="code replacements" readonly></textarea>
      <p>
        Copy and paste it into a file such as <code>rstIconReplacements.txt</code> and then add it to your <code>conf.py</code> file <DocsExternalLink href="https://github.com/learningequality/kolibri-docs/blob/d582797e0d62d1482501954b6d0680031bce18cd/docs/conf.py#L174-L181" text="like this" />.
      </p>
      <p>
        Then in <code>*.rst</code> files you can use, for example, <code>|video|</code> to insert the <KIcon icon="video" /> video icon. Note that these icons will <em>not</em> have screen-reader-accessible labels associated with them, so they should always be accompanied by descriptive text.
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  import text from '../../rstIconReplacements.txt';
  import IconTable from './IconTable';

  export default {
    components: {
      IconTable,
    },
    computed: {
      text() {
        return text;
      },
    },
  };

</script>


<style lang="scss" scoped>

  // hack to simulate bad behavior
  /deep/ .wrong-colors svg {
    fill: blue !important;
  }

  .replacements {
    display: block;
    width: 100%;
    height: 100px;
    font-size: smaller;
    white-space: pre;
    border: 1px solid #dedede;
    border-radius: 4px;
  }

</style>
