# Getting started

The design system has two primary parts, the UI component library [`/lib`](../lib/) and the documentation site [`/docs`](../docs/). The following guidelines will help you set up a development environment so that you can update both.

## Prerequisites

- Node.js 18.x (see [Node Version Manager](https://github.com/nvm-sh/nvm))
- Yarn >=1.22.22

## Troubleshooting

If you experience any problems with the setup below, see if you can find a similar issue in [Tips and troubleshooting](./02_tips_and_troubleshooting.md).

## Development environment

At first, [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) this repository.

Then, change to the directory where you cloned it:

```bash
cd kolibri-design-system
```

Install the dependencies using `yarn`:

```bash
yarn install
```

Finally, run the development server:

```bash
yarn dev
```

This command will start a documentation development server at http://localhost:4000/. It will also run a linter and auto-formatter.

There are few other commands available:

```bash
yarn dev-only    # launch just the dev server without the linter and auto-formatter
yarn lint-fix    # run the linter and auto-formatter once
yarn lint-watch  # run the linter in watch mode, without the auto-formatter
```

You're now ready to code! 

## Next steps

- If you experienced troubles with the setup above or would like to get some development tips, you can visit [Tips and troubleshooting](./02_tips_and_troubleshooting.md).
- Our components are build in Vue 2. If you're not familiar with this framework, refer to [Vue 2 documentation](https://v2.vuejs.org/).
- If you'd like to update the component library, continue to [How to update the component library](./03_how_to_update_library.md).

The guidelines referenced above should be sufficient for the most common tasks. There are a few additional developer documentation pages available. However, these pages contain information that is more internal in nature or related to specialized tasks:
- [Visual Testing](./07_visual_testing_guide.md)
- [How to update the documentation website](./04_how_to_update_docs.md)
- [Icons](./05_icons.md)
- [Miscellaneous](./06_misc.md)
