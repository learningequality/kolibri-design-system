<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        A composable that observes user interactions with activator elements to determine when a
        floating element should be considered active. It supports several interaction types, such as
        hover, click, and many others. It does not directly set visibility, leaving each
        implementation to manage it depending on context.
      </p>

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
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[
          { text: 'Basic', href: '#basic' },
          { text: 'Interactions', href: '#interactions' },
          { text: 'Performance optimization', href: '#performance-optimization' },
        ]"
      />

      <h3 id="basic">Basic</h3>
      <p>
        First, add a <code>data-floating-id</code> attribute to the activator element. Its value
        must match the <code>floatingId</code> passed to <code>useKFloatingInteraction</code>. Then
        use the returned <code>isActive</code> ref to conditionally show the floating element. Also
        set <code>:id="floatingId"</code> on the floating element itself to make the connection
        between the activator and its floating element explicit.
      </p>

      <p>
        <code>useKFloatingInteraction</code> also returns the activator element. This is useful when
        using it together with <code>useKFloatingPosition</code>, as you can pass it directly to
        <code>initPosition</code>.
      </p>

      <DocsExample
        exampleId="basic"
        loadExample="useKFloatingInteraction/Basic.vue"
        block
      />

      <h3 id="interactions">Interactions</h3>
      <p>By default, the floating element is activated on hover.</p>

      <p>
        The optional <code>activateOn</code> parameter controls which user interactions activate the
        floating element. Supported values are <code>'hover'</code>, <code>'touch'</code>,
        <code>'focus'</code>, <code>'click'</code>, and <code>'keyboardfocus'</code>.
        <code>'keyboardfocus'</code> activates the floating element only when the user navigates
        with the keyboard. Multiple interaction types can be passed.
      </p>

      <DocsExample
        exampleId="click"
        loadExample="useKFloatingInteraction/Interactions.vue"
        block
      />

      <h3 id="performance-optimization">Performance optimization</h3>
      <p>
        The optional <code>delegateTo</code> parameter lets you delegate events to a common ancestor
        element instead of attaching listeners to each activator element directly. Use this to
        optimize performance on pages with many floating elements.
      </p>
      <p>
        Pass <code>'root'</code> to delegate to the document or window, or pass the ID of a common
        ancestor element.
      </p>
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
        <li>
          <DocsLibraryLink component="useKFloatingPosition" /> manages the positioning of floating
          elements relative to their anchor elements
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>
