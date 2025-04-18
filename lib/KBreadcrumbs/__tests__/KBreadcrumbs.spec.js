import {
  renderComponentForVisualTest,
  takeSnapshot,
  click,
} from '../../../jest.conf/visual.testUtils';

describe.visual('KBreadcrumbs Visual Tests', () => {
  const snapshotOptions = { widths: [375, 768], minHeight: 200 };

  it.visual('Breadcrumbs - Single Item (showSingleItem)', async () => {
    await renderComponentForVisualTest('KBreadcrumbsTest', {
      items: [{ text: 'Single Item', link: null }],
      showSingleItem: true,
    });
    await takeSnapshot('KBreadcrumbs - Single Item', snapshotOptions);
  });

  it.visual('Breadcrumbs - Single Item (hidden)', async () => {
    await renderComponentForVisualTest('KBreadcrumbsTest', {
      items: [{ text: 'Single Item', link: null }],
      showSingleItem: false,
    });
    await takeSnapshot('KBreadcrumbs - Single Item Hidden', snapshotOptions);
  });

  it.visual('Breadcrumbs - Multiple Items (no overflow)', async () => {
    await renderComponentForVisualTest('KBreadcrumbsTest', {
      items: [
        { text: 'Home', link: { path: '/' } },
        { text: 'Library', link: { path: '/lib' } },
        { text: 'Data', link: null },
      ],
      containerWidth: '600px',
    });
    await takeSnapshot('KBreadcrumbs - No Overflow', snapshotOptions);
  });

  it.visual('Breadcrumbs - Overflow with Dropdown Open', async () => {
    await renderComponentForVisualTest('KBreadcrumbsTest', {
      items: [
        { text: 'Home', link: { path: '/' } },
        { text: 'Library', link: { path: '/lib' } },
        { text: 'Category', link: { path: '/category' } },
        { text: 'Subcategory', link: { path: '/subcategory' } },
        { text: 'Files', link: null },
      ],
      containerWidth: '300px',
    });

    await page.waitForSelector('.breadcrumbs-dropdown-wrapper button', {
      visible: true,
      timeout: 5000,
    });
    await click('.breadcrumbs-dropdown-wrapper button');

    await page.waitFor(300);

    await takeSnapshot('KBreadcrumbs - Overflow with Dropdown Open', snapshotOptions);
  });

  it.visual('Breadcrumbs - Long Text Truncation', async () => {
    await renderComponentForVisualTest('KBreadcrumbsTest', {
      items: [
        { text: 'Home', link: { path: '/' } },
        {
          text: 'A very long breadcrumb text that should truncate properly when displayed in the component',
          link: { path: '/long' },
        },
        { text: 'Data', link: null },
      ],
      containerWidth: '400px',
    });
    await takeSnapshot('KBreadcrumbs - Long Text', snapshotOptions);
  });

  it.visual('Breadcrumbs - With Links', async () => {
    await renderComponentForVisualTest('KBreadcrumbsTest', {
      items: [
        { text: 'Home', link: { path: '/' } },
        { text: 'Library', link: { path: '/lib' } },
        { text: 'Files', link: { path: '/files' } },
      ],
      containerWidth: '600px',
    });
    await takeSnapshot('KBreadcrumbs - With Links', snapshotOptions);
  });

  it.visual('Breadcrumbs - Mixed Links with Dropdown Open', async () => {
    await renderComponentForVisualTest('KBreadcrumbsTest', {
      items: [
        { text: 'Home', link: null },
        { text: 'Library', link: { path: '/lib' } },
        { text: 'Resources', link: { path: '/resources' } },
        { text: 'Documents', link: { path: '/documents' } },
        { text: 'Files', link: null },
      ],
      containerWidth: '300px',
    });

    await page.waitForSelector('.breadcrumbs-dropdown-wrapper button', {
      visible: true,
      timeout: 5000,
    });
    await click('.breadcrumbs-dropdown-wrapper button');

    await page.waitFor(300);

    await takeSnapshot('KBreadcrumbs - Mixed Links with Dropdown Open', snapshotOptions);
  });
});
