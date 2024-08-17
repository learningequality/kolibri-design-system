<template>

  <div class="k-radio-button-group">
    <!-- @slot To render the KRadioButtons -->
    <slot></slot>
  </div>

</template>


<script>

  export default {
    name: 'KRadioButtonGroup',
    data() {
      return {
        radioButtons: [],
        focusedRadioIdx: 0,
        firstRadioIdx: 0,
        lastRadioIdx: 0,
        radioBtnIdx: 0,
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
       * @param {Array<object>} children - An array of objects where each object represents a child component of KRadioButtonGroup.
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
        let newFocusedRadioIdx =
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
