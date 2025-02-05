<template>

  <div
    v-show="showSingleItem || crumbs.length > 1"
    :class="{ 'breadcrumbs-collapsed': collapsedCrumbs.length }"
  >
    <nav
      class="breadcrumbs"
      v-bind="$attrs"
      :aria-label="$attrs.ariaLabel"
    >
      <div
        v-show="collapsedCrumbs.length"
        class="breadcrumbs-dropdown-wrapper"
      >
        <KIconButton
          size="small"
          :icon="showDropdown ? 'chevronUp' : 'chevronDown'"
          appearance="raised-button"
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
                v-if="crumb.link"
                class="krouter-item"
                :text="crumb.text"
                :to="crumb.link"
              >
                <template #text="{ text }">
                  <span
                    class="breadcrumbs-crumb-text"
                    dir="auto"
                  >{{ text }}</span>
                </template>
              </KRouterLink>
              <span
                v-else
                dir="auto"
              >{{ crumb.text }}</span>
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
              v-if="crumb.link"
              :text="crumb.text"
              :to="crumb.link"
              dir="auto"
              :title="crumb.text"
            >
              <template #text="{ text }">
                <span
                  class="breadcrumbs-crumb-text"
                  :title="text"
                >{{ text }}</span>
              </template>
            </KRouterLink>
            <span
              v-else
              :title="crumb.text"
            >{{ crumb.text }}</span>
          </li>

          <li
            v-else
            :key="index"
            class="breadcrumb-visible-item-last breadcrumbs-visible-item"
          >
            <span
              class="breadcrumbs-crumb-text"
              :style="{ maxWidth: lastBreadcrumbMaxWidth }"
              dir="auto"
              :title="crumb.text"
            >
              {{ crumb.text }}
            </span>
          </li>
        </template>
      </ol>
    </nav>

    <!-- This is a duplicate of breacrumbs-visible-items to help to reference sizes. -->
    <div
      class="breadcrumbs breadcrumbs-offscreen"
      aria-hidden="true"
    >
      <ol class="breadcrumbs-visible-items">
        <template v-for="(crumb, index) in crumbs">
          <li
            v-if="index !== crumbs.length - 1"
            :ref="`crumb${index}`"
            :key="index"
            class="breadcrumbs-visible-item breadcrumbs-visible-item-notlast"
          >
            <KRouterLink
              v-if="crumb.link"
              :text="crumb.text"
              :to="crumb.link"
              tabindex="-1"
            >
              <template #text="{ text }">
                <span class="breadcrumbs-crumb-text">{{ text }}</span>
              </template>
            </KRouterLink>
            <span v-else>{{ crumb.text }}</span>
          </li>

          <li
            v-else
            :ref="`crumb${index}`"
            :key="index"
            class="breadcrumb-visible-item-last breadcrumbs-visible-item"
          >
            <span
              class="breadcrumbs-crumb-text"
              :style="{ maxWidth: lastBreadcrumbMaxWidth }"
            >
              {{ crumb.text }}
            </span>
          </li>
        </template>
      </ol>
    </div>
  </div>

</template>


