<template>

  <div>
    <KButton @click="openModal">Open modal</KButton>
    <p v-if="showMessage">Successfully submitted the form</p>
    <KModal
      v-if="showModal"
      :appendToOverlay="true"
      size="medium"
      title="Submit form"
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
          label="Enable submit"
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
