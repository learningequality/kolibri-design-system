import percySnapshot from '@percy/puppeteer';

export async function renderComponent(component, props) {
  const beforeRenderState = await page.evaluate(() => {
    const testing_playground = document.querySelector('#testing-playground');
    return testing_playground ? testing_playground.innerHTML : '';
  });

  await page.evaluate(
    ({ component, props }) => {
      window.postMessage(
        {
          type: 'RENDER_COMPONENT',
          component: component,
          props: props,
        },
        '*'
      );
    },
    { component, props }
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

export async function takeSnapshot(name) {
  if (process.env.TEST_TYPE == 'visual') {
    await percySnapshot(page, name);
  }
}
