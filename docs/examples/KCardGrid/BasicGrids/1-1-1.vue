<template>

  <KCardGrid
    layout="1-1-1"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      v-for="i in 2"
      :key="i"
      :headingLevel="5"
      orientation="horizontal"
      :prependTitle="`(${i})`"
    />
  </KCardGrid>

</template>
