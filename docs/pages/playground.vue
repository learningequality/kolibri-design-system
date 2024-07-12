<template>

  <div>


    <!-- Play around with your component here: -->
    <!-- <h4>Vertical layout</h4> -->

    <div style="display: flex;flex-direction: row;">
      <div class="item1" style="order:1;position:absolute;padding-left:50px;padding-top:16px;">
        title
      </div>
      <div class="item2" style="order:0;">
        image
      </div>
      <!-- <div class="item3" style="order:1;">
        above title
      </div>
      <div class="item4" style="order:3;">
        below title
      </div>
      <div class="item5" style="order:4;">
        footer
      </div> -->

      <component :is="'div'">
        <div class="item3" style="order:2;">
          above title
        </div>
        <div class="item4" style="order:3;padding-top:10px;">
          below title
        </div>
        <div class="item5" style="order:4;">
          footer
        </div>
      </component>
    </div>


    <div style="padding:12px;width: 460px;">
      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="vertical"
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
      <br>
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
        layout="horizontal"
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
    </div>
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
  order:1;
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
.demo-again{
  display: flex;
  flex-direction: row;
}

.slot-above{
  order:5;
} 
</style>
