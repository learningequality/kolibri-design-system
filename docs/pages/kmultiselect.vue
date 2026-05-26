<template>

  <DocsPageTemplate>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        <code>KMultiselect</code> is a candidate component under development. It allows users to
        select multiple options from a list or dropdown, displaying the selected items as tags or
        chips.
      </p>
      <p>
        For now, this page demonstrates <code>KChip</code>, which is used to render the individual
        selected items.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="KChip"
      anchor="#kchip"
    >
      <p>
        <code>KChip</code> represents a selected option or tag. It can be standard (non-closeable),
        closeable, or disabled, and supports custom accessible labels.
      </p>

      <h3>Standard Chips (Non-closeable)</h3>
      <DocsShow>
        <div style="display: flex; gap: 12px; align-items: center">
          <KChip text="Mathematics" />
          <KChip text="English Language Arts" />
        </div>
      </DocsShow>

      <h3>Closeable Chips</h3>
      <DocsShow>
        <div style="display: flex; gap: 12px; align-items: center">
          <KChip
            text="Science"
            close
          />
          <KChip
            text="Social Studies"
            close
          />
        </div>
      </DocsShow>

      <h3>Disabled Chips</h3>
      <DocsShow>
        <div style="display: flex; gap: 12px; align-items: center">
          <KChip
            text="History (Disabled)"
            disabled
          />
          <KChip
            text="Geography (Disabled & Closeable)"
            close
            disabled
          />
        </div>
      </DocsShow>

      <h3>Custom Close Accessible Label (removeLabel)</h3>
      <DocsShow>
        <div style="display: flex; gap: 12px; align-items: center">
          <KChip
            text="Custom Action"
            close
            removeLabel="Delete Custom Action tag"
          />
        </div>
      </DocsShow>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import KChip from '../../lib/candidate/multiselect/KChip/index.vue';

  export default {
    name: 'KMultiselectDocs',
    components: {
      KChip,
    },
  };

</script>


<style lang="scss" scoped></style>
