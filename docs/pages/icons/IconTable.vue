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
      Aliases with default colors
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
        v-for="(aliasList, index) in displayedLearningActivity"
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
   * Parameter `filterFn` must take 1 alias and return true or false. When false, the alias
   * will not be included in the output.
   */
  function getIconGroups(filterFn) {
    const iconGroups = {};
    const filteredIcons = Object.keys(KolibriIcons).filter(filterFn);

    filteredIcons.forEach(alias => {
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
        return sortedIconAliases(getIconGroups(this.blackIconFilter));
      },
      displayedGeneral() {
        return this.general.filter(this.termFilter);
      },
      withColor() {
        return sortedIconAliases(getIconGroups(this.iconWithDefaultColorFilter));
      },
      displayedWithColor() {
        return this.withColor.filter(this.termFilter);
      },
      withLearningActivity() {
        return sortedIconAliases(getIconGroups(this.learningActivityIconFilter));
      },
      displayedLearningActivity() {
        return this.withLearningActivity.filter(this.termFilter);
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
      blackIconFilter(alias) {
        return !KolibriIcons[alias].defaultColor && !KolibriIcons[alias].learningActivity;
      },
      iconWithDefaultColorFilter(alias) {
        return Boolean(KolibriIcons[alias].defaultColor);
      },
      learningActivityIconFilter(alias) {
        return KolibriIcons[alias].learningActivity;
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
