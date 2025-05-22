# Visual Testing

KDS has a visual testing system that allows you to take snapshots of how KDS Components would look like in different browsers, and compare them with the previously set baseline versions of these components, allowing you to see the visual differences in a PR's changes more quickly.

## Prerequisites

- Make sure that your Node version is >= 18.x with all the requirements (listed in package.json) installed.
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
     import { renderComponentForVisualTest, takeSnapshot } from './visual.testUtils';
     ```

     You can import and use the utility functions for managing component's visual states as needed. Different utility functions available are:

     - `renderComponentForVisualTest(component, props, slots)`: Renders the specified component with given props and slots in the visual testing playground.
     - `takeSnapshot(name, options)`: Takes a Percy snapshot with the given name and options.
     - `click(selector)`, `hover(selector)`, `scrollToPos(selector, scrollOptions)`, `waitFor(selector)`, `delay(time)`: Utility functions for simulating user interactions.

2. **Write Tests**:

   - Use the utility functions to render components and take snapshots. For example:

     ```javascript
     describe.visual('KButton Visual Tests', () => {
       it('Sample test for KButton', async () => {
         await renderComponentForVisualTest('KButton', {
           text: 'Raised Button',
           appearance: 'raised-button',
         });
         await takeSnapshot('KButton - Raised Button', { widths: [375, 520] });
       });
     });
     ```

    The components we can render with `renderComponentForVisualTest` are the ones that are already registered for the KDS Docs nuxt server, that means, the KDS components that are exposed in [KThemePlugin](../lib/KThemePlugin.js), and the docs common components that are registered in the [load-common-components.js file](../docs/plugins/load-common-components.js). If you need to use a component that is not registered here, you can refer to the **Example involving more complex component structures** point below.

     Note that the `widths` parameter passed to the `takeSnaphot` function is a part of Percy CLI's snapshot options. For a full list of available options, refer the [Percy documentation](https://www.browserstack.com/docs/percy/take-percy-snapshots/snapshots-via-scripts#per-snapshot-configuration).

   - For rendering complex commponents, refer to the following:

     - **Example with slots:** For components that involve slots, you can render them with `renderComponentForVisualTest` by passing the slot structure using element and elementProps. You can pass multiple slots at once.

       ```javascript
       await renderComponentForVisualTest(
         'KIconButton',
         { icon: 'add' },
         {
           menu: {
             // slot named #menu
             element: 'KDropdownMenu',
             elementProps: {
               items: ['Option 1', 'Option 2'],
             },
           },
         }
       );
       ```

       **Note:** Use `'default'` key for passing default slots, with the HTML content specified using `innerHTML` prop. Checkout [`KButton.spec.js`](../lib/buttons-and-links/__tests__/KButton.spec.js) for reference.

     - **Example involving more complex component structures:** When dealing with more complex component structures, it's recommended to create a dedicated test component for visual testing purposes.

       - This custom component should be placed in the same directory as the test file, inside a `components` folder with a name following the pattern `K[TestCase]Test.vue`
         - e.g.: `/lib/KImg/__tests__/components/KImgTest.vue`.
       - Then you will need to declare this component in the the [visual.load-test-components.js](../jest.conf/visual.load-test-components.js) file so that its available for rendering in the visual testing playground.

         - e.g.:

           ```javascript
           import KImgTest from '~~/lib/KImg/__tests__/components/KImgTest.vue';

           ...

           Vue.component('KImgTest', KImgTest);
           ```

       - Finally, you can then use the test component name in the `renderComponentForVisualTest` method.

         ```javascript
         await renderComponentForVisualTest('KImgTest', { someProp: 'someValue' });
         ```

         This approach ensures that all necessary child components and slots are correctly set up and rendered.

         **Note:** You don't need to do this for KDS components that are already registered in our KThemePlugin or the docs common components that are registered in the [load-common-components.js file](../docs/plugins/load-common-components.js) as they are already available for rendering in the visual testing playground.

   - Make sure to use `describe.visual` or `it.visual` instead of the default notations for writing test blocks containing visual tests so as to prevent any unexpected behavior. These custom blocks add a `[Visual]` tag to the test name whose presence or absence are then checked using a regex pattern based on the type of tests executed.
     - Anything inside these blocks will not be executed when running unit tests. The default `describe` and `it` blocks can be used inside a parent `describe.visual` block, which itelf can be placed within a `describe` block as its parent (as `describe` blocks just group the tests placed within them).
     - In simple terms, any test block with a `[Visual]` tag will be executed when running visual tests, regardless of the type of test blocks used within it, and will be ignored when running unit tests. Using `describe.visual` or `it.visual` automatically appends this tag to the test name.
     - This implementation helps determine which test blocks should be executed by Jest and which ones should be skipped.

3. **Simulate User Interactions**:

   - Use the custom commands to simulate user interactions. For example, to simulate the _'click'_ user event, you can do something like:

     ```javascript
     await click('button');
     ```

     Here, _'button'_ is the CSS selector for the component. You can pass different selectors to the functions, exposed by [`visual.testUtils.js`](../jest.conf/visual.testUtils.js), to simulate user interaction as per requirement.

## Implementation details

The visual testing mechanism uses the following dependencies to ensure components render correctly under various conditions:

- **Puppeteer:** for interacting with the testing environment and the rendered components.
- **Jest-Puppeteer:** to provide all required configuration to run tests using Puppeteer.
- **Percy:** to take snapshots for comparing visual diffs.

The key parts of the mechanism include:

1. **Configuration Files**: Since we are using Jest for both unit and visual tests, there are two separate configuration files for visual tests apart from the ones being used for unit tests so as to ensure separation of logic needed for running both types of tests.

   - [**_visual.index.js_**](../jest.conf/visual.index.js): Configures Jest-Puppeteer and includes server checks to ensure the visual testing playground is up and running.
   - [**_visual.setup.js_**](../jest.conf/visual.setup.js): Sets up global functions and constants needed for visual tests.

2. **Utility Functions** [**_(visual.testUtils.js)_**](../jest.conf/visual.testUtils.js): We are also using a separate file that contains all the utility functions that are needed for writing visual tests.

3. **Visual Testing Playground** ([**_testing-playground.vue_**](../docs/pages/testing-playground.vue)):
   - A dedicated page rendered by the devserver for component visual testing, ensuring expected visual behavior under various conditions.
   - The visual test command runs the devserver and once the server is up and the testing playground page is loaded, the visual tests are executed and the required components are rendered dynamically based on messages received from the test runner.
