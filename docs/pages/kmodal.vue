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
          { text: 'Dialog Box with Description', href: '#dialog-box' },
          { text: 'Submit Form Dialog Box', href: '#submit-form' },
          { text: 'Modal with Different Sizes', href: '#modal-sizes' },
        ]"
      />

      <h3>
        Dialog Box with Description
        <DocsAnchorTarget anchor="#dialog-box" />
      </h3>
      <p>To show message information, warnings, or notifications to the user.</p>
      <DocsExample
        loadExample="KModal/KModal.vue"
        exampleId="example-one"
      />

      <h3>
        Submit Form Dialog Box
        <DocsAnchorTarget anchor="#submit-form" />
      </h3>
      <p>
        Modal with checkbox, submit, and cancel buttons. Check the checkbox to enable the submit
        button. <br >To discard the changes, click cancel.
      </p>
      <DocsExample
        loadExample="KModal/ModalWithSubmit&Cancel.vue"
        exampleId="#submit-form"
      />

      <h3>
        Modal with Different Sizes
        <DocsAnchorTarget anchor="#modal-sizes" />
      </h3>
      <p>We have three different modals.</p>
      <DocsExample
        loadExample="KModal/ModalWithDifferentSizes.vue"
        exampleId="modal-sizes"
        :hideStyle="true"
        block
      />
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
