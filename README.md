[![Netlify Status](https://api.netlify.com/api/v1/badges/9ae9ac56-7240-4480-b5a8-01645cb903ca/deploy-status)](https://app.netlify.com/sites/kolibri-design-system/deploys) ![Lint](https://github.com/learningequality/kolibri-design-system/workflows/Lint/badge.svg?branch=v0.2.x)


# Kolibri Design System

Note that the Kolibri Design System is not intended to be used as a dependency outside of Kolibri products.

If you are building a Kolibri plugin you should _not_ add the design system as a dependency because it will be made available as a dependency of Kolibri itself.

## What is Kolibri Design System?

**[design-system.learningequality.org](https://design-system.learningequality.org)** is a resource for designers and developers who are building Kolibri products. It includes the design system patterns and the library of UI components.

## How can I use it?

### Documentation

Refer to [design-system.learningequality.org](https://design-system.learningequality.org) to learn about the design system patterns and components, as well as the detailed technical documentation and guidance for the library components that are available for usage in Kolibri products. 

For the latest (not yet released) version, visit the design system website built from the `develop` branch at [develop--kolibri-design-system.netlify.app/](https://develop--kolibri-design-system.netlify.app/).

### Component library

The component library is a node package hosted on GitHub. It contains front-end components, utilities, and style definitions supporting the Kolibri Design System and used in Kolibri products.

To add a particular pinned version to a project using `yarn`, for example `v1.0.1`, run:

```bash
yarn add https://github.com/learningequality/kolibri-design-system#v1.0.1
```

Components and utilities will be accessible under the `lib` path. For example:

```javascript
import KButton from 'kolibri-design-system/lib/KButton';
```
The library is provided as source code, rather than a pre-built distribution. A project using it needs to supply both build and runtime dependencies.

## How do I get help or give feedback?

Contact us at the [Kolibri Design System GitHub Discussions](https://github.com/learningequality/kolibri-design-system/discussions).

If you have found a bug, you can create a [Github issue](https://github.com/learningequality/kolibri-design-system/issues) following the instructions in the issue template.

<!-- Also update README.md (duplicate) -->
## How can I contribute?

1. 💻 Follow the [Getting started](./dev_docs/01_getting_started.md) to set up your development server. At the bottom of that page, you will also find links that will take you to guidelines for the most common tasks.
2. 🔍 Search for issues tagged as [help wanted](https://github.com/learningequality/kolibri-design-system/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22+no%3Aassignee+) or [good first issue](https://github.com/learningequality/kolibri-design-system/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+no%3Aassignee).
3. 🗣️ Ask us for an assignment in the comments of an issue you've chosen.

Note that in times of increased contributions activity, it may take us a few days to reply. If you don't hear from us within a week, please reach out via [Kolibri Design System GitHub Discussions](https://github.com/learningequality/kolibri-design-system/discussions).

**❓ Where to ask questions**

- For anything development related, refer to the [developer documentation](./dev_docs/) at first. Some answers may already be there.
- For questions related to a specific issue or assignment requests, use the corresponding issue's comments section.
- Visit [Kolibri Design System GitHub Discussions](https://github.com/learningequality/kolibri-design-system/discussions) to ask about anything related to contributing to Kolibri Design System, troubleshoot development server issues, or connect with other contributors.

*Thank you for your interest in contributing to Kolibri Design System! The Kolibri project was founded by volunteers dedicated to helping make educational materials more accessible to those in need, and every contribution makes a difference.*
