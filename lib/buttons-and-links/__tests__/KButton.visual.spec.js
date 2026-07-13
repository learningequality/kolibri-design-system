import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KButton visual tests', () => {
  const snapshotOptions = { widths: [800], minHeight: 512 };
  it('renders correctly with different appearances', async () => {
    await renderComponentForVisualTest('KButtonVisualTest');
    await takeSnapshot('KButton visual tests', snapshotOptions);
  });
});
