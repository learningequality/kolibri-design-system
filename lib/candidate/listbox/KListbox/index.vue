<template>

  <div class="k-listbox">
    <p
      :id="ariaDescribedById"
      class="visuallyhidden"
    >
      {{ messages.clickable }}
    </p>

    <!--
      .self prevents the div click from firing when the slotted
      checkbox is clicked (otherwise click would cause double-toggle, resulting in no change))
    -->
    <div
      v-if="$scopedSlots.selectAll"
      class="k-listbox-select-all"
      :class="$computedClass(selectAllStyles)"
      :style="{ backgroundColor: $themeTokens.surface }"
      @click.self="changeSelectAll(!allSelected)"
    >
      <!-- @slot Scoped slot for implementing select all functionality -->
      <slot
        name="selectAll"
        :allSelected="allSelected"
        :someSelected="someSelected"
        :toggle="changeSelectAll"
      ></slot>
    </div>

    <ul
      v-show="hasOptions"
      :id="id"
      ref="listEl"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledBy"
      class="k-listbox-list"
      tabindex="0"
      role="listbox"
      data-focus="true"
      aria-multiselectable="true"
      :style="{ outline: 'none' }"
      :aria-describedby="ariaDescribedById"
      :aria-activedescendant="focusedOptionId || undefined"
      @focus="onListFocus"
      @blur="onListBlur"
      @mousedown="onListMousedown"
      @keydown="onListKeydown"
    >
      <!-- @slot For `KListboxOption`(s) -->
      <slot></slot>
    </ul>
  </div>

</template>


