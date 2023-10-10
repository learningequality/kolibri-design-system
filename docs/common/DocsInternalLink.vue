<template>

  <a :href="href">
    <code v-if="code && text">
      {{ text }}
    </code>
    <template v-else-if="text">
      {{ text }}
    </template>
    <code v-else-if="code">
      <slot></slot>
    </code>
    <template v-else>
      <slot></slot>
    </template>
  </a>

</template>


<script>

  export default {
    name: 'DocsInternalLink',
    props: {
      href: {
        type: String,
        required: true,
        validator(value) {
          return value.startsWith('/') || value.startsWith('#');
        },
      },
      text: {
        type: String,
        default: null,
      },
      code: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>
