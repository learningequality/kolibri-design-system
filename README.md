[![Netlify Status](https://api.netlify.com/api/v1/badges/9ae9ac56-7240-4480-b5a8-01645cb903ca/deploy-status)](https://app.netlify.com/sites/kolibri-design-system/deploys) ![Lint](https://github.com/learningequality/kolibri-design-system/workflows/Lint/badge.svg?branch=v0.2.x)


# Kolibri Design System

Note that the Kolibri Design System is not intended to be used as a dependency outside of Kolibri products.

If you are building a Kolibri plugin you should _not_ add the design system as a dependency because it will be made available as a dependency of Kolibri itself.

## Usage

### Documentation

See **[design-system.learningequality.org](https://design-system.learningequality.org)** for the latest design system documentation.

This contains resources for designers and developers who are building Kolibri products using the design system patterns and the shared UI library.

### Shared UI library

The shared UI library is a node package containing front-end components, utilities, and style definitions supporting the Kolibri Design System and used in Learning Equality applications.

It is currently hosted only on Github, not NPM. To add a particular pinned version to your project using `yarn`, run:

```bash
yarn add https://github.com/learningequality/kolibri-design-system
```

You can also specify a particular version of the design system. For example, this would specify `v1.0.1`:

```bash
yarn add https://github.com/learningequality/kolibri-design-system#v1.0.1
```

Importable components and utilities are available under the `lib` path, for example:

```javascript
import KButton from 'kolibri-design-system/lib/KButton';
```

The shared UI library is made available as source code, not a built distribution, and requires the external application to supply both build and runtime dependencies such as webpack, Vue, and Sass. These requirements will eventually be specified in `/package.json` as `peerDependencies` - ref: [#20](https://github.com/learningequality/kolibri-design-system/issues/20).

The public API of the shared UI library is _only_ that which is documented in the documentation. Functionality which is not documented should be considered either experimental or a private implementation detail.


## Development of the documentation site

How to make updates to the Kolibri Design System

### Overview

The design system has two primary components, the shared UI library (under `/lib`) and the documentation site (under `/docs`).

The shared UI library code is built from Vue, Javascript, and Sass. It requires the dependencies specified under the `dependencies` and `peerDependencies` attributes of `/package.json`. An external application will import and functionality from `kolibri-design-system/lib` as [described in the documentation](https://kolibri-design-system.netlify.app), and then generate build artifacts as necessary for the application's specific deployment or distribution requirements.

The documentation site is built using [NuxtJS](https://nuxtjs.org/) and [Vue](https://vuejs.org/). It requires the dependencies specified in the `devDependencies` attribute of `/package.json` to build and run. The documentation site can either be run locally using the Node.js development server, or exported as a static site and uploaded to a CDNde


### Running the documentation locally

Clone this repository using [Git](https://help.github.com/en/github/getting-started-with-github/set-up-git), optionally [forking](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) it first if you plan to submit changes.

First, change to the directory where you cloned the repo:

```bash
cd kolibri-design-system
```

Install the dependencies using `yarn`:

```bash
yarn install
```

(Note: if you see a timeout error like `ESOCKETTIMEDOUT`, you can configure yarn with a higher timeout value [as described here](https://github.com/yarnpkg/yarn/issues/5540#issuecomment-374069461).)

Run the development server using

```bash
yarn dev
```

This will launch a documentation development server at `http://localhost:4000/`. It also launches a linter and auto-formatter based on the [`kolibri-tools`](https://github.com/learningequality/kolibri/tree/develop/packages/kolibri-tools) package.

There are few other commands available:

```bash
yarn dev-only    # launch just the dev server without the linter and auto-formatter
yarn generate    # build a static version of the site for upload to CDN
yarn lint-fix    # run the linter and auto-formatter once
yarn lint-watch  # run the linter in watch mode, without the auto-formatter
```

### Development environment

You'll need version 10.x of Node.js installed. See the [Node Version Manager](https://github.com/nvm-sh/nvm) for help.

When setting up your text editor, it's useful to ignore the following directories:

* `node_modules`
* `.nuxt`
* `dist`

You may also want to install syntax highlighters in your editor for Vue and SASS.

Finally, it's useful to have the Vue development tools installed in your web browser.


### Making changes to content

The documentation site is built using [NuxtJS](https://nuxtjs.org/) (configured in `/nuxt.config.js`) and [Vue](https://vuejs.org/).

The directories and files in `/docs/pages/` are mapped by NuxtJS to URLs. Start with those files for making updates to documentation content. The table of contents, including sections and pages, are defined in `/docs/tableOfContents.js`.

Common components used in the documentation site are prefixed with `Docs*` and available for use in all pages.

Layout:

* `<DocsPageTemplate />` - the main page template used by all pages
* `<DocsPageSection />` - sections within the page template with auto-generated anchor links

Links:

* `<DocsAnchorTarget />` - for creating anchor link targets
* `<DocsExternalLink />` - links to an external website
* `<DocsInternalLink />` - links to pages within the design system
* `<DocsLibraryLink />` - links to library components with `<code>` formatting

Illustration:

* `<DocsShow />` - for showing a theme color
* `<DocsDoNot />` - for showing side-by-side "Do" and "Do not" illustrations
* `<DocsColorBlock />` - for showing a theme color
* `<DocsIconBlock />` - for showing an icon


All Kolibri shared components (for example `KButton`) are also available to be used within content. However, this should be limited to using them for _examples of usage_ only.


### Making changes to component docs

The `DocsPageTemplate` component takes an optional Boolean prop called `apiDocs`. When provided, the template will look for a shared library component with the same name, extract documentation for the component's props, events, slots, and methods, and display those at the bottom of the page after any other `DocsPageSection` components.

To make updates to this content, modify the library component directly. We support a combination of Markdown and JSDocs inside the components.

JSDocs functionality is primarily provided by the [`vue-docgen-api`](https://www.npmjs.com/package/vue-docgen-api) package. For more information, see [Documenting components](https://vue-styleguidist.github.io/docs/Documenting.html). Note that we leverage a specific subset of the functionality described there. Documenting this is an [open issue](https://github.com/learningequality/kolibri-design-system/issues/222).


### Adding dependencies

There is one top-level `package.json` file, and:

* Dependencies used by the shared component library (`/lib`) are in `dependencies`
* Some other dependencies used by the shared component library (`/lib`) are expected/assumed to be provided by the library user
* _All_ other design system dependencies should be specified in `devDependencies`. This includes both build and run-time Nuxt-related dependencies

See [issue #20](https://github.com/learningequality/kolibri-design-system/issues/20) for more information about how this situation could be improved.


### Design of the documentation site

The documentation site itself intentionally does _not_ conform to the design system it describes, for two reasons:

1. The user-interface of the site (links, buttons, headers, etc) is intentionally built _without_ depending on the Kolibri shared UI library. This helps ensure as we update the UI library, we only need to update content and examples in the documentation, not the implementation of the documentation.
2. From a design perspective, it's important that the documentation site looks and feels sufficiently distinct from the design patterns it describes, so that users do not mistakenly immitate it. Instead, users should focus on the patterns that are explicitly documented.

From a coding perspective this means that references to `~~/lib` code should in general only appear in `~/pages/` as illustrations of the shared UI library. However, we might decide on a case-by-case basis to have occasional exceptions to this rule. For example, we currently use `~~/lib/KResponsiveElementMixin` inside `~/common/Header` because it would be excessive to duplicate that functionality.


### Routing

We do _not_ use client-side routing. The reason is that we make extensive use of `#anchor` links, and there are many issues in both [NuxtJS](https://github.com/nuxt/nuxt.js/issues/5359) and [Vue Router](https://stackoverflow.com/questions/45201014/how-to-handle-anchors-bookmarks-with-vue-router/45206192) with mixing anchors and client-side routing. In practice, this means that there should be no instances of `<router-link>` or `<nuxt-link>` in documentation code.


### Import aliases

NuxtJS provides two webpack [import aliases](https://nuxtjs.org/guide/directory-structure#aliases):

* `~~/` points to the root of the repository
* `~/` points to the `/docs` directory

These aliases should _not_ be used by code inside the `/lib` directory because external webpack configurations will not handle them correctly.


### Deployment

The documentation site is currently deployed to Netlifty automatically when changes are pushed to one of the primary branches. This is configured in the Netlify web UI to run `yarn generate` and point at the created `dist` directory.

Netlify is authenticated with the [Netlify GitHub app](https://docs.netlify.com/configure-builds/repo-permissions-linking/#authentication-with-the-netlify-github-app).

Note that we currently use the deprecated Nuxt.js `mode: universal` flag, and should switch to the newer `target: static` flag.


### SVG Icons

There are three sources of icons:

- [Google Material Design Icons](https://github.com/material-icons/material-icons) (a version pinned in [yarn.lock](yarn.lock))
- [Material Design Icons](https://github.com/Templarian/MaterialDesign-SVG) (a version pinned in [yarn.lock](yarn.lock))
- [Custom Learning Equality icons](custom-icons)

Icons from these sources are then converted to Vue components by our custom precompilation script. After updating any of these sources, we need to regenerate the Vue components by running:

```bash
yarn run precompile-svgs
```

You can also regenerate just the custom icons which is faster:

```bash
yarn run precompile-custom-svgs
```

One of these commands should be run after any icon changes.

We don't expose all icons in our KDS public API. Only icons defined in [the icons definitions file](lib/KIcon/iconDefinitions.js) are exposed, and we use our custom aliases for them.

In order to use icons in documentation we also output a set of reStructuredText replacement strings. These are added the file `docs/rstIconReplacements.txt` which can be used in docs based on Sphinx. The file is available for download from https://design-system.learningequality.org/icons/#rst

This command should be run after any icon ID changes.

```bash
yarn run pregenerate
```

#### Example: Upgrading Google Material Design Icons

It is advised to commit changes at each step to make reviewing files other than those in *precompiled-icons/* easier, especially in case of large updates.

1. Run `yarn upgrade @material-icons/svg`
2. Run `yarn run precompile-svgs`
3. Review updates of all public icons defined in [the icons definitions file](lib/KIcon/iconDefinitions.js)

Large upgrades can result in a colossal git diff which makes reviewing changes of selected public icons in detail difficult. To make such upgrades smoother, in addition to visually reviewing [icons in KDS documentation](https://design-system.learningequality.org/icons/#icons), you can use a report that is printed in a terminal as soon as the precompilation process ends. It contains all exposed icons aliases together with information about whether an icon has been updated or no. If it's been updated, git diff will be printed.

4. Run `yarn run pregenerate`
5. Write down notes to the changelog about any public updates like visual changes of icons, updates of their aliases, and updates of reStructuredText replacement strings

### Development in parallel with other applications

If you are working on the design system library code in this repo and want to see local updates reflected in other applications that are using this library, then you will need to do a few things.

1. While in the root of your local `kolibri-design-system` repository, run `yarn link`.
2. In the root of the application where you intend to use `kolibri-design-system` run `yarn link kolibri-design-system` and then `yarn install`.

Now, when you run the application your changes in `kolibri-design-system` will be updated live where your app expects its dependency on `kolibri-design-system` to live.

For example, given that you have `./kolibri` and `./kolibri-design-system` folders with their respective local repositories:

```bash
# change to the KDS repo and add it to yarn's local package registry
cd ./kolibri-design-system
yarn link

# change to the Kolibri repo and link to the local package
cd ../kolibri
yarn link kolibri-design-system

# re-install dependencies
yarn install

# run the Kolibri devserver
yarn run devserver
```

Now you're all set to see your changes to the Kolibri Design System working live in Kolibri!
