// eslint-disable-next-line import/named
import { renderComponent, takeSnapshot, click } from '../../../jest.conf/visual.testUtils';

describe.visual('KDropdownMenu Visual Tests', () => {
  const snapshotOptions = { 
    widths: [400], 
    minHeight: 512
    // Removed percyCSS as suggested by mentor
  };

  it('renders KDropdownMenu variants', async () => {
    await renderComponent('KDropdownMenuTest');
    
    // Click the first button to open its dropdown
    await click('.test-case:nth-child(1) button');
    await takeSnapshot('KDropdownMenu - Single Item', snapshotOptions);
    
    // Click the second button to open its dropdown
    await click('.test-case:nth-child(2) button');
    await takeSnapshot('KDropdownMenu - Multiple Items', snapshotOptions);
    
    // Click the third button to open its dropdown
    await click('.test-case:nth-child(3) button');
    await takeSnapshot('KDropdownMenu - With Icons', snapshotOptions);
    
    // Click the fourth button to open its dropdown
    await click('.test-case:nth-child(4) button');
    await takeSnapshot('KDropdownMenu - With Header', snapshotOptions);
  });
});