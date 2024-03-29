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

<!-- Also update README.md (duplicate) -->
## How can I contribute?

1. 💻 **Follow the [Getting started](./dev_docs/01_getting_started.md) to set up your development server.** At the bottom of the page, you can also find links that will take you to guidelines for the most common tasks.
2. 🔍 **Search for issues tagged as [help wanted](https://github.com/learningequality/kolibri-design-system/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22+no%3Aassignee+) or [good first issue](https://github.com/learningequality/kolibri-design-system/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+no%3Aassignee).**
4. 🗣️ **Ask us for an assignment in the comments of an issue you've chosen.** Please request assignment of a reasonable amount of issues at a time. Once you finish your current issue or two, you are welcome to ask for more.

**❓ Where to ask questions**

- For anything development related, refer to the [Developer documentation](./dev_docs/) at first. Some answers may already be there.
- For questions related to a specific issue or assignment requests, use the corresponding issue's comments section.
- Visit [GitHub Discussions](https://github.com/learningequality/kolibri-design-system/discussions) to ask about anything related to contributing or to troubleshoot development server issues.

**👥 How to connect**

- We encourage you to visit [GitHub Discussions](https://github.com/learningequality/kolibri-design-system/discussions) to connect with the Learning Equality team as well as with other contributors.
- If you'd like to contribute on a regular basis, we are happy to invite you to our open-source community Slack channel. Get in touch with us at info@learningequality.org to receive an invitation.

---

🕖 Please allow us a few days to reply to your comments. If you don't hear from us within a week, reach out via [GitHub Discussions](https://github.com/learningequality/kolibri-design-system/discussions).

As soon as you open a pull request, it may take us a week or two to review it as we're a small team. We appreciate your contribution and will provide feedback.

---

*Thank you for your interest in contributing! Learning Equality was founded by volunteers dedicated to helping make educational materials more accessible to those in need, and every contribution makes a difference.*
