<template>

  <DocsPageTemplate apiDocs>
    <template #developerNotes>
      <ul>
        <li>
          Don't use in production yet. Browser testing in Kolibri isn't finished. It can move from
          candidate stage to stable once FloatingUI is confirmed. See
          <DocsExternalLink
            href="https://github.com/learningequality/kolibri-design-system/issues/1311"
            text="#1311"
          />.
        </li>
      </ul>
    </template>

    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        Positions floating elements such as tooltips and dropdown menus relative to their anchor
        elements. It computes the position and keeps it updated on scroll and resize. It can also
        offset the element, flip it to the other side, shift it to stay in view, and more. It is
        built with
        <DocsExternalLink
          href="https://floating-ui.com/"
          text="Floating UI"
        />.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKFloatingPosition from 'kolibri-design-system/lib/composables/useKFloatingPosition';

        const {
          initPosition, destroyPosition,
          // + FloatingUI middleware, core, and utilities
        } = useKFloatingPosition();
      </DocsShowCode>
      <!-- eslint-enable -->

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

      <DocsBanner a11y>
        Additional content that appears and disappears with keyboard focus or hover needs to meet
        the Dismissible, Hoverable, and Persistent requirements of the
        <DocsExternalLink
          text="WCAG Success Criterion"
          href="https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html"
        />.
      </DocsBanner>
    </DocsPageSection>

    <DocsPageSection
      anchor="#version-update"
      title="Floating UI version updates"
    >
      <DocsBanner warning>
        Floating UI is a modern library and our
        <DocsInternalLink
          href="/browsersupport"
          text="supported browsers"
        />
        are fairly old.
        <strong>Update <code>@floating-ui/dom</code> carefully: time it with a major release, and have
          Kolibri QA test on Browserstack</strong>
        all areas built with <code>useKFloatingPosition</code>. Also test on Browserstack whenever
        you start using a Floating UI feature that our codebases haven't used before.
      </DocsBanner>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[
          { text: 'Initialize position', href: '#init-position' },
          { text: 'Destroy position', href: '#destroy-position' },
          { text: 'Options', href: '#options' },
          { text: 'Custom implementation', href: '#custom' },
        ]"
      />

      <h3>
        Initialize position
        <DocsAnchorTarget anchor="#init-position" />
      </h3>

      <p>
        First, give your floating element the
        <DocsExternalLink
          href="https://floating-ui.com/docs/computePosition#initial-layout"
          text="styles that Floating UI requires"
        />.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="css">
        .tooltip {
          position: absolute;
          width: max-content; // or a fixed value
          top: 0;
          left: 0;
        }
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        Then call <code>initPosition</code> to position it relative to the anchor element and set up
        position auto-updating. Call it when the floating element becomes visible.
      </p>

      <p>
        <code>initPosition</code> returns a promise that resolves the first time the position is
        applied. Wait for it before doing anything that depends on where the floating element is
        (e.g. moving focus into it like in
        <DocsInternalLink
          href="/usekfloatinginteraction#escape"
          text="this example"
        />).
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKFloatingPosition from 'kolibri-design-system/lib/composables/useKFloatingPosition';

        const { initPosition } = useKFloatingPosition();

        initPosition(
          'tooltip-id',            // Unique ID of the floating element
          floatingEl,              // Floating DOM element (e.g. tooltip)
          anchorEl,                // Anchor DOM element (e.g. button)
          options                  // Floating UI options
        );
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsBanner warning>
        In both eager and lazy rendering implementations,
        <strong>
          never call <code>initPosition</code> until the floating element becomes visible to
          users</strong>. This prevents unnecessarily attaching listeners and observers (e.g. to many tooltips on a
        page that nobody opens).
      </DocsBanner>

      <h3>
        Destroy position
        <DocsAnchorTarget anchor="#destroy-position" />
      </h3>
      <p>
        Call <code>destroyPosition</code> to stop auto-updating the position of a floating element
        positioned with <code>initPosition</code>.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKFloatingPosition from 'kolibri-design-system/lib/composables/useKFloatingPosition';

        const { destroyPosition } = useKFloatingPosition();

        destroyPosition('tooltip-id');
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsBanner warning>
        To prevent severe performance problems,
        <strong>always call <code>destroyPosition</code> both when the floating element is hidden, and
          when it's removed from the DOM</strong>.
      </DocsBanner>

      <h3>
        Options
        <DocsAnchorTarget anchor="#options" />
      </h3>
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

        initPosition('tooltip-id', floatingEl, anchorEl, {
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

      <h3>
        Custom implementation
        <DocsAnchorTarget anchor="#custom" />
      </h3>
      <p>
        <code>initPosition</code> and <code>destroyPosition</code> are designed to work well with
        other parts of the design system and cover most use cases. In rare cases, it may be useful
        to have direct access to Floating UI, for example when you only need the
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

      <DocsBanner warning>
        Follow Floating UI's guidance on
        <strong><DocsExternalLink
          href="https://floating-ui.com/docs/autoUpdate#usage"
          text="cleaning up auto-updating"
        />, to prevent severe performance problems.</strong>
      </DocsBanner>
    </DocsPageSection>

    <DocsPageSection
      title="Example"
      anchor="#example"
    >
      <DocsExample
        exampleId="basic"
        loadExample="useKFloatingInteraction/Basic.vue"
        block
      />

      <p>See <code>useKFloatingInteraction</code> for more examples.</p>
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
          has a general overview of floating elements
        </li>
        <li>
          <DocsLibraryLink component="useKFloatingInteraction" /> observes interactions with
          activator elements, such as hover, click, and others, to determine when a floating element
          should become active
        </li>
        <li>
          <DocsInternalLink
            href="/styling#z-indexes"
            text="Z-indexes"
          />
          has guidance for elevation
        </li>
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
