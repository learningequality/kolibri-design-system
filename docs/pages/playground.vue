<template>

  <!--
    Playground: A private page for components development
    *****************************************************
    Place a component you're working on here and see it
    live on http://localhost:4000/playground

    Please do not commit your local updates of this file.
  -->
  <div> 
    <h3>Vertical layout with small thumbnail</h3>
    <ul class="vertical-cards">
      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="vertical"
        thumbnailDisplay="small"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
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
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="vertical"
        thumbnailDisplay="small"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <KTextTruncator
            text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
            :maxLines="3"
          />
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="vertical"
        thumbnailDisplay="small"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
        title="This is a sample resource title"
      >
        <template #belowTitle>
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="vertical"
        thumbnailDisplay="small"
        title="This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title"
      >
        <template #thumbnailPlaceholder>
          <span :style="{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }">
            <KIcon icon="readSolid" :style="{ fontSize: '40px' }" />
          </span>
        </template>
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
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
        </template>
      </KCard>
    </ul>

    <h3>Horizontal layout with large thumbnail</h3>
    <ul class="horizontal-cards">
      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal" 
        thumbnailAlign="left"
        thumbnailDisplay="large"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
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
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailAlign="right"
        thumbnailDisplay="large"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <KTextTruncator
            text="This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title"
            :maxLines="3"
          />
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="large"
        thumbnailAlign="right"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
        title="This is a sample resource title"
      >
        <template #belowTitle>
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="large"
        thumbnailAlign="right"
        title="This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title"
      >
        <template #thumbnailPlaceholder>
          <span :style="{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }">
            <KIcon icon="readSolid" :style="{ fontSize: '40px' }" />
          </span>
        </template>
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
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
        </template>
      </KCard>
    </ul>

    <h3>Horizontal layout with small thumbnail</h3>

    <ul class="horizontal-cards-smaller">
      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="small"
        thumbnailAlign="right"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
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
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="small"
        thumbnailAlign="left"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <KTextTruncator
            text="This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title"
            :maxLines="2"
          />
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="small"
        thumbnailAlign="right"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
        title="This is a sample resource title"
      >
        <template #belowTitle>
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
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

      <KCard
        class="card"
        :to="{ name: '/' }"
        :headingLevel="1"
        layout="horizontal"
        thumbnailDisplay="small"
        thumbnailAlign="left"
        title="This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title This is a sample resource title"
      >
        <template #thumbnailPlaceholder>
          <span :style="{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }">
            <KIcon icon="readSolid" :style="{ fontSize: '40px' }" />
          </span>
        </template>
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
          <span>Below title below title below title below title below title below title below title below title below title below title below title below title below title</span>
        </template>
      </KCard> 
    </ul>
  </div>

</template>


<script>

  /*
    Playground is a Vue component too,
    so you can also use `data`, `methods`, etc.
    as usual if helpful
  */
  export default {
    name: 'Playground',
    data() {
      return {};
    },
    methods: {},
  };

</script>


<style scoped lang="scss">

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;
    margin-bottom: 50px;
    list-style-type: none;
  }
  h3 {
    margin-left: 30px;
  }
  .vertical-cards {
    .card {
      max-width: 350px;
    }
  }
  .horizontal-cards {
    .card {
      max-width: 650px;
    }
  }
  .horizontal-cards-smaller {
    .card {
      max-width: 400px;
    }
  }
  .footer-top-header {
    display: flex;
    order: 1;
    margin-top: 0.5em;
    font-size: 14px;
  }
  .footer-top-header span {
    margin-right: 30px;
  }
  .icon-size {
    font-size: 20px;
  }
  .icon {
    margin-left: 300px;
    font-size: 20px;
  }

</style>