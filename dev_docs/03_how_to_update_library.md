# How to update the component library

The design system has two primary parts, the UI component library [`/lib`](../lib/) and the documentation website [`/docs`](../docs/). The following guidelines will help you update the component library. For guidance on developing the documentation website, see [How to update the documentation website](./04_how_to_update_docs.md).

## Prerequisites

Your development server is set up and running at http://localhost:4000/ as described in [Getting started](./01_getting_started.md).

## Add/update a component

Library components are located in [`/lib`](../lib/). If a component is made up of sub-components in separate files, it will typically be placed in a folder.

**How to add a new component**

1. Create a new component file in [`/lib`](../lib/)
2. In [KThemePlugin](../lib/KThemePlugin.js), import the component and make it globally accessible by registering it with `Vue.component` (see other components)

See the section below to learn how to preview your new component.

## Visually testing components updates

There are two ways to visually test updates as you're developing:
- (1) In Kolibri Design System environment
- (2) In a product that uses Kolibri Design System

See the two sections below for detailed guidance.

Option (1) is simpler and sufficient as the first step, so we recommend starting that way. On certain occasions, it may be necessary to test an update in a product. If you're a contributor, you are welcome to try (2) as well, but typically we do not require contributors to do so, or we will provide support if needed.

### (1) Preview updates in the Kolibri Design System environment

The documentation development server can be used to visually test components updates in the following ways:

**Playground page**

Open [/docs/pages/playground/index.vue](../docs/pages/playground/index.vue) and add a component you're working on there. Then, as you're developing, you will see it update live at http://localhost:4000/playground. See an example in the playground file.

If you are working on a new component, make sure to register it first in `KThemePlugin` as described in the "How to add a new component" section above in order to make it available on the playground page.

Please do not commit any updates to the playground file as it's meant as your local preview only. This will help other developers have it ready for their own work.

**Components documentation pages**

The majority of existing components have documentation pages that often show live components in different states. One example of this can be seen on the `KBreadcrumbs` component documentation page at http://localhost:4000/kbreadcrumbs. The documentation page source code is located in [`/docs/pages/kbreadcrumbs.vue`](../docs/pages/kbreadcrumbs.vue).

You can find links to documentation pages for existing components on the documentation website in the "Code library components" section at the bottom of the side navigation.

If there is already a documentation page for a component, please ensure that any new updates don't break examples on the page. Additionally, you may also consider adding new examples to the documentation if applicable. See [How to update the documentation website](./04_how_to_update_docs.md) to find out more about updating documentation content. You can also review existing documentation pages in the [`/docs/pages`](../docs/pages) directory to familiarize yourself with the source code for the documentation.

When creating a new component, it is recommended to add a new documentation page for it as described in the "Create a documentation page for a new component" section of [How to update the documentation website](./04_how_to_update_docs.md). Even if you are not specifically writing documentation, certain sections of the documentation page will be automatically generated from the component's props and related.

### (2) Preview updates in a product

You can test local Kolibri Design System updates reflected in a product that is using it, such as [Kolibri Learning Platform](https://github.com/learningequality/kolibri) or [Kolibri Studio](https://github.com/learningequality/studio).

For Kolibri Learning Platform, we recommend `devserver-with-kds` command. See ["Running Kolibri with local Kolibri Design System"](https://kolibri-dev.readthedocs.io/en/develop/howtos/development_with_kds.html) guide.

In other products, you can use `yarn link`:

1. While in the root of your local `kolibri-design-system` repository, run `yarn link`.
2. In the root of a product where you intend to use `kolibri-design-system` run `yarn link kolibri-design-system` and then `yarn install`.

Now, when you run the product your changes in `kolibri-design-system` will be updated live when running the product's development server.

For example, to test Kolibri Design System in Kolibri Studio (local `studio` repository):

```bash
# change to the Kolibri Design System repository and add it to yarn's local package registry
cd ./kolibri-design-system
yarn link

# change to the Kolibri repository and link it to the local Kolibri Design System package
cd ../studio
yarn link kolibri-design-system

# re-install Studio dependencies
yarn install

# run the Studio development server
yarn run devserver
```

Now you're all set to see your changes to the Kolibri Design System working live in Studio!
