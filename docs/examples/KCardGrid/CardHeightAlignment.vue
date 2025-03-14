<template>

  <KCardGrid
    layout="1-2-3"
    :loading="loading"
  >
    <!-- Card 1 -->
    <DocsKCard
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div class="above-title">
          <KLabeledIcon
            icon="readSolid"
            label="Read"
          />
        </div>
      </template>
      <template #title>
        <div class="title-area">
          <KTextTruncator
            :maxLines="2"
            text="(1) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          text="Short description"
        />
      </template>
      <template #footer>
        <div class="footer-container">
          <span class="pill">Biology</span>
          <span class="pill">Short Activity</span>
        </div>
      </template>
    </DocsKCard>

    <!-- Card 2 -->
    <DocsKCard
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div class="above-title">
          <KLabeledIcon
            icon="readSolid"
            label="Read"
          />
        </div>
      </template>
      <template #title>
        <div class="title-area">
          <KTextTruncator
            :maxLines="2"
            text="(2) Short title"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live."
        />
      </template>
      <template #footer>
        <div class="footer-empty"></div>
      </template>
    </DocsKCard>

    <!-- Card 3 -->
    <DocsKCard
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div class="above-title"></div>
      </template>
      <template #title>
        <div class="title-area">
          <KTextTruncator
            :maxLines="2"
            text="(3) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live."
        />
      </template>
      <template #footer>
        <div class="footer-container">
          <span class="pill">Short Activity</span>
          <span class="pill">Biology</span>
        </div>
      </template>
    </DocsKCard>
  </KCardGrid>

</template>


<script>

  export default {
    data() {
      return {
        loading: true,
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  };

</script>


<style scoped>

  .above-title {
    height: 24px;
  }

  .title-area {
    height: 52px;
  }

  .footer-container {
    margin-top: 10px;
    color: #616161;
  }

  .footer-empty {
    margin-top: 10px;
  }

  .pill {
    padding: 4px 8px;
    margin-right: 8px;
    background-color: #dddddd;
    border-radius: 4px;
  }

</style>