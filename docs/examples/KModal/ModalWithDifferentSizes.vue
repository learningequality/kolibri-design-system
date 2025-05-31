<template>

  <div class="example-modal-size">
    <KButton @click="openModal('small')">Small Modal</KButton>
    <KButton @click="openModal('medium')">Medium Modal</KButton>
    <KButton @click="openModal('large')">Large Modal</KButton>
    <KModal
      v-if="showModal"
      :appendToOverlay="true"
      :size="modalSize"
      :title="`Modal with ${modalSize} size`"
    >
      <template>
        {{ `Modal with ${modalSize} size` }}
      </template>
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
        modalSize: 'medium',
      };
    },
    methods: {
      openModal(size) {
        this.showModal = true;
        this.modalSize = size;
      },
      closeModal() {
        this.showModal = false;
      },
    },
  };

</script>


<style>

  .example-modal-size {
    display: flex;
    justify-content: space-between;
  }

</style>
