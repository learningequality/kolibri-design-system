import { StyleSheet as baseStyleSheet, setStyleTagSuffix } from 'aphrodite/no-important';
import { themeTokens, themePalette, themeBrand, themeOutlineStyle } from './theme';

// include global styles
import 'purecss/build/base-min.css';

setStyleTagSuffix('kolibriVue');

const globalSelectorHandler = (selector, _, generateSubtreeStyles) => {
  if (selector[0] !== '*') {
    return null;
  }
  return generateSubtreeStyles(selector.slice(1));
};

const globalExtension = { selectorHandler: globalSelectorHandler };

const { StyleSheet, css } = baseStyleSheet.extend([globalExtension]);

/**
 * Generates a minimal set of global, unscoped styles using theme variables.
 *
 * @deprecated Will be removed, together with the Aphrodite dependency, in the next major
 * release. Import `~kolibri-design-system/lib/styles/common` in the main stylesheet
 * instead. See https://design-system.learningequality.org/installation#register-global-styles
 */
export default function generateGlobalStyles() {
  const printStyle = {
    '@media print': {
      color: '#000 !important',
      background: 'none !important',
      boxShadow: 'none !important',
    },
  };
  const htmlBodyStyles = {
    color: themeTokens().text,
    backgroundColor: themePalette().grey.v_100,
    ...printStyle,
  };
  const globalStyles = StyleSheet.create({
    globals: {
      '**': printStyle,
      '*html': htmlBodyStyles,
      '*body': htmlBodyStyles,
      '*:focus': themeOutlineStyle(),
      '*:focus:hover': themeOutlineStyle(),
      '*::selection': {
        background: themeBrand().secondary.v_100,
      },
    },
  });

  // Have to do this to actually generate and inject the stylesheet
  // Return to have a value that will change when the dynamic styles change
  // This should be a cheap computation due to the caching that
  // Aphrodite is doing internally.
  return css(globalStyles.globals);
}
