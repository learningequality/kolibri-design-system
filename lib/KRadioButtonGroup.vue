<template>

  <div
    class="k-radio-button-group"
    role="radiogroup"
    :aria-readonly="readonly"
  >
    <!-- @slot For `KRadioButton`s -->
    <slot></slot>
  </div>

</template>


<script>

  /**
   * Supposed to wrap a `KRadioButton` group.
   *
   * Ensures radio button groups are accessible
   * in all supported browsers by:
   *   - Allows movement between radio buttons inside
   *     a radio group using arrow keys in Firefox
   *     (https://github.com/learningequality/kolibri/issues/10491)
   */
  export default {
    name: 'KRadioButtonGroup',
    props: {
      /**
       * Prevents changing the selected radio button while keeping the group
       * focusable and enabled-looking. Applies to every `KRadioButton` inside;
       * `disabled` radios stay disabled.
       */
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        radioButtons: [],
        focusedRadioIdx: 0,
        firstRadioIdx: 0,
        lastRadioIdx: 0,
        radioBtnIdx: 0,
      };
    },
    provide() {
      // Getter keeps `readonly` reactive in the injecting radios
      const vm = this;
      return {
        kRadioButtonGroup: {
          get readonly() {
            return vm.readonly;
          },
        },
      };
    },
    computed: {
      isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      },
    },
    mounted() {
      if (!this.isFirefox) {
        return;
      }
      this.$nextTick(() => {
        const KRadioButtonGroupChildren = this.$children;
        this.queryAndAddRadioBtns(KRadioButtonGroupChildren);

        this.$el.addEventListener('keyup', this.onKeyUp);
        this.$el.addEventListener('focusin', this.onFocusIn);

        this.lastRadioIdx = this.radioButtons.length - 1;

        const firstRadioButton = this.radioButtons[this.focusedRadioIdx];
        firstRadioButton.setTabIndex(0);
      });
    },

    methods: {
      handleInputChange(idx) {
        if (this.isFirefox) {
          this.focusRadio(idx);
          this.focusedRadioIdx = idx;
        }
      },
      /**
       * Recursively traverses the children of KRadioButtonGroup to find KRadioButton components.
       * Sets a tabIndex attribute on each KRadioButton and adds it to an array to enable navigation
       * between radio buttons using arrow keys in Firefox Browser.
       *
       * @param {Array<object>} children - An array of objects where each object represents a child
       * component of KRadioButtonGroup.
       * @returns {void}
       */
      queryAndAddRadioBtns(children) {
        for (const child of children) {
          if (child.$options._componentTag === 'KRadioButton') {
            const radioBtnVueComp = child;
            this.radioButtons.push(radioBtnVueComp);
            radioBtnVueComp.setTabIndex(-1);
            (btnIndex => {
              radioBtnVueComp.$on('input', () => {
                this.handleInputChange(btnIndex);
              });
            })(this.radioBtnIdx);
            this.radioBtnIdx += 1;
          } else if (child.$children && Array.isArray(child.$children)) {
            this.queryAndAddRadioBtns(child.$children);
          }
        }
        return;
      },
      // Readonly radios emit no `input`, so also move the tab stop on focus
      onFocusIn(event) {
        if (!this.readonly) {
          return;
        }
        const idx = this.radioButtons.findIndex(radioBtn => radioBtn.$refs.input === event.target);
        if (idx !== -1 && idx !== this.focusedRadioIdx) {
          this.handleInputChange(idx);
        }
      },
      onKeyUp(event) {
        if (event.target.className === 'k-radio-button-input') {
          const handlers = {
            ArrowLeft: this.focusPreviousRadio,
            ArrowRight: this.focusNextRadio,
            ArrowUp: this.focusPreviousRadio,
            ArrowDown: this.focusNextRadio,
          };
          const handler = handlers[event.key];
          if (handler) {
            event.preventDefault();
            event.stopPropagation();
            handler(event);
          }
        }
      },
      focusPreviousRadio(event) {
        const newFocusedRadioIdx =
          this.focusedRadioIdx === this.firstRadioIdx
            ? this.lastRadioIdx
            : this.focusedRadioIdx - 1;
        this.setChecked(newFocusedRadioIdx, event);
      },
      focusNextRadio(event) {
        const newFocusedRadioIdx =
          this.focusedRadioIdx === this.lastRadioIdx
            ? this.firstRadioIdx
            : this.focusedRadioIdx + 1;
        this.setChecked(newFocusedRadioIdx, event);
      },
      focusRadio(radioIdx) {
        for (let i = 0; i < this.radioButtons.length; i++) {
          const radioBtn = this.radioButtons[i];
          radioBtn.setTabIndex(-1);
        }
        this.radioButtons[radioIdx].setTabIndex(0);
      },
      setChecked(radioIdx, event) {
        if (radioIdx !== undefined && radioIdx !== null) {
          this.radioButtons[radioIdx].toggleCheck(event);
        }
      },
    },
  };

</script>
