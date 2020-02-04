<template>

  <a :href="href">
    <template v-if="text">
      {{ text }}
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </a>

</template>


<script>

  export default {
    name: 'InternalLink',
    props: {
      href: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: false,
      },
    },
  };

</script>
