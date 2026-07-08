<template>

  <div>
    <h4 :id="labelId">Class</h4>

    <KListbox
      :id="listboxId"
      :value="selected"
      class="listbox"
      :ariaLabelledBy="labelId"
      :messages="messages"
      :style="{ borderColor: $themeTokens.fineLine }"
      @input="handleInput"
    >
      <template #selectAll="{ allSelected, someSelected, setAllSelected }">
        <div
          class="select-all"
          :style="{ borderColor: $themeTokens.fineLine }"
        >
          <KCheckbox
            label="Select all classes"
            class="select-all-checkbox"
            :aria-controls="listboxId"
            :checked="allSelected"
            :indeterminate="someSelected"
            :style="{ marginTop: '6px', marginBottom: '0' }"
            @change="setAllSelected"
          />
        </div>
      </template>
      <KListboxGroup
        v-for="group in subjectsData"
        :key="group.value"
        :label="group.label"
        hideLabel
      >
        <KListboxOption
          :value="group.value"
          :label="group.label"
          :indeterminate="isGroupIndeterminate(group)"
          class="option"
          :style="{ paddingLeft: '12px', paddingRight: '12px', borderColor: $themeTokens.fineLine }"
        />

        <template v-for="child in group.children">
          <KListboxGroup
            v-if="child.children"
            :key="'group-' + child.value"
            :label="child.label"
            hideLabel
          >
            <KListboxOption
              :value="child.value"
              :label="child.label"
              :indeterminate="isGroupIndeterminate(child)"
              class="option"
              :style="{
                paddingLeft: '36px',
                paddingRight: '12px',
                borderColor: $themeTokens.fineLine,
              }"
            />

            <KListboxOption
              v-for="subchild in child.children"
              :key="subchild.value"
              :value="subchild.value"
              :label="subchild.label"
              class="option"
              :style="{
                paddingLeft: '60px',
                paddingRight: '12px',
                borderColor: $themeTokens.fineLine,
              }"
            />
          </KListboxGroup>

          <KListboxOption
            v-else
            :key="'option-' + child.value"
            :value="child.value"
            :label="child.label"
            class="option"
            :style="{
              paddingLeft: '36px',
              paddingRight: '12px',
              borderColor: $themeTokens.fineLine,
            }"
          />
        </template>
      </KListboxGroup>
    </KListbox>

    <p style="margin-top: 16px">
      Selected: <code>{{ JSON.stringify(selected) }}</code>
    </p>
  </div>

</template>


<script>

  import { ref } from 'vue';

  export default {
    setup() {
      const labelId = 'cascade-label';
      const listboxId = 'cascade-listbox';

      const subjectsData = ref([
        {
          label: 'Sciences',
          value: 'sciences',
          children: [
            { label: 'Biology', value: 'biology' },
            {
              label: 'Physics',
              value: 'physics',
              children: [
                { label: 'Mechanics', value: 'mechanics' },
                { label: 'Electromagnetism', value: 'electromagnetism' },
              ],
            },
          ],
        },
        {
          label: 'Humanities',
          value: 'humanities',
          children: [{ label: 'Literature', value: 'literature' }],
        },
      ]);

      const messages = {
        clickable: 'Options are clickable',
        allOptionsSelected: 'All options selected',
        allOptionsDeselected: 'No options selected',
        optionDeselected: 'Deselected',
        partiallySelected: 'Partially selected',
      };

      // Leaf-only descendants per group: used to derive indeterminate and checked states
      const groupLeaves = {
        sciences: ['biology', 'mechanics', 'electromagnetism'],
        physics: ['mechanics', 'electromagnetism'],
        humanities: ['literature'],
      };

      // All descendants per group (nodes + leaves): used for downward cascade
      const groupDescendants = {
        sciences: ['biology', 'physics', 'mechanics', 'electromagnetism'],
        physics: ['mechanics', 'electromagnetism'],
        humanities: ['literature'],
      };

      // Upward cascade: sync each group's checked state to its leaf descendants,
      // processing deepest groups first so parent groups see correct child states
      const resolveSelections = currentSelection => {
        let updated = [...currentSelection];

        const physicsAll = ['mechanics', 'electromagnetism'].every(v => updated.includes(v));
        if (physicsAll && !updated.includes('physics')) {
          updated.push('physics');
        } else if (!physicsAll && updated.includes('physics')) {
          updated = updated.filter(v => v !== 'physics');
        }

        const sciencesAll = ['biology', 'physics'].every(v => updated.includes(v));
        if (sciencesAll && !updated.includes('sciences')) {
          updated.push('sciences');
        } else if (!sciencesAll && updated.includes('sciences')) {
          updated = updated.filter(v => v !== 'sciences');
        }

        const humanitiesAll = ['literature'].every(v => updated.includes(v));
        if (humanitiesAll && !updated.includes('humanities')) {
          updated.push('humanities');
        } else if (!humanitiesAll && updated.includes('humanities')) {
          updated = updated.filter(v => v !== 'humanities');
        }

        return updated;
      };

      const selected = ref(resolveSelections(['mechanics']));

      const isGroupIndeterminate = group => {
        const leaves = groupLeaves[group.value];
        if (!leaves) return false;
        const some = leaves.some(val => selected.value.includes(val));
        const all = leaves.every(val => selected.value.includes(val));
        return some && !all;
      };

      // Downward cascade: when a group header is toggled, add or remove all of
      // its descendants, then run the upward cascade to sync parent groups
      const handleInput = newSelection => {
        let updated = [...newSelection];

        for (const groupVal of ['sciences', 'physics', 'humanities']) {
          const wasSelected = selected.value.includes(groupVal);
          const isNowSelected = newSelection.includes(groupVal);

          if (wasSelected !== isNowSelected) {
            const items = groupDescendants[groupVal];
            if (isNowSelected) {
              updated = [...new Set([...updated, ...items])];
            } else {
              const toRemove = new Set(items);
              updated = updated.filter(val => !toRemove.has(val));
            }
          }
        }

        selected.value = resolveSelections(updated);
      };

      return {
        labelId,
        listboxId,
        subjectsData,
        selected,
        messages,
        isGroupIndeterminate,
        handleInput,
      };
    },
  };

</script>


<style lang="scss" scoped>

  .listbox {
    overflow: hidden;
    border: 1px solid;
    border-radius: 4px;
  }

  .select-all,
  .select-all-checkbox {
    width: 100%;
  }

  .select-all {
    padding: 8px 12px;
    border-bottom: 1px solid;
  }

  .option {
    padding: 8px 0;
    border-bottom: 1px solid;
  }

</style>
