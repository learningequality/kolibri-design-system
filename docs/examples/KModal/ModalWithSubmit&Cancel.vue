<template>

  <div>
    <KButton @click="openModal">Click Me</KButton>
    <p v-if="showMessage">Successfully submitted the Form</p>
    <KModal
      v-if="showModal"
      :appendToOverlay="true"
      size="medium"
      title="Submit Form"
      submitText="Submit"
      :submitDisabled="!enableSubmit"
      cancelText="Cancel"
      @submit="modalEmits('submit')"
      @cancel="modalEmits('cancel')"
    >
      <template>
        <p>Check the below check box to enable the submit button</p>
        <KCheckbox
          :checked="enableSubmit"
          label="Enable Submit"
          @change="triggerCheckBox"
        />
      </template>
    </KModal>
  </div>

</template>


<script>

  export default {
    data() {
      return {
        showModal: false,
        enableSubmit: false,
        showMessage: false,
      };
    },
    methods: {
      openModal() {
        this.showMessage = false;
        this.showModal = true;
      },
      triggerCheckBox() {
        this.enableSubmit = !this.enableSubmit;
      },
      modalEmits(type) {
        this.showMessage = type === 'submit';
        this.enableSubmit = false;
        this.showModal = false;
      },
    },
  };

</script>
