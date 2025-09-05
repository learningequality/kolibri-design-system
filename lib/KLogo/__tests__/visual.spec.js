import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KLogo visual tests', () => {
  const snapshotOptions = { widths: [400], minHeight: 512 };
  it('renders', async () => {
    await renderComponentForVisualTest('KLogoVisualTest');
    await takeSnapshot('KLogo visual tests', snapshotOptions);
  });
});
