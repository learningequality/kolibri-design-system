<template>

  <div
    v-show="showSingleItem || crumbs.length > 1"
    :class="{'breadcrumbs-collapsed': collapsedCrumbs.length}"
  >
    <nav class="breadcrumbs">
      <div
        v-show="collapsedCrumbs.length"
        class="breadcrumbs-dropdown-wrapper"
      >
        <KIconButton
          size="small"
          :icon="showDropdown ? 'chevronUp' : 'chevronDown'"
          appearance="raised-button"
          :style="{ verticalAlign: 'middle' }"
          @click="showDropdown = !showDropdown"
        />
        <div
          v-if="showDropdown"
          class="breadcrumbs-dropdown"
          :style="{ background: $themeTokens.surface }"
        >
          <ol class="breadcrumbs-dropdown-items">
            <li
              v-for="(crumb, index) in collapsedCrumbs"
              :key="index"
              class="breadcrumbs-dropdown-item"
            >
              <KRouterLink
                class="krouter-item"
                :text="crumb.text"
                :to="crumb.link"
              >
                <template #text="{ text }">
                  <span class="breadcrumbs-crumb-text" dir="auto">{{ text }}</span>
                </template>
              </KRouterLink>
            </li>
          </ol>
        </div>
      </div>

      <ol class="breadcrumbs-visible-items">
        <template v-for="(crumb, index) in crumbs">
          <li
            v-if="index !== crumbs.length - 1"
            v-show="!crumb.collapsed"
            :key="index"
            class="breadcrumbs-visible-item breadcrumbs-visible-item-notlast"
          >
            <KRouterLink
              :text="crumb.text"
              :to="crumb.link"
              dir="auto"
            >
              <template #text="{ text }">
                <span class="breadcrumbs-crumb-text">{{ text }}</span>
              </template>
            </KRouterLink>
          </li>

          <li
            v-else
            :key="index"
            class="breadcrumb-visible-item-last breadcrumbs-visible-item"
          >
            <span
              class="breadcrumbs-crumb-text"
              dir="auto"
            >
              {{ crumb.text }}
            </span>
          </li>
        </template>
      </ol>
    </nav>


    <!-- This is a duplicate of breacrumbs-visible-items to help to reference sizes. -->
    <div class="breadcrumbs breadcrumbs-offscreen" aria-hidden="true">
      <ol class="breadcrumbs-visible-items">
        <template v-for="(crumb, index) in crumbs">
          <li
            v-if="index !== crumbs.length - 1"
            :ref="`crumb${index}`"
            :key="index"
            class="breadcrumbs-visible-item breadcrumbs-visible-item-notlast"
          >
            <KRouterLink :text="crumb.text" :to="crumb.link" tabindex="-1">
              <template #text="{ text }">
                <span class="breadcrumbs-crumb-text">{{ text }}</span>
              </template>
            </KRouterLink>
          </li>

          <li
            v-else
            :ref="`crumb${index}`"
            :key="index"
            class="breadcrumb-visible-item-last breadcrumbs-visible-item"
          >
            <span class="breadcrumbs-crumb-text">
              {{ crumb.text }}
            </span>
          </li>
        </template>
      </ol>
    </div>
  </div>

</template>


