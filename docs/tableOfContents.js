/*
  The table of contents is made of list of sections that themselves
  each contain a list of pages.

  To modify pages and ordering, update the Table of Contents section
  below.
*/

import sortBy from 'lodash/sortBy';

class Section {
  constructor({
    title, // if true, sort children by title
    autoSort = false, // if true, sort children by title
    pages = [], // list of Page objects
  } = {}) {
    this.title = title;
    this.autoSort = autoSort;
    this._pages = pages;
  }

  get pages() {
    if (this.autoSort) {
      return sortBy(this._pages, ['title']);
    }
    return this._pages;
  }

  clone(newVals) {
    return new Section({
      title: newVals.title || this.title,
      autoSort: newVals.autoSort || this.autoSort,
      pages: newVals.pages || this.pages,
    });
  }
}

class Page {
  constructor({
    path, // must correspond to a component name in pages directory
    title, // used in side nav, page header, and document title
    isCode = false, // if true, format using <code> tag
    disabled = false, // placeholder - don't link
    keywords = [], // additional terms to match
  } = {}) {
    this.path = path;
    this.title = title;
    this.isCode = isCode;
    this.disabled = disabled;
    this.keywords = keywords;
  }
}

/***********************************************/
/*   Table of contents                         */
/***********************************************/

const buttonRelatedKeywords = ['button', 'link'];
const textRelatedKeywords = ['text', 'area', 'field', 'box'];
const layoutRelatedKeywords = ['grid', 'layout', 'container', 'page'];
const tabsRelatedKeywords = ['tab', 'tabs', 'panel', 'tablist', 'tabpanel'];
const compositionRelatedKeywords = ['composable', 'composition'];

