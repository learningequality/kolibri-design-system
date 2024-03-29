<template>

  <DocsPageTemplate :apiDocs="true">

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Truncates the text to a certain number of lines and adds an ellipsis character "…".
      </p>
      <DocsShow>
        <p>
          <KTextTruncator text="This is a long text that will be truncated to two line. This is a long text that will be truncated to two line. This is a long text that will be truncated to two line. This is a long text that will be truncated to two line. This is a long text that will be truncated to two line." :maxLines="2" />
        </p>
      </DocsShow>
    </DocsPageSection>

  </DocsPageTemplate>

</template>
