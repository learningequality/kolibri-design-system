<template>

  <div>
    <KButton @click="openModal">Open modal</KButton>
    <KModal
      v-if="showModal"
      :appendToOverlay="true"
      size="600"
      :title="`Modal with precise size`"
    >
      <template>
        {{ `Modal with 600px size` }}
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
