<template>

  <KCardGrid
    layout="1-1-1"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :headingLevel="4"
      :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
      thumbnailDisplay="large"
      thumbnailAlign="right"
    >
      <template #footer>
        <div class="footer">
          <KIconButton
            ariaLabel="Bookmark resource"
            :icon="isBookmarked ? 'bookmark' : 'bookmarkEmpty'"
            @click.stop="isBookmarked = !isBookmarked"
          />
          <router-link
            :to="{ path: '/kbutton' }"
            :class="['link', linkComputedClass]"
            aria-label="Read more about this resource"
            @click.native.stop
            @keyup.native.capture.stop
          >
            <KIcon
              icon="infoOutline"
              class="link-icon"
            />
          </router-link>
        </div>
      </template>
    </Card>
  </KCardGrid>

</template>


<script>

  import useKResponsiveWindow from '../../lib/composables/useKResponsiveWindow';
  import Card from './Card';

  export default {
    components: {
      Card,
    },
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return { windowBreakpoint };
    },
    props: {
      /**
       * How long in seconds to simulate loading
       * state before displaying cards
       */
      loadFor: {
        type: Number,
        default: 3,
      },
    },
    data() {
      return {
        isBookmarked: false,
        loading: this.loadFor > 0,
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            minHeight: '460px',
          },
          {
            breakpoints: [2],
            minHeight: '390px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailAlign: 'right',
            minHeight: '170px',
          },
        ],
      };
    },
    computed: {
      linkComputedClass() {
        return this.$computedClass({
          ':hover': {
            backgroundColor: 'rgba(0,0,0,.1)',
          },
          ':focus': { ...this.$coreOutline, outlineOffset: 0 },
        });
      },
    },
    mounted() {
      if (this.loadFor > 0) {
        setTimeout(() => {
          this.loading = false;
        }, this.loadFor * 1000);
      }
    },
  };

</script>


<style lang="scss" scoped>

  .footer {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .link-icon {
    width: 24px;
    height: 24px;
  }

</style>
