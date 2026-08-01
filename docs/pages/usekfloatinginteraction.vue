<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        Observes interactions with activator elements, such as hover, click, and others, to
        determine when a floating element should become active.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKFloatingInteraction from 'kolibri-design-system/lib/composables/useKFloatingInteraction';

        const { isActive, activatorEl, setActive, setEnabled } = useKFloatingInteraction(
          floatingId,
          floatingRef,
          options
        );
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        Some design system components use it internally, but it can also be used independently,
        typically (but not necessarily) together with
        <DocsLibraryLink component="useKFloatingPosition" />.
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
      title="Performance"
      anchor="#performance"
    >
      <p>
        The composable has several internal optimizations. Two important decisions are yours to
        make, and both affect performance: eager versus lazy rendering, and event delegation. There
        is no rule of thumb - it depends on the size of the page, how often it changes, how users
        interact with it, the number of floating elements, their configured interactions,
        accessibility requirements, and which performance metrics matter most. Below are a few
        pointers to help you know what to ask. Finally, a real measurement gives the best insight.
      </p>

      <h3>
        Eager versus lazy rendering
        <DocsAnchorTarget anchor="#eager-lazy-rendering" />
      </h3>

      <p>
        You can render floating elements eagerly or lazily (see
        <DocsInternalLink
          href="#eager-lazy"
          text="Eager and lazy"
        />). Lazy keeps the DOM from filling up with elements a user may never open. This is
        particularly helpful on pages with many floating elements. Eager is easier for accessibility
        - the DOM isn't changing on the fly, so fewer workarounds are needed.
      </p>

      <h3>
        Event delegation
        <DocsAnchorTarget anchor="#event-delegation" />
      </h3>

      <p>
        <code>options.delegate</code> puts a single shared activation listener per event type on the
        document, rather than giving each activator element its own listeners. This significantly
        reduces the number of listeners on a page and is particularly helpful on pages with many
        floating elements, but it can perform well in other contexts too.
      </p>

      <p>
        The table below shows the impact of <code>useKFloatingInteraction</code>'s activation logic
        in both modes on a page with 20 icon buttons, each with a tooltip. The tooltips are
        configured with <code>hover</code>, <code>touch</code>, and <code>focus</code>, so that they
        work with a mouse, on a touchscreen, and with a keyboard.
      </p>

      <KTable
        caption="MutationObserver and activation listeners in non-delegated and delegated mode"
        :headers="[
          { label: '', dataType: 'undefined', columnId: 'aspect' },
          { label: 'Non-delegated', dataType: 'undefined', columnId: 'nonDelegated', width: '38%' },
          { label: 'Delegated', dataType: 'undefined', columnId: 'delegated' },
        ]"
        :rows="[
          [
            'MutationObserver',
            '1 page-wide, all the time',
            '1 page-wide, only while a tooltip is active',
          ],
          [
            'Activation listeners',
            '3 per icon button (total 60: 20 mouseenter, 20 touchstart, 20 focus)',
            '3 page-wide (1 mouseenter, 1 touchstart, 1 focus)',
          ],
        ]"
      />

      <p>
        The main trade-off of non-delegated mode is a MutationObserver processing every DOM update
        on the page, all the time, and a much higher number of listeners. The main trade-off of
        delegated mode is that the activation handler runs on every event of a given type anywhere
        on the page (particularly relevant for <code>mouseenter</code>).
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[
          { text: 'Basic', href: '#basic' },
          { text: 'Options', href: '#options' },
          { text: 'Eager and lazy', href: '#eager-lazy' },
          { text: 'Delay and animation', href: '#delay-and-animation' },
          { text: 'Keyboard-only focus', href: '#keyboard-only-focus' },
          { text: 'Touch devices', href: '#touch-devices' },
          { text: 'Escape handling', href: '#escape' },
          { text: 'Outside press', href: '#outside-press' },
          { text: 'Enabling and disabling', href: '#enabling' },
          { text: 'Manual activation and deactivation', href: '#manual-activation' },
          { text: 'Scrolling', href: '#scrolling' },
          { text: 'Toggling', href: '#toggling' },
        ]"
      />

      <DocsBanner warning>
        To prevent severe performance problems when using <code>useKFloatingPosition</code>: In both
        eager and lazy rendering implementations,
        <strong>never call <code>initPosition</code> until the floating element becomes visible to users.
          Also always call <code>destroyPosition</code> both when the floating element is hidden,
          and when it's removed from the DOM</strong>.
      </DocsBanner>

      <h3>
        Basic
        <DocsAnchorTarget anchor="#basic" />
      </h3>
      <p>
        <strong>The activator element needs a <code>data-floating-id</code> attribute whose value matches
          the <code>id</code> of the associated floating element.</strong>
        The same <code>id</code> is passed as a composable parameter, alongside a reference to the
        floating element and options.
      </p>

      <DocsBanner warning>
        <strong>Keep <code>data-floating-id</code> the same. Changing the <code>id</code> at runtime is
          not supported.</strong>
      </DocsBanner>

      <p>
        The composable returns <code>isActive</code> (whether a user is interacting with an
        activator in one of the configured ways) and <code>activatorEl</code> (the activator element
        associated with the floating element). It does not set visibility, leaving each
        implementation to manage it depending on context.
      </p>

      <p>
        It keeps the floating element from disappearing when hover or focus moves from the activator
        element to the floating element, as required by the Hoverable requirement of the related
        <DocsExternalLink
          text="WCAG Success Criterion"
          href="https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html"
        />. It also handles activator and floating elements being added, replaced, or removed
        reactively. A single floating element can be associated with multiple activator elements.
      </p>

      <DocsExample
        exampleId="basic"
        loadExample="useKFloatingInteraction/Basic.vue"
        block
      />

      <h3>
        Options
        <DocsAnchorTarget anchor="#options" />
      </h3>

      <p>
        <code>options.interactions</code> configures what user interactions with an activator
        element should open its floating element. Furthermore, each interaction has its own
        configuration options. <code>options.deactivateOn</code> is an interaction-independent
        setting that configures what deactivates the floating element. The examples on this page go
        through each of them in detail.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        useKFloatingInteraction(floatingId, floatingRef, {
          interactions: ['hover', 'focus', 'click', 'touch']  // simplified notation, uses the defaults below
          interactions: { hover: true, focus: true }          // simplified notation, uses the defaults below
          interactions: {
            hover: { activateDelay: 300, deactivateDelay: 250 },
            focus: { keyboardOnly: false, activateDelay: 300, deactivateDelay: 250 },
            click: {
              deactivateOnOutside: true,
              toggle: true,
            },
            touch: {
              deactivateOnOutside: true,
              toggle: true,
            },
          },
          deactivateOn: {
            esc: true,
            scroll: false,
          },
        });
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>
        Eager and lazy
        <DocsAnchorTarget anchor="#eager-lazy" />
      </h3>
      <p>
        The composable doesn't set visibility directly on floating elements. You can implement both
        eager (in the DOM whether hidden or visible) and lazy rendered (in the DOM only while
        visible). The choice affects performance - see
        <DocsInternalLink
          href="#eager-lazy-rendering"
          text="Eager versus lazy rendering"
        />. The examples below show how to achieve both.
      </p>

      <h4>Eager</h4>
      <DocsExample
        exampleId="eager"
        loadExample="useKFloatingInteraction/Eager.vue"
        block
      />

      <h4>Lazy</h4>

      <p>
        Note that <code>setTimeout</code> is needed in the lazy implementation, so the fade-out
        animation can finish.
      </p>

      <DocsBanner a11y>
        When rendering lazily, use <code>aria-label</code>/ <code>aria-description</code>.
        <code>aria-labelledby</code>/ <code>aria-describedby</code> would point at an element that
        doesn't exist most of the time, which breaks for assistive technologies.
      </DocsBanner>

      <DocsExample
        exampleId="lazy"
        loadExample="useKFloatingInteraction/Lazy.vue"
        block
      />

      <h3>
        Delay and animation
        <DocsAnchorTarget anchor="#delay-and-animation" />
      </h3>

      <p>
        By default, hover and focus wait for <code>300ms</code> before activating a floating
        element. This keeps floating elements from flashing one after another as the pointer travels
        (value chosen based on manual testing and
        <DocsExternalLink
          text="Nielsen Norman Group guidance"
          href="https://www.nngroup.com/articles/timing-exposing-content/"
        />).
      </p>

      <p>
        They also wait another <code>250ms</code> before deactivating, so the floating element
        doesn't disappear while the pointer moves from the activator element to the floating element
        (they are typically a few pixels apart). This is to meet the Hoverable requirement of the
        related
        <DocsExternalLink
          text="WCAG Success Criterion"
          href="https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html"
        />.
      </p>

      <p>
        Both values can be adjusted via <code>activateDelay</code> and <code>deactivateDelay</code>.
      </p>

      <DocsBanner a11y>
        Decreasing or removing delays makes both keeping floating elements from flashing and meeting
        the WCAG criterion mentioned above your responsibility.
      </DocsBanner>

      <DocsBanner a11y>
        Consider adding transition to floating elements, so they don't appear and vanish abruptly.
        All tooltips on this page fade in and out. The implementation varies slightly depending on
        whether it's eager or lazy (see
        <DocsInternalLink
          href="#eager-lazy"
          text="Eager and lazy"
        />.
      </DocsBanner>

      <h3>
        Keyboard-only focus
        <DocsAnchorTarget anchor="#keyboard-only-focus" />
      </h3>
      <p>
        <code>focus: { keyboardOnly: true }</code> activates a floating element on keyboard focus
        only, not on mouse focus. Without it, the tooltip below would stay stuck open after a mouse
        click on the button.
      </p>

      <DocsExample
        exampleId="keyboard-only-focus"
        loadExample="useKFloatingInteraction/KeyboardOnlyFocus.vue"
        block
      />

      <h3>
        Touch devices
        <DocsAnchorTarget anchor="#touch-devices" />
      </h3>
      <p>
        Depending on the type of floating element, you may need to add <code>touch</code> to
        <code>options.interactions</code> to achieve good support on touch devices such as phones
        and tablets. Preview floating elements with a touchscreen or in your browser's device mode.
      </p>

      <h3>
        Escape handling
        <DocsAnchorTarget anchor="#escape" />
      </h3>
      <p>
        By default, pressing <code>Escape</code> deactivates a floating element, whatever
        interaction opened it. With nested floating elements, for example a tooltip inside a popup,
        <code>Escape</code> closes them one layer at a time, innermost first.
      </p>

      <DocsExample
        exampleId="nested"
        loadExample="useKFloatingInteraction/Nested.vue"
        block
      />

      <p>
        If you need custom <code>Escape</code> handling, disable the default behavior with
        <code>deactivateOn: { esc: false }</code>.
      </p>

      <DocsBanner a11y>
        Turning off the default <code>Escape</code> behavior makes the Dismissible requirement of
        the related
        <DocsExternalLink
          text="WCAG Success Criterion"
          href="https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html"
        />
        your responsibility. After your custom logic, make sure a user can still close the floating
        element with the keyboard. The example below uses <code>setActive</code> for this (more in
        <DocsInternalLink
          href="#manual-activation"
          text="Manual activation and deactivation"
        />).
      </DocsBanner>

      <DocsExample
        exampleId="custom-escape"
        loadExample="useKFloatingInteraction/CustomEscape.vue"
        block
      />

      <h3>
        Outside press
        <DocsAnchorTarget anchor="#outside-press" />
      </h3>
      <p>
        By default, a click or tap outside deactivates a floating element activated by click or
        touch. If you need it to persist, set <code>deactivateOnOutside: false</code>.
      </p>

      <DocsExample
        exampleId="outside-press"
        loadExample="useKFloatingInteraction/OutsidePress.vue"
        block
      />

      <h3>
        Enabling and disabling
        <DocsAnchorTarget anchor="#enabling" />
      </h3>
      <p>
        Set <code>options.enabled</code> to <code>false</code> to disable the floating element from
        the start. To enable or disable it later, call
        <code>setEnabled(true)</code>/<code>setEnabled(false)</code>.
      </p>

      <DocsExample
        exampleId="enabling"
        loadExample="useKFloatingInteraction/Enabling.vue"
        block
      />

      <h3>
        Manual activation and deactivation
        <DocsAnchorTarget anchor="#manual-activation" />
      </h3>
      <p>
        Floating elements can be activated and deactivated from code via
        <code>setActive</code>. Once <code>setActive</code> has activated a floating element, it
        stays active until <code>setActive(false)</code>. <code>Escape</code> still deactivates it.
      </p>

      <DocsExample
        exampleId="manual-activation"
        loadExample="useKFloatingInteraction/ManualActivation.vue"
        block
      />

      <p>
        Manual handling can be combined with interactions. In the tour below, both popups open from
        their own icon button on click, and the tour drives those same popups from code.
      </p>

      <DocsExample
        exampleId="tour"
        loadExample="useKFloatingInteraction/Tour.vue"
        block
      />

      <p>
        Finally, it can also be helpful when implementing custom close logic. For example,
        <code>setActive</code> is used in
        <DocsInternalLink
          href="#escape"
          text="Escape handling"
        />
        to deactivate the popup on the second <code>Escape</code> press, and in
        <DocsInternalLink
          href="#outside-press"
          text="Outside press"
        />
        for the close button inside the popup.
      </p>

      <h3>
        Scrolling
        <DocsAnchorTarget anchor="#scrolling" />
      </h3>
      <p>
        By default, scrolling doesn't deactivate a floating element, as examples on this page show.
        If you need a floating element to deactivate on scroll, use
        <code>deactivateOn: { scroll: true }</code>.
      </p>

      <DocsExample
        exampleId="scroll-deactivate"
        loadExample="useKFloatingInteraction/ScrollDeactivate.vue"
        block
      />

      <h3>
        Toggling
        <DocsAnchorTarget anchor="#toggling" />
      </h3>
      <p>
        By default, a second click or tap on the activator element deactivates a floating element,
        as the click and touch examples on this page show. If you need it to stay active instead,
        use
        <code>{ toggle: false }</code>.
      </p>

      <DocsExample
        exampleId="no-toggle"
        loadExample="useKFloatingInteraction/NoToggle.vue"
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
          has a general overview of floating elements
        </li>
        <li>
          <DocsLibraryLink component="useKFloatingPosition" /> manages the positioning of floating
          elements relative to their anchor elements
        </li>
        <li>
          <DocsInternalLink
            href="/styling#z-indexes"
            text="Z-indexes"
          />
          has guidance for elevation
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
