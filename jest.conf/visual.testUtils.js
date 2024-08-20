import percySnapshot from '@percy/puppeteer';

/**
 * Renders a Vue component within the VisualTestingPlayground.
 *
 * @param {string} component - The name of the Vue component to render.
 * @param {Object} props - The props to pass to the component.
 * @param {Object} [slots={}] - An object representing the slots to pass to the component.
 * The structure of the `slots` object should be as follows:
 *
 * Example:
 * {
 *   default: {
 *     element: "div", // or any Vue component like KIcon
 *     elementProps: { class: "some-class" },
 *     innerHTML: "<div> Some nested <a>content</a> </div>"
 *   },
 *   menu: {
 *     element: "KDropdownMenu", // named slot content as a Vue component
 *     elementProps: { options: ['Option 1', 'Option 2'] },
 *   }
 * }
 *
 * `default` is for the default slot content, which can be raw HTML or another component.
 * Other keys correspond to named slots.
 */
export async function renderComponent(component, props, slots = {}) {
  const beforeRenderState = await page.evaluate(() => {
    const testing_playground = document.querySelector('#testing-playground');
    return testing_playground ? testing_playground.innerHTML : '';
  });

  await page.evaluate(
    ({ component, props, slots }) => {
      window.postMessage(
        {
          type: 'RENDER_COMPONENT',
          component: component,
          props: props,
          slots: slots,
        },
        '*'
      );
    },
    { component, props, slots }
  );
  await page.waitForSelector('#testing-playground');

  // Wait until the innerHTML of the testing playground changes, indicating that the component has been rendered.
  await page.waitForFunction(
    initialState => {
      const testing_playground = document.querySelector('#testing-playground');
      return testing_playground && testing_playground.innerHTML !== initialState;
    },
    {},
    beforeRenderState
  );

  // Check if the component has been rendered by comparing the initial state with the current state.
  const isComponentRendered = await page.evaluate(initialState => {
    const testing_playground = document.querySelector('#testing-playground');
    return testing_playground && testing_playground.innerHTML !== initialState;
  }, beforeRenderState);

  global.expect(isComponentRendered).toBe(true);
}

/**
 * Captures a visual snapshot of the current state of the page using Percy.
 *
 * @param {string} name - The name of the snapshot.
 * @param {Object} [options={}] - Additional options to customize the snapshot.
 * This can include options such as `widths`, `minHeight`, and some other Percy specific options.
 *
 * For a full list of available options, refer to the Percy documentation:
 * @see https://www.browserstack.com/docs/percy/take-percy-snapshots/snapshots-via-scripts#per-snapshot-configuration
 */
export async function takeSnapshot(name, options = {}) {
  if (process.env.TEST_TYPE == 'visual') {
    await percySnapshot(page, name, options);
  }
}

export async function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

export const click = async selector => {
  await page.locator(selector).click();
};

export const hover = async selector => {
  await page.locator(selector).hover();
};

export const scrollToPos = async (selector, scrollOptions) => {
  await page.locator(selector).scroll(scrollOptions);
};

export const waitFor = async selector => {
  await page.locator(selector).wait();
};
