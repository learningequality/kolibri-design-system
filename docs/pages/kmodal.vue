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
          { text: 'Dialog box with description', href: '#dialog-box' },
          { text: 'Submit form dialog box', href: '#submit-form' },
          { text: 'Modal with different sizes', href: '#modal-sizes' },
        ]"
      />

      <h3>
        Dialog box with description
        <DocsAnchorTarget anchor="#dialog-box" />
      </h3>
      <p>To show message information, warnings, or notifications to the user</p>
      <DocsExample
        loadExample="KModal/KModal.vue"
        exampleId="example-one"
      />

      <h3>
        Submit form dialog box
        <DocsAnchorTarget anchor="#submit-form" />
      </h3>
      <p>
        Modal with checkbox, submit, and cancel buttons <br >
        Check the checkbox to enable the submit button <br >
        To discard the changes, click cancel
      </p>
      <DocsExample
        loadExample="KModal/ModalWithSubmit&Cancel.vue"
        exampleId="#submit-form"
      />

      <h3>
        Modal with different sizes
        <DocsAnchorTarget anchor="#modal-sizes" />
      </h3>
      <p>You have three different modals.</p>
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
