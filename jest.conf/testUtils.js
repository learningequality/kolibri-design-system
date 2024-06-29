import { setMedia } from 'mock-match-media';

export const resizeWindow = (width, height = 768) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
  setMedia({
    width: `${width}px`,
    height: `${height}px`,
  });
};

export function canTakeScreenshot() {
  const percyToken = process.env.PERCY_TOKEN;
  const runVisualTests = process.env.TEST_TYPE === 'visual';
  if (runVisualTests && !percyToken) {
    throw new Error(
      'Error: Visual tests cannot be run because PERCY_TOKEN environment variable is not set.'
    );
  }
  return runVisualTests && percyToken;
}

export const testAfterResize = testFunction => {
  let animationFrameId;
  const assertAfterResize = () => {
    testFunction();
    animationFrameId = cancelAnimationFrame(animationFrameId);
  };
  animationFrameId = requestAnimationFrame(assertAfterResize);
};
