<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <pre>{{ terms }}</pre>
    </DocsPageSection>



  </docspagetemplate>

</template>


<script>

  import tbxGlossary from './glossary.tbx';

  function tbxAttribute(element, name) {
    return element[name] ? element[name][0]._ : undefined;
  }

  function tbxTerm(entry) {
    const english = entry.langSet.find(lang => lang.$['xml:lang'] === 'en');
    return {
      term: tbxAttribute(english.tig[0], 'term'),
      note: tbxAttribute(english.tig[0], 'termNote'),
      description: tbxAttribute(english.tig[0], 'descrip'),
    };
  }

  const terms = tbxGlossary.martif.text[0].body[0].termEntry.map(tbxTerm);

  export default {
    computed: {
      terms() {
        return terms;
      },
    },
  };

</script>


<style lang="scss" scoped></style>
