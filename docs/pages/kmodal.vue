<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      For design guidance, see the page on
      <DocsInternalLink
        href="/modals"
        text="modals"
      />.
    </DocsPageSection>
    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[
          { text: 'With description and actions', href: '#description' },
          { text: 'With enabled / disabled submit', href: '#enabled-disabled-submit' },
          { text: 'With predefined sizes', href: '#predefined-sizes' },
          { text: 'With precise size', href: '#precise-size' },
          { text: 'With custom actions', href: '#custom-actions' },
          { text: 'Closing and non-dismissible modals', href: '#closing' },
        ]"
      />

      <h3>
        With description and actions
        <DocsAnchorTarget anchor="#description" />
      </h3>
      <p>To show information, warnings, or notifications.</p>
      <DocsExample
        loadExample="KModal/ModalWithDescription.vue"
        exampleId="description"
      />

      <h3>
        With enabled / disabled submit
        <DocsAnchorTarget anchor="#enabled-disabled-submit" />
      </h3>
      <p>Modal with checkbox, submit, and cancel buttons.</p>
      <DocsExample
        loadExample="KModal/ModalWithSubmitCancel.vue"
        exampleId="enabled-disabled-submit"
      />

      <h3>
        With predefined sizes
        <DocsAnchorTarget anchor="#predefined-sizes" />
      </h3>
      <p>There are three predefined modal sizes.</p>
      <DocsExample
        loadExample="KModal/ModalWithDifferentSizes.vue"
        exampleId="predefined-sizes"
        :hideStyle="true"
        block
      />

      <h3>
        With precise size
        <DocsAnchorTarget anchor="#precise-size" />
      </h3>
      <p>Modal with 600px width.</p>
      <DocsExample
        loadExample="KModal/ModalWithDynamicWidth.vue"
        exampleId="precise-size"
      />

      <h3>
        With custom actions
        <DocsAnchorTarget anchor="#custom-actions" />
      </h3>
      <p>Use <code>actions</code> slot to override the default buttons.</p>
      <DocsExample
        loadExample="KModal/ModalWithCustomActions.vue"
        exampleId="custom-actions"
      />

      <h3>
        Closing and non-dismissible modals
        <DocsAnchorTarget anchor="#closing" />
      </h3>
      <p>
        <code>KModal</code> never closes itself. Pressing <code>Escape</code> or the cancel button
        emits <code>cancel</code>; the parent closes the modal in its <code>cancel</code> handler.
        <code>Escape</code> that closes an open dropdown or menu inside the modal, or whose
        <code>keydown</code> is <code>preventDefault</code>ed, does not emit <code>cancel</code>. To
        make a modal non-dismissible, omit both the <code>cancel</code> listener and
        <code>cancelText</code>.
      </p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
