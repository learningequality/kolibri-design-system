<template>

  <div>
    <KButton @click="openModal">Open modal</KButton>
    <KModal
      v-if="showModal"
      :appendToOverlay="true"
      title="Dialog box"
    >
      <template> Dialog box with description </template>
      <template #actions>
        <KButton @click="closeModal"> Close </KButton>
      </template>
    </KModal>
  </div>

</template>


<script>

  export default {
    data() {
      return {
        showModal: false,
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
    },
  };

</script>
