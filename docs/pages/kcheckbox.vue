<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>The checkbox is generally used to select one of two possible values in a form.</p>
      <DocsShow>
        <KCheckbox
          v-model="checked1"
          label="Some label"
        />
        <KCheckbox
          v-model="checked2"
          label="Another label"
        />
      </DocsShow>
    </DocsPageSection>

    <DocsPageSection
      title="Layout"
      anchor="#layout"
    >
      <ul>
        <li>Aligned with container margin</li>
        <li>When used in a group, vertically stacked</li>
        <li>Hierarchical nesting is avoided</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Guidelines"
      anchor="#guidelines"
    >
      <ul>
        <li>Labels should be short and concise</li>
        <li>
          Checkbox should not be used to make real-time changes; for this situation, use a
          <DocsLibraryLink component="KSwitch" /> component instead
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="States"
      anchor="#states"
    >
      <p>The v-model checkbox state represents an affirmative value.</p>
      <p>
        Checkboxes can also have a "partially-checked" or "indeterminate" state used in cases where
        the value is neither true nor false, such as when a subset of a topic is selected:
      </p>
      <DocsShow>
        <KCheckbox
          v-model="checked3"
          label="Topic is selected"
          :indeterminate="indeterminate3"
          @input="handle3"
        />
      </DocsShow>
      <p>
        A user cannot enter the indeterminate state by interacting directly with the checkbox; it
        only occurs due to external interactions.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Example: Label content"
      anchor="#example-labels"
    >
      Label content can be passed via the <code>label</code> property:

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KCheckbox label="First lesson" />
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox
          v-model="checked4"
          label="First lesson"
        />
      </DocsShow>

      In more complex situations, for example when another component is responsible for rendering
      the label, the default slot can be used:

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KCheckbox>
          <KLabeledIcon
            icon="lesson"
            label="First lesson"
          />
        </KCheckbox>
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox v-model="checked5">
          <KLabeledIcon
            icon="lesson"
            label="First lesson"
          />
        </KCheckbox>
      </DocsShow>

      <DocsDoNot>
        <template #not>
          <p>Don't wrap the default slot's content in <code>&lt;label&gt;</code>:</p>
          <!-- eslint-disable -->
          <!-- prettier-ignore -->
          <DocsShowCode language="html">
            <KCheckbox>
              <label>
                <KLabeledIcon
                  icon="lesson"
                  label="First lesson"
                ></KLabeledIcon>
              </label>
            </KCheckbox>
          </DocsShowCode>
          <!-- eslint-enable -->

          <p>
            That would cause two nested <code>&lt;label&gt;</code> elements to be rendered as
            <code>KCheckbox</code> takes care of it already.
          </p>
        </template>
      </DocsDoNot>
    </DocsPageSection>

    <DocsPageSection
      title="Example: v-model"
      anchor="#example-v-model"
    >
      <code>v-model</code> supports array, boolean, number, string, and object.

      <h3>
        Array
        <DocsAnchorTarget anchor="#v-model-array" />
      </h3>
      <p>
        Each <code>value</code> will be added/removed from the <code>selectedGroupIds</code> array
        based on each checkbox state.
      </p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KCheckbox
          v-for="group in groups"
          :key="group.id"
          v-model="selectedGroupIds"
          :label="group.name"
          :value="group.id"
        />
      </DocsShowCode>
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        export default {
          data() {
            return {
              groups: [
                { 'id': 'group-1', 'name': 'First group', },
                { 'id': 'group-2', 'name': 'Second group' },
                { 'id': 'group-3', 'name': 'Third group' }
              ],
              selectedGroupIds: ['group-1'],
            };
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox
          v-for="group in groups"
          :key="group.id"
          v-model="selectedGroupIds"
          :label="group.name"
          :value="group.id"
        />
      </DocsShow>

      <h3>
        Boolean
        <DocsAnchorTarget anchor="#v-model-boolean" />
      </h3>
      <p>
        If checked, <code>isSelected</code> will become <code>true</code>, otherwise
        <code>false</code>. Note that here, <code>value</code> is not needed.
      </p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KCheckbox
          v-model="isSelected"
          :label="`isSelected = ${isSelected}`"
        />
      </DocsShowCode>
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        export default {
          data() {
            return {
              isSelected: true,
            };
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox
          v-model="isSelected"
          :label="`isSelected = ${isSelected}`"
        />
      </DocsShow>

      <h3>
        Number
        <DocsAnchorTarget anchor="#v-model-number" />
      </h3>
      <p>
        If checked, <code>selectedNumber</code> will be set to <code>value</code>, otherwise
        <code>null</code>.
      </p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KCheckbox
          v-model="selectedNumber"
          :label="`selectedNumber = ${selectedNumber}`"
          :value="1"
        />
      </DocsShowCode>
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        export default {
          data() {
            return {
              selectedNumber: 1,
            };
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox
          v-model="selectedNumber"
          :label="`selectedNumber = ${selectedNumber}`"
          :value="1"
        />
      </DocsShow>

      <h3>
        String
        <DocsAnchorTarget anchor="#v-model-string" />
      </h3>
      <p>
        If checked, <code>selectedString</code> will be set to <code>value</code>, otherwise
        <code>null</code>.
      </p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KCheckbox
          v-model="selectedString"
          :label="`selectedString = ${selectedString}`"
          :value="'String'"
        />
      </DocsShowCode>
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        export default {
          data() {
            return {
              selectedString: 'String',
            };
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox
          v-model="selectedString"
          :label="`selectedString = ${selectedString}`"
          :value="'String'"
        />
      </DocsShow>

      <h3>
        Object
        <DocsAnchorTarget anchor="#v-model-object" />
      </h3>
      <p>
        If checked, <code>selectedObject</code> will be set to <code>value</code>, otherwise
        <code>null</code>.
      </p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KCheckbox
          v-model="selectedObject"
          :label="`selectedObject = ${JSON.stringify(selectedObject)}`"
          :value="{ id: 1, name: 'Name 1' }"
        />
      </DocsShowCode>
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        export default {
          data() {
            return {
              selectedObject: { id: 1, name: 'Name 1' },
            };
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->
      <DocsShow>
        <KCheckbox
          v-model="selectedObject"
          :label="`selectedObject = ${JSON.stringify(selectedObject)}`"
          :value="{ id: 1, name: 'Name 1' }"
        />
      </DocsShow>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        checked1: true,
        checked2: false,
        checked3: false,
        indeterminate3: true,
        checked4: false,
        checked5: false,
        groups: [
          { id: 'group-1', name: 'First group' },
          { id: 'group-2', name: 'Second group' },
          { id: 'group-3', name: 'Third group' },
        ],
        selectedGroupIds: ['group-1'],
        isSelected: true,
        selectedNumber: 1,
        selectedString: 'String',
        selectedObject: { id: 1, name: 'Name 1' },
      };
    },
    methods: {
      handle3() {
        this.indeterminate3 = false;
      },
    },
  };

</script>
