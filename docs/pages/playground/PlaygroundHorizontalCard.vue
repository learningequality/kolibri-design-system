<template>

  <KCard
    :to="{ name: '/' }"
    :headingLevel="2"
    layout="horizontal"
    :thumbnailDisplay="thumbnailDisplay"
    :thumbnailAlign="thumbnailAlign"
    :thumbnailSrc="require('../../assets/hummingbird CC BY-SA 4.0.jpg')"
    title="This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title"
  >
    <template #aboveTitle>
      <KGrid>

        <KGridItem
          :layout12="{ span: 8 }"
          :layout8="{ span: 6 }"
        >
          <span><KIcon icon="readSolid" :style="{ 'font-size': '14px' }" /></span>
          <span
            :style="{ 'color': $themePalette.grey.v_400,
                      'font-size': '12px' }"
          >Rutrum pellentesque utrum...</span>
        </KGridItem>

        <KGridItem
          :layout12="{ span: 4 }"
          :layout8="{ span: 2 }"
        >
          <div style="float:right">
            <KIcon icon="infoOutline" class="icon-size" />
          </div>
        </KGridItem>
      </KGrid>
    </template>
    <template #belowTitle>
      <!-- <div :style="{ height: '24px', overflow: 'hidden' }">
        Below title below title below title below
      </div> -->
      Below title below title below title below
    </template>

    <template #footer>
      <div>
        <div class="footer-top-header">
          <span>
            <KIcon icon="createShaded" class="icon-size" />
            Practice
          </span>
          <span
            :style="{ 'background-color': $themePalette.grey.v_100,'padding': '2px' }"
          >
            Short Activity
          </span>
        </div>

        <KGrid>
          <KGridItem
            :layout12="{ span: 8 }"
            :layout8="{ span: 6 }"
          >
            <progress
              value="20"
              max="100"
              style="height:0.5em;width:100%"
            ></progress>
          </KGridItem>
          <KGridItem
            :layout12="{ span: 4 }"
            :layout8="{ span: 2 }"
          >
            <div class="" style="float:right;">
              <KIcon icon="schedule" class="icon-size" />
              <KIcon icon="download" class="icon-size" />
            </div>
          </KGridItem>
        </KGrid>
      </div>
    </template>
  </KCard>

</template>


<script>

  export default {
    name: 'PlaygroundHorizontalCard',
    props: {
      thumbnailAlign: {
        required: false,
        type: String,
        default: 'left',
      },
      thumbnailDisplay: {
        required: false,
        type: String,
        default: 'large',
      },
    },
  };

</script>
