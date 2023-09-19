
# Tips and troubleshooting

Here, you can find development and troubleshooting tips. 

## `ESOCKETTIMEDOUT` error

If you see a timeout error like `ESOCKETTIMEDOUT` during `yarn install`, you can configure yarn with a higher timeout value [as described here](https://github.com/yarnpkg/yarn/issues/5540#issuecomment-374069461).

## `System limit for number of file watchers reached` error

If you see this error when running the development server, you can try to follow [this advice](https://stackoverflow.com/questions/55763428/react-native-error-enospc-system-limit-for-number-of-file-watchers-reached/55763478#55763478).


## Vue Devtools

Vue Devtools is a useful browser extension for debugging and developing Vue applications. You can follow these [installation instructions](https://devtools.vuejs.org/guide/installation.html).

## Text editor

When setting up your text editor, it's useful to ignore the following directories:

* `node_modules`
* `.nuxt`
* `dist`

You may also want to install syntax highlighters in your editor for Vue and SASS.
