<template>

  <div>
    <DocsFilter v-model="filterText" class="filter" />
    <h3 v-if="displayedGeneral.length">
      General aliases
    </h3>
    <div class="icon-table">
      <IconBlock
        v-for="(aliasList, index) in displayedGeneral"
        :key="index"
        :aliasList="aliasList"
        class="icon-block"
      />
    </div>
    <h3 v-if="displayedWithColor.length">
      Learning activities
    </h3>
    <div class="icon-table">
      <IconBlock
        v-for="(aliasList, index) in displayedWithColor"
        :key="index"
        :aliasList="aliasList"
        class="icon-block"
      />
    </div>

    <h3 v-if="displayedWithColor.length">
      Learning activities
    </h3>
    <div class="icon-table">
      <IconBlock
        v-for="(aliasList, index) in withOwnColor"
        :key="index"
        :aliasList="aliasList"
        class="icon-block"
      />
    </div>
  </div>

</template>


<script>

  import IconBlock from './IconBlock';
  import { termList, matches } from '~/common/DocsFilter/utils';
  import { KolibriIcons } from '~~/lib/KIcon/iconDefinitions.js';

  /**
   * Given an icon group, returns array where each element is an array of aliases which
   * refer to the same icon. The sub-arrays are already sorted alphabetically.
   *
   * Example:
   *
   * [
   *     ['arrow_back', 'back'],
   *     ['arrow_forward', 'forward'],
   *     ...
   *     ['verified_user']
   * ]
   *
   */
  function sortedIconAliases(iconGroups) {
    return Object.keys(iconGroups)
      .map(a => iconGroups[a])
      .sort((a, b) => a[0].localeCompare(b[0]));
  }

  /*
   * Return an object where the keys are unique icon identifiers. These identifiers
   * map to an array of alphabetically sorted aliases associated with that icon.
   *
   * Parameter `withDefaultColor` selects icons with or without a defined default color.
   */
  function getIconGroups(withDefaultColor) {
    const iconGroups = {};
    Object.keys(KolibriIcons).forEach(alias => {
      // exit if not applicable
      const hasDefaultColor =
        Boolean(KolibriIcons[alias].defaultColor) && KolibriIcons[alias].defaultColor === true;
      if ((withDefaultColor && !hasDefaultColor) || (!withDefaultColor && hasDefaultColor)) {
        return;
      }
      // track a list of aliases
      const iconIdentifier = KolibriIcons[alias].icon.name;
      if (iconGroups[iconIdentifier]) {
        iconGroups[iconIdentifier].push(alias);
        iconGroups[iconIdentifier].sort();
      } else {
        iconGroups[iconIdentifier] = [alias];
      }
    });
    return iconGroups;
  }

  export default {
    components: {
      IconBlock,
    },
    data() {
      return {
        filterText: '',
      };
    },
    computed: {
      terms() {
        return termList(this.filterText);
      },
      general() {
        return sortedIconAliases(getIconGroups(false));
      },
      displayedGeneral() {
        return this.general.filter(this.termFilter);
      },
      withColor() {
        return sortedIconAliases(getIconGroups(true));
      },
      displayedWithColor() {
        return this.withColor.filter(this.termFilter);
      },
      withOwnColor() {
        return this.withColor.filter(e => e.defaultColor === true);
      },
    },
    methods: {
      termFilter(aliasList) {
        for (const alias of aliasList) {
          if (matches(this.terms, alias)) {
            return true;
          }
        }
        return false;
      },
    },
  };

</script>


<style lang="scss" scoped>

  .filter {
    max-width: 300px;
    margin-bottom: 8px;
  }

  .icon-table {
    display: flex;
    flex-wrap: wrap;
  }

  .icon-block {
    display: inline-block;
    min-width: 250px;
    margin: 8px;
  }

</style>
