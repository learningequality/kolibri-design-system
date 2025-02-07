<template>

  <!--
    Vendored from https://github.com/RobinCK/vue-popper/
    pending
    https://github.com/RobinCK/vue-popper/pull/73

    LE customizations
     - Allow for appending to a chosen element rather than to body,
       typically to the overlay container element #k-overlay.
       'appendToBody' prop changedto 'appendToEl' and related changes.
  -->

  <span>
    <transition
      :name="transition"
      :enterActiveClass="enterActiveClass"
      :leaveActiveClass="leaveActiveClass"
      @after-leave="doDestroy"
    >
      <span
        v-show="!disabled && showPopper"
        ref="popper"
      >
        <slot>{{ content }}</slot>
      </span>
    </transition>
    <slot name="reference"></slot>
  </span>

</template>


<script>

  import Popper from 'popper.js';

  function on(element, event, handler) {
    if (element && event && handler) {
      document.addEventListener
        ? element.addEventListener(event, handler, false)
        : element.attachEvent('on' + event, handler);
    }
  }

  function off(element, event, handler) {
    if (element && event) {
      document.removeEventListener
        ? element.removeEventListener(event, handler, false)
        : element.detachEvent('on' + event, handler);
    }
  }

  export default {
    name: 'Popper',
    props: {
      trigger: {
        type: String,
        default: 'hover',
        validator: value => ['click', 'hover'].indexOf(value) > -1,
      },
      delayOnMouseOver: {
        type: Number,
        default: 10,
      },
      delayOnMouseOut: {
        type: Number,
        default: 10,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      content: {
        type: String,
        default: null,
      },
      enterActiveClass: {
        type: String,
        default: null,
      },
      leaveActiveClass: {
        type: String,
        default: null,
      },
      boundariesSelector: {
        type: String,
        default: null,
      },
      reference: {}, // eslint-disable-line
      forceShow: {
        type: Boolean,
        default: false,
      },
      dataValue: { default: null }, // eslint-disable-line
      /* An HTML element the tooltip should be appended to */
      // 'type: HTMLElement' breaks the documentation build (??)
      // 'type: Object' causes 'Invalid prop: type check failed for prop
      //        "appendToEl". Expected Object, got HTMLDivElement' warning
      //        in consumers
      appendToEl: {
        type: null,
        default: null,
      },
      visibleArrow: {
        type: Boolean,
        default: true,
      },
      transition: {
        type: String,
        default: '',
      },
      options: {
        type: Object,
        default() {
          return {};
        },
      },
    },

    data() {
      return {
        referenceElm: null,
        popperJS: null,
        showPopper: false,
        popperOptions: {
          placement: 'bottom',
          computeStyle: {
            gpuAcceleration: false,
          },
        },
      };
    },

    watch: {
      showPopper(value) {
        if (value) {
          this.$emit('show', this);
          if (this.popperJS) {
            this.popperJS.enableEventListeners();
          }
          this.updatePopper();
        } else {
          if (this.popperJS) {
            this.popperJS.disableEventListeners();
          }
          this.$emit('hide', this);
        }
      },

      forceShow: {
        handler(value) {
          this[value ? 'doShow' : 'doClose']();
        },
        immediate: true,
      },

      disabled(value) {
        if (value) {
          this.showPopper = false;
        }
      },
    },

    created() {
      this.appendedArrow = false;
      this.isAppendedToEl = false;
      this.popperOptions = Object.assign(this.popperOptions, this.options);
    },

    mounted() {
      this.referenceElm = this.reference || this.$slots.reference[0].elm;
      this.popper = this.$slots.default[0].elm;

      switch (this.trigger) {
        case 'click':
          on(this.referenceElm, 'click', this.doToggle);
          on(document, 'click', this.handleDocumentClick);
          break;
        case 'hover':
          on(this.referenceElm, 'mouseover', this.onMouseOver);
          on(this.referenceElm, 'focus', this.onMouseOver);
          on(this.popper, 'mouseover', this.onMouseOver);
          on(this.popper, 'focus', this.onMouseOver);
          on(this.referenceElm, 'mouseout', this.onMouseOut);
          on(this.referenceElm, 'blur', this.onMouseOut);
          on(this.popper, 'mouseout', this.onMouseOut);
          on(this.popper, 'blur', this.onMouseOut);
          break;
      }
    },

    destroyed() {
      this.destroyPopper();
    },

    methods: {
      doToggle() {
        if (!this.forceShow) {
          this.showPopper = !this.showPopper;
        }
      },

      doShow() {
        this.showPopper = true;
      },

      doClose() {
        this.showPopper = false;
      },

      doDestroy() {
        if (this.showPopper) {
          return;
        }

        if (this.popperJS) {
          this.popperJS.destroy();
          this.popperJS = null;
        }

        if (this.isAppendedToEl) {
          this.isAppendedToEl = false;
          this.appendToEl.removeChild(this.popper.parentElement);
        }
      },

      createPopper() {
        this.$nextTick(() => {
          if (this.visibleArrow) {
            this.appendArrow(this.popper);
          }

          if (this.appendToEl && !this.isAppendedToEl) {
            this.isAppendedToEl = true;
            this.appendToEl.appendChild(this.popper.parentElement);
          }

          if (this.popperJS && this.popperJS.destroy) {
            this.popperJS.destroy();
          }

          if (this.boundariesSelector) {
            const boundariesElement = document.querySelector(this.boundariesSelector);

            if (boundariesElement) {
              this.popperOptions.modifiers = Object.assign({}, this.popperOptions.modifiers);
              this.popperOptions.modifiers.preventOverflow = Object.assign(
                {},
                this.popperOptions.modifiers.preventOverflow,
              );
              this.popperOptions.modifiers.preventOverflow.boundariesElement = boundariesElement;
            }
          }

          this.popperOptions.onCreate = () => {
            this.$emit('created', this);
            this.$nextTick(this.updatePopper);
          };

          this.popperJS = new Popper(this.referenceElm, this.popper, this.popperOptions);
        });
      },

      destroyPopper() {
        off(this.referenceElm, 'click', this.doToggle);
        off(this.referenceElm, 'mouseup', this.doClose);
        off(this.referenceElm, 'mousedown', this.doShow);
        off(this.referenceElm, 'focus', this.doShow);
        off(this.referenceElm, 'blur', this.doClose);
        off(this.referenceElm, 'mouseout', this.onMouseOut);
        off(this.referenceElm, 'mouseover', this.onMouseOver);
        off(document, 'click', this.handleDocumentClick);

        this.showPopper = false;
        this.doDestroy();
      },

      appendArrow(element) {
        if (this.appendedArrow) {
          return;
        }

        this.appendedArrow = true;

        const arrow = document.createElement('div');
        arrow.setAttribute('x-arrow', '');
        arrow.className = 'popper-arrow';
        element.appendChild(arrow);
      },

      updatePopper() {
        this.popperJS ? this.popperJS.scheduleUpdate() : this.createPopper();
      },

      onMouseOver() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.showPopper = true;
        }, this.delayOnMouseOver);
      },

      onMouseOut() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.showPopper = false;
        }, this.delayOnMouseOut);
      },

      handleDocumentClick(e) {
        if (
          !this.$el ||
          !this.referenceElm ||
          this.elementContains(this.$el, e.target) ||
          this.elementContains(this.referenceElm, e.target) ||
          !this.popper ||
          this.elementContains(this.popper, e.target)
        ) {
          return;
        }

        this.$emit('documentClick', this);

        if (this.forceShow) {
          return;
        }

        this.showPopper = false;
      },

      elementContains(elm, otherElm) {
        if (typeof elm.contains === 'function') {
          return elm.contains(otherElm);
        }

        return false;
      },
    },
  };

