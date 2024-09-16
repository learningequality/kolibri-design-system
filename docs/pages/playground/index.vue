<template>

  <div :style="{ margin: '40px' }">
    <h2>Default '1-1-1' grid, horizontal cards, large thumbnail on the right</h2>
    <KCardGrid
      layout="1-1-1"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundHorizontalCard
        v-for="i in 8"
        :key="i"
        thumbnailAlign="right"
      />
    </KCardGrid>

    <h2>Default '1-2-2' grid, horizontal cards, large thumbnail on the left</h2>
    <KCardGrid
      layout="1-2-2"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundHorizontalCard
        v-for="i in 8"
        :key="i"
        thumbnailAlign="left"
      />
    </KCardGrid>

    <h2>Default '1-2-2' grid, horizontal cards, large thumbnail on the right</h2>
    <KCardGrid
      layout="1-2-2"
      :style="{ 'max-width': '1400px' }"
    >
      <PlaygroundHorizontalCard
        v-for="i in 8"
        :key="i"
        thumbnailAlign="right"
      />
    </KCardGrid>

    <h2>Default '1-2-2' grid, horizontal cards, small thumbnail on the right</h2>
    <KCardGrid
      layout="1-2-2"
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
      layout="1-2-3"
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

    <h2>Default '1-2-2' grid, vertical cards, large thumbnail</h2>
    <KCardGrid
      layout="1-2-2"
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
      return {};
    },
  };

</script>


<style scoped lang="scss">

  h2 {
    margin-top: 50px;
  }

</style>
