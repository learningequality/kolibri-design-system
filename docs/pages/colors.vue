<template>

  <DocsPageTemplate>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        During design and development, colors should be referenced by name. Using named colors has a
        few important benefits:
      </p>
      <ul>
        <li>More meaningful than hex values in mockups and code</li>
        <li>Encourages consistency and accessibility across the application</li>
        <li>Support for alternate themes</li>
      </ul>
      <p>Some examples of named colors in the Kolibri Design System include:</p>
      <DocsColorBlock name="tokens.text" />
      <DocsColorBlock name="tokens.error" />
      <DocsColorBlock name="tokens.primary" />
      <DocsColorBlock name="brand.primary.v_600" />
      <DocsColorBlock name="brand.secondary.v_400" />
      <DocsColorBlock name="palette.grey.v_400" />

      <p>
        Care must be taken as we adjust the colors in the application. There are a number of
        considerations to take into account, including:
      </p>
      <ul>
        <li>Branding, aesthetics, and color harmony</li>
        <li>Sufficient contrast between foreground and background colors</li>
        <li>Accommodation of color blind users</li>
        <li>Maintainability and consistency of the application and code</li>
        <li>Amenability to theming by using tokens correctly</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <p>Colors can be referenced in two ways:</p>
      <ul>
        <li>
          <strong>CSS variables</strong> for every static color, in
          <code>&lt;style&gt;</code> blocks, SCSS files, and inline <code>:style</code> bindings.
        </li>
        <li>
          <strong>JavaScript accessors</strong> on Vue components, for colors that need to be built
          at runtime (for example, a color combined with a custom opacity).
        </li>
      </ul>
      <p>
        Both are set up by <code>Vue.use(KThemePlugin)</code> (see
        <DocsInternalLink
          href="/installation"
          text="Installation"
        />) and stay in sync when brand colors change at runtime via
        <code>setBrandColors()</code> or <code>setTokenMapping()</code>.
      </p>

      <h3>CSS variables</h3>

      <p>Theme values are emitted as CSS variables on <code>html:root</code> in three layers:</p>
      <ul>
        <li><code>--tokens-*</code> for named color tokens (e.g. <code>--tokens-primary</code>)</li>
        <li>
          <code>--brand-*</code> for brand color scales (e.g. <code>--brand-primary-v500</code>)
        </li>
        <li>
          <code>--palette-*</code> for the full palette (e.g. <code>--palette-grey-v200</code>)
        </li>
      </ul>
      <p>
        Reference them directly with <code>var(--name)</code>. For example, to color text using the
        <code>error</code> token:
      </p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <div class="error-message">This is an error</div>
        <style>
          .error-message {
            color: var(--tokens-error);
          }
        </style>
      </DocsShowCode>
      <p>This will display:</p>

      <DocsShow>
        <div class="error-message">This is an error</div>
      </DocsShow>
      <p>Or within an inline <code>&lt;style&gt;</code> block:</p>
      <DocsShowCode language="html">
        <div :style="{ color: 'var(--tokens-error)' }">This is an error</div>
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        For palette and brand variables, replace the dots in the path with hyphens and drop the
        underscore (<code>palette.grey.v_400</code> becomes <code>--palette-grey-v400</code>). Token
        names are used as-is.
      </p>

      <h3>
        Computed styles
        <DocsAnchorTarget anchor="#computed-styles" />
      </h3>

      <p>
        Colors are also available on every Vue component as JavaScript objects. Adding
        <code>Vue.use(KThemePlugin)</code> makes the following objects available:
      </p>

      <ul>
        <li><code>$themeBrand</code> contains colors related to the aesthetic color scheme</li>
        <li><code>$themeTokens</code> contains colors with special meanings in Kolibri</li>
        <li><code>$themePalette</code> contains a wide range of additional compatible colors</li>
      </ul>

      <p>
        Computed styles should be used for values computed at runtime. CSS variables replace them
        for static colors.
      </p>

      <h3>
        Darken utilities
        <DocsAnchorTarget anchor="#darken-utilities" />
      </h3>

      <p>
        You can apply darken utilities <code>$darken1</code>, <code>$darken2</code>, and
        <code>$darken3</code> to palette colors and tokens to achieve their darker shades. They are
        available on every Vue component.
      </p>

      <p>
        These utilities shouldn't be overused. Always check if there is a shade in the palette
        available that can be used instead.
      </p>

      <DocsShowCode language="html">
        <div :style="{ backgroundColor: $themePalette.red.v_600 }">base</div>
        <div :style="{ backgroundColor: $darken1($themePalette.red.v_600) }">$darken1</div>
        <div :style="{ backgroundColor: $darken2($themePalette.red.v_600) }">$darken2</div>
        <div :style="{ backgroundColor: $darken3($themePalette.red.v_600) }">$darken3</div>
      </DocsShowCode>
      <DocsShow>
        <div
          class="darken-block"
          :style="{ backgroundColor: $themePalette.red.v_600 }"
        >
          <code>base</code>
        </div>
        <div
          class="darken-block"
          :style="{ backgroundColor: $darken1($themePalette.red.v_600) }"
        >
          <code>$darken1</code>
        </div>
        <div
          class="darken-block"
          :style="{ backgroundColor: $darken2($themePalette.red.v_600) }"
        >
          <code>$darken2</code>
        </div>
        <div
          class="darken-block"
          :style="{ backgroundColor: $darken3($themePalette.red.v_600) }"
        >
          <code>$darken3</code>
        </div>
      </DocsShow>

      <p>
        For pseudo-classes, use a computed property and bind it with <code>v-bind()</code>. For
        example, to darken a button on hover:
      </p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        computed: {
          deleteButtonHoverColor() {
            return this.$darken1(this.$themePalette.red.v_600);
          },
        },
      </DocsShowCode>
      <!-- prettier-ignore -->
      <DocsShowCode language="css">
        .delete-button {
          background-color: var(--palette-red-v600);
        }

        .delete-button:hover {
          background-color: v-bind(deleteButtonHoverColor);
        }
      </DocsShowCode>
      <DocsShow>
        <button class="delete-button">Delete</button>
      </DocsShow>
      <!-- eslint-enable -->

      <h3>
        Computed classes (deprecated)
        <DocsAnchorTarget anchor="#computed-classes" />
      </h3>

      <DocsBanner>
        <code>$computedClass</code> is deprecated. The next major release removes it, together with
        the Aphrodite library that it uses. It continues to work in version 5.
      </DocsBanner>

      <p>
        <code>$computedClass</code> can be used to dynamically create new classes for
        pseudo-elements such as <code>:hover</code> or <code>:focus</code>. Replace it with a rule
        in a <code>&lt;style&gt;</code> block.
      </p>

      <p>
        If the value is a theme color, use its CSS variable. For example, to color a placeholder
        with the disabled text token:
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <!-- Before -->
        <input
          class="sample-input"
          :class="$computedClass({ '::placeholder': { color: $themeTokens.textDisabled } })"
        >

        <!-- After -->
        <input class="sample-input">
        <style>
          .sample-input::placeholder {
            color: var(--tokens-textDisabled);
          }
        </style>
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        If the value comes from a prop, return it from a computed property and bind that property
        with <code>v-bind()</code>. The computed property must always return a color. For a theme
        default, return the CSS variable as a string. For example, where
        <code>hoverBackgroundColor</code> is a prop:
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        // Before
        computed: {
          styles() {
            const hoverBackgroundColor = this.hoverBackgroundColor || this.$themeBrand.primary.v_100;
            return {
              ':hover': { backgroundColor: hoverBackgroundColor },
            };
          },
        },

        // After
        computed: {
          tabHoverBackgroundColor() {
            return this.hoverBackgroundColor || 'var(--brand-primary-v100)';
          },
        },
      </DocsShowCode>
      <!-- prettier-ignore -->
      <DocsShowCode language="css">
        .tab:hover {
          background-color: v-bind(tabHoverBackgroundColor);
        }
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        If the value comes from a darken utility, bind it with <code>v-bind()</code> as in the
        <DocsInternalLink
          href="#darken-utilities"
          text="darken utilities"
        />
        example. No CSS variable exists for a darkened color.
      </p>

      <p>
        If the value is a focus outline, use <code>:focus-visible</code>. The global styles from
        <code>common</code> (see
        <DocsInternalLink
          href="/installation#register-global-styles"
          text="Installation"
        />) already give every element that matches <code>:focus-visible</code> the same outline
        style as <code>$coreOutline</code>. If the class sets only
        <code>{ ':focus': $coreOutline }</code>, delete it. If the class changes the outline,
        override only that property. For example, to remove the outline offset on a button:
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <!-- Before -->
        <button
          class="k-chip-close-button"
          :class="$computedClass({ ':focus': { ...$coreOutline, outlineOffset: 0 } })"
        ></button>

        <!-- After -->
        <button class="k-chip-close-button"></button>
        <style>
          .k-chip-close-button:focus-visible {
            outline-offset: 0;
          }
        </style>
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        If the application imports <code>helper-styles</code> instead of <code>common</code>, write
        the full outline:
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="css">
        .k-chip-close-button:focus-visible {
          outline: 3px solid var(--tokens-focusOutline);
          outline-offset: 0;
        }
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        If the outline goes on an element that does not have focus, keep
        <code>$coreOutline</code> in a <code>:style</code> binding. For example,
        <code>KCheckbox</code> puts the outline on its checkbox icon, and the focus is on the native
        input.
      </p>

      <p>
        Note: <code>v-bind()</code> sets its variable on the component's root element.
        <code>KOverlay</code> moves its content to <code>#k-overlay</code>, outside that root, so
        the moved content doesn't receive the variable. This affects <code>KModal</code> and
        <code>KTooltip</code> with <code>appendToOverlay</code>, and any component with
        <code>KOverlay</code> as its root. Set the variable with <code>:style</code> on an element
        inside the moved content instead:
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KOverlay>
          <div :style="{ '--delete-button-hover-color': deleteButtonHoverColor }">
            <button class="delete-button">Delete</button>
          </div>
        </KOverlay>
      </DocsShowCode>
      <!-- prettier-ignore -->
      <DocsShowCode language="css">
        .delete-button:hover {
          background-color: var(--delete-button-hover-color);
        }
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        Note: In Vue 2.7, <code>v-bind()</code> in a <code>&lt;style&gt;</code> block stops updating
        if the component's root element is removed and re-added, for example by a <code>v-if</code>.
        Wrap the conditional element in a plain, non-conditional root element.
      </p>

      <h3>Notation</h3>
      <p>In the references below we use the following shorthand:</p>
      <ul>
        <li>
          <code>brand</code> refers to <code>$themeBrand</code> in JavaScript, or
          <code>--brand-*</code> in CSS
        </li>
        <li>
          <code>tokens</code> refers to <code>$themeTokens</code> in JavaScript, or
          <code>--tokens-*</code> in CSS
        </li>
        <li>
          <code>palette</code> refers to <code>$themePalette</code> in JavaScript, or
          <code>--palette-*</code> in CSS
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Tokens"
      anchor="#tokens"
    >
      <p>
        Color tokens are the most important set of named colors because they have a specific,
        well-defined usage within the application. Over time, our set of tokens should grow and
        shrink as necessary to fit the needs of the application.
      </p>
      <p>
        Color tokens are by themselves abstract and defined by a purpose, not a color value. A theme
        makes them concrete by mapping them to specific
        <DocsInternalLink
          text="brand colors"
          href="#brand"
        />
        and
        <DocsInternalLink
          text="palette colors"
          href="#palette"
        />.
      </p>
      <p>
        When using tokens, it's very important to choose them based on their semantic purpose, not
        because of their color values. This ensures that new themes can be created effectively.
      </p>

      <h3>Brand shortcuts</h3>
      <DocsColorBlock
        name="tokens.primary"
        definition
      >
        Default primary brand color. Commonly used for interactive elements
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.primaryDark"
        definition
      >
        Default dark variant of the primary brand color. Commonly used for the hover state of
        interactive elements
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.secondary"
        definition
      >
        Default secondary brand color
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.secondaryDark"
        definition
      >
        Default dark variant of the secondary brand color
      </DocsColorBlock>

      <h3>UI Colors</h3>
      <DocsColorBlock
        name="tokens.surface"
        definition
      >
        Default background color
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.appBar"
        definition
      >
        Default app bar component color
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.appBarDark"
        definition
      >
        Default dark color of the app bar component
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.link"
        definition
      >
        Hyperlink text color with the application
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.fineLine"
        definition
      >
        Used for divider lines and rules
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.loading"
        definition
      >
        Color for loaders, spinners, and other progress indicators
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.success"
        definition
      >
        Indicates the successful completion of an action in the application
      </DocsColorBlock>

      <h3>Text</h3>
      <DocsColorBlock
        name="tokens.text"
        definition
      >
        Normal text color. (Typically used on top of the <code>$themeTokens.surface</code> color)
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.annotation"
        definition
      >
        Text color with lower visual weight. (Typically used on top of the
        <code>$themeTokens.surface</code> color)
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.textDisabled"
        definition
      >
        Text color with lowest visual weight. (Typically used on top of the
        <code>$themeTokens.surface</code> color)
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.textInverted"
        definition
      >
        Text color for creating sufficient contrast when used on dark backgrounds (such as
        <code>$themeTokens.primary</code>)
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.focusOutline"
        definition
      >
        Used to indicate keyboard focus
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.error"
        definition
      >
        Indicates an application or validation error
      </DocsColorBlock>

      <h3>Learner activity</h3>
      <DocsColorBlock
        name="tokens.progress"
        definition
      >
        Indicates "in-progress" learner activity
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.mastered"
        definition
      >
        Indicates learner mastery or completion
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.correct"
        definition
      >
        Indicates a correct response by a learner
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.incorrect"
        definition
      >
        Indicates an incorrect response by a learner
      </DocsColorBlock>

      <h3>User-related labels</h3>
      <DocsColorBlock
        name="tokens.coachContent"
        definition
      >
        Used for coloring coach content icons
      </DocsColorBlock>
      <DocsColorBlock
        name="tokens.superAdmin"
        definition
      >
        Used for coloring super admin permission key icons
      </DocsColorBlock>

      <h3>Content-related labels</h3>
      <DocsColorBlock
        name="tokens.practice"
        definition
      />
      <DocsColorBlock
        name="tokens.watch"
        definition
      />
      <DocsColorBlock
        name="tokens.listen"
        definition
      />
      <DocsColorBlock
        name="tokens.read"
        definition
      />
      <DocsColorBlock
        name="tokens.explore"
        definition
      />
      <DocsColorBlock
        name="tokens.create"
        definition
      />
      <DocsColorBlock
        name="tokens.reflect"
        definition
      />
      <DocsColorBlock
        name="tokens.topic"
        definition
      />
    </DocsPageSection>

    <DocsPageSection
      title="Scales"
      anchor="#scales"
    >
      <p>
        A color scale – sometimes called a color ramp – is an evenly-spaced ramp of shades for a
        particular color hue. In the Kolibri Design System, we follow
        <DocsExternalLink
          text="Google's Material convention"
          href="https://material.io/archive/guidelines/style/color.html"
        />
        and segment colors into brightness levels, named <code>v_50</code>, <code>v_100</code>,
        <code>v_200</code>, <code>v_300</code>, <code>v_400</code>, <code>v_500</code>,
        <code>v_600</code>. Note that <code>v_50</code> is only present on select color families:
      </p>
      <DocsColorBlock name="palette.green.v_50" />
      <DocsColorBlock name="palette.green.v_100" />
      <DocsColorBlock name="palette.green.v_200" />
      <DocsColorBlock name="palette.green.v_300" />
      <DocsColorBlock name="palette.green.v_400" />
      <DocsColorBlock name="palette.green.v_500" />
      <DocsColorBlock name="palette.green.v_600" />
      <p>
        Due to the inconsistent way that humans perceive color and light, computing these scales is
        <DocsExternalLink
          text="both art and science"
          href="https://uxplanet.org/designing-systematic-colors-b5d2605b15c"
        />. It should not be done by simply sliding a "brightness" setting. We used
        <DocsExternalLink
          text="materialpalettes.com"
          href="https://materialpalettes.com/"
        />
        to generate the scales for our primary and secondary brand colors. The same should be done
        for new themes.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Brand colors"
      anchor="#brand"
    >
      <p>
        Brand colors are chosen to reflect the mood, identity, or trademark of an application or an
        organization. The design system defines primary (dominant) and secondary (accent) branded
        color hues.
      </p>

      <div>
        <div class="palette-block">
          <DocsColorBlock
            v-for="(hex, variant) in $themeBrand.primary"
            :key="variant"
            :name="`brand.primary.${variant}`"
            definition
          />
        </div>
        <div class="palette-block">
          <DocsColorBlock
            v-for="(hex, variant) in $themeBrand.secondary"
            :key="variant"
            :name="`brand.secondary.${variant}`"
            definition
          />
        </div>
      </div>
    </DocsPageSection>

    <DocsPageSection
      title="Palette"
      anchor="#palette"
    >
      <p>
        A color palette is a set of generic base colors that cover a wide range of the color
        spectrum. We use the
        <DocsExternalLink
          text="2014 Material Design color palette"
          href="https://material.io/archive/guidelines/style/color.html#color-color-tool"
        />, which has many colors to choose from.
      </p>
      <p>
        In our design system, colors from the palette have names like <code>pink</code>,
        <code>grey</code>, and <code>amber</code>.
      </p>
      <p>
        With the exception of grey values, choosing arbitrary colors from the palette is only
        slightly better than choosing arbitrary hex values from the full color spectrum. No
        consistency or meaning is ensured, and they should generally be avoided in favor of specific
        color tokens and brand colors.
      </p>

      <h3>Grey values</h3>
      <p>A scale of standard greys</p>
      <DocsColorBlock
        name="palette.white"
        definition
      />
      <DocsColorBlock
        name="palette.black"
        definition
      />
      <DocsColorBlock
        v-for="(hex, variant) in $themePalette.grey"
        :key="variant"
        :name="`palette.grey.${variant}`"
        definition
      />

      <h3>Full palette</h3>
      <p>The complete set of colors available in the palette</p>
      <div>
        <div
          v-for="(colorGroup, i) in palette"
          :key="i"
          class="palette-block"
        >
          <DocsColorBlock
            v-for="(identifier, j) in colorGroup"
            :key="j"
            :name="identifier"
            definition
          />
        </div>
      </div>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import DocsColorBlock from '~/common/DocsColorBlock';

  export default {
    components: {
      DocsColorBlock,
    },
    computed: {
      palette() {
        const palette = [];
        for (const color in this.$themePalette) {
          if (color !== 'grey' && typeof this.$themePalette[color] === 'object') {
            palette.push(
              Object.keys(this.$themePalette[color]).map(variant => `palette.${color}.${variant}`),
            );
          }
        }
        return palette;
      },
      deleteButtonHoverColor() {
        return this.$darken1(this.$themePalette.red.v_600);
      },
    },
  };

</script>


<style lang="scss" scoped>

      .palette-block {
        display: inline-block;
        width: 350px;
      }

      .darken-block {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 140px;
        height: 140px;

        code {
          padding: 4px;
          background-color: rgba(255, 255, 255, 0.8);
        }
      }

      .error-message {
        color: var(--tokens-error);
      }

      .delete-button {
        padding: 8px 16px;
        color: var(--tokens-textInverted);
        background-color: var(--palette-red-v600);
        border: 0;
        border-radius: 4px;
      }

      .delete-button:hover {
        /* stylelint-disable-next-line csstree/validator, value-keyword-case */
        background-color: v-bind(deleteButtonHoverColor);
      }

</style>
