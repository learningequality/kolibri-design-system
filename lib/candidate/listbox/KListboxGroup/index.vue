<template>

  <li
    class="k-listbox-group"
    role="presentation"
  >
    <div
      v-if="label && !hideLabel"
      class="k-listbox-group-label"
      :style="{ color: $themeTokens.annotation }"
      aria-hidden="true"
    >
      {{ label }}
    </div>

    <ul
      role="group"
      :aria-label="label"
      class="k-listbox-group-list"
    >
      <!-- @slot KListboxOption(s) or nested KListboxGroup(s) -->
      <slot></slot>
    </ul>
  </li>

</template>


<script>

  export default {
    name: 'KListboxGroup',

    props: {
      /**
       * Human-readable label for this group.
       * Used as the accessible name (aria-label) for the group.
       */
      label: {
        type: String,
        required: true,
      },
      /** Visually hides the text label (e.g. when the parent renders its own checkbox heading) */
      hideLabel: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .k-listbox-group {
    list-style: none;
  }

  .k-listbox-group-label {
    padding: 6px 12px 2px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    pointer-events: none;
    user-select: none;
  }

  .k-listbox-group-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

</style>
