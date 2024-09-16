# Miscellaneous

This is a collection of mostly internal notes.

## Tech stack

The shared UI library code is built from Vue, Javascript, and Sass. It requires the dependencies specified under the `dependencies` and `peerDependencies` attributes of `/package.json`. An external application will import and functionality from `kolibri-design-system/lib` as [described in the documentation](https://kolibri-design-system.netlify.app), and then generate build artifacts as necessary for the application's specific deployment or distribution requirements.

The documentation site is built using [NuxtJS](https://nuxtjs.org/) and [Vue](https://vuejs.org/). It requires the dependencies specified in the `devDependencies` attribute of `/package.json` to build and run. The documentation site can either be run locally using the Node.js development server, or exported as a static site and uploaded to a CDN.

## Adding dependencies

There is one top-level `package.json` file, and:

* Dependencies used by the shared component library (`/lib`) are in `dependencies`
* Some other dependencies used by the shared component library (`/lib`) are expected/assumed to be provided by the library user
* _All_ other design system dependencies should be specified in `devDependencies`. This includes both build and run-time Nuxt-related dependencies

See [issue #20](https://github.com/learningequality/kolibri-design-system/issues/20) for more information about how this situation could be improved.

## Deployment

The documentation site is currently deployed to Netlifty automatically when changes are pushed to one of the primary branches. This is configured in the Netlify web UI to run `yarn generate` and point at the created `dist` directory.

Netlify is authenticated with the [Netlify GitHub app](https://docs.netlify.com/configure-builds/repo-permissions-linking/#authentication-with-the-netlify-github-app).

Note that we currently use the deprecated Nuxt.js `mode: universal` flag, and should switch to the newer `target: static` flag.

## Design of the documentation site

The documentation site itself intentionally does _not_ conform to the design system it describes, for two reasons:

1. The user-interface of the site (links, buttons, headers, etc) is intentionally built _without_ depending on the Kolibri shared UI library. This helps ensure as we update the UI library, we only need to update content and examples in the documentation, not the implementation of the documentation.
2. From a design perspective, it's important that the documentation site looks and feels sufficiently distinct from the design patterns it describes, so that users do not mistakenly immitate it. Instead, users should focus on the patterns that are explicitly documented.

From a coding perspective this means that references to `~~/lib` code should in general only appear in `~/pages/` as illustrations of the shared UI library. However, we might decide on a case-by-case basis to have occasional exceptions to this rule.

## Routing

We do _not_ use client-side routing. The reason is that we make extensive use of `#anchor` links, and there are many issues in both [NuxtJS](https://github.com/nuxt/nuxt.js/issues/5359) and [Vue Router](https://stackoverflow.com/questions/45201014/how-to-handle-anchors-bookmarks-with-vue-router/45206192) with mixing anchors and client-side routing. In practice, this means that there should be no instances of `<router-link>` or `<nuxt-link>` in documentation code.

## Keen UI vendored files

Several years ago, we vendored [Keen UI](https://github.com/JosephusPaye/Keen-UI). Since then, some of the components were updated occasionally to match Keen UI updates, but overall we use fairly old versions. We agreed not to follow Keen UI updates and consider forked components as "our own". Therefore, Keen UI components can be modified directly as needed.
