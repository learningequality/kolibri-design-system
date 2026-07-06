import Vue from 'vue';

import VisualTestExample from './components/VisualTestExample.vue';
import VisualTestLayout from './components/VisualTestLayout.vue';
import KButtonVisualTest from '~~/lib/buttons-and-links/__tests__/components/KButtonVisualTest.vue';
import KDropdownMenuVisualTest from '~~/lib/KDropdownMenu/__tests__/components/KDropdownMenuVisualTest.vue';
import KCheckboxSlotTest from '~~/lib/KCheckbox/__tests__/components/KCheckboxSlotTest.vue';
import KCheckboxVisualTest from '~~/lib/KCheckbox/__tests__/components/KCheckboxVisualTest.vue';
import KImgTest from '~~/examples/KImg/Base.vue';
import KImgAspectRatioTest from '~~/examples/KImg/AspectRatio.vue';
import KImgContentOnTopTest from '~~/examples/KImg/ContentOnTop.vue';
import KImgPlaceholderTest from '~~/examples/KImg/Placeholder.vue';
import KImgFitXYTest from '~~/examples/KImg/FitXY.vue';
import KImgFitCenterTest from '~~/examples/KImg/FitCenterInside.vue';
import KImgFitContainTest from '~~/examples/KImg/FitContain.vue';
import KImgWithBorderTest from '~~/lib/KImg/__tests__/components/KImgWithBorder.vue';
import KImgWithBackgroundColorTest from '~~/lib/KImg/__tests__/components/KImgWithBackgroundColor.vue';

import KIconVisualTest from '~~/lib/KIcon/__tests__/components/KIconVisualTest.vue';
import KTextboxVisualTest from '~~/lib/KTextbox/__tests__/components/KTextboxVisualTest.vue';
import KTableVisualTest from '~~/lib/KTable/__tests__/components/KTableVisualTest.vue';
import CardsVisualTest from '~~/lib/cards/__tests__/components/CardsVisualTest.vue';
import KLogoVisualTest from '~~/lib/KLogo/__tests__/components/KLogoVisualTest.vue';
import KBreadcrumbsVisualTest from '~~/lib/KBreadcrumbs/__tests__/components/KBreadcrumbsVisualTest.vue';
import KToolbarVisualTest from '~~/lib/KToolbar/__tests__/components/KToolbarVisualTest.vue';

// Visual tests helper components
Vue.component('VisualTestExample', VisualTestExample);
Vue.component('VisualTestLayout', VisualTestLayout);

Vue.component('KCheckboxSlotTest', KCheckboxSlotTest);
Vue.component('KCheckboxVisualTest', KCheckboxVisualTest);

Vue.component('KImgTest', KImgTest);
Vue.component('KImgAspectRatioTest', KImgAspectRatioTest);
Vue.component('KImgContentOnTopTest', KImgContentOnTopTest);
Vue.component('KImgPlaceholderTest', KImgPlaceholderTest);
Vue.component('KImgFitXYTest', KImgFitXYTest);
Vue.component('KImgFitContainTest', KImgFitContainTest);
Vue.component('KImgFitCenterTest', KImgFitCenterTest);
Vue.component('KImgWithBorderTest', KImgWithBorderTest);
Vue.component('KImgWithBackgroundColorTest', KImgWithBackgroundColorTest);

Vue.component('KIconVisualTest', KIconVisualTest);
Vue.component('KTextboxVisualTest', KTextboxVisualTest);
Vue.component('KTableVisualTest', KTableVisualTest);
Vue.component('CardsVisualTest', CardsVisualTest);
Vue.component('KLogoVisualTest', KLogoVisualTest);
Vue.component('KDropdownMenuVisualTest', KDropdownMenuVisualTest);
Vue.component('KBreadcrumbsVisualTest', KBreadcrumbsVisualTest);
Vue.component('KButtonVisualTest', KButtonVisualTest);
Vue.component('KToolbarVisualTest', KToolbarVisualTest);