<script>

  import ResizeSensor from 'css-element-queries/src/ResizeSensor';
  import filter from 'lodash/filter';
  import startsWith from 'lodash/startsWith';
  import throttle from 'lodash/throttle';
  import every from 'lodash/every';
  import keys from 'lodash/keys';
  import KResponsiveElementMixin from './KResponsiveElementMixin';

  const DROPDOWN_BTN_WIDTH = 55;

  function validateLinkObject(object) {
    const validKeys = ['name', 'path', 'params', 'query'];
    return every(keys(object), key => validKeys.includes(key));
  }

  /**
   * Used to aid deeply nested navigation of content channels, topics, and resources
   */
  export default {
    name: 'KBreadcrumbs',
    mixins: [KResponsiveElementMixin],
    props: {
      /**
       * An array of objects, each with a 'text' attribute (String) and a
       * 'link' attribute (vue router link object). The 'link' attribute
       * of the last item in the array is optional and ignored.
       */
      items: {
        type: Array,
        required: true,
        validator(crumbItems) {
          // All must have text
          if (!crumbItems.every(crumb => Boolean(crumb.text))) {
            return false;
          }
          // All, but the last, must have a valid router link
          return crumbItems.slice(0, -1).every(crumb => validateLinkObject(crumb.link));
        },
      },
      /**
       * By default, the breadcrums will be hidden when the length of items is 1.
       * When set to 'true', a breadcrumb will be shown even when there is only one.
       */
      showSingleItem: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      // Array of crumb objects.
      // Each object contains:
      // text, router-link 'to' object, vue ref, a resize sensor, and its collapsed state
      crumbs: [],
      showDropdown: false,
    }),
    computed: {
      collapsedCrumbs() {
        return this.crumbs.filter(crumb => crumb.collapsed === true).reverse();
      },
      parentWidth() {
        return this.elementWidth;
      },
    },
    watch: {
      items(val) {
        this.crumbs = Array.from(val);
        this.attachSensors();
      },
    },
    created() {
      this.crumbs = Array.from(this.items);
    },
    mounted() {
      this.attachSensors();
      this.$watch('parentWidth', this.throttleUpdateCrumbs);
    },

    beforeDestroy() {
      this.detachSensors();
    },
    methods: {
      attachSensors() {
        this.$nextTick(() => {
          const crumbRefs = filter(this.$refs, (value, key) => startsWith(key, 'crumb'));
          this.crumbs = this.crumbs.map((crumb, index) => {
            const updatedCrumb = crumb;
            updatedCrumb.ref = crumbRefs[index];
            updatedCrumb.sensor = new ResizeSensor(updatedCrumb.ref, this.throttleUpdateCrumbs);
            return updatedCrumb;
          });
          this.updateCrumbs();
        });
      },
      detachSensors() {
        this.crumbs.forEach(crumb => {
          crumb.sensor.detach(this.throttleUpdateCrumbs);
        });
      },
      updateCrumbs() {
        if (this.crumbs.length) {
          const tempCrumbs = Array.from(this.crumbs);
          let lastCrumbWidth = Math.ceil(tempCrumbs.pop().ref[0].getBoundingClientRect().width);
          let remainingWidth = this.parentWidth - DROPDOWN_BTN_WIDTH - lastCrumbWidth;
          let trackingIndex = this.crumbs.length - 2;

          while (tempCrumbs.length) {
            if (remainingWidth <= 0) {
              tempCrumbs.forEach((crumb, index) => {
                const updatedCrumb = crumb;
                updatedCrumb.collapsed = true;
                this.crumbs.splice(index, 1, updatedCrumb);
              });
              break;
            }

            lastCrumbWidth = Math.ceil(
              tempCrumbs[tempCrumbs.length - 1].ref[0].getBoundingClientRect().width
            );

            if (lastCrumbWidth > remainingWidth) {
              tempCrumbs.forEach((crumb, index) => {
                const updatedCrumb = crumb;
                updatedCrumb.collapsed = true;
                this.crumbs.splice(index, 1, updatedCrumb);
              });
              break;
            }

            remainingWidth -= lastCrumbWidth;
            const lastCrumb = tempCrumbs.pop();
            lastCrumb.collapsed = false;
            this.crumbs.splice(trackingIndex, 1, lastCrumb);
            trackingIndex -= 1;
          }
        }
      },
      throttleUpdateCrumbs: throttle(function updateCrumbs() {
        this.updateCrumbs();
      }, 100),
    },
  };

</script>


<style lang="scss" scoped>

  @import './styles/definitions';
  $crumb-max-width: 300px;

  .breadcrumbs {
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
  }

  .breadcrumbs-crumb-text {
    display: inline-block;
    width: 100%;
    max-width: $crumb-max-width;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .breadcrumbs-dropdown-wrapper {
    display: inline-block;
    vertical-align: middle;

    &::after {
      margin-right: 8px;
      margin-left: 8px;
      vertical-align: middle;
      content: '›';
    }
  }

  .breadcrumbs-dropdown {
    @extend %dropshadow-8dp;

    position: absolute;
    z-index: 8;
    max-width: 100%;
    padding: 16px;
    font-weight: bold;
  }

  .breadcrumbs-dropdown-items {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .breadcrumbs-dropdown-item {
    display: block;
    padding-top: 8px;
    padding-bottom: 8px;

    .krouter-item {
      width: 100%;
    }
  }

  .breadcrumbs-visible-items {
    display: inline-block;
    width: 100%;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    vertical-align: middle;
    list-style: none;

    .breadcrumbs-collapsed & {
      // account for dropdown button width
      width: calc(100% - 55px);
    }
  }

  .breadcrumbs-visible-item {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  .breadcrumbs-visible-item-notlast {
    &::after {
      margin-right: 8px;
      margin-left: 8px;
      vertical-align: middle;
      content: '›';
    }
  }

  .breadcrumbs-offscreen {
    position: absolute;
    left: -1000em;
  }

</style>
