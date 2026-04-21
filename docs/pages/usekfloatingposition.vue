<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        A composable that manages the positioning of floating elements such as tooltips and dropdown
        menus relative to their anchor elements. It is built with
        <DocsExternalLink
          href="https://floating-ui.com/"
          text="Floating UI"
        />.
      </p>

      <p>
        Some design system components use it internally, but it can also be used independently,
        typically (but not necessarily) together with
        <DocsLibraryLink component="useKFloatingInteraction" />.
      </p>

      <p>
        See
        <DocsInternalLink
          href="/floatingelements"
          text="Floating elements"
        />.
      </p>
    </DocsPageSection>

    <DocsPageSection
      anchor="#version-update"
      title="Floating UI version updates"
    >
      <DocsWarning>
        Floating UI is a modern library and the design system must ensure compatibility with all
        <DocsInternalLink
          href="/browsersupport"
          text="supported browsers"
        />.
        <strong>All version updates of <code>@floating-ui/dom</code> have to be done carefully, timed
          with major releases, and accompanied by a detailed Kolibri QA on Browserstack</strong>
        for all areas built with <code>useKFloatingPosition</code>.
      </DocsWarning>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[
          { text: 'initPosition', href: '#init-position' },
          { text: 'destroyPosition', href: '#destroy-position' },
          { text: 'Options', href: '#options' },
          { text: 'Custom implementations', href: '#custom' },
        ]"
      />

      <h3 id="init-position">initPosition</h3>
      <p>
        Positions a floating element relative to the anchor element and sets up auto-updating so the
        position stays correct on scroll, resize, etc. To be called when the floating element is
        shown or added to the DOM. See
        <DocsInternalLink
          href="#options"
          text="Options"
        />.
      </p>

      <DocsWarning>
        For each floating element positioned with <code>initPosition</code>, always make sure to
        <strong>call <code>destroyPosition</code> when the floating element is hidden or removed from the
          DOM</strong>
        to prevent severe performance problems.
      </DocsWarning>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKFloatingPosition from 'kolibri-design-system/lib/composables/useKFloatingPosition';

        const { initPosition } = useKFloatingPosition();

        initPosition(
          'my-tooltip',            // Unique ID of the floating element
          floatingEl,              // Floating DOM element (e.g. tooltip)
          anchorEl,                // Anchor DOM element (e.g. button)
          options                  // Floating UI options
        );
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3 id="destroy-position">destroyPosition</h3>
      <p>
        Stops auto-updating the position of the floating element positioned with
        <code>initPosition</code>. Call when the floating element is hidden or removed from the DOM
        to prevent severe performance problems.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKFloatingPosition from 'kolibri-design-system/lib/composables/useKFloatingPosition';

        const { destroyPosition } = useKFloatingPosition();

        destroyPosition('my-tooltip');
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3 id="options">Options</h3>
      <p>
        The <code>options</code> object passed to <code>initPosition</code> corresponds to
        <DocsExternalLink
          href="https://floating-ui.com/docs/computeposition#options"
          text="the options parameter"
        />

        of Floating UI's <code>computePosition</code>. Use <code>options</code> to configure
        placement, strategy, and middleware. Middleware can be imported from
        <code>useKFloatingPosition</code>.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKFloatingPosition from 'kolibri-design-system/lib/composables/useKFloatingPosition';

        const { initPosition, offset, flip, shift } = useKFloatingPosition();

        initPosition('my-tooltip', floatingEl, anchorEl, {
          placement: 'bottom',
          strategy: 'fixed',
          middleware: [
            offset(6),
            flip(),
            shift({padding: 5}),
          ],
        });
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3 id="custom">Custom implementation</h3>
      <p>
        <code>initPosition</code> and <code>destroyPosition</code> are designed to work seamlessly
        with other parts of the design system and cover the majority of use cases. In rare cases, it
        may be useful to have direct access to Floating UI, for example when you only need the
        <code>x, y</code> coordinates and want to apply them yourself. You can import Floating UI
        functions from <code>useKFloatingPosition</code> and use them as described in the
        <DocsExternalLink
          href="https://floating-ui.com/docs/computePosition"
          text="Floating UI documentation"
        />.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKFloatingPosition from 'kolibri-design-system/lib/composables/useKFloatingPosition';

        const { computePosition, autoUpdate } = useKFloatingPosition();
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsWarning>
        Follow Floating UI's guidance to
        <strong><DocsExternalLink
          href="https://floating-ui.com/docs/autoUpdate#usage"
          text="clean up auto-updating"
        />
          to prevent severe performance problems.</strong>
      </DocsWarning>
    </DocsPageSection>

    <DocsPageSection
      title="Example"
      anchor="#example"
    >
      <p>Click the button to toggle the tooltip.</p>
      <DocsExample
        exampleId="basic"
        loadExample="useKFloatingPosition/Basic.vue"
        block
      />
    </DocsPageSection>

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li>
          <DocsInternalLink
            href="/floatingelements"
            text="Floating elements"
          />
          has general overview of floating elements
        </li>
        <li><DocsLibraryLink component="useKFloatingInteraction" /> TBD</li>
        <li>
          <DocsExternalLink
            href="https://floating-ui.com/docs/getting-started"
            text="Floating UI"
          />
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>
