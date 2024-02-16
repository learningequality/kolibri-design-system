<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        During design and development, colors should be referenced by name. Using named colors has a few important benefits:
      </p>
      <ul>
        <li>More meaningful than hex values in mockups and code</li>
        <li>Encourages consistency and accessibility across the application</li>
        <li>Support for alternate themes</li>
      </ul>
      <p>
        Some examples of named colors in the Kolibri Design System include:
      </p>
      <DocsColorBlock name="tokens.text" />
      <DocsColorBlock name="tokens.error" />
      <DocsColorBlock name="tokens.primary" />
      <DocsColorBlock name="brand.primary.v_1100" />
      <DocsColorBlock name="brand.secondary.v_800" />
      <DocsColorBlock name="palette.grey.v_400" />

      <p>
        Care must be taken as we adjust the colors in the application. There are a number of considerations to take into account, including:
      </p>
      <ul>
        <li>Branding, aesthetics, and color harmony</li>
        <li>Sufficient contrast between foreground and background colors</li>
        <li>Accommodation of color blind users</li>
        <li>Maintainability and consistency of the application and code</li>
        <li>Amenability to theming by using tokens correctly</li>
      </ul>

    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">

      <h3>Computed styles</h3>

      <p>
        For technical reasons relating to supporting dynamic themes colors must be set using Javascript. Adding <code>Vue.use(KThemePlugin)</code> makes all colors available on every Vue component in your application under the following objects:
      </p>

      <ul>
        <li><code>$themeBrand</code> contains colors related to the aesthetic color scheme</li>
        <li><code>$themeTokens</code> contains colors with special meanings in Kolibri</li>
        <li><code>$themePalette</code> contains a wide range of additional compatible colors</li>
      </ul>

      <p>
        For example, to color text using <code>$themeTokens.error</code> you use can a <DocsExternalLink text="computed style" href="https://vuejs.org/v2/guide/class-and-style.html" /> to write:
      </p>

      <DocsShowCode language="html">
        <div :style="{ color: $themeTokens.error }">
          This is an error
        </div>
      </DocsShowCode>

      <p>
        This will display:
      </p>

      <DocsShow>
        <div :style="{ color: $themeTokens.error }">
          This is an error
        </div>
      </DocsShow>

      <p>Move style definitions from the template to computed props if the style gets complex.</p>

      <h3>Computed classes</h3>

      <p>
        We also attach a special helper function <code>$computedClass</code> which can be used to dynamically create new classes. This is useful for specifying colors in pseudo-elements such as <code>:hover</code> or <code>:focus</code>. For example:
      </p>

      <DocsShowCode language="html">
        <input :class="$computedClass({ '::placeholder': { color: $themeTokens.annotation } })">
      </DocsShowCode>

      <p>This is usually not necessary, and using <code>style</code> is preferred for simplicity when possible.</p>

      <h3>Notation</h3>
      <p>
        In the references below we use the following shorthand:
      </p>
      <ul>
        <li><code>brand</code> refers to <code>$themeBrand</code></li>
        <li><code>tokens</code> refers to <code>$themeTokens</code></li>
        <li><code>palette</code> refers to <code>$themePalette</code></li>
      </ul>


    </DocsPageSection>


    <DocsPageSection title="Tokens" anchor="#tokens">
      <p>
        Color tokens are the most important set of named colors because they have a specific, well-defined usage within the application. Over time, our set of tokens should grow and shrink as necessary to fit the needs of the application.
      </p>
      <p>
        Color tokens are by themselves abstract and defined by a purpose, not a color value. A theme makes them concrete by mapping them to specific
        <DocsInternalLink text="brand colors" href="#brand" />
        and
        <DocsInternalLink text="palette colors" href="#palette" />.
      </p>
      <p>
        When using tokens, it's very important to choose them based on their semantic purpose, not because of their color values. This ensures that new themes can be created effectively.
      </p>

      <h3>Brand shortcuts</h3>
      <DocsColorBlock name="tokens.primary" definition>
        Default primary brand color. Commonly used for interactive elements
      </DocsColorBlock>
      <DocsColorBlock name="tokens.primaryDark" definition>
        Default dark variant of the primary brand color. Commonly used for the hover state of interactive elements
      </DocsColorBlock>

      <h3>UI Colors</h3>
      <DocsColorBlock name="tokens.surface" definition>
        Default background color
      </DocsColorBlock>
      <DocsColorBlock name="tokens.text" definition>
        Normal text color. (Typically used on top of the <code>$themeTokens.surface</code> color)
      </DocsColorBlock>
      <DocsColorBlock name="tokens.annotation" definition>
        Text color with lower visual weight. (Typically used on top of the <code>$themeTokens.surface</code> color)
      </DocsColorBlock>
      <DocsColorBlock name="tokens.textDisabled" definition>
        Text color with lowest visual weight. (Typically used on top of the <code>$themeTokens.surface</code> color)
      </DocsColorBlock>
      <DocsColorBlock name="tokens.textInverted" definition>
        Text color for creating sufficient contrast when used on dark backgrounds (such as <code>$themeTokens.primary</code>)
      </DocsColorBlock>
      <DocsColorBlock name="tokens.loading" definition>
        Color for loaders, spinners, and other progress indicators
      </DocsColorBlock>
      <DocsColorBlock name="tokens.focusOutline" definition>
        Used to indicate keyboard focus
      </DocsColorBlock>
      <DocsColorBlock name="tokens.fineLine" definition>
        Used for divider lines and rules
      </DocsColorBlock>
      <DocsColorBlock name="tokens.error" definition>
        Indicates an application or validation error
      </DocsColorBlock>
      <DocsColorBlock name="tokens.success" definition>
        Indicates the successful completion of an action in the application
      </DocsColorBlock>

      <h3>Learner activity</h3>
      <DocsColorBlock name="tokens.progress" definition>
        Indicates "in-progress" learner activity
      </DocsColorBlock>
      <DocsColorBlock name="tokens.mastered" definition>
        Indicates learner mastery or completion
      </DocsColorBlock>
      <DocsColorBlock name="tokens.correct" definition>
        Indicates a correct response by a learner
      </DocsColorBlock>
      <DocsColorBlock name="tokens.incorrect" definition>
        Indicates an incorrect response by a learner
      </DocsColorBlock>

      <h3>User-related labels</h3>
      <DocsColorBlock name="tokens.coachContent" definition>
        Used for coloring coach content icons
      </DocsColorBlock>
      <DocsColorBlock name="tokens.superAdmin" definition>
        Used for coloring super admin permission key icons
      </DocsColorBlock>

      <h3>Content-related labels</h3>
      <DocsColorBlock name="tokens.practice" definition />
      <DocsColorBlock name="tokens.watch" definition />
      <DocsColorBlock name="tokens.listen" definition />
      <DocsColorBlock name="tokens.read" definition />
      <DocsColorBlock name="tokens.explore" definition />
      <DocsColorBlock name="tokens.create" definition />
      <DocsColorBlock name="tokens.reflect" definition />
      <DocsColorBlock name="tokens.topic" definition />

    </DocsPageSection>

    <DocsPageSection title="Scales" anchor="#scales">
      <p>
        A color scale – sometimes called a color ramp – is an evenly-spaced ramp of shades for a particular color hue. In the Kolibri Design System, we follow <DocsExternalLink text="Google's Material convention" href="https://material.io/archive/guidelines/style/color.html" /> and segment colors into brightness levels, named <code>v_200</code>, <code>v_400</code>, <code>v_600</code>, … <code>v_1000</code>, <code>v_1100</code>:
      </p>
      <DocsColorBlock name="palette.green.v_200" />
      <DocsColorBlock name="palette.green.v_400" />
      <DocsColorBlock name="palette.green.v_600" />
      <p style="margin-left: 60px">
        …
      </p>
      <DocsColorBlock name="palette.green.v_1000" />
      <DocsColorBlock name="palette.green.v_1100" />
      <p>
        Due to the inconsistent way that humans perceive color and light, computing these scales is <DocsExternalLink text="both art and science" href="https://uxplanet.org/designing-systematic-colors-b5d2605b15c" />. It should not be done by simply sliding a "brightness" setting. We used <DocsExternalLink text="materialpalettes.com" href="https://materialpalettes.com/" /> to generate the scales for our primary and secondary brand colors. The same should be done for new themes.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Brand colors" anchor="#brand">
      <p>
        Brand colors are chosen to reflect the mood, identity, or trademark of an application or an organization. The design system defines primary (dominant) and secondary (accent) branded color hues.
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

    <DocsPageSection title="Palette" anchor="#palette">
      <p>
        A color palette is a set of generic base colors that cover a wide range of the color spectrum. We use the <DocsExternalLink text="2014 Material Design color palette" href="https://material.io/archive/guidelines/style/color.html#color-color-tool" />, which has many colors to choose from.
      </p>
      <p>
        In our design system, colors from the palette have names like <code>pink</code>, <code>grey</code>, and <code>amber</code>.
      </p>
      <p>
        With the exception of grey values, choosing arbitrary colors from the palette is only slightly better than choosing arbitrary hex values from the full color spectrum. No consistency or meaning is ensured, and they should generally be avoided in favor of specific color tokens and brand colors.
      </p>

      <h3>Grey values</h3>
      <p>A scale of standard greys</p>
      <DocsColorBlock name="palette.white" definition />
      <DocsColorBlock name="palette.black" definition />
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
              Object.keys(this.$themePalette[color]).map(variant => `palette.${color}.${variant}`)
            );
          }
        }
        return palette;
      },
    },
  };

</script>


<style lang="scss" scoped>

  .palette-block {
    display: inline-block;
    width: 350px;
  }

</style>
