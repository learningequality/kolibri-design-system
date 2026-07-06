import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KToolbar visual tests', () => {
  const snapshotOptions = { widths: [800] };
  it('renders', async () => {
    await renderComponentForVisualTest('KToolbarVisualTest');
    await takeSnapshot('KToolbar visual tests', snapshotOptions);
  });
});
