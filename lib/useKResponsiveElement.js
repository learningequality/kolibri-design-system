import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import { onMounted, onUnmounted, ref, getCurrentInstance } from '@vue/composition-api';

export default function useKResponsiveElement() {
  const elementWidth = ref(0);
  const elementHeight = ref(0);
  const instance = getCurrentInstance();

  let _resizeSensor;

  function updateEl() {
    const { $el } = instance.proxy || {};
    const { clientHeight, clientWidth } = $el || {};
    elementWidth.value = clientWidth || 0;
    elementHeight.value = clientHeight || 0;
  };

  onMounted(() => {
    updateEl();
    _resizeSensor = new ResizeSensor(instance.proxy.$el, updateEl);
  });

  onUnmounted(() => {
    if (!_resizeSensor) {
      return;
    }
    _resizeSensor.detach(instance.proxy.$el, updateEl);
  });

  return {
    elementWidth,
    elementHeight,
  };
};
