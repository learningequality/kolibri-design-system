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

    <ul style="width:30%;">

      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="none"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            <KTextTruncator
              text="The Philosophy of Rick and Morty and the meaning of All life"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <div>
            Rutrum pellentesque utrum...
          </div>
        </template>
        <template #footer>
          <div>
            <div class="footer-top-header">
              <span> <KIcon icon="quiz" /> Practice</span>
              <span>Short Activity</span>
            </div>
            <br>
            <div class="footer-top-header">
              <span>
                <progress class="" value="50" max="100"></progress>
              </span>
              <span>
                <KIcon icon="schedule" class="icon-size" />
              </span>
              <span>
                <KIcon icon="download" class="icon-size" />
              </span>
            </div>
          </div>
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
              text="The Philosophy of Rick and Morty and the meaning of All life"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <div>
            Rutrum pellentesque utrum...
          </div>
        </template>
        <template #footer>
          <div>
            <div class="footer-top-header">
              <span> <KIcon icon="quiz" /> Practice</span>
              <span>Short Activity</span>
            </div>
            <br>
            <div class="footer-top-header">
              <span>
                <progress class="" value="50" max="100"></progress>
              </span>
              <span>
                <KIcon icon="schedule" class="icon-size" />
              </span>
              <span>
                <KIcon icon="download" class="icon-size" />
              </span>
            </div>
          </div>
        </template>
      </KCard>

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
              text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes to t..."
              :maxLines="3"
            />
          </div>
        </template>
        <template #aboveTitle>
          <div>
            <span> <KIcon icon="coachContent" /> </span>
            Rutrum pellentesque utrum...
          </div>
        </template>
        <template #footer>
          <div>
            <span> <KIcon icon="createSolid" /> </span>
            <span>Short Activity</span>

            <br>
            <div class="footer-top-header">
              <span>
                <progress class="" value="50" max="100"></progress>
              </span>
              <span>
                <KIcon icon="schedule" class="icon-size" />
              </span>
              <span>
                <KIcon icon="download" class="icon-size" />
              </span>
            </div>
          </div>
        </template>
      </KCard>

    </ul>

    <h4>Horizontal layout</h4>
    <ul style="width:30%;">
      <br>
      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        layout="horizontal"
        thumbnailDisplay="none"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            <KTextTruncator
              text="The Philosophy of Rick and Morty and the meaning of All life"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <div>
            Rutrum pellentesque utrum...
          </div>
        </template>
        <template #footer>
          <div>
            <div class="footer-top-header">
              <span> <KIcon icon="quiz" /> Practice</span>
              <span>Short Activity</span>
            </div>
            <br>
            <div class="footer-top-header">
              <span>
                <progress class="" value="50" max="100"></progress>
              </span>
              <span>
                <KIcon icon="schedule" class="icon-size" />
              </span>
              <span>
                <KIcon icon="download" class="icon-size" />
              </span>
            </div>
          </div>
        </template>
      </KCard>

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
              text="The Philosophy of Rick and Morty and the meaning of All life The Philosophy of Rick and Morty and the meaning of All life"
              :maxLines="3"
            />
          </div>
        </template>
        <template #aboveTitle>
          <div>
            Rutrum pellentesque utrum...
          </div>
        </template>
        <template #footer>
          <div>
            <div class="footer-top-header">
              <span>
                <progress class="" value="50" max="100"></progress>
              </span>
              <span>
                <KIcon icon="schedule" class="icon-size" />
              </span>
              <span>
                <KIcon icon="download" class="icon-size" />
              </span>
            </div>
          </div>
        </template>
      </KCard>

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
              text="The Philosophy of Rick and Morty and the meaning of All life"
              :maxLines="2"
            />
          </div>
        </template>
        <template #aboveTitle>
          <div>
            Rutrum pellentesque utrum...
          </div>
        </template>
        <template #footer>
          <div>
            <div class="footer-top-header">
              <span> <KIcon icon="optionsVertical" /> Practice</span>
              <span>Short Activity</span>
            </div>
            <br>
            <div class="footer-top-header">
              <span>
                <progress class="" value="50" max="100"></progress>
              </span>
              <span>
                <KIcon icon="schedule" class="icon-size" />
              </span>
              <span>
                <KIcon icon="download" class="icon-size" />
              </span>
            </div>
          </div>
        </template>
      </KCard>
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
  display: inline-flex;
  font-size: 14px;
}

.footer-top-header span{
  margin-right: 20px;
}
.icon-size{
  font-size:20px;
}
</style>
