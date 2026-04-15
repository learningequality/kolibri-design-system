# Visual Testing

KDS has a visual testing system that allows you to take Percy snapshots of how KDS components look in different browsers and compare them with previously set baseline versions. This enables you to quickly see visual differences resulting from changes in a pull request.

> **Note:** The original approach to structuring visual tests is now deprecated. For reference, you can find the archived documentation [here](./08_deprecated_visual_testing_guide.md).

## Prerequisites

- Ensure Node.js version is >= 20.x and all dependencies from package.json are installed.
- Make sure nothing is running on `port:4000`
- Obtain your `PERCY_TOKEN`:

### Percy token

- Create a [BrowserStack Percy](https://percy.io/) account.
- Go to the _Percy Dashboard_ and create a new project.
- Find your `PERCY_TOKEN` in the _Project settings_.

## Run tests locally

1. **Setup:**

   - Install dependencies:

     ```bash
     yarn install
     ```

   - Set the `PERCY_TOKEN` environment variable:

     ```bash
     export PERCY_TOKEN=<your-percy-token>
     ```

2. **Run visual tests:**

   - Execute the tests:

     ```bash
     yarn test:visual
     ```

3. **Check results:**

   - Go to the Percy Dashboard and review the results for the latest Percy build.

## Create visual tests for a component

Most commonly, each visual test scenario for a given component is placed as a `.vue` file in the [`/examples`](../examples) directory—a shared location for visual examples used in both documentation and visual testing. These example files are then imported into a single test page, `ComponentVisualTest.vue`, which is snapshotted by the component's Jest test suite.

A visual test page for a component typically includes (1) examples from the documentation website that are suitable for visual testing and (2) additional scenarios, such as edge cases. **Always check if there are existing `/examples` that can be imported into visual tests instead of duplicating scenarios.**

Let's see how this works in practice by writing visual tests for `KTextbox`:

1. **Create a page to contain all visual tests** for `KTextbox` in [`/lib/KTextbox/__tests__/components/KTextboxVisualTest.vue`](../lib/KTextbox/__tests__/components/KTextboxVisualTest.vue). This is the page that will be later snapshotted.

2. **For each scenario you wish to test, check if there is a visual example in the `/examples` directory, or add a new one.** For example, [`/examples/KTextbox/WithLabel.vue`](../examples/KTextbox/WithLabel.vue) shows a simple textbox with label, and [`/examples/KTextbox/Validation.vue`](../examples/KTextbox/Validation.vue) shows textbox with validation.

3. **Load the examples files** into `KTextboxVisualTest.vue` via `VisualTestExample`'s `loadExample` - the example file path relative to the `/examples` directory. Wrap all examples with `VisualTestLayout`. 

```html
<template>
  <VisualTestLayout>
    <VisualTestExample
      title="Label"
      width="400px"
      loadExample="KTextbox/WithLabel.vue"
    />

    <VisualTestExample
      title="Validation"
      width="400px"
      loadExample="KTextbox/Validation.vue"
    />

    ...

  </VisualTestLayout>
</template
```

4. **Register** `KTextboxVisualTest.vue` in [`/jest.conf/visual.load-test-components.js`](../jest.conf/visual.load-test-components.js).
   
```javascript
import KTextboxVisualTest from '~~/lib/KTextbox/__tests__/components/KTextboxVisualTest.vue';

Vue.component('KTextboxVisualTest', KTextboxVisualTest);
```

5. **Add `visual.spec.js`** for `KTextbox` ([`/lib/KTextbox/__tests__/visual.spec.js`](../lib/KTextbox/__tests__/visual.spec.js)). Use `renderComponentForVisualTest` and `takeSnapshot` to capture the `KTextboxVisualTest` snapshot. **Be sure to use `describe.visual` or `it.visual` instead of the default Jest notations.** For a full list of available snapshot options for `takeSnapshot`, refer to the [Percy documentation](https://www.browserstack.com/docs/percy/take-percy-snapshots/snapshots-via-scripts#per-snapshot-configuration).
   
```javascript
import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KTextbox visual tests', () => {
  const snapshotOptions = { widths: [800], minHeight: 512 };
  it('renders', async () => {
    await renderComponentForVisualTest('KTextboxVisualTest');
    await takeSnapshot('KTextbox visual tests', snapshotOptions);
  });
});

```

6. **Run the tests and preview the results** in your Percy Dashboard.

```bash
yarn test:visual
```

7. If everything looks good, open a pull request. **One of the Learning Equality Browserstack team members must approve our GitHub Actions workflow to run Percy for the KDS project**. Once approved, visual tests are run automatically and the results are reported as a comment containing a link to the Percy build.

**Note:** Developers outside of Learning Equality can only review the visual changes for local test runs.

## Simulate interactions

You can use utility functions to simulate user interactions. Let's add a new scenario to the `KTextbox` test page we created above that checks the active state of the textbox.

If there is no suitable example for visual testing interactions, add a new one. In this case, we can reuse the `WithLabel.vue` example, and add an `id` attribute to it so that the click target can be located. Finally, import `click` from the visual testing utilities in the Jest file and await it before taking the snapshot.

```html
<!-- lib/KTextbox/__tests__/components/KTextboxVisualTest.vue -->
<template>
  <VisualTestLayout>
    <VisualTestExample
      title="Label"
      width="400px"
      loadExample="KTextbox/WithLabel.vue"
    />

    <VisualTestExample
      id="active-textbox"
      title="Active textbox"
      width="400px"
      loadExample="KTextbox/WithLabel.vue"
    />

    ...

  </VisualTestLayout>
</template
```

```javascript
// lib/KTextbox/__tests__/KTextbox.spec.js

import {
  click,
  renderComponentForVisualTest,
  takeSnapshot,
} from '../../../jest.conf/visual.testUtils';

describe.visual('KTextbox visual tests', () => {
  const snapshotOptions = { widths: [800], minHeight: 512 };
  it('renders', async () => {
    await renderComponentForVisualTest('KTextboxVisualTest');

    // Prepares active textbox test case
    await click('#active-textbox input');

    await takeSnapshot('KTextbox visual tests', snapshotOptions);
  });
});
```

Besides `click`, you can import other utilities for simulating user interactions from [`visual.testUtils.js`](../jest.conf/visual.testUtils.js):

- `click(selector)`
- `hover(selector)` (note that hover may not function properly)
- `scrollToPos(selector, scrollOptions)`
- `waitFor(selector)`
- `delay(time)`

## Development preview

When developing visual tests, it is more efficient to preview them locally rather than wait for a Percy build each time.

You can use the [playground page](../docs/pages/playground/index.vue). Simply import `ComponentVisualTest.vue`, run the KDS development server with `yarn dev`, and navigate to [http://localhost:4000/playground](http://localhost:4000/playground). There, you will see the page that will later be snapshotted.

```html
<!-- /docs/pages/playground/index.vue -->

<template>

  <KTextboxVisualTest />

</template>
```

```javascript
import KTextboxVisualTest from '~~/lib/KTextbox/__tests__/components/KTextboxVisualTest';

export default {
  name: 'Playground',
  components: {
    KTextboxVisualTest,
  },
};
```

---

<details>
<summary>Implementation details</summary>

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

</details>