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

    <DocsPageSection title="Terms" anchor="#terms" fullwidth>
      <DocsFilter v-model="filterText" class="filter" />
      <table style="max-width: 1000px">
        <thead>
          <tr>
            <th style="min-width: 200px">
              Term
            </th>
            <th>Part of speech</th>
            <th class="stretch">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(term, i) in visibleTerms" :key="i">
            <th>
              {{ term.term }}
              <DocsAnchorTarget
                :anchor="anchor(term)"
              />
            </th>
            <td><em>{{ term.note }}</em></td>
            <td>{{ term.description }}</td>
          </tr>
        </tbody>
      </table>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  import sortBy from 'lodash/sortBy';
  import tbxGlossary from './glossary.tbx';
  import { termList, matches } from '~/common/DocsFilter/utils';

  function tbxAttribute(element, name) {
    return element[name] ? element[name][0]._ : '';
  }

  function tbxTerm(entry) {
    const english = entry.langSet.find(lang => lang.$['xml:lang'] === 'en');
    return {
      term: tbxAttribute(english.tig[0], 'term'),
      note: tbxAttribute(english.tig[0], 'termNote'),
      description: tbxAttribute(english.tig[0], 'descrip'),
    };
  }

  const glossaryTerms = sortBy(tbxGlossary.martif.text[0].body[0].termEntry.map(tbxTerm), ['term']);

  export default {
    data() {
      return {
        filterText: '',
      };
    },
    computed: {
      visibleTerms() {
        return glossaryTerms.filter(term => matches(this.filterTerms, term.term));
      },
      filterTerms() {
        return termList(this.filterText);
      },
    },
    methods: {
      anchor(term) {
        // standarize url
        return `#${term.term
          .toLowerCase()
          .split(' ')
          .join('_')
          .replace('(', '')
          .replace(')', '')
          .replace(',', '')}`;
      },
    },
  };

</script>


<style lang="scss" scoped>

  td,
  th {
    padding: 8px;
    text-align: left;
    vertical-align: top;
  }

  th {
    min-width: 50px;
  }

  .stretch {
    width: 100%;
    min-width: 150px;
  }

  .filter {
    max-width: 300px;
    margin-bottom: 8px;
  }

</style>
