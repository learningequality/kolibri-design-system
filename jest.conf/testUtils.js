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

export const testAfterResize = testFunction => {
  let animationFrameId;
  const assertAfterResize = () => {
    testFunction();
    animationFrameId = cancelAnimationFrame(animationFrameId);
  };
  animationFrameId = requestAnimationFrame(assertAfterResize);
};