<script>

  import { ref, computed, provide, getCurrentInstance, onMounted, nextTick } from 'vue';
  import uniq from 'lodash/uniq';
  import useKLiveRegion from '../../../composables/useKLiveRegion';
  import useNextTickOnce from '../../../composables/useNextTickOnce';
  import { themePalette } from '../../../styles/theme';

  /**
   * Representation of the APG listbox pattern
   * with several additional enhancements
   */
  export default {
    name: 'KListbox',
    setup(props, { emit }) {
      if (!props.ariaLabel && !props.ariaLabelledBy) {
        // eslint-disable-next-line no-console
        console.warn(`[KListbox] Missing 'ariaLabel' or 'ariaLabelledBy'.`);
      }

      const { sendPoliteMessage } = useKLiveRegion();
      const instance = getCurrentInstance();
      const ariaDescribedById = `${props.id}-description`;
      const options = ref([]);
      const focusedValue = ref(null);
      const isKeyboardFocus = ref(false);
      const listEl = ref(null);

      const hasOptions = computed(() => options.value.length > 0);

      // Registration API (consumed by KListboxOption via inject)
      const { once: onceSort } = useNextTickOnce();

      function registerOption(option) {
        options.value.push(option);
        // After an option mounts, reorder options state to match DOM order
        // so that keyboard navigation and focus behave as expected
        onceSort(() => {
          // just in case the tick runs after the listbox unmounted
          if (!listEl.value) return;
          const orderedIds = Array.from(listEl.value.querySelectorAll('[role="option"]')).map(
            el => el.id,
          );
          options.value.sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));
        });
      }

      function unregisterOption(option) {
        options.value = options.value.filter(o => o.id !== option.id);
        if (focusedValue.value === option.value) {
          focusedValue.value = null;
        }
      }

      function isSelected(value) {
        return props.value.includes(value);
      }

      function emitInput(newValue) {
        emit('input', newValue);
      }

      function toggleOption(value) {
        if (isSelected(value)) {
          emitInput(props.value.filter(v => v !== value));
          sendPoliteMessage(props.messages.optionDeselected);
        } else {
          emitInput([...props.value, value]);
        }

        if (focusedValue.value !== value) {
          setFocus(value);
        }
      }

      function selectAllOptions() {
        // Options may be dynamic, e.g. when KListbox used with a filter
        // or pagination => preserve selections outside the visible options
        // by merging previously selected values with all visible options
        const allValues = uniq([...props.value, ...options.value.map(o => o.value)]);
        emitInput(allValues);
        sendPoliteMessage(props.messages.allOptionsSelected);
      }

      function deselectAllOptions() {
        // Options may be dynamic, e.g. when KListbox used with a filter
        // or pagination => preserve selections outside the visible
        // options by removing only values for currently visible options
        const optionValues = new Set(options.value.map(o => o.value));
        const remainingValues = props.value.filter(v => !optionValues.has(v));
        emitInput(remainingValues);
        sendPoliteMessage(props.messages.allOptionsDeselected);
      }

      const allSelected = computed(
        () => hasOptions.value && options.value.every(o => isSelected(o.value)),
      );

      const someSelected = computed(
        () => !allSelected.value && options.value.some(o => isSelected(o.value)),
      );

      function changeSelectAll(checked) {
        if (!hasOptions.value) return;
        if (checked) {
          selectAllOptions();
        } else {
          deselectAllOptions();
        }
      }

      const selectAllStyles = computed(() => ({
        ':hover': {
          backgroundColor: hasOptions.value ? themePalette().grey.v_100 : 'transparent',
        },
        cursor: hasOptions.value ? 'pointer' : 'default',
      }));

      const focusedOptionId = computed(() => {
        const focused = options.value.find(o => o.value === focusedValue.value);
        return focused ? focused.id : null;
      });

      function isFocused(value) {
        return focusedValue.value === value;
      }

      function isFocusVisible(value) {
        return focusedValue.value === value && isKeyboardFocus.value;
      }

      function optionValueAt(index) {
        return options.value[index].value;
      }

      function setFocus(value) {
        focusedValue.value = value;
        nextTick(() => {
          const option = options.value.find(o => o.value === value);
          if (!option) return;
          if (instance.proxy.$inputModality === 'keyboard') {
            const optionElement = document.getElementById(option.id);
            if (optionElement) {
              optionElement.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              });
            }
          }
        });
      }

      function moveFocusBy(delta) {
        const optionsCount = options.value.length;
        const currentIndex = options.value.findIndex(o => o.value === focusedValue.value);
        // Modulo to wrap for circular navigation
        const newIndex = (currentIndex + delta + optionsCount) % optionsCount;
        setFocus(optionValueAt(newIndex));
      }

      function onListFocus() {
        if (!hasOptions.value) return;
        // Don't override focus when an option was clicked directly with mouse
        if (focusedValue.value !== null) return;
        isKeyboardFocus.value = instance.proxy.$inputModality === 'keyboard';
        // Focus the first selected option if any, otherwise the first available one
        const firstSelected = options.value.find(o => isSelected(o.value));
        if (firstSelected) {
          setFocus(firstSelected.value);
        } else {
          setFocus(optionValueAt(0));
        }
      }

      function onListBlur() {
        focusedValue.value = null;
        isKeyboardFocus.value = false;
      }

      function onListMousedown() {
        isKeyboardFocus.value = false;
      }

      function onListKeydown(event) {
        isKeyboardFocus.value = true;
        if (!hasOptions.value) return;
        const { key } = event;

        switch (key) {
          case 'ArrowDown':
            moveFocusBy(1);
            break;
          case 'ArrowUp':
            moveFocusBy(-1);
            break;
          case 'Home':
            setFocus(optionValueAt(0));
            break;
          case 'End':
            setFocus(optionValueAt(options.value.length - 1));
            break;
          case ' ':
            toggleOption(focusedValue.value);
            break;
          // Ctrl + A for select all
          case 'a':
          case 'A':
            if (!event.ctrlKey && !event.metaKey) {
              return;
            }
            if (allSelected.value) {
              deselectAllOptions();
            } else {
              selectAllOptions();
            }
            break;
          default:
            // Early return for unsupported keys so that
            // we don't prevent default behavior
            return;
        }

        event.preventDefault();
      }

      provide('klistbox', {
        registerOption,
        unregisterOption,
        isSelected,
        isFocused,
        isFocusVisible,
        toggleOption,
      });

      onMounted(() => {
        // Warn if any KListboxOption is not a direct child of the listbox element
        if (process.env.NODE_ENV !== 'production') {
          const hasIndirectOptions = Array.from(
            listEl.value.querySelectorAll('[role="option"]'),
          ).some(el => el.parentElement !== listEl.value);
          if (hasIndirectOptions) {
            // eslint-disable-next-line no-console
            console.warn('[KListbox] KListboxOption must be a direct child of KListbox.');
          }
        }
      });

      return {
        listEl,
        hasOptions,
        ariaDescribedById,
        focusedOptionId,
        allSelected,
        someSelected,
        selectAllStyles,
        changeSelectAll,
        onListFocus,
        onListBlur,
        onListMousedown,
        onListKeydown,
      };
    },
    props: {
      /**
       * Unique listbox ID
       */
      id: {
        type: String,
        required: true,
      },
      /**
       * Array of currently selected option values
       */
      value: {
        type: Array,
        required: true,
      },
      /**
       * Accessible label for the listbox. Provide either this or `ariaLabelledBy`.
       */
      ariaLabel: {
        type: String,
        default: null,
      },
      /**
       * ID of an element that labels the listbox. Provide either this or `ariaLabel`.
       */
      ariaLabelledBy: {
        type: String,
        default: null,
      },
      /**
       * Localized strings
       */
      messages: {
        type: Object,
        required: true,
        validator(messages) {
          const requiredKeys = [
            'clickable',
            'allOptionsSelected',
            'allOptionsDeselected',
            'optionDeselected',
          ];
          const missing = requiredKeys.filter(
            key => typeof messages[key] !== 'string' || messages[key].length === 0,
          );
          if (missing.length) {
            // eslint-disable-next-line no-console
            console.warn(
              `[KListbox] 'messages' prop is missing required string keys: ${missing.join(', ')}`,
            );
            return false;
          }
          return true;
        },
      },
    },
  };

</script>


<style lang="scss" scoped>

  .k-listbox {
    // Flex column makes .k-listbox-list its own independent scroll
    // container, keeping the select-all row outside the scrollable area.
    // The alternative approach with sticky positioning results in worse
    // experience: (1) when the first selected option is already in view,
    // tabbing into the listbox unnecessarily scrolls the selected option to the
    // top and pushes the preceding options behind the header; (2) the vertical
    // scrollbar spans over the select all row, which doesn't correspond to
    // the actual scroll behavior where only the list options scroll
    display: flex;
    flex-direction: column;
  }

  .k-listbox-select-all {
    display: flex;
    align-items: center;
  }

  .k-listbox-list {
    padding: 0;
    margin: 0;
    overflow: auto;
    list-style: none;
  }

</style>