<script>

  import filter from 'lodash/filter';
  import startsWith from 'lodash/startsWith';
  import throttle from 'lodash/throttle';
  import every from 'lodash/every';
  import keys from 'lodash/keys';
  import useKResponsiveElement from './composables/useKResponsiveElement';

  const DROPDOWN_BTN_WIDTH = 55;
  const DEFAULT_LAST_BREADCRUMB_MAX_WIDTH = 300;

  function validateLinkObject(object) {
    const validKeys = ['name', 'path', 'params', 'query'];
    return every(keys(object), key => validKeys.includes(key));
  }

  /**
   * Used to aid deeply nested navigation of content channels, topics, and resources
   */
  export default {
    name: 'KBreadcrumbs',
    inheritAttrs: false,
    setup() {
      const { elementWidth } = useKResponsiveElement();
      return { elementWidth };
    },
    props: {
      /**
       * An array of objects, each with a `text` attribute (String) and a
       * `link` attribute (vue router link object). The `link` attribute
       * of the last item in the array is optional and ignored. The `link`
       * attribute can be set to `null` which will render the breadcrumb only
       * as text, regardless of its position in the breadcrumb.
       */
      items: {
        type: Array,
        required: true,
        validator(crumbItems) {
          // All must have text
          if (!crumbItems.every(crumb => Boolean(crumb.text))) {
            return false;
          }
          // If link is truthy make sure it is a valid router link
          return crumbItems.every(crumb => !crumb.link || validateLinkObject(crumb.link));
        },
      },
      /**
       * By default, the breadcrums will be hidden when the length of items is 1.
       * When set to `true`, a breadcrumb will be shown even when there is only one.
       */
      showSingleItem: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      // Array of crumb objects.
      // Each object contains:
      // text, router-link 'to' object, vue ref, and its collapsed state
      crumbs: [],
      showDropdown: false,
      lastBreadcrumbMaxWidth: `${DEFAULT_LAST_BREADCRUMB_MAX_WIDTH}px`,
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
        this.attachRefs();
      },
    },
    created() {
      this.crumbs = Array.from(this.items);
    },
    mounted() {
      this.attachRefs();
      // The throttled update function is defined here and not as a method on purpose
      // since having it defined as a method on the options object would cause problems
      // when there are more KBreadcrumbs instances rendered on one page.
      // In such a scenario, all instances would share the same throttled function
      // resulting in some instances not being updated when they should be.
      // This is happening because of how the Vue component constructor and instances are built.
      // Having it defined in the context of the `mounted` function ensures that each component
      // instance will have its own throttled update function.
      const throttledUpdateCrumbs = throttle(this.updateCrumbs, 100);
      this.$watch('parentWidth', throttledUpdateCrumbs);
    },
    methods: {
      attachRefs() {
        this.$nextTick(() => {
          const crumbRefs = filter(this.$refs, (value, key) => startsWith(key, 'crumb'));
          this.crumbs = this.crumbs.map((crumb, index) => {
            const updatedCrumb = crumb;
            updatedCrumb.ref = crumbRefs[index];
            return updatedCrumb;
          });
          this.updateCrumbs();
        });
      },
      updateCrumbs() {
        if (this.crumbs.length) {
          // needs to be reset before another re-calculation
          // otherwise calculactions below won't be precise
          this.lastBreadcrumbMaxWidth = `${DEFAULT_LAST_BREADCRUMB_MAX_WIDTH}px`;

          this.$nextTick(() => {
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
                tempCrumbs[tempCrumbs.length - 1].ref[0].getBoundingClientRect().width,
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

            // Allow the last breadcrumb use all space available
            // Fixes https://github.com/learningequality/kolibri-design-system/issues/198
            // and https://github.com/learningequality/kolibri/issues/6918
            if (remainingWidth > 0) {
              this.lastBreadcrumbMaxWidth = `${
                DEFAULT_LAST_BREADCRUMB_MAX_WIDTH + remainingWidth
              }px`;
            }
          });
        }
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import './styles/definitions';
  $crumb-max-width: 300px;

  .breadcrumbs {
    height: 32px;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
    white-space: nowrap;
  }

  .breadcrumbs-crumb-text {
    display: inline-block;
    width: 100%;
    max-width: $crumb-max-width;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }

  .breadcrumbs-dropdown-wrapper {
    display: inline-block;

    &::after {
      margin-right: 8px;
      margin-left: 8px;
      content: '›';
    }
  }

  .breadcrumbs-dropdown {
    @extend %dropshadow-2dp;

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
    list-style: none;

    .breadcrumbs-collapsed & {
      // account for dropdown button width
      width: calc(100% - 55px);
    }
  }

  .breadcrumbs-visible-item {
    display: inline-block;
    max-width: 100%;
  }

  .breadcrumbs-visible-item-notlast {
    &::after {
      margin-right: 8px;
      margin-left: 8px;
      content: '›';
    }
  }

  .breadcrumbs-offscreen {
    position: absolute;
    left: -1000em;
  }

</style>
