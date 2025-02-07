import { isNuxtServerSideRendering } from '../lib/utils';
import computedClass from './styles/computedClass';
import { darken1, darken2, darken3 } from './styles/darkenColors.js';

import KBreadcrumbs from './KBreadcrumbs';
import KButton from './buttons-and-links/KButton';
import KButtonGroup from './buttons-and-links/KButtonGroup';
import KCard from './cards/KCard';
import KCardGrid from './cards/KCardGrid';
import KCheckbox from './KCheckbox';
import KCircularLoader from './loaders/KCircularLoader';
import KDateRange from './KDateRange';
import KDropdownMenu from './KDropdownMenu';
import KEmptyPlaceholder from './KEmptyPlaceholder';
import KListWithOverflow from './KListWithOverflow';
import KExternalLink from './buttons-and-links/KExternalLink';
import KFixedGrid from './grids/KFixedGrid';
import KFixedGridItem from './grids/KFixedGridItem';
import KGrid from './grids/KGrid';
import KGridItem from './grids/KGridItem';
import KIcon from './KIcon';
import KIconButton from './buttons-and-links/KIconButton';
import KImg from './KImg';
import KLabeledIcon from './KLabeledIcon';
import KLinearLoader from './loaders/KLinearLoader';
import KModal from './KModal';
import KOptionalText from './KOptionalText';
import KPageContainer from './KPageContainer';
import KRadioButton from './KRadioButton';
import KRouterLink from './buttons-and-links/KRouterLink';
import KSelect from './KSelect';
import KSwitch from './KSwitch';
import KTable from './KTable';
import KTabs from './tabs/KTabs';
import KTabsList from './tabs/KTabsList';
import KTabsPanel from './tabs/KTabsPanel';
import KOverlay from './KOverlay';
import KTextbox from './KTextbox';
import KTooltip from './KTooltip';
import KTransition from './KTransition';
import KTextTruncator from './KTextTruncator';
import KLogo from './KLogo';
import KRadioButtonGroup from './KRadioButtonGroup.vue';
import KFocusTrap from './KFocusTrap.vue';
import KToolbar from './KToolbar';

import { themeTokens, themeBrand, themePalette, themeOutlineStyle } from './styles/theme';
import globalThemeState from './styles/globalThemeState';

import useKLiveRegion from './composables/useKLiveRegion';
import _useOverlay from './composables/_useOverlay';

const { _mountLiveRegion } = useKLiveRegion();
const { mountOverlay } = _useOverlay();

require('./grids/globalStyles.js'); // global grid styles

/**
 * Install Kolibri theme helpers on all Vue instances.
 * Also, set up global state, listeners, and styles.
 */
export default function KThemePlugin(Vue) {
  if (!isNuxtServerSideRendering()) {
    const onDomReady = () => {
      _mountLiveRegion();
      mountOverlay();
      document.removeEventListener('DOMContentLoaded', onDomReady);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onDomReady);
    } else {
      onDomReady();
    }
  }

  Vue.mixin({
    computed: {
      $coreOutline() {
        if (globalThemeState.inputModality === 'keyboard') {
          return themeOutlineStyle();
        }
        return {
          outline: 'none',
        };
      },
      $inputModality() {
        return globalThemeState.inputModality;
      },
      $mediaType() {
        return globalThemeState.mediaType;
      },
      $isPrint() {
        return this.$mediaType === 'print';
      },
    },
    methods: {
      /**
       * Because `window.print()` blocks in most browsers, we need to manually update our
       * `mediaType` before calling it so that the printable version of the page is as we expect.
       *
       * Triggering a print from Ctrl+P or the menu does not have this problem.
       * @public
       */
      $print() {
        const mediaType = globalThemeState.mediaType;
        globalThemeState.mediaType = 'print';

        this.$nextTick(() => {
          window.print();
          globalThemeState.mediaType = mediaType;
        });
      },
    },
  });
  Vue.prototype.$themeBrand = themeBrand();
  Vue.prototype.$themeTokens = themeTokens();
  Vue.prototype.$themePalette = themePalette();
  Vue.prototype.$computedClass = computedClass;

  Vue.prototype.$darken1 = darken1;
  Vue.prototype.$darken2 = darken2;
  Vue.prototype.$darken3 = darken3;

  // globally-accessible components
  Vue.component('KButton', KButton);
  Vue.component('KButtonGroup', KButtonGroup);
  Vue.component('KBreadcrumbs', KBreadcrumbs);
  Vue.component('KCard', KCard);
  Vue.component('KCardGrid', KCardGrid);
  Vue.component('KCheckbox', KCheckbox);
  Vue.component('KCircularLoader', KCircularLoader);
  Vue.component('KDateRange', KDateRange);
  Vue.component('KDropdownMenu', KDropdownMenu);
  Vue.component('KEmptyPlaceholder', KEmptyPlaceholder);
  Vue.component('KListWithOverflow', KListWithOverflow);
  Vue.component('KExternalLink', KExternalLink);
  Vue.component('KFixedGrid', KFixedGrid);
  Vue.component('KFixedGridItem', KFixedGridItem);
  Vue.component('KGrid', KGrid);
  Vue.component('KGridItem', KGridItem);
  Vue.component('KIcon', KIcon);
  Vue.component('KIconButton', KIconButton);
  Vue.component('KImg', KImg);
  Vue.component('KLabeledIcon', KLabeledIcon);
  Vue.component('KLinearLoader', KLinearLoader);
  Vue.component('KLogo', KLogo);
  Vue.component('KModal', KModal);
  Vue.component('KOptionalText', KOptionalText);
  Vue.component('KPageContainer', KPageContainer);
  Vue.component('KRadioButton', KRadioButton);
  Vue.component('KRouterLink', KRouterLink);
  Vue.component('KSelect', KSelect);
  Vue.component('KSwitch', KSwitch);
  Vue.component('KTable', KTable);
  Vue.component('KTabs', KTabs);
  Vue.component('KTabsList', KTabsList);
  Vue.component('KTabsPanel', KTabsPanel);
  Vue.component('KOverlay', KOverlay);
  Vue.component('KTextbox', KTextbox);
  Vue.component('KTooltip', KTooltip);
  Vue.component('KTransition', KTransition);
  Vue.component('KTextTruncator', KTextTruncator);
  Vue.component('KRadioButtonGroup', KRadioButtonGroup);
  Vue.component('KFocusTrap', KFocusTrap);
  Vue.component('KToolbar', KToolbar);
}
