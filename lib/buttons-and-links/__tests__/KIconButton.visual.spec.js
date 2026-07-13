import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KIconButton visual tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };
  it('renders correctly with different appearances', async () => {
    await renderComponentForVisualTest('KIconButtonVisualTest');
    await takeSnapshot('KIconButton visual tests', snapshotOptions);
  });
});
