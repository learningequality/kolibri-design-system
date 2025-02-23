<template>

  <nav class="breadcrumbs">
    <KListWithOverflow
      overflowDirection="start"
      :items="preparedCrumbs"
    >
      <!-- Render individual breadcrumb items -->
      <template #item="{ item, index }">
        <li 
          ref="breadcrumbItems"
          :style="{ maxWidth: index === preparedCrumbs.length - 1 ? 
            lastBreadcrumbMaxWidth : 'none' }" 
        >
          <KRouterLink
            v-if="item.link && index !== preparedCrumbs.length  - 1"
            :text="item.text"
            :to="item.link"
            dir="auto"
            :title="item.text"
          >
            <template #default="{ text }">
              <span
                class="breadcrumbs-crumb-text"
                :style="{ maxWidth: index === preparedCrumbs.length - 1 ? 
                  lastBreadcrumbMaxWidth : 'none' }"
                dir="auto"
                :title="text"
              >{{ text }}</span>
            </template>
          </KRouterLink>
          <span
            v-else
            :ref="getBreadcrumbRef(index)"
            class="breadcrumbs-crumb-text"
            :style="{ maxWidth: getBreadcrumbRef(index) ? lastBreadcrumbMaxWidth : 'none' }"
            dir="auto"
            :title="item.text"
          >{{ item.text }}</span>
        </li>
      </template>

      <template #divider>
        <span
          :style="{ color: $themeTokens.text }"
          class="breadcrumbs-divider"
        >›
        </span>
      </template>

      <template #more="{ overflowItems }">
        <div style="display: flex; align-items: center; gap:4px">
          <KIconButton
            size="small"
            icon="chevronDown"
            appearance="raised-button"
          >
            <template #menu>
              <KDropdownMenu
                :options="
                  overflowItems
                    .filter(item => item.type !== 'divider')
                    .map(item => ({
                      label: item.text,
                      link: item.link ? item.link : null,
                    }))
                "
              >
                <template #option="{ option }">
                  <template v-if="option.link">
                    <a
                      :href="option.link"
                      :style="{ color: $themeTokens.primary }"
                      class="dropdown-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ option.label }}
                    </a>
                  </template>
                  <template v-else>
                    <span
                      :style="{ color: $themeTokens.text }"
                      class="dropdown-text"
                    >{{ option.label }}</span>
                  </template>
                </template>
              </KDropdownMenu>
            </template>
          </KIconButton>
          <span
            :style="{ color: $themeTokens.text }"
            class="breadcrumbs-divider"
          >›
          </span>
        </div>
      </template>
    </KListWithOverflow>
  </nav>

</template>


<script>

  const DEFAULT_LAST_BREADCRUMB_MAX_WIDTH = 300;
  const DROPDOWN_BTN_WIDTH = 55;
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      showSingleItem: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        lastBreadcrumbMaxWidth: `${DEFAULT_LAST_BREADCRUMB_MAX_WIDTH}px`,
      };
    },

    computed: {
      preparedCrumbs() {
        const crumbs = [...this.items];
        if (!this.showSingleItem && crumbs.length <= 1) {
          return [];
        }
        // Add dividers between items
        return crumbs.flatMap((item, index) => (index > 0 ? [{ type: 'divider' }, item] : [item]));
      },
    },
    mounted() {
      this.updateLastBreadcrumbWidth();
      this.$watch('items', () => {
        this.updateLastBreadcrumbWidth();
      });
    },
    methods: {
      getBreadcrumbRef(index) {
        return index === this.preparedCrumbs.length - 1 ? "lastBreadcrumb" : null;
      },
      updateLastBreadcrumbWidth() {
        this.$nextTick(() => {
          const lastBreadcrumb = this.$refs.lastBreadcrumb?.[0];
          if (lastBreadcrumb) {
            const lastBreadcrumbWidth = lastBreadcrumb.getBoundingClientRect().width;
            const availableWidth = this.$el.offsetWidth - DROPDOWN_BTN_WIDTH;
            this.lastBreadcrumbMaxWidth = `${Math.min(lastBreadcrumbWidth, availableWidth)}px`;
          }
        });
      },
      
    },
  };

</script>


<style scoped lang="scss">

  $crumb-max-width: 300px;

  .breadcrumbs {
    height: 32px;
    margin-top: 8px;
    margin-bottom: 8px;
    overflow: visible;
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

  .breadcrumbs-divider {
    margin-right: 8px;
    margin-left: 8px;
  }

  li {
    position: static;
    display: inline;
    max-width: inherit;
    overflow: hidden;
  }

  .dropdown-link {
    display: inline-block;
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    background-color: transparent;
  }

  .dropdown-text {
    display: inline-block;
    padding: 16px;
    font-size: 16px;
    background-color: transparent;
  }

</style>
