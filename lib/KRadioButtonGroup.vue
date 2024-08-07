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
          this.setChecked(idx);
          this.focusedRadioIdx = idx;
        }
      },
      queryAndAddRadioBtns(children) {
        if (children[0].$options._componentTag === 'KRadioButton') {
          for (let i = 0; i < children.length; i++) {
            const radioBtnVueComp = children[i];
            this.radioButtons.push(radioBtnVueComp);
            radioBtnVueComp.setTabIndex(-1);
            (btnIndex => {
              radioBtnVueComp.$on('input', () => {
                this.handleInputChange(btnIndex);
              });
            })(this.radioBtnIdx);

            this.radioBtnIdx += 1;
          }
          return;
        }
        this.queryAndAddRadioBtns(children[0].$children);
        if (children.length > 1) this.queryAndAddRadioBtns(children[1].$children);
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
        this.focusRadio(newFocusedRadioIdx, event);
      },
      focusNextRadio(event) {
        const newFocusedRadioIdx =
          this.focusedRadioIdx === this.lastRadioIdx
            ? this.firstRadioIdx
            : this.focusedRadioIdx + 1;
        this.focusRadio(newFocusedRadioIdx, event);
      },
      setChecked(radioIdx) {
        for (let i = 0; i < this.radioButtons.length; i++) {
          const radioBtn = this.radioButtons[i];
          radioBtn.setTabIndex(-1);
        }
        this.radioButtons[radioIdx].setTabIndex(0);
      },
      focusRadio(radioIdx, event) {
        if (radioIdx !== undefined && radioIdx !== null) {
          this.radioButtons[radioIdx].toggleCheck(event);
        }
      },
    },
  };

</script>
