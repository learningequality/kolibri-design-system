<template>

  <a :href="'/' + page">
    <code>{{ page }}</code>
  </a>

</template>


<script>

  export default {
    name: 'DocsLibraryLink',
    props: {
      page: {
        type: String,
        required: true,
      },
    },
  };

</script>
