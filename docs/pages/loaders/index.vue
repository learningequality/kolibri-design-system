<template>

  <DocsPageTemplate>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        Loading state is used to convey the need to wait some time for a software- or
        hardware-related operation to complete. They can be used for a range of ongoing processes,
        including network, disk and CPU operations.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Guidelines"
      anchor="#guidelines"
    >
      <ul>
        <li><strong>Apply 300ms delay</strong> before showing loading state</li>
        <li>
          Guarantee that loading state will be <strong>visible for at least 400ms</strong> once
          shown
        </li>
        <li>
          For card grids, utilize
          <DocsInternalLink
            href="/kcardgrid#loading-state"
            text="loading skeletons"
          />
        </li>
        <li>In other cases, use circular or linear loader according to the usages below</li>
        <li>
          When switching between a loading indicator and another component via
          <code>v-if/v-else</code>, utilize
          <DocsInternalLink
            href="/usekshow#example"
            text="useKShow with KTransition"
          />
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Delay"
      anchor="#delay"
    >
      <p>
        Displaying loading state for fast operations can cause visual disruption resulting in worse
        experience than showing nothing at all. To avoid this, wait 300ms before showing a loading
        indicator.
      </p>

      <p>
        <code>KCardGrid</code>'s loading skeletons already have this behavior implemented by
        default. <code>KCircularLoader</code> and <code>KLinearLoader</code> provide the
        <code>delay</code> prop.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Minimum visible time"
      anchor="#minimum-visible-time"
    >
      <p>
        After a loading indicator appears, it should remain visible for at least 400ms before being
        replaced by content to prevent a brief flash of loading state causing a jarring visual
        experience.
      </p>

      <p>
        <code>KCardGrid</code>'s loading skeletons already have this behavior implemented by
        default. <code>KCircularLoader</code> provides a <code>minimumVisibleTime</code> prop.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Linear loaders"
      anchor="#linear-loaders"
    >
      <p>
        Linear loaders illustrate progress by moving an indicator along a horizontal track. There
        are two types of linear loaders:
      </p>

      <ul>
        <li>
          Determinate: these loaders show a visual indicator of detectable and measurable progress
          percentage
        </li>
        <DocsShow>
          <KLinearLoader
            :progress="75"
            type="determinate"
            class="loader"
            style="width: 400px; margin: 24px"
          />
        </DocsShow>
        <li>
          Indeterminate: these loaders show an ongoing process with an unspecified or undetectable
          percentage completion
        </li>
        <DocsShow>
          <KLinearLoader
            :progress="75"
            type="indeterminate"
            class="loader"
            style="width: 400px; margin: 24px"
          />
        </DocsShow>
      </ul>

      <p>Use <DocsLibraryLink component="KLinearLoader" />.</p>

      <h3>Usages</h3>

      <p>Use linear loaders for the following:</p>

      <ul>
        <li>Loading initial page content</li>
        <li>Representing the progress of a measurable task</li>
      </ul>

      <DocsDoNot>
        <template #do>
          <img
            src="../loaders/topbar.png"
            style="max-width: 400px"
          >
          <p>Append linear loaders to appbars to load page content</p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template #do>
          <img
            src="../loaders/tasks.png"
            style="max-width: 400px"
          >
          <p>Place linear loaders near information related to the task being measured</p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template #do>
          <img
            src="../loaders/tables.png"
            style="max-width: 400px"
          >
          <p>Append linear loaders to data tables</p>
        </template>
      </DocsDoNot>

      <h3>Specification</h3>
      <ul>
        <li>
          Track color:
          <DocsInternalLink
            text="palette.grey.v_200"
            code
            href="/colors#palette-grey-v_200"
          />
        </li>
        <li>
          Indicator color:
          <DocsInternalLink
            text="tokens.loading"
            code
            href="/colors#tokens-loading"
          />
        </li>
        <li>Height: <code>4px</code></li>
        <li>
          Corner radius: <code>2px</code>. Remove the corner radius when appended to other
          components, such as appbars or data tables.
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Circular loaders"
      anchor="#circular-loaders"
    >
      <DocsShow>
        <KCircularLoader style="margin: 24px" />
      </DocsShow>
      <p>Circular loaders illustrate progress by moving an indicator along a circular track.</p>

      <p>Use <DocsLibraryLink component="KCircularLoader" />.</p>

      <h3>Usages</h3>

      <p>Use circular loaders for the following:</p>

      <ul>
        <li>Loading learning content renderers</li>
        <li>
          Indicating the presence of a working background task (can routinely appear and disappear)
        </li>
        <li>Loading a set of new information</li>
        <li>Pull-to-refresh behaviors on mobile</li>
      </ul>

      <DocsDoNot>
        <template #do>
          <img
            src="../loaders/loading-more.png"
            style="max-width: 400px"
          >
          <p>Place below existing content to indicate where new content appears</p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template #do>
          <img
            src="../loaders/centering.png"
            style="max-width: 400px"
          >
          <p>Center circular loaders when loading new information</p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template #not>
          <p>
            Do not break the flow of information or content by placing between items (e.g. list
            items, content cards, table rows)
          </p>
        </template>
      </DocsDoNot>

      <h3>Specification</h3>
      <ul>
        <li>
          Indicator color:
          <DocsInternalLink
            text="tokens.loading"
            code
            href="/colors#tokens-loading"
          />
        </li>
        <li>Dimensions do not exceed 48x48px</li>
        <li>Width: <code>4px</code></li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li><DocsLibraryLink component="KCircularLoader" /> is a circular loader</li>
        <li><DocsLibraryLink component="KLinearLoader" /> is a linear loader</li>
        <li>
          <DocsLibraryLink component="useKShow" /> manages the display of loading indicators and
          content when switching via <code>v-if/v-else</code>
        </li>
        <li>
          <code>KCardGrid</code> provides
          <DocsInternalLink
            href="/kcardgrid#loading-state"
            text="loading skeletons"
          />
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
