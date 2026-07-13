import {
  renderComponentForVisualTest,
  takeSnapshot,
} from '../../../../../jest.conf/visual.testUtils';

describe.visual('KListbox visual tests', () => {
  const snapshotOptions = { widths: [600] };
  it('renders', async () => {
    await renderComponentForVisualTest('KListboxVisualTest');
    await takeSnapshot('KListbox visual tests', snapshotOptions);
  });
});
