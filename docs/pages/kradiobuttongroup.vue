<template>

  <DocsPageTemplate :apiDocs="true">

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Allows movement between radio buttons inside a radio group using arrow keys in FireFox.
      </p>
      <DocsShow>
        <KRadioButtonGroup>
          <KRadioButton
            v-model="exampleValue"
            label="Option A"
            value="val-a"
          />
          <KRadioButton
            v-model="exampleValue"
            label="Option B"
            value="val-b"
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
