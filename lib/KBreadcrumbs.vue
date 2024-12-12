<template>

  <div class="breadcrumbs">
    <KListWithOverflow
      overflowDirection="start"
      :items="preparedCrumbs"
    >
      <!-- Render individual breadcrumb items -->
      <template #item="{ item }">
        <li>
          <KRouterLink
            v-if="item.link"
            :text="item.text"
            :to="item.link"
          >

            <template #text="{ text }">
              <span class="breadcrumbs-crumb-text">{{ text }}</span>
            </template>
          </KRouterLink>
          <span v-else>{{ item.text }}</span>
        </li>
      </template>


      <template #divider>
        <span class="breadcrumbs-divider">›</span>
      </template>


      <template #more="{ overflowItems }">
        <KIconButton
          size="small"
          icon="chevronDown"
          appearance="raised-button"
        >
          <template #menu>
            <KDropdownMenu
              :options="overflowItems
                .filter(item => item.type !== 'divider') 
                .map(item => ({
                  label: item.text, 
                  link: item.link ? item.link : null 
                }))"
            >
              <template #option="{ option }">
                <template v-if="option.link">
                  <a :href="option.link" class="dropdown-link" target="_blank" rel="noopener noreferrer">
                    {{ option.label }}
                  </a>
                </template>
                <template v-else>
                  <span class="dropdown-text">{{ option.label }}</span>
                </template>
              </template>
            </KDropdownMenu>
          </template>
        </KIconButton>

      </template>
    </KListWithOverflow>

  </div>

</template>


<script>

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
      console.log('Prepared Crumbs on Mount:', this.preparedCrumbs);
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
    font-weight: bold;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }
  .breadcrumbs-divider {
    margin-right: 8px;
    margin-left: 8px;
    color: #000000;
  }

  li {
    position: static;
    display: inline;
  }
  .dropdown-link {
    display: inline-block;
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
    color: #4368f5;
    text-decoration: underline;
    cursor: pointer;
    background-color: transparent;
  }

  .dropdown-text {
    display: inline-block;
    padding: 16px;
    font-size: 16px;
    color: #000000;
    background-color: transparent;
  }

</style>