</script>


<style>

  .popper {
    position: absolute;
    z-index: 200000;
    display: inline-block;
    width: auto;
    padding: 2px;
    font-size: 14px;
    font-weight: normal;
    color: #212121;
    text-align: center;
    background-color: #fafafa;
    border: 1px #ebebeb solid;
    border-radius: 3px;
    box-shadow: rgb(58, 58, 58) 0 0 6px 0;
  }

  .popper .popper-arrow {
    position: absolute;
    width: 0;
    height: 0;
    margin: 5px;
    border-style: solid;
  }

  .popper[x-placement^='top'] {
    margin-bottom: 5px;
  }

  .popper[x-placement^='top'] .popper-arrow {
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
    border-color: #fafafa transparent transparent;
    border-width: 5px 5px 0;
  }

  .popper[x-placement^='bottom'] {
    margin-top: 5px;
  }

  .popper[x-placement^='bottom'] .popper-arrow {
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
    border-color: transparent transparent #fafafa;
    border-width: 0 5px 5px;
  }

  .popper[x-placement^='right'] {
    margin-left: 5px;
  }

  .popper[x-placement^='right'] .popper-arrow {
    top: calc(50% - 5px);
    left: -5px;
    margin-right: 0;
    margin-left: 0;
    border-color: transparent #fafafa transparent transparent;
    border-width: 5px 5px 5px 0;
  }

  .popper[x-placement^='left'] {
    margin-right: 5px;
  }

  .popper[x-placement^='left'] .popper-arrow {
    top: calc(50% - 5px);
    right: -5px;
    margin-right: 0;
    margin-left: 0;
    border-color: transparent transparent transparent #fafafa;
    border-width: 5px 0 5px 5px;
  }

</style>
