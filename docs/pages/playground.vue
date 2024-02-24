<template>

  <div style="padding: 24px">
    <button>Before</button>
    <div style="border: 2px solid orangered;">
      <KRadioButton
        ref="Radio1"
        v-model="exampleValue"
        label="Option A"
        value="val-a"
        @input="(option) => handleInputChange(0)"
      />
      <KRadioButton
        ref="Radio2"
        v-model="exampleValue"
        label="Option B"
        value="val-b"
        @input="(option) => handleInputChange(1)"
      />
      <KRadioButton
        ref="Radio3"
        v-model="exampleValue"
        label="Option C"
        description="This one is special!"
        buttonValue="val-c"
        @input="(option) => handleInputChange(2)"
      />
      <KRadioButton
        ref="Radio4"
        v-model="exampleValue"
        label="Truncated label. Adjusting your browser window size to see this in action."
        buttonValue="val-d"
        truncateLabel
        :tabindex="-1"
        @input="(option) => handleInputChange(3)"
      />

      <p>
        Current value: {{ exampleValue }}
      </p>
    </div>
    <button>After</button>

  </div>

</template>


<script>

  /*
      Playground is a Vue component too,
      so you can also use `data`, `methods`, etc.
      as usual if helpful
    */
  export default {
    name: 'Playground',
    data() {
      return {
        focusedRadioIdx: 0,
        firstRadioIdx: 0,
        lastRadioIdx: 0,
        radioButtons: [],

        exampleValue: '',
      };
    },
    computed: {
      isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      },
    },
    mounted() {
      // Pust each radio button of a single group into a list
      // then add 'keyup' listener to each radio button
      this.$nextTick(() => {
        // const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (this.isFirefox) {
          for (let ref in this.$refs) {
            if (ref.startsWith('Radio')) {
              const radioComponent = this.$refs[ref];
              this.radioButtons.push(this.$refs[ref]);
              radioComponent.$el.addEventListener('keyup', this.onKeyUp);
              radioComponent.setTabIndex(-1);
            }
          }
          this.lastRadioIdx = this.radioButtons.length - 1;
          this.radioButtons[this.focusedRadioIdx].setTabIndex(0);
        }
      });
    },
    beforeDestroy() {
      // Remove event listeners
      for (let ref in this.$refs) {
        if (ref.startsWith('Radio')) {
          this.$refs[ref].$el.removeEventListener('keyup', this.onKeyUp);
        }
      }
    },
    methods: {
      handleInputChange(idx) {
        // const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (this.isFirefox) {
          this.setChecked(idx);
          this.focusedRadioIdx = idx;
        }
      },
      onKeyUp(event) {
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
        // When we try to go to signInPage's last option & it is disabled then
        // instead change the newFoucusedRadioIdx to the second radio Idx.
        if (this.radioButtons[newFocusedRadioIdx].disabled) {
          newFocusedRadioIdx = this.firstRadioIdx + 1;
        }
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
          const rb = this.radioButtons[i];
          rb.setTabIndex(-1);
        }
        this.radioButtons[radioIdx].setTabIndex(0);
      },
      focusRadio(radioIdx, event) {
        if (radioIdx !== undefined && radioIdx !== null) {
          this.setChecked(radioIdx);
          this.focusedRadioIdx = radioIdx;
          // this.radioButtons[radioIdx].$el.tabIndex = 0;
          this.radioButtons[radioIdx].toggleCheck(event);
        }
      },
    },
  };

</script>
