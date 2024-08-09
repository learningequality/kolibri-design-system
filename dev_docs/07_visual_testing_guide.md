# Visual Testing

The KDS now has a visual testing system integrated into it, using which you can verify the expected visual states after making any changes to the components.

## Implementation details

  The visual testing mechanism uses Puppeteer(for interacting with the testing environment and the rendered components), Jest-Puppeteer(to provide all required configuration to run tests using Puppeteer.), and Percy(to take snapshots for comparing visual diffs) to ensure components render correctly under various conditions. The key components include:

1. **Configuration Files**:
   - ***visual.index.js***: Configures Jest-Puppeteer and includes server checks to ensure the visual testing playground is up and running.
   - ***visual.setup.js***: Sets up global functions and constants needed for visual tests.
   - ***percy.yml***: Configures Percy with snapshot widths, minimum height, and other settings.

2. **Utility Functions** ***(visual.testUtils.js)***:
   - `renderComponent(component, props, slots)`: Renders the specified component with given props and slots in the visual testing playground.
   - `takeSnapshot(name, options)`: Takes a Percy snapshot with the given name and options.
   - `click(selector)`, `hover(selector)`, `scrollToPos(selector, scrollOptions)`, `waitFor(selector)`, `delay(time)`: Utility functions for simulating user interactions.

3. **Visual Testing Playground** (***testing-playground.js***):
   - A dedicated page for component visual testing, ensuring expected visual behavior under various conditions.
   - Dynamically renders components based on messages received from the test runner.

## Prerequisites

- Make sure that your Node version is > 18.x with all the rquirements(listed in package.json) installed.
- Ensure that you declare the PERCY_TOKEN environment varibale when runnning visual tests locally.
- You should not have anything running on port:4000 as the visual testing server utilizes that port to run the tests.

## Guide to use the visual testing mechanism

### Running visual tests locally

1. **Setup**:
   - Ensure all dependencies are installed:

     ```bash
     yarn install
     ```

   - Set the `PERCY_TOKEN` environment variable:

     ```bash
     export PERCY_TOKEN=<your-percy-token>
     ```

2. **Run Visual Tests**:
   - Execute the tests with the visual testing configuration:

     ```bash
     yarn test:visual
     ```

3. **Check results**:
   - Head over to the Percy Dashboard and check the results for the latest Percy build.

### Visual testing workflow

  The visual testing workflow is integrated with GitHub Actions. When changes are made, a deployment request is initiated. Only Learning Equality team members can approve this request. Once approved, the deployment is executed, and visual tests are run automatically. The results of the test run are surfacedin the form of an automated comment containing a link to the Percy build.

### Writing visual tests

  You can write the visual tests long with the unit tests, i.e. in the same test file. Take a look at `KButton.spec.js` to familiarize yourself with writing visual tests.

1. **Import Utility Functions**:
   - Import the utility functions from `visual.testUtils.js`:

     ```javascript
     import { renderComponent, takeSnapshot } from './visual.testUtils';
     ```

     You can also import and use the utility functions for managing component's visual states as per requirement. To get an overview of the different utility functions available, please checkout `visual.testUtils.js`.

2. **Write Tests**:
   - Use the utility functions to render components and take snapshots. For example:

     ```javascript
     describe.visual('KButton Visual Tests', () => {
       it('Sample test for KButton', async () => {
         await renderComponent('KButton', { text: 'Raised Button', appearance: 'raised-button' });
         await takeSnapshot('KButton - Raised Button', { widths: [375, 520] });
       });
     });
     ```

   - Make sure to use `describe.visual` or `it.visual` instead of the default notations for writing test blocks containing visual tests so as to prevent any unexpected behavior.

3. **Simulate User Interactions**:
   - Use the custom commands to simulate user interactions. For example, to simulate the *'click'* user event, you can do something like:

     ```javascript
      await click('button');
     ```

     Here, *'button'* is the CSS tag for the component. You can pass different selectors to the functions used to simulate user interaction as per requirement.
