<template>

  <DocsPageTemplate>

    <DocsPageSection title="Typeface" anchor="#typeface">
      <p>
        Kolibri is translated into upwards of 30 languages, and the public content library contains resources in dozens more. There is no way to know in advance what text will be displayed, or which fonts are already available on the user's device.
      </p>
      <DocsShow>
        <img src="./noto.png" style="width: 50%;">
      </DocsShow>
      <p>
        To work around this challenge, products in the Kolibri ecosystem use the open source typeface <DocsExternalLink text="Noto Sans" href="https://fonts.google.com/noto" /> maintained by Google. Noto includes a wide range of fonts that cover an enormous number of languages, scripts, and glyphs.
      </p>
      <p>
        Kolibri must work offline, and therefore the design system has some special logic for loading fonts as-needed from the device. Studio on the other hand is in the cloud and relies on the Google Fonts API to load Noto.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Globally-available styles" anchor="#definitions">
      <p>
        The design system provides a set of reusable style constants, snippets, and dynamic values.
      </p>
      <p>
        Constants are made available as <DocsExternalLink text="SCSS variables" href="https://sass-lang.com/documentation/variables" /> and snippets are made available as <DocsExternalLink text="SCSS placeholder selectors" href="https://sass-lang.com/documentation/style-rules/placeholder-selectors" />. For example, we provide a constant called <code>$radius</code> (defined as <code>4px</code>) and a placeholder selector called <code>%dropshadow-2dp</code> which creates a 2dp drop shadow. These can be used to style an element by importing the definitions file:
      </p>
      <p>
        Use these by importing the design system's <code>definitions.scss</code> file. For example, this HTML and SCSS in a Vue template:
      </p>
      <DocsShowCode language="html">
        <div class="box">
          Hello!
        </div>
      </DocsShowCode>
      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="css">
        @import '~kolibri-design-system/lib/styles/definitions'

        .box {
          @extend %dropshadow-2dp;

          border-radius: $radius;
          text-align: center;
        }
      </DocsShowCode>
      <!-- eslint-enable -->
      <p>can help easily reproduce styles like:</p>
      <DocsShow>
        <div class="box box-2dp">
          Hello!
        </div>
      </DocsShow>
      <p>
        In order for Kolibri to be dynamically themed colors cannot be defined as SCSS constants. Instead, colors are defined in Javascript. Every Vue component instance gets a few reactive Vue objects attached to it which can be accessed in computed styles:
      </p>
      <ul>
        <li><code>$themeBrand</code> contains colors related to the aesthetic color scheme</li>
        <li><code>$themeTokens</code> contains colors with special meanings in Kolibri</li>
        <li><code>$themePalette</code> contains a wide range of additional compatible colors</li>
      </ul>
      <p>
        For more informatiom see the <DocsInternalLink text="Colors page" href="/colors" />.
      </p>

    </DocsPageSection>

    <DocsPageSection title="Elevation and shadow" anchor="#elevation">
      <p>
        Kolibri products use a system of elevation based roughly on Google's <DocsExternalLink href="https://material.io/archive/guidelines/material-design/elevation-shadows.html" text="Material Design" />. Material introduces the idea that  UI container elements (menus, modals, side-bars, etc) exist on a particular "elevation" on the page, which defines which one is visible when they overlap.
      </p>
      <p>
        The diagram below (with credit to Google) shows the conventional elevations:
      </p>

      <DocsShow>
        <img src="./3d-elevation.png" style="width: 700px;">
      </DocsShow>
      <p>
        Applying these conventions consistently helps build components that look and interact with each other in predictable ways.
      </p>

      <h3>Drop shadows</h3>
      <p>
        In the real world, the shadow an object casts is often a physical manifestation of its elevation.
      </p>
      <p>
        The design system provides a set of pre-defined <DocsExternalLink text="SCSS placeholder selectors" href="https://sass-lang.com/documentation/style-rules/placeholder-selectors" /> which allow consistent application of realistic-looking shadows: 1dp, 2dp, and 6dp:
      </p>

      <DocsShow>
        <div class="box box-1dp">
          1dp
        </div>
        <div class="box box-2dp">
          2dp
        </div>
        <div class="box box-6dp">
          6dp
        </div>
      </DocsShow>

      <p>Follow the guidance below to decide what depth to use for a drop shadow:</p>
      <dl>
        <dt>1dp</dt><dd>containers, panels, controls</dd>
        <dt>2dp</dt><dd>cards, app bars, buttons, menu, tooltips, snackbars</dd>
        <dt>6dp</dt><dd>modals, card hover</dd>
      </dl>

      <p>
        This can be achieved by with the dropshadow helpers:
      </p>
      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="css">
        @import '~kolibri-design-system/lib/styles/definitions'

        .box-1dp {
          @extend %dropshadow-1dp;
        }

        .box-2dp {
          @extend %dropshadow-2dp;
        }

        .box-6dp {
          @extend %dropshadow-6dp;
        }
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>Z-indexes</h3>
      <p>
        CSS <code>z-index</code> is sometimes used to determine whether some element will show in front of or behind overlapping elements. A common challenge is that <code>z-index</code> values get set to arbitrary numbers, which leads to ever-increasing and bizarre values to force one element to display over another.
      </p>
      <p>
        In Kolibri products we try to use the conventional elevation dp values shown above as default <code>z-index</code> values. This ensures that, for example, a custom menu should always show below a custom nav drawer even if there was no coordination between the authors of those components.
      </p>
      <p>
        Note that it is <em>not</em> encouraged to set a <code>z-index</code> on every element. There are many reliable ways in CSS to show one item over another and <code>z-index</code> is often used a last resort.
      </p>

    </DocsPageSection>

    <DocsPageSection title="Easing and timing" anchor="#easing">
      <p>
        Rapid visual transitions for elements that move or change state help users understand what is happening on the page and add a level of polish that makes the app feel smooth and responsive:
      </p>
      <DocsShow>
        <div class="box immediate">
          Immediate hover
        </div>
        <div class="box ease">
          Easing hover
        </div>
      </DocsShow>
      <p>
        Easing functions should be applied to every visual state transition, including color changes.
      </p>
      <p>
        We have a "standard" easing curve as well as curves for for outgoing items (accelerating) and incoming items (decelerating). Apply a transition with default duration <code>$core-time</code> and use one of the SCSS placeholder selectors:
      </p>
      <ul>
        <li><code>%md-standard-func</code></li>
        <li><code>%md-accelerate-func</code></li>
        <li><code>%md-decelerate-func</code></li>
      </ul>
      <p>
        For example:
      </p>
      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="css">
        @import '~kolibri-design-system/lib/styles/definitions'

        .ease:hover {
          @extend %dropshadow-6dp;
          @extend %md-standard-func;

          cursor: pointer;
          transition: all $core-time;
        }
      </DocsShowCode>
      <!-- eslint-enable -->

    </DocsPageSection>

    <DocsPageSection title="Focus outline" anchor="#focus-outline">
      <p>
        We provide a consistent, high-contrast focus highlight that is enabled only when we detect that the user is navigating using the keyboard (i.e. tabbing from item to item). Use the <code>$coreOutline</code> attribute attached to Vue objects for this.
      </p>
    </DocsPageSection>


  </DocsPageTemplate>

</template>


<style lang="scss" scoped>

  @import '~~/lib/styles/definitions';

  dt {
    font-weight: bold;
  }

  .box {
    display: inline-block;
    min-width: 80px;
    padding: 8px;
    margin: 32px;
    font-size: smaller;
    text-align: center;
    border-radius: $radius;
  }

  .box-1dp {
    @extend %dropshadow-1dp;
  }

  .box-2dp {
    @extend %dropshadow-2dp;
  }

  .box-6dp {
    @extend %dropshadow-6dp;
  }

  .immediate:hover {
    @extend %dropshadow-6dp;

    cursor: pointer;
  }

  .ease:hover {
    @extend %dropshadow-6dp;
    @extend %md-standard-func;

    cursor: pointer;
    transition: all $core-time;
  }

</style>