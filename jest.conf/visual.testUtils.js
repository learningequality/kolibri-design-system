import percySnapshot from '@percy/puppeteer';

export async function renderComponent(component, props) {
  const initialState = await page.evaluate(() => {
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

  await page.waitForFunction(
    initialState => {
      const testing_playground = document.querySelector('#testing-playground');
      return testing_playground && testing_playground.innerHTML !== initialState;
    },
    {},
    initialState
  );
  const isComponentRendered = await page.evaluate(initialState => {
    const testing_playground = document.querySelector('#testing-playground');
    return testing_playground && testing_playground.innerHTML !== initialState;
  }, initialState);

  global.expect(isComponentRendered).toBe(true);
}

export async function takeSnapshot(name) {
  if (process.env.TEST_TYPE == 'visual') {
    await percySnapshot(page, name);
  }
}
