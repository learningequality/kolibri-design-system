<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>A radio button is used to make a single selection from a group of options. Radio buttons should be used instead of checkboxes if only one option can be selected.</p>

      <p><code>KRadioButton</code>'s are always be wrapped in <DocsLibraryLink component="KRadioButtonGroup" />.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <DocsShow>
        <KRadioButtonGroup>
          <KRadioButton
            v-model="exampleValue"
            label="Option A"
            buttonValue="val-a"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option B"
            buttonValue="val-b"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option C"
            description="This one is special!"
            buttonValue="val-c"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Truncated label. Adjusting your browser window size to see this in action."
            buttonValue="val-d"
            truncateLabel
          />
        </KRadioButtonGroup>
        <p>
          Current value: {{ exampleValue }}
        </p>
      </DocsShow>

      <DocsShowCode language="html">
        <KRadioButtonGroup>
          <KRadioButton
            v-model="exampleValue"
            label="Option A"
            buttonValue="val-a"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option B"
            butonValue="val-b"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option C"
            description="This one is special!"
            buttonValue="val-c"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Truncated label. Adjusting your browser window size to see this in action."
            buttonValue="val-d"
            truncateLabel
          />
        </KRadioButtonGroup>
      </DocsShowCode>

      <h3>With grid layout</h3>

      <p>It is possible to use radio buttons together with grid layout components such as <DocsLibraryLink component="KGrid" /> or <DocsLibraryLink component="KFixedGrid" />. For example: </p>

      <DocsShow>

        <KRadioButtonGroup>
          <KFixedGrid :numCols="2">
            <KFixedGridItem :span="1">
              <KRadioButton
                v-model="exampleValue"
                label="Option A"
                buttonValue="val-a"
              />
              <KRadioButton
                v-model="exampleValue"
                label="Option B"
                buttonValue="val-b"
              />
            </KFixedGridItem>
            <KFixedGridItem :span="1">
              <KRadioButton
                v-model="exampleValue"
                label="Option C"
                description="This one is special!"
                buttonValue="val-c"
              />
              <KRadioButton
                v-model="exampleValue"
                label="Truncated label. Adjusting your browser window size to see this in action."
                buttonValue="val-d"
                truncateLabel
              />
            </KFixedGridItem>
          </KFixedGrid>
        </KRadioButtonGroup>

        <p>
          Current value: {{ exampleValue }}
        </p>
      </DocsShow>

      <DocsShowCode language="html">
        <KRadioButtonGroup>
          <KFixedGrid :numCols="2">
            <KFixedGridItem :span="1">
              <KRadioButton
                v-model="exampleValue"
                label="Option A"
                buttonValue="val-a"
              />
              <KRadioButton
                v-model="exampleValue"
                label="Option B"
                buttonValue="val-b"
              />
            </KFixedGridItem>
            <KFixedGridItem :span="1">
              <KRadioButton
                v-model="exampleValue"
                label="Option C"
                description="This one is special!"
                buttonValue="val-c"
              />
              <KRadioButton
                v-model="exampleValue"
                label="Truncated label. Adjusting your browser window size to see this in action."
                buttonValue="val-d"
                truncateLabel
              />
            </KFixedGridItem>
          </KFixedGrid>
        </KRadioButtonGroup>
      </DocsShowCode>
    </DocsPageSection>

    <DocsPageSection title="Layout" anchor="#layout">
      <ul>
        <li>Align with container margin</li>
        <li>Stack vertically in lists</li>
        <li>
          Avoid nesting radio buttons
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Label" anchor="#label">
      <ul>
        <li>Labels should be short and concise</li>
        <li>Labels should be positioned above the radio button group</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>Always wrap <code>KRadioButton</code> group in <DocsLibraryLink component="KRadioButtonGroup" /></li>
        <li>There must always be exactly one radio button selected within a group</li>
        <li>If the user is allowed to not select any of the options, provide a "None" option</li>
        <li>By default, the first radio option is selected, but may be configured to have any option preselected</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsLibraryLink component="KRadioButtonGroup" /> ensures <code>KRadioButton</code> groups are accessible in all supported browsers.
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        exampleValue: 'val-b',
      };
    },
  };

</script>


<style lang="scss" scoped></style>
