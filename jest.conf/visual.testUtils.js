import percySnapshot from '@percy/puppeteer';

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
