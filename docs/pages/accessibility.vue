<template>

  <DocsPageTemplate>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Kolibri products should be accessible to the widest possible audience, in the broadest sense of the word 'accessible'. It should run on wide variety of devices, render correctly on a wide variety of screen sizes and assistive technologies, be understandable to people from a wide variety of backgrounds, and be usable by people with diverse abilities.
      </p>
      <p>
        At a high level, we follow the web content accessibility guideline that for all users, information should be:
      </p>
      <ul>
        <li>Perceivable</li>
        <li>Operable</li>
        <li>Understandable</li>
        <li>Robust</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Window size and zoom" anchor="#responsiveness">
      <p>
        Users will use devices that have a wide range of screen sizes. Additionally, some users with poor vision may zoom far in, which effectively lowers the size.
      </p>
      <p>
        We should aim to allow zooming up to 200%, and down to 480x600 px in both profile and landscape. The app should always remain functional in all extreme screen sizes. Depending on the context, we may want to put additional effort into creating custom layouts optimized for particular screen sizes. For example, we should put additional effort into optimizing the mobile Learner experience, while for administrators this might not be as critical.
      </p>
      <p>
        When designing and building layouts, we use the breakpoints defined by Material Design. These are exposed in our app by the <DocsLibraryLink component="useKResponsiveWindow" /> composable. We should never use CSS media queries. See the <DocsInternalLink href="/layout" text="See the Layout page" /> for more information.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Keyboard navigation" anchor="#keyboard">
      <p>
        Every interaction that can be performed with a mouse or touchscreen should also be accessible by using the keyboard. As much as possible, we should follow best practices including:
      </p>
      <ul>
        <li>high-contrast focus indicators</li>
        <li>intuitive navigation tab order</li>
        <li>conventional keyboard shortcuts for common input widgets</li>
      </ul>
      <p>
        Using the built-in components outlined in this guide is a good way to ensure that your UI will be navigable by keyboard. When building custom components, use our standard focus outline <code>$coreOutline</code> as described in <DocsInternalLink href="/styling#focus-outline" text="the Styling page" />.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Screen reader support" anchor="#screen-readers">
      <p>
        All content that can be read by sighted users should be readable by screen readers. Additionally, the app should leverage screen-reader-specific functionality – such as labels, semantically correct HTML tags, and visually-hidden text – that associates descriptive text with functionality.
      </p>
      <p>
        Like with keyboard navigation, using the built-in components is a good way to ensure compatibility with screen readers. However, it's also critical to test all new functionality. See this <DocsExternalLink href="https://kolibri-dev.readthedocs.io/en/develop/manual_testing/a11y_resources/index.html" text="comprehensive list of accessibility testing tools" />.
      </p>
      <p>
        Some specific things to watch for:
      </p>
      <ul>
        <li>
          Use ARIA attributes when appropriate. (In general, this is <em>only</em>
          when using semantically correct HTML is not possible.)
        </li>
        <li>
          Nest header tags properly: <code>h1</code>, <code>h2</code>, <code>h3</code>, etc.
        </li>
        <li><code>alt</code> text on images</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Color and contrast" anchor="#color">
      <p>
        Contrast should be at least 3:1 for large text and 4.5:1 for smaller text. Colors should either be color-blindness-safe, or be redundant with a non-color-based representation of information.
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<style lang="scss" scoped></style>
