<template>

  <KCardGrid
    layout="1-2-3"
    :skeletonsConfig="skeletonsConfig5"
    :loading="loading"
  >
    <Card
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div :style="{ height: '24px' }">
          <KLabeledIcon
            icon="readSolid"
            label="Read"
          />
        </div>
      </template>
      <template #title>
        <div :style="{ height: '52px' }">
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
        <div
          class="pills"
          :style="{ color: $themeTokens.annotation }"
        >
          <span
            v-for="(pill, i) in slicedPills"
            :key="i"
            :style="{ 'background-color': $themePalette.grey.v_100 }"
          >
            {{ pill }}
          </span>
        </div>
      </template>
    </Card>

    <Card
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div :style="{ height: '24px' }">
          <KLabeledIcon
            icon="readSolid"
            label="Read"
          />
        </div>
      </template>
      <template #title>
        <div :style="{ height: '52px' }">
          <KTextTruncator
            :maxLines="2"
            text="(2) Short title"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live. "
        />
      </template>
      <template #footer>
        <div></div>
      </template>
    </Card>

    <Card
      :headingLevel="4"
      preserveAboveTitle
    >
      <template #aboveTitle>
        <div :style="{ height: '24px' }"></div>
      </template>
      <template #title>
        <div :style="{ height: '52px' }">
          <KTextTruncator
            :maxLines="2"
            text="(3) Learn everything about hummingbirds: their habitats, feeding patterns, and stunning flight abilities"
          />
        </div>
      </template>
      <template #belowTitle>
        <KTextTruncator
          :maxLines="4"
          text="Discover how hummingbirds play a big role in nature despite their small size. Find out more about their beauty, how they help plants grow, and where they live. "
        />
      </template>
      <template #footer>
        <div
          class="pills"
          :style="{ color: $themeTokens.annotation }"
        >
          <span
            v-for="(pill, i) in slicedPills"
            :key="i"
            :style="{ 'background-color': $themePalette.grey.v_100 }"
          >
            {{ pill }}
          </span>
        </div>
      </template>
    </Card>
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
