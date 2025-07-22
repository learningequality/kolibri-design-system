[![Netlify Status](https://api.netlify.com/api/v1/badges/9ae9ac56-7240-4480-b5a8-01645cb903ca/deploy-status)](https://app.netlify.com/sites/kolibri-design-system/deploys) ![Lint](https://github.com/learningequality/kolibri-design-system/workflows/Lint/badge.svg?branch=v0.2.x)


# Kolibri Design System

Note that the Kolibri Design System is not intended to be used as a dependency outside of Kolibri products.

If you are building a Kolibri plugin you should _not_ add the design system as a dependency because it will be made available as a dependency of Kolibri itself.

## What is Kolibri Design System?

**[design-system.learningequality.org](https://design-system.learningequality.org)** is a resource for designers and developers who are building Kolibri products. It includes the design system patterns and the library of UI components.

## How can I use it?

### Documentation

Refer to [design-system.learningequality.org](https://design-system.learningequality.org) to learn about the design system patterns and components, as well as the detailed technical documentation and guidance for the library components that are available for usage in Kolibri products. 

For the latest (not yet released) version, visit the design system website built from the `main` branch at [main--kolibri-design-system.netlify.app/](https://main--kolibri-design-system.netlify.app/).

### Component library

The component library is [a npm package](https://www.npmjs.com/package/kolibri-design-system). It contains front-end components, utilities, and style definitions supporting the Kolibri Design System and used in Kolibri products.

Components and utilities will be accessible under the `lib` path. For example:

```javascript
import KButton from 'kolibri-design-system/lib/KButton';
```
The library is provided as source code, rather than a pre-built distribution. A project using it needs to supply both build and runtime dependencies.

## How do I get help or give feedback?

Contact us at the [Kolibri Design System GitHub Discussions](https://github.com/learningequality/kolibri-design-system/discussions).

If you have found a bug, you can create a [Github issue](https://github.com/learningequality/kolibri-design-system/issues) following the instructions in the issue template.

## How can I contribute?

We welcome contributors!

To find out how to contribute, visit [Contributing to our open code base](https://learningequality.org/contributing-to-our-open-code-base).
