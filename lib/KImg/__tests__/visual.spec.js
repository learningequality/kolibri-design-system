import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KImg visual tests', () => {
  const snapshotOptions = { widths: [800], minHeight: 512 };
  it('renders', async () => {
    await renderComponentForVisualTest('KImgVisualTest');
    await takeSnapshot('KImg visual tests', snapshotOptions);
  });
});
