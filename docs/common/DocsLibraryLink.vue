<template>

  <a :href="'/' + component.toLowerCase()">
    <code>{{ component }}</code>
  </a>

</template>


<script>

  export default {
    name: 'DocsLibraryLink',
    props: {
      component: {
        type: String,
        required: true,
      },
    },
  };

</script>
