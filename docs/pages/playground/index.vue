<template>

  <div :style="{ margin: '40px' }">
    <h2>Default '1-2' grid, horizontal cards, large thumbnail on the left</h2>
    <KCardGrid
      layout="1-2"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundHorizontalCard
        v-for="i in 8"
        :key="i"
        thumbnailAlign="left"
      />
    </KCardGrid>

    <h2>Default '1-2' grid, horizontal cards, large thumbnail on the right</h2>
    <KCardGrid
      layout="1-2"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundHorizontalCard
        v-for="i in 8"
        :key="i"
        thumbnailAlign="right"
      />
    </KCardGrid>

    <h2>Default '1-2' grid, horizontal cards, small thumbnail on the right</h2>
    <KCardGrid
      layout="1-2"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundHorizontalCard
        v-for="i in 8"
        :key="i"
        thumbnailDisplay="small"
        thumbnailAlign="right"
      />
    </KCardGrid>

    <h2>Default '1-2-3' grid, horizontal cards, small thumbnail on the left</h2>
    <KCardGrid
      layout="1-2"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundHorizontalCard
        v-for="i in 8"
        :key="i"
        thumbnailDisplay="small"
        thumbnailAlign="left"
      />
    </KCardGrid>

    <h2>Default '1-2-3' grid, vertical cards, small thumbnail</h2>
    <KCardGrid
      layout="1-2-3"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundVerticalCard
        v-for="i in 8"
        :key="i"
        thumbnailDisplay="small"
      />
    </KCardGrid>

    <h2>Default '1-2' grid, vertical cards, large thumbnail</h2>
    <KCardGrid
      layout="1-2"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundVerticalCard
        v-for="i in 8"
        :key="i"
        thumbnailDisplay="large"
      />
    </KCardGrid>

    <h2>Layout configuration overriden via props</h2>
    <KCardGrid
      layout="1-2"
      rowGap="50px"
      :layoutConfig="layoutConfig1"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundVerticalCard
        v-for="i in 8"
        :key="i"
        thumbnailDisplay="large"
      />
    </KCardGrid>

    <h2>Default '1-2-3' grid, no thumbnail</h2>
    <KCardGrid
      layout="1-2-3"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundVerticalCard
        v-for="i in 8"
        :key="i"
        thumbnailDisplay="none"
      />
    </KCardGrid>

    <hr>

    <!-- playing with techniques -->
    <!-- <div class="card card-before">
      <div class="content content-before">
        <h2>Card - before</h2>
        <p>Card content card content card content card content card content card content</p>
      </div>
      <div class="thumbnail thumbnail-before"></div>
    </div>

    <div class="card card-after">
      <div class="content content-after">
        <h2>Card - after</h2>
        <p>Card content card content card content card content card content card content</p>
      </div>
      <div class="thumbnail thumbnail-after"></div>
    </div> -->
  </div>

</template>


<script>

  import PlaygroundVerticalCard from './PlaygroundVerticalCard';
  import PlaygroundHorizontalCard from './PlaygroundHorizontalCard';

  export default {
    name: 'Playground',
    components: {
      PlaygroundVerticalCard,
      PlaygroundHorizontalCard,
    },
    data() {
      return {
        layoutConfig1: {
          'level-0': {
            rowGap: '100px',
            columns: 2,
          },
          'level-5': {
            columns: 4,
          },
          'level-6': {
            columns: 5,
          },
          'level-7': {
            columns: 5,
          },
        },
      };
    },
  };

</script>


<style scoped lang="scss">

  h2 {
    margin-top: 50px;
  }

  /* .card {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: auto;
    margin: 20px;
    border: 1px solid black;
  }

  .thumbnail {
    order: 2;
    width: 100%;
    background-color: lightcoral;
  }

  .content {
    order: 1;
    padding: 10px;
    background-color: lightblue;
  }

  .thumbnail-before {
    height: 40%;
    min-height: 40%;
  }

  .card-after {
    position: relative;
  }

  .content-after {
    margin-top: 50%;
  }

  .thumbnail-after {
    position: absolute;
    top: 0;
    height: 50%;
  } */

</style>
