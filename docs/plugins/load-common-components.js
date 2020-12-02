import Vue from 'vue';

import VueSimpleMarkdown from 'vue-simple-markdown';
import DocsExternalLink from '~/common/DocsExternalLink';
import DocsGithubLink from '~/common/DocsGithubLink';
import DocsInternalLink from '~/common/DocsInternalLink';
import DocsAnchorTarget from '~/common/DocsAnchorTarget';
import DocsPageSection from '~/common/DocsPageSection';
import DocsPageTemplate from '~/common/DocsPageTemplate';
import DocsDoNot from '~/common/DocsDoNot';
import DocsShow from '~/common/DocsShow';
import DocsFilter from '~/common/DocsFilter';

Vue.component('DocsPageTemplate', DocsPageTemplate);
Vue.component('DocsPageSection', DocsPageSection);
Vue.component('DocsInternalLink', DocsInternalLink);
Vue.component('DocsAnchorTarget', DocsAnchorTarget);
Vue.component('DocsExternalLink', DocsExternalLink);
Vue.component('DocsGithubLink', DocsGithubLink);
Vue.component('DocsShow', DocsShow);
Vue.component('DocsDoNot', DocsDoNot);
Vue.component('DocsFilter', DocsFilter);

Vue.use(VueSimpleMarkdown);
