<template>

  <div class="card">
    <li>
      <h1 :headerLevelTag="headerLevelTag">
        <a :href="to">
          <KTextTruncator :text="title" :maxLines="1" />
        </a>
      </h1>
    </li>
    <slot></slot>
  </div>

</template>


<script>

  import KTextTruncator from '../KTextTruncator.vue';

  export default {
    name: 'BaseCard',
    components: {
      KTextTruncator,
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
    computed: {
      headerLevelTag() {
        return `h${this.headingLevel}`;
      },
    },
  };

</script>

<style lang="scss">
.card{
  background-color: rgb(119, 119, 128);
  border-radius: 10px;
}
</style>