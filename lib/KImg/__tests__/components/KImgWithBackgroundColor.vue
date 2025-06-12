<template>

  <KImg
    altText="A sitting hummingbird"
    scaleType="centerInside"
    :src="require('../../../../docs/assets/hummingbird-small-cc-by-sa-4.jpg')"
    :style="{ height: '200px', width: '100%', maxWidth: '500px' }"
    borderRadius="8px"
    backgroundColor="#6060a3"
  />

</template>


<script>

  export default {
    name: 'KImgWithBackgroundColor',
  };

</script>
