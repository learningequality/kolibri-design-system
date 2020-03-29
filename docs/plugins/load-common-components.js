import Vue from 'vue';

import ExternalLink from '~/common/links/ExternalLink';
import InternalLink from '~/common/links/InternalLink';
import AnchorTarget from '~/common/links/AnchorTarget';
import PageSection from '~/common/PageSection';
import PageTemplate from '~/common/PageTemplate';
import DoNot from '~/common/DoNot';
import Show from '~/common/Show';

Vue.component('PageTemplate', PageTemplate);
Vue.component('PageSection', PageSection);
Vue.component('InternalLink', InternalLink);
Vue.component('AnchorTarget', AnchorTarget);
Vue.component('ExternalLink', ExternalLink);
Vue.component('Show', Show);
Vue.component('DoNot', DoNot);
