import {
  renderComponentForVisualTest,
  takeSnapshot,
} from '../../../../../jest.conf/visual.testUtils';

describe.visual('KMultiSelect visual tests', () => {
  const snapshotOptions = { widths: [900] };
  it('renders', async () => {
    await renderComponentForVisualTest('KMultiSelectVisualTest');
    await takeSnapshot('KMultiSelect visual tests', snapshotOptions);
  });
});
