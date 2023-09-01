<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>A composable that offers the <code>show</code> reactive function. This function guarantees that something will be displayed at least for a specified duration after an initial trigger. This is typically used to prevent a jarring user experience when showing or hiding certain elements. For example, it can be used to ensure that a loader remains visible for a certain amount of time, even when the related data has already been loaded.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <code>show(key, shouldShow, minVisibleTime)</code>

      <DocsShowCode language="html">
        <div v-if="show('key-1', isLoading, minVisibleTime)">
          Loading...
        </div>
        <div v-else>
          Loaded!
        </div>
      </DocsShowCode>
      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
        import useKShow from 'kolibri-design-system/lib/composables/useKShow';

        export default {
          setup() {
            const { show } = useKShow();
            return { show };
          }
        };
      </DocsShowCode>
      <!-- eslint-enable -->
    </DocsPageSection>

    <DocsPageSection title="Example" anchor="#example">
      <p>This is a simulation of a typical use-case of showing a loader while fetching data. You can set your own fetch request length and minimum visible time, and then hit the fetch button to see the output.</p>

      <DocsShowCode language="html">
        <transition name="component-fade" mode="out-in">
          <KCircularLoader
            v-if="show('key-1', isFetching, minVisibleTime )"  
          />
          <div v-else>
            Loaded!
          </div>
        </transition>
      </DocsShowCode>

      <div :style="{ marginTop: '24px', display: 'flex' }">
        <div>
          <span :style="{ marginLeft: '8px' }">Output:</span>
          <DocsShow>
            <div :style="{ width: '200px', height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 2px 4px 2px' }">
              <div>
                <transition name="component-fade" mode="out-in">
                  <KCircularLoader
                    v-if="show('key-1', isFetching, minVisibleTime )"
                    key="loader"
                    disableDefaultTransition
                  />
                  <div v-else key="message" :style="{ textAlign: 'center' }">
                    Loaded!
                  </div>
                </transition>
              </div>
              <div>
                <code>isFetching: {{ isFetching }}</code>
                <code>minVisibleTime: {{ minVisibleTime }}</code>
              </div>
            </div>
          </DocsShow>
        </div>
        <div :style="{ marginTop: '28px', marginLeft: '24px' }">
          <span>
            <label :style="{ display: 'block' }">Fetch request length (ms)</label>
            <input
              v-model="fetchingTimeInput"
              type="number"
              :style="{ display: 'block' }"
            >  
          </span>
          <span>
            <label :style="{ display: 'block', marginTop: '12px' }">
              Minimum visible time (ms)
            </label>
            <input
              v-model="minVisibleTimeInput"
              type="number"
              :style="{ display: 'block' }"
            >  
          </span>
          <KButton :style="{ marginTop: '24px' }" @click="fetchData">
            Fetch data
          </KButton>
        </div>
      </div>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          Some components offer a simpler interfance to achieve the same effect when there is no need to be switching between more components. For example, see <DocsInternalLink href="/kcircularloader#prop:minVisibleTime">
            KCircularLoader's <code>minVisibleTime</code>
          </DocsInternalLink>.
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Parameters" anchor="#parameters">
      <PropsTable :api="params" />
    </DocsPageSection>

    <DocsPageSection title="Returns" anchor="#returns">
      <p><span style="font-weight: bold">Type:</span> <code>boolean</code></p>
      <p><span style="font-weight: bold">Description:</span> Returns <code>true</code> after <code>shouldShow</code> becomes truthy and keeps returning <code>true</code> for the duration of <code>minVisibleTime</code> (even when <code>shouldShow</code> changes back to falsy meanwhile). After <code>minVisibleTime</code> elapses and when <code>shouldShow</code> is falsy already, it returns <code>false</code>.</p> 
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import { ref } from '@vue/composition-api';
  import useKShow from '../../lib/composables/useKShow';
  import PropsTable from '../common/DocsPageTemplate/jsdocs/PropsTable';

  export default {
    components: {
      PropsTable,
    },
    setup() {
      const { show } = useKShow();

      let timeoutId;
      const isFetching = ref(false);

      const minVisibleTime = ref(5000);
      const minVisibleTimeInput = ref(5000);

      const fetchingTime = ref(1000);
      const fetchingTimeInput = ref(1000);

      function fetchData() {
        clearTimeout(timeoutId);

        fetchingTime.value = fetchingTimeInput.value;
        minVisibleTime.value = minVisibleTimeInput.value;
        isFetching.value = true;

        timeoutId = setTimeout(function() {
          isFetching.value = false;
        }, fetchingTime.value);
      }

      return {
        show,
        isFetching,
        fetchingTime,
        minVisibleTime,
        fetchingTimeInput,
        minVisibleTimeInput,
        fetchData,
      };
    },
    data() {
      return {
        params: [
          {
            name: 'key',
            required: true,
            type: { name: 'number|string' },
            description:
              'Each `show` function instance has to pass a key unique in the context of a whole page to this attribute',
          },
          {
            name: 'shouldShow',
            required: false,
            default: false,
            type: { name: 'boolean' },
            description:
              'Accurate, real-time information on whether something should be shown. For example, it should be set to `false` for a loader immediately after related data have finished loading.',
          },
          {
            name: 'minVisibleTime',
            required: false,
            default: 0,
            type: { name: 'number' },
            description: 'For how long should `show` return `true` after an initial trigger',
          },
        ],
      };
    },
  };

</script>


<style lang="scss" scoped>

  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
