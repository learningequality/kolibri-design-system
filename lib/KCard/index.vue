<template>

  <div class="card">
    <BaseCard :title="title" :headingLevel="headingLevel" :to="to" />
    <slot></slot>
  </div>
  
</template>


<script>

  import BaseCard from './BaseCard';

  export default {
    name: 'KCard',
    components: {
      BaseCard,
    },
    props: {
      title: {
        type: String,
        required: false,
        default: null,
      },
      headingLevel: {
        type: Number,
        required: true,
      },
      to: {
        type: Object,
        required: true,
      },
    },
  };

</script>

