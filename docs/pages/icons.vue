<template>

  <!-- eslint-disable max-len -->
  <PageTemplate>

    <PageSection title="Overview" anchor="#overview">
      <p>
        Kolibri products uses a large number of icons that have a special meaning within our ecosystem. They generally draw from <ExternalLink text="Material Icons" href="https://material.io/resources/icons/" />, but may also include custom icons.
      </p>
      <p>
        Importantly, we reference icons by a token specific to the Kolibri Design System rather than Material's names, in order to make token references more meaningful to designers and developers.
      </p>
      <p>
        Note that many of these icons also are used with  <InternalLink href="colors" text="conventional colors" />
        in the design system.
      </p>

    </PageSection>

    <PageSection title="UI" anchor="#ui">
      <IconBlock
        v-for="name in ui"
        :key="name"
        :name="name"
        definition
        class="icon-block"
      />
    </PageSection>

    <PageSection title="Features and links" anchor="#features">
      <IconBlock
        v-for="name in features"
        :key="name"
        :name="name"
        definition
        class="icon-block"
      />
    </PageSection>

    <PageSection title="Users" anchor="#users">
      <IconBlock
        v-for="name in users"
        :key="name"
        :name="name"
        definition
        class="icon-block"
      />
    </PageSection>

    <PageSection title="Content" anchor="#content">
      <IconBlock
        v-for="name in content"
        :key="name"
        :name="name"
        definition
        class="icon-block"
      />
    </PageSection>

    <PageSection title="Progress tracking" anchor="#progress">
      <IconBlock
        v-for="name in progressTracking"
        :key="name"
        :name="name"
        definition
        class="icon-block"
      />
    </PageSection>

    <PageSection title="Coaching" anchor="#coaching">
      <IconBlock
        v-for="name in coaching"
        :key="name"
        :name="name"
        definition
        class="icon-block"
      />
    </PageSection>

    <PageSection title="Miscellaneous" anchor="#misc">
      <IconBlock
        v-for="name in misc"
        :key="name"
        :name="name"
        definition
        class="icon-block"
      />
    </PageSection>

  </PageTemplate>
  <!-- eslint-enable max-len -->

</template>


<script>

  import IconBlock from '~/common/IconBlock';

  export default {
    name: 'Icons',
    components: {
      IconBlock,
    },
    computed: {
      ui() {
        return [
          'back',
          'forward',
          'clear',
          'dropdown',
          'language',
          'logout',
          'menu',
          'search',
          'error',
        ];
      },
      features() {
        return ['learn', 'device', 'profile', 'login', 'logout', 'coach', 'facility'];
      },
      progressTracking() {
        return [
          'correct',
          'helpNeeded',
          'hint',
          'incorrect',
          'inProgress',
          'mastered',
          'notStarted',
          'rectified',
        ];
      },
      coaching() {
        return ['coach', 'lesson', 'question', 'quiz'];
      },
      content() {
        return [
          'app',
          'audio',
          'channel',
          'doc',
          'document',
          'exercise',
          'topic',
          'video',
          'html5',
          'slideshow',
          'unlistedchannel',
          'multiple',
          'done',
        ];
      },
      users() {
        return ['classroom', 'group', 'people', 'permission', 'person'];
      },
      misc() {
        return ['dot'];
      },
    },
  };

</script>


<style lang="scss" scoped>

  .icon-block {
    display: inline-block;
    width: 250px;
  }

</style>
