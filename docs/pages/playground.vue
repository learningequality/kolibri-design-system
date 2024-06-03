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

    <ul style="width:40%;">

      <KCard
        :to="{ name: '/' }"
        layout="vertical"
        thumbnailDisplay="none"
        :headingLevel="2"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            Sample text in the title slot
          </div>
        </template>
        <template #aboveTitle>
          <div>
            This is a sample above title slot text that can cover more that 3 lines
          </div>
        </template>
        <template #footer>

          <div>
            This is a sample footer section for the kcard
          </div>

        </template>
      </KCard>

      <KCard
        :to="{ name: '/' }"
        layout="vertical"
        thumbnailDisplay="small"
        :headingLevel="2"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            Sample text in the title slot
          </div>
        </template>
        <template #aboveTitle>
          <div>
            This is a sample above title slot text that can cover more that 3 lines
          </div>
        </template>
        <template #footer>

          <div>
            This is a sample footer section for the kcard
          </div>

        </template>
      </KCard>

      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        title="Sampling title"
        layout="vertical"
        thumbnailDisplay="large"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            Sample text in the title slot
          </div>
        </template>
        <template #aboveTitle>
          <div>
            This is a sample above title slot text that can cover more that 3 lines
          </div>
        </template>
        <template #footer>

          <div>
            This is a sample footer section for the kcard
          </div>

        </template>
      </KCard>

    </ul>

    <h4>Horizontal layout</h4>
    <ul style="width:60%;">

      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        title="Sampling title"
        layout="horizontal"
        thumbnailDisplay="none"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            Sample text in the title slot
          </div>
        </template>
        <template #aboveTitle>
          <div>
            This is a sample above title slot text that can cover more that 3 lines
          </div>
        </template>
        <template #footer>

          <div>
            This is a sample footer section for the kcard
          </div>

        </template>
      </KCard>

      <KCard
        :to="{ name: '/' }"
        :headingLevel="2"
        title="Sampling title"
        layout="horizontal"
        thumbnailDisplay="small"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            Sample text in the title slot
          </div>
        </template>
        <template #aboveTitle>
          <div>
            This is a sample above title slot text that can cover more that 3 lines in the kcard
          </div>
        </template>
        <template #footer>
          <div>
            This is a sample footer section for the kcard
          </div>
        </template>
      </KCard>


      <KCard
        :to="{ name: '/' }"
        layout="horizontal"
        thumbnailDisplay="large"
        :headingLevel="2"
        :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
      >
        <template #title>
          <div>
            Sample text in the title slot
          </div>
        </template>
        <template #aboveTitle>
          <div>
            This is a sample above title slot text that can cover more that 3 lines in the kcard
          </div>
        </template>
        <template #footer>
          <div>
            This is a sample footer section for the kcard
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
