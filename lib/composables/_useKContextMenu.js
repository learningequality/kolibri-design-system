import './composition-api.js'; //Due to @vue/composition-api shortcomings, add plugin prior to use in kolibri, studio and tests

import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
} from '@vue/composition-api';

const activeMenu = ref(null);

export default function useKContextMenu() {
  const clientX = ref(0);
  const clientY = ref(0);

  const instance = getCurrentInstance();
  const id = instance.uid;

  const isActive = computed(() => activeMenu.value === id);

  function showMenu(event) {
    event.preventDefault();
    activeMenu.value = id;
    clientX.value = event.clientX;
    clientY.value = event.clientY;
  }

  function hideMenu() {
    if (activeMenu.value === id) {
      activeMenu.value = null;
    }
  }

  onMounted(() => {
    const parent = instance.proxy.$el.parentElement;
    parent.addEventListener('contextmenu', showMenu);
    window.addEventListener('click', hideMenu);
  });

  onBeforeUnmount(() => {
    const parent = instance.proxy.$el.parentElement;
    if (parent) {
      parent.removeEventListener('contextmenu', showMenu);
    }
    window.removeEventListener('click', hideMenu);
  });

  return {
    clientX,
    clientY,
    isActive,
  };
}
