import { onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue';

let _resizeObserver;

if (typeof window !== 'undefined' && window.ResizeObserver) {
  _resizeObserver = new ResizeObserver(entries => {
    requestAnimationFrame(() => {
      for (const entry of entries) {
        if (entry.target?._resizeListener) {
          entry.target._resizeListener();
        }
      }
    });
  });
}

export default function useKResponsiveElement() {
  const elementWidth = ref(0);
  const elementHeight = ref(0);
  const instance = getCurrentInstance();

  function updateEl() {
    const { $el } = instance.proxy || {};
    const { clientHeight, clientWidth } = $el || {};
    elementWidth.value = clientWidth || 0;
    elementHeight.value = clientHeight || 0;
  }

  onMounted(() => {
    updateEl();
    if (_resizeObserver) {
      instance.proxy.$el._resizeListener = updateEl;

      _resizeObserver.observe(instance.proxy.$el);
    }
  });

  onBeforeUnmount(() => {
    if (_resizeObserver) {
      _resizeObserver.unobserve(instance.proxy.$el);
    }
  });

  return {
    elementWidth,
    elementHeight,
  };
}