export default [
  new Section({
    pages: [
      new Page({
        path: '/',
        title: 'Home',
      }),
      new Page({
        path: '/principles',
        title: 'Design principles',
      }),
      new Page({
        path: '/release-process',
        title: 'Release process',
      }),
    ],
  }),
  new Section({
    title: 'Foundation',
    autoSort: true,
    pages: [
      new Page({
        path: '/colors',
        title: 'Colors',
      }),
      new Page({
        path: '/icons',
        title: 'Icons',
      }),
      new Page({
        path: '/accessibility',
        title: 'Accessibility',
      }),
      new Page({
        path: '/layout',
        title: 'Layout',
        keywords: layoutRelatedKeywords,
      }),
      new Page({
        path: '/writing',
        title: 'Writing',
      }),
      new Page({
        path: '/glossary',
        title: 'Glossary',
      }),
      new Page({
        path: '/styling',
        title: 'Styling',
      }),
    ],
  }),
  new Section({
    title: 'Patterns',
    autoSort: true,
    pages: [
      new Page({
        path: '/filters',
        title: 'Filters',
      }),
      new Page({
        path: '/pageheader',
        title: 'Page headers',
      }),
      new Page({
        path: '/errors',
        title: 'Errors',
      }),
    ],
  }),
  new Section({
    title: 'Components',
    autoSort: true,
    pages: [
      new Page({
        path: '/appbars',
        title: 'App bars',
      }),
      new Page({
        path: '/buttons',
        title: 'Buttons and links',
      }),
      new Page({
        path: '/menus',
        title: 'Menus',
      }),
      new Page({
        path: '/modals',
        title: 'Modals',
      }),
      new Page({
        path: '/snackbars',
        title: 'Snackbars',
      }),
      new Page({
        path: '/tabs',
        title: 'Tabs',
      }),
      new Page({
        path: '/textfields',
        title: 'Text fields',
        keywords: textRelatedKeywords,
      }),
      new Page({
        path: '/loaders',
        title: 'Loaders',
      }),
    ],
  }),
  new Section({
    title: 'Composables',
    autoSort: true,
    pages: [
      new Page({
        path: '/usekresponsivewindow',
        title: 'useKResponsiveWindow',
        isCode: true,
        keywords: [...compositionRelatedKeywords, 'responsive', 'window', 'breakpoint'],
      }),
      new Page({
        path: '/usekshow',
        title: 'useKShow',
        isCode: true,
        keywords: [
          ...compositionRelatedKeywords,
          'if',
          'show',
          'time',
          'minimum',
          'visible',
          'loader',
          'loading',
        ],
      }),
    ],
  }),
  new Section({
    title: 'Code library components',
    autoSort: true,
    pages: [
      new Page({
        path: '/kemptyplaceholder',
        title: 'KEmptyPlaceholder',
        isCode: true,
      }),
      new Page({
        path: '/koptionaltext',
        title: 'KOptionalText',
        isCode: true,
      }),
      new Page({
        path: '/kcheckbox',
        title: 'KCheckbox',
        isCode: true,
        keywords: ['button'],
      }),
      new Page({
        path: '/kcircularloader',
        title: 'KCircularLoader',
        isCode: true,
      }),
      new Page({
        path: '/klinearloader',
        title: 'KLinearLoader',
        isCode: true,
      }),
      new Page({
        path: '/kdaterange',
        title: 'KDateRange',
        isCode: true,
      }),
      new Page({
        path: '/kdropdownmenu',
        title: 'KDropdownMenu',
        isCode: true,
      }),
      new Page({
        path: '/kmodal',
        title: 'KModal',
        isCode: true,
      }),
      new Page({
        path: '/kradiobutton',
        title: 'KRadioButton',
        isCode: true,
      }),
      new Page({
        path: '/ktooltip',
        title: 'KTooltip',
        isCode: true,
      }),
      new Page({
        path: '/kpagecontainer',
        title: 'KPageContainer',
        isCode: true,
        keywords: layoutRelatedKeywords,
      }),
      new Page({
        path: '/kicon',
        title: 'KIcon',
        isCode: true,
      }),
      new Page({
        path: '/kiconbutton',
        title: 'KIconButton',
        isCode: true,
        keywords: buttonRelatedKeywords,
      }),
      new Page({
        path: '/kimg',
        title: 'KImg',
        isCode: true,
        keywords: ['image', 'img'],
      }),
      new Page({
        path: '/klogo',
        title: 'KLogo',
        isCode: true,
      }),
      new Page({
        path: '/klabeledicon',
        title: 'KLabeledIcon',
        isCode: true,
      }),
      new Page({
        path: '/kselect',
        title: 'KSelect',
        isCode: true,
        keywords: ['field', 'box'],
      }),
      new Page({
        path: '/kswitch',
        title: 'KSwitch',
        isCode: true,
        keywords: ['button'],
      }),
      new Page({
        path: '/kbutton',
        title: 'KButton',
        isCode: true,
        keywords: buttonRelatedKeywords,
      }),
      new Page({
        path: '/kexternallink',
        title: 'KExternalLink',
        isCode: true,
        keywords: buttonRelatedKeywords,
      }),
      new Page({
        path: '/krouterlink',
        title: 'KRouterLink',
        isCode: true,
        keywords: buttonRelatedKeywords,
      }),
      new Page({
        path: '/kbuttongroup',
        title: 'KButtonGroup',
        isCode: true,
        keywords: ['button'],
      }),
      new Page({
        path: '/kcontentrenderer',
        title: 'KContentRenderer',
        isCode: true,
      }),
      new Page({
        path: '/kgrid',
        title: 'KGrid',
        isCode: true,
        keywords: layoutRelatedKeywords,
      }),
      new Page({
        path: '/kfixedgrid',
        title: 'KFixedGrid',
        isCode: true,
        keywords: layoutRelatedKeywords,
      }),
      new Page({
        path: '/kgriditem',
        title: 'KGridItem',
        isCode: true,
        keywords: layoutRelatedKeywords,
      }),
      new Page({
        path: '/kfixedgriditem',
        title: 'KFixedGridItem',
        isCode: true,
        keywords: layoutRelatedKeywords,
      }),
      new Page({
        path: '/ktextbox',
        title: 'KTextbox',
        isCode: true,
        keywords: textRelatedKeywords,
      }),
      new Page({
        path: '/kbreadcrumbs',
        title: 'KBreadcrumbs',
        isCode: true,
      }),
      new Page({
        path: '/kresponsiveelement',
        title: 'KResponsiveElement',
        isCode: true,
        keywords: ['responsive', 'mixin', 'breakpoint', 'element'],
      }),
      new Page({
        path: '/ktabs',
        title: 'KTabs',
        isCode: true,
        keywords: tabsRelatedKeywords,
      }),
      new Page({
        path: '/ktabslist',
        title: 'KTabsList',
        isCode: true,
        keywords: tabsRelatedKeywords,
      }),
      new Page({
        path: '/ktabspanel',
        title: 'KTabsPanel',
        isCode: true,
        keywords: tabsRelatedKeywords,
      }),
      new Page({
        path: '/ktransition',
        title: 'KTransition',
        isCode: true,
        keywords: ['transition'],
      }),
      new Page({
        path: '/ktexttruncator',
        title: 'KTextTruncator',
        isCode: true,
      }),
    ],
  }),
];
