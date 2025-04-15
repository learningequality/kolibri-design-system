<template>

  <KCardGrid
    layout="1-2-3"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      v-for="i in 5"
      :key="i"
      :headingLevel="5"
      :prependTitle="`(${i})`"
    />
  </KCardGrid>

</template>
