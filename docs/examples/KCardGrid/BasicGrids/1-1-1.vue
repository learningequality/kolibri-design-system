<template>

  <KCardGrid layout="1-1-1">
    <DocsKCard
      v-for="i in 2"
      :key="i"
      :headingLevel="5"
      orientation="horizontal"
    >
      <template #title>
        <KTextTruncator
          :maxLines="2"
          :text="`(${i}) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`"
        />
      </template>
      <template #media>
        <img
          src="/api/placeholder/400/300"
          alt="Hummingbird on a branch"
          class="card-img"
        >
      </template>
      <template #belowTitle>
        <p>
          Discover how hummingbirds play a big role in nature despite their small size. Find out
          more about their beauty, how they help plants grow, and where they live.
        </p>
      </template>
      <template #footer>
        <span class="pill">
          <KIcon icon="readSolid" />
          Read
        </span>
        <span class="pill">Short Activity</span>
      </template>
    </DocsKCard>
  </KCardGrid>

</template>


<style scoped>

  .card-img {
    width: 100%;
    max-width: 250px;
    object-fit: cover;
  }

  .pill {
    display: inline-flex;
    padding: 4px 8px;
    margin-right: 8px;
    color: #616161;
    background-color: #dddddd;
    border-radius: 4px;
  }

</style>
