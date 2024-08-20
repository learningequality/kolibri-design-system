# Visual Testing

KDS has a visual testing system that allows you to take snapshots of how KDS Components would look like in different browsers, and compare them with the previously set baseline versions of these components, allowing you to see the visual differences in a PR's changes more quickly.

## Prerequisites

- Make sure that your Node version is > 18.x with all the requirements (listed in package.json) installed.
- Ensure that you declare the `PERCY_TOKEN` environment variable when running visual tests locally.
- You should not have anything running on `port:4000` as the visual testing server utilizes that port to run the tests.

## Guide to using the visual testing mechanism

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

  We use GitHub Actions to execute the visual testing workflow on every PR. When changes to a PR are made, a deployment request is initiated. Only **Learning Equality team members** can approve this request. Once approved, the deployment is executed, and visual tests are run automatically. The results of the test run are surfaced in the form of an automated comment containing a link to the Percy build.

  **Note:** Developers outside of Learning Equality can only review the visual changes for local test runs. To review the visual tests executions that run on GitHub Actions, one needs to be a part of Learning Equality's Browserstack team.

### Writing visual tests

  You can write the visual tests alongside the unit tests, i.e. in the same test file. Take a look at [`KButton.spec.js`](../lib/buttons-and-links/__tests__/KButton.spec.js) to familiarize yourself with writing visual tests.

1. **Import Utility Functions**:
   - Import the utility functions from [`visual.testUtils.js`](../jest.conf/visual.testUtils.js):

     ```javascript
     import { renderComponent, takeSnapshot } from './visual.testUtils';
     ```

     You can also import and use the utility functions for managing component's visual states as needed. Different utility functions available are:

      - `renderComponent(component, props, slots)`: Renders the specified component with given props and slots in the visual testing playground.
      - `takeSnapshot(name, options)`: Takes a Percy snapshot with the given name and options.
      - `click(selector)`, `hover(selector)`, `scrollToPos(selector, scrollOptions)`, `waitFor(selector)`, `delay(time)`: Utility functions for simulating user interactions.

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

   - For rendering complex commponents, refer to the following:

      - **Example with slots:** For components that involve slots, you can render them with `renderComponent` by passing the slot structure using element and elementProps. You can pass multiple slots at once.

           ```javascript
            await renderComponent('KIconButton', { icon: 'add' }, {
              menu: { // slot named #menu
                element: 'KDropdownMenu',
                elementProps: {
                  items: ['Option 1', 'Option 2'],
                },
              },
            }); 
          ```

          **Note:** Use `'default'` key for passing default slots, with the HTML content specified using `innerHTML` prop. Checkout [`KButton.spec.js`](../lib/buttons-and-links/__tests__/KButton.spec.js) for reference.

      - **Example involving more complex component structures:** When dealing with more complex component structures, it's recommended to create a dedicated Vue component for visual testing purposes. Add all the use cases in a Vue file and then render the custom component using the `renderComponent` function. 

          ```javascript
            await renderComponent('CustomVueComponent');
          ```

          This approach ensures that all necessary child components and slots are correctly set up and rendered.

   - Make sure to use `describe.visual` or `it.visual` instead of the default notations for writing test blocks containing visual tests so as to prevent any unexpected behavior. These custom blocks add a [Visual] tag to the test name whose presence or absence are then checked using a regex pattern based on the type of tests executed. This implementation helps us to determine which test blocks should be executed by Jest and which ones should be skipped.

3. **Simulate User Interactions**:
   - Use the custom commands to simulate user interactions. For example, to simulate the *'click'* user event, you can do something like:

     ```javascript
      await click('button');
     ```

     Here, *'button'* is the CSS selector for the component. You can pass different selectors to the functions, exposed by [`visual.testUtils.js`](../jest.conf/visual.testUtils.js), to simulate user interaction as per requirement.

## Implementation details

  The visual testing mechanism uses the following dependencies to ensure components render correctly under various conditions:

  - **Puppeteer:** for interacting with the testing environment and the rendered components.
  - **Jest-Puppeteer:** to provide all required configuration to run tests using Puppeteer.
  - **Percy:** to take snapshots for comparing visual diffs.
  
  The key parts of the mechanism include:

1. **Configuration Files**: Since we are using Jest for both unit and visual tests, there are two separate configuration files for visual tests apart from the ones being used for unit tests so as to ensure separation of logic needed for running both types of tests.
   - [***visual.index.js***](../jest.conf/visual.index.js): Configures Jest-Puppeteer and includes server checks to ensure the visual testing playground is up and running.
   - [***visual.setup.js***](../jest.conf/visual.setup.js): Sets up global functions and constants needed for visual tests.

2. **Utility Functions** [***(visual.testUtils.js)***](../jest.conf/visual.testUtils.js): We are also using a separate file that contains all the utility functions that are needed for writing visual tests.

3. **Visual Testing Playground** ([***testing-playground.vue***](../docs/pages/testing-playground.vue)):
   - A dedicated page rendered by the devserver for component visual testing, ensuring expected visual behavior under various conditions.
   - The visual test command runs the devserver and once the server is up and the testing playground page is loaded, the visual tests are executed and the required components are rendered dynamically based on messages received from the test runner.
