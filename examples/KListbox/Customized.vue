<template>

  <div>
    <h4 :id="classLabel">Users</h4>
    <KListbox
      :id="listboxId"
      v-model="selected"
      class="listbox"
      :ariaLabelledBy="classLabel"
      :messages="messages"
      :style="{ borderColor: $themeTokens.fineLine }"
    >
      <template #selectAll="{ allSelected, someSelected, setAllSelected }">
        <div
          class="select-all"
          :style="{ borderColor: $themeTokens.fineLine }"
        >
          <!--
            margin reset prevents KCheckbox from taking more space
            than necessary and aligns its correctly within the row
          -->
          <KCheckbox
            label="Select all users"
            class="select-all-checkbox"
            :aria-controls="listboxId"
            :disabled="isDisabled"
            :checked="allSelected"
            :indeterminate="someSelected"
            :style="{ marginTop: '6px', marginBottom: '0' }"
            @change="setAllSelected"
          >
            <KLabeledIcon label="Select all users">
              <template #icon>
                <KIcon
                  icon="allUsers"
                  class="option-icon"
                  :color="isDisabled ? $themeTokens.textDisabled : $themeTokens.text"
                />
              </template>
            </KLabeledIcon>
          </KCheckbox>
        </div>
      </template>

      <KListboxOption
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :label="option.label"
        class="option"
        :style="{ borderColor: $themeTokens.fineLine }"
      >
        <KLabeledIcon :label="option.label">
          <template #icon>
            <KIcon
              :icon="option.icon"
              class="option-icon"
            />
          </template>
        </KLabeledIcon>
      </KListboxOption>
    </KListbox>
    <p>
      Selected: <code>{{ JSON.stringify(selected) }}</code>
    </p>
  </div>

</template>


<script>

  import { ref, computed } from 'vue';

  export default {
    setup() {
      const classLabel = 'customized-users';
      const listboxId = 'customized-listbox';
      const selected = ref(['coaches']);
      const options = [
        { id: 'learners', label: 'Learners', icon: 'learners' },
        { id: 'coaches', label: 'Coaches', icon: 'coaches' },
        { id: 'admins', label: 'Admins', icon: 'admins' },
      ];
      const isDisabled = computed(() => !options.length);
      const messages = {
        clickable: 'Options are clickable',
        allOptionsSelected: 'All options selected',
        allOptionsDeselected: 'No options selected',
        optionDeselected: 'Deselected',
      };
      return { classLabel, listboxId, selected, options, isDisabled, messages };
    },
  };

</script>


<style lang="scss" scoped>

  .listbox {
    border: 1px solid;
    border-radius: 4px;
  }

  .select-all,
  .select-all-checkbox {
    width: 100%;
  }

  .option,
  .select-all {
    padding: 8px 12px;
    border-bottom: 1px solid;
  }

  .option {
    padding-left: 16px;
  }

  .option:last-child {
    border-bottom: 0;
  }

  .option-icon {
    font-size: 1.2em;
  }

</style>
