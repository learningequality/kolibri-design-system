import { setMedia } from 'mock-match-media';

const percySnapshot = require('@percy/puppeteer');

export const resizeWindow = (width, height = 768) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
  setMedia({
    width: `${width}px`,
    height: `${height}px`,
  });
};

export const testAfterResize = testFunction => {
  let animationFrameId;
  const assertAfterResize = () => {
    testFunction();
    animationFrameId = cancelAnimationFrame(animationFrameId);
  };
  animationFrameId = requestAnimationFrame(assertAfterResize);
};

export async function renderComponent(page, component, props) {
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

  const isComponentRendered = await page.evaluate(() => {
    const testing_playground = document.querySelector('#testing-playground');
    return testing_playground && testing_playground.children.length > 0;
  });

  if (!isComponentRendered) {
    // eslint-disable-next-line no-console
    console.error('Component did not render in the testing playground');
  }
}

export async function takeSnapshot(page, name) {
  if (process.env.TEST_TYPE == 'visual') {
    await percySnapshot(page, name);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Skipping Percy snapshot: ${name}`);
  }
}

export function describeUnit(name, fn) {
  if (process.env.TEST_TYPE != 'visual') {
    describe(name, fn);
  }
}

export function describeVisual(name, fn) {
  if (process.env.TEST_TYPE == 'visual') {
    describe(name, fn);
  }
}
