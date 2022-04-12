<script>

  /**
   * Used to create a consistently spaced horizontal set of buttons and/or links.
   *
   * KButtonGroup works with KButton, KIconButton, KRouterLink and KExternalLink and any <a> or <button> tags.
   * in it's default slot.
   */

  export default {
    name: 'KButtonGroup',
    render(createElement) {
      var children = [];
      // Add an existence catch in case nothing is passed into the slots.
      (this.$slots.default || []).forEach(element => {
        if (element.tag) {
          children.push(createElement('span', { class: 'button-group-item' }, [element]));
        }
      });

      return createElement('div', { class: 'button-group' }, children);
    },
  };

</script>


<style lang="scss" scoped>

  .button-group {
    display: inline-block;
    margin-bottom: -12px;
  }

  .button-group-item {
    display: inline-block;
    height: 48px;
  }

  /* KButton can produce <a> or <button> tags */
  .button-group-item > a,
  .button-group-item > button {
    margin-right: 8px;
    margin-left: 8px;
  }

</style>
