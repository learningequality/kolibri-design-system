<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <DocsShow>
        <KSwitch
          v-model="exampleData"
          label="Things are happening"
        />
        <p>Value: {{ exampleData }}</p>
      </DocsShow>
      <p>
        A switch toggle is used to select and execute an action instantly, in real time. A switch is toggled successfully when the switch thumb slides to the other side of the track upon click or press.
      </p>
      <p>
        For selections that require a confirmation to execute and are housed in a form, use <DocsLibraryLink component="KCheckbox" /> component instead.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>
        Use a switch for the following:
      </p>
      <ul>
        <li>When an instant response is required without final confirmation</li>
        <li>Actions that do not need a formal review</li>
        <li>Selections that offer an on/off decision</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Specifications" anchor="#specifications">
      <ul>
        <li>
          Thumb ON color:
          <DocsInternalLink code text="brand.primary.v_1000" href="/colors#brand-primary-v_1000" />
        </li>
        <li>
          Track ON color:
          <DocsInternalLink code text="brand.primary.v_400" href="/colors#brand-primary-v_400" />
        </li>
        <li>
          Thumb OFF color:
          <DocsInternalLink code text="palette.grey.v_50" href="/colors#palette-grey-v_50" />
        </li>
        <li>
          Track OFF color:
          <DocsInternalLink code text="palette.grey.v_200" href="/colors#palette-grey-v_200" />
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>Align a switch with the container margin</li>
        <li>Align a switch to the right of the text label</li>
        <li>Stack swithes vertically in lists</li>
        <li>Switch text labels Labels should concisely describe the action to be executed</li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        exampleData: true,
      };
    },
  };

</script>


<style lang="scss" scoped></style>
