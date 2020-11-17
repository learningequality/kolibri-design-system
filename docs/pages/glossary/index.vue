<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Certain words have special meanings in the context of the Kolibri ecosystem which might be different or more specific than when used in general language. Additionally, many of the terms have been carefully chosen from among alternatives, and it's important to consistently use this terminology across the product ecosystem.
      </p>
      <p>
        The glossary is stored in the <DocsExternalLink text="the TBX-Glossary format" href="http://www.ttt.org/tbxg/" /> format, and should be uploaded to all Crowdin projects so that translators have this context.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Terms" anchor="#terms">
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
