<template>

  <!--
    Playground: A private page for components development
    *****************************************************
    Place a component you're working on here and see it
    live on http://localhost:4000/playground

    Please do not commit your local updates of this file.
  -->
  <div style="padding: 24px">
    <!--
      Example: Uncomment lines bellow, change something
      in lib/KBreadcrumbs.vue and see the updates reflected
      on this page
    -->
    <!-- <KBreadcrumbs
      :items="[
        { text: 'Global Digital Library', link: { path: '#' } },
        { text: 'English', link: { path: '#' } },
        { text: 'Level 2 ', link: { path: '#' } },
      ]"
    /> -->

    <!-- Play around with your component here: -->
    <h4>Vertical layout</h4>

    <ul style="width:35%;">

      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="vertical"
        thumbnailDisplay="none"
      >
        <template #title>
          <div>
            <KTextTruncator
              text="This is a sample lesson title that goes to two lines and truncates at the end of the two lines This is a sample title that goes"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <div :style="{ 'color': $themePalette.grey.v_400,'font-size': '1.2em' }">
            Class name 1
          </div>
        </template>
        <template #footer>
          <KGrid>
            <KGridItem
              :layout8="{ span: 4 }"
              :layout12="{ span: 6 }"
            >
              <KIcon
                icon="mastered"
                style="font-size:20px;margin-bottom:-5px"
              />
              <span>score 30%</span>
            </KGridItem>
            <KGridItem
              :layout8="{ span: 4 }"
              :layout12="{ span: 6 }"
            >
              <div class="" style="float:right">
                <KIcon icon="optionsVertical" />
              </div>
            </KGridItem>
          </KGrid>
        </template>
      </KCard>
      <br>

      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="vertical"
        thumbnailDisplay="small"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            <KTextTruncator
              text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <KGrid>

            <KGridItem
              :layout12="{ span: 8 }"
              :layout8="{ span: 6 }"
            >
              <span><KIcon icon="readSolid" class="icon-size" /></span>
              <span
                :style="{ 'color': $themePalette.grey.v_400,
                          'font-size': '1.2em' }"
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
      </kcard>

      <br>
      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="vertical"
        thumbnailDisplay="large"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            <KTextTruncator
              text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <KGrid>

            <KGridItem
              :layout12="{ span: 8 }"
              :layout8="{ span: 6 }"
            >
              <span><KIcon icon="readSolid" class="icon-size" /></span>
              <span
                :style="{ 'color': $themePalette.grey.v_400,
                          'font-size': '1.2em' }"
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
      </kcard>
    </ul>

    <ul style="width:40%">
      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="large"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            <KTextTruncator
              text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <KGrid>

            <KGridItem
              :layout12="{ span: 9 }"
              :layout8="{ span: 6 }"
            >
              <span><KIcon icon="readSolid" class="icon-size" /></span>
              <span
                :style="{ 'color': $themePalette.grey.v_400,
                          'font-size': '1.2em' }"
              >Rutrum pellentesque utrum...</span>
            </KGridItem>

            <KGridItem
              :layout12="{ span: 3 }"
              :layout8="{ span: 2 }"
            >
              <div style="float:right">
                <KIcon icon="infoOutline" class="icon-size" />
              </div>
            </KGridItem>
          </KGrid>
        </template>
        <template #footer>
          <div>
            <div class="footer-top-header">
              <span>
                <KIcon icon="practiceSolid" class="icon-size" />
                Practice
              </span>
              <span
                :style="{ 'background-color': $themePalette.grey.v_100 , 'padding': '2px' }"
              >
                Short Activity
              </span>
            </div>

            <KGrid>
              <KGridItem
                :layout12="{ span: 2 }"
                :layout8="{ span: 2 }"
              >
                <div class="">
                  <KIcon icon="schedule" class="icon-size" />
                </div>
              </KGridItem>
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
                :layout12="{ span: 2 }"
                :layout8="{ span: 2 }"
              >
                <div class="" style="float:right;">
                  <KIcon icon="download" class="icon-size" />
                </div>
              </KGridItem>
            </KGrid>
          </div>
        </template>
      </kcard>
      <br>
      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="small"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            <KTextTruncator
              text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
              :maxLines="3"
            />
          </div>
        </template>
        <template #aboveTitle>
          <KGrid>

            <KGridItem
              :layout12="{ span: 9 }"
              :layout8="{ span: 7 }"
            >
              <span><KIcon icon="readSolid" class="icon-size" /></span>
              <span
                :style="{ 'color': $themePalette.grey.v_400,
                          'font-size': '1.2em' }"
              >Rutrum pellentesque utrum...</span>
            </KGridItem>

            <KGridItem
              :layout12="{ span: 3 }"
              :layout8="{ span: 1 }"
            >
              <div style="float:right">
                <KIcon icon="infoOutline" class="icon-size" />
              </div>
            </KGridItem>
          </KGrid>
        </template>
        <template #footer>
          <div>
            <div class="footer-top-header">
              <span>
                <KIcon icon="practiceSolid" class="icon-size" />
                Practice
              </span>
              <span
                :style="{ 'background-color': $themePalette.grey.v_100 , 'padding': '2px' }"
              >
                Short Activity
              </span>
            </div>

            <KGrid>
              <KGridItem
                :layout12="{ span: 2 }"
                :layout8="{ span: 2 }"
              >
                <div class="">
                  <KIcon icon="schedule" class="icon-size" />
                </div>
              </KGridItem>
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
                :layout12="{ span: 2 }"
                :layout8="{ span: 2 }"
              >
                <div class="" style="float:right;">
                  <KIcon icon="download" class="icon-size" />
                </div>
              </KGridItem>
            </KGrid>
          </div>
        </template>
      </kcard>

      <br>
      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="none"
      >
        <template #title>
          <div>
            <KTextTruncator
              text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <KGrid>

            <KGridItem
              :layout12="{ span: 8 }"
              :layout8="{ span: 6 }"
            >
              <span><KIcon icon="readSolid" class="icon-size" /></span>
              <span
                :style="{ 'color': $themePalette.grey.v_400,
                          'font-size': '1.2em' }"
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
        <template #footer>
          <div>
            <div class="footer-top-header">
              <span>
                <KIcon icon="practiceSolid" class="icon-size" />
                Practice
              </span>
              <span
                :style="{ 'background-color': $themePalette.grey.v_100 , 'padding': '2px' }"
              >
                Short Activity
              </span>
            </div>

            <KGrid>
              <KGridItem
                :layout12="{ span: 2 }"
                :layout8="{ span: 2 }"
              >
                <div class="">
                  <KIcon icon="schedule" class="icon-size" />
                </div>
              </KGridItem>
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
                :layout12="{ span: 2 }"
                :layout8="{ span: 2 }"
              >
                <div class="" style="float:right;">
                  <KIcon icon="download" class="icon-size" />
                </div>
              </KGridItem>
            </KGrid>
          </div>
        </template>
      </kcard>
    </ul>
  </div>

</template>


<script>

  import KCard from './../../lib/KCard';
  /*
      Playground is a Vue component too,
      so you can also use `data`, `methods`, etc.
      as usual if helpful
    */
  export default {
    name: 'Playground',
    components: {
      KCard,
    },
    data() {
      return {};
    },
    methods: {},
  };

</script>

<style scoped>
.footer-top-header{
  display: flex;
  font-size: 14px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.footer-top-header span{
  margin-right: 30px;
}
.icon-size{
  font-size:20px;
}
.icon{
  font-size:20px;
  margin-left: 300px;
}

</style>
