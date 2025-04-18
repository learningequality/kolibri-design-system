<template>

  <div :style="{ width: containerWidth, padding: '16px' }">
    <KBreadcrumbs
      :items="items"
      :showSingleItem="showSingleItem"
    />
  </div>

</template>


<script>

  export default {
    name: 'KBreadcrumbsTest',
    props: {
      items: {
        type: Array,
        required: true,
      },
      showSingleItem: {
        type: Boolean,
        default: false,
      },
      containerWidth: {
        type: String,
        default: '100%',
      },
    },
  };

</script>
