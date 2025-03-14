<template>
  <KCardGrid layout="1-1-1">
    <DocsKCard
      v-for="i in 2"
      :key="i"
      :headingLevel="5"
      orientation="horizontal"
    >
      <template #title>
        <div class="titleArea">
          <KTextTruncator
            :maxLines="2"
            :text="`(${i}) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities`"
          />
        </div>
      </template>

      <template #media>
        <img
          src="/api/placeholder/400/300"
          alt="Hummingbird on a branch"
          class="hummingbirdImg"
        />
      </template>

      <template #belowTitle>
        <p>
          Discover how hummingbirds play a big role in nature despite their small size. Find out
          more about their beauty, how they help plants grow, and where they live.
        </p>
      </template>

      <template #footer>
        <div class="footerContainer">
          <span class="readBadge">
            <KIcon icon="readSolid" class="iconAdjust" />
            Read
          </span>
          <span class="shortActivity">Short Activity</span>
        </div>
      </template>
    </DocsKCard>
  </KCardGrid>
</template>

<style scoped>
.titleArea {
  height: 52px;
}
.hummingbirdImg {
  width: 100%;
  max-width: 250px;
  object-fit: cover;
}
.footerContainer {
  margin-top: 10px;
}
.readBadge {
  padding: 4px 8px;
  margin-right: 8px;
  font-size: 14px;
  color: #616161;
  background-color: #dddddd;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
}
.iconAdjust {
  position: relative;
  top: 2px;
  margin-right: 4px;
  font-size: 13px;
}
.shortActivity {
  font-size: 14px;
  color: #616161;
}
</style>



