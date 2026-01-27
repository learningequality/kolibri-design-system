<template>

  <KCardGrid layout="1-1-1">
    <Card
      :headingLevel="2"
      orientation="horizontal"
      thumbnailDisplay="small"
    >
      <template #thumbnail>
        <KImg
          :src="require('../common/hummingbird-large-cc-by-sa-4.jpg')"
          :style="{ width: '100%', height: '100%' }"
          aspectRatio="16:9"
          isDecorative
        />
      </template>
    </Card>
  </KCardGrid>

</template>


<script>

  import Card from './Card';

  export default {
    components: {
      Card,
    },
  };

</script>
