<template>

  <div class="k-radio-button-group">
    <slot></slot>
  </div>

</template>

<script>

  export default {
    name: 'KRadioButtonGroup',
    props: {
      enable: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        radioButtons: [],
        focusedRadioIdx: 0,
        firstRadioIdx: 0,
        lastRadioIdx: 0,
      };
    },
    computed: {
      isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      },
    },
    watch: {
      // To focus on the first radio button when radio group enables again
      enable(newVal, oldVal) {
        if (newVal && !oldVal && this.radioButtons.length > 0) {
          this.setChecked(0);
          this.focusedRadioIdx = 0;
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        if (this.isFirefox) {
          this.$children.forEach((radioBtn, index) => {
            this.radioButtons.push(radioBtn);
            radioBtn.$el.addEventListener('keydown', this.onKeyDown);
            radioBtn.setTabIndex(-1);
            radioBtn.$on('input', () => {
              this.handleInputChange(index);
            });
          });
          this.lastRadioIdx = this.radioButtons.length - 1;
          this.radioButtons[this.focusedRadioIdx].setTabIndex(0);
        }
      });
    },
    beforeDestroy() {
      for (let radioBtn in this.radioButtons) {
        radioBtn.$el.removeEventListener('keydown', this.onKeyDown);
      }
    },
    methods: {
      handleInputChange(idx) {
        if (this.isFirefox) {
          this.setChecked(idx);
          this.focusedRadioIdx = idx;
        }
      },
      onKeyDown(event) {
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
          this.setChecked(radioIdx);
          this.focusedRadioIdx = radioIdx;
          this.radioButtons[radioIdx].toggleCheck(event);
        }
      },
    },
  };

</script>
