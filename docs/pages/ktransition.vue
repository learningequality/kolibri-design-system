<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        Exposes predefined set of transitions built on top of Vue's <code>&lt;transition&gt;</code>.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <ul>
        <li>
          Don't forget to define <code>key</code> on child elements of <code>KTransition</code> as
          described
          <DocsExternalLink
            text="in Vue documentation"
            href="https://v2.vuejs.org/v2/guide/transitions#Transitioning-Between-Elements"
          />.
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Available transitions"
      anchor="#overview"
    >
      <section>
        <h3><code>component-fade-out-in</code></h3>
        <p>Suitable when switching between two elements/components.</p>

        <DocsShowCode language="html">
          <KTransition kind="component-fade-out-in">
            <div
              v-if="isTruthy"
              key="key-1"
            >
              First component
            </div>
            <div
              v-else
              key="key-2"
            >
              Second component
            </div>
          </KTransition>
        </DocsShowCode>

        <p>Output:</p>
        <DocsShow
          block
          language="html"
        >
          <KTransition kind="component-fade-out-in">
            <div
              v-if="isTruthy"
              key="key-1"
            >
              First component
            </div>
            <div
              v-else
              key="key-2"
            >
              Second component
            </div>
          </KTransition>
        </DocsShow>
      </section>

      <section>
        <h3><code>component-vertical-slide-out-in</code></h3>
        <p>
          Suitable when need to reduce vertical jarring effect during the entrance/exit of a
          component.
        </p>

        <DocsExample
          exampleId="vertical-slide"
          loadExample="KTransition/VerticalSlide.vue"
          block
        />
      </section>
    </DocsPageSection>

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li>
          <DocsExternalLink
            text="Vue's transitions documentation"
            href="https://v2.vuejs.org/v2/guide/transitions"
          />
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        isTruthy: true,
        intervalId: null,
      };
    },
    mounted() {
      this.intervalId = setInterval(() => {
        this.isTruthy = !this.isTruthy;
      }, 2000);
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
    },
  };

</script>


<style lang="scss" scoped></style>
