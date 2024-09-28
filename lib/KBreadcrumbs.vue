<template>
  <KListWithOverflow
  overflowDirection="start"
  :items="breadcrumbs"
>
  <template #item="{ item }">
    <li>
      <KRouterLink
        v-if="item.link"
        :text="item.text"
        :to="item.link"
      >
        <template #text="{ text }">
          <span >{{ text }}</span>
        </template>
      </KRouterLink>
      <span v-else>{{ item.text }}</span>
    </li>
  </template>
  <template #more="{ overflowItems }">
    <KIconButton
      size="small"
      icon="chevronUp"
      appearance="raised-button"
    >
      <template #menu>
        <KDropdownMenu
          :options="overflowItems"
        />
      </template>
    </KIconButton>
    <span>
      >
    </span>
  </template>
</KListWithOverflow>
</template>

<script>
import KListWithOverflow from './KListWithOverflow.vue';
import KDropdownMenu from './KDropdownMenu.vue';
export default {
  name: 'KBreadcrumbs',
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  components: {
    KListWithOverflow,
    KDropdownMenu
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown; 
    }
  },
};
</script>


<style  scoped>

.breadcrumbs {
  height: 32px;
  width: auto;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  line-height: 32px;
  white-space: nowrap;
}

.link {
  color: blue;
  padding-left: 10px;
}

.text {
  color: black;
  padding-left: 10px;
}

.icon {
  color: black;
  padding-left: 5;
  padding-right: 5;
}

.more-button {
  color: blue;
  cursor: pointer;
}

.overflowed-items {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 1;
}

</style>
