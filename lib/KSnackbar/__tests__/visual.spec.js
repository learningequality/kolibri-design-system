import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KSnackbar visual tests', () => {
  const snapshotOptions = { widths: [800] };
  it('renders correctly', async () => {
    await renderComponentForVisualTest('KSnackbarVisualTest');
    await takeSnapshot('KSnackbar visual tests', snapshotOptions);
  });
});
