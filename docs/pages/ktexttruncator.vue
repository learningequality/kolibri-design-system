<template>

  <DocsPageTemplate :apiDocs="true">
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>Truncates the text to a certain number of lines and adds an ellipsis character "…".</p>
      <DocsShow>
        <p>
          <KTextTruncator
            text="This is a long text that will be truncated to two line. This is a long text that will be truncated to two line. This is a long text that will be truncated to two line. This is a long text that will be truncated to two line. This is a long text that will be truncated to two line."
            :maxLines="2"
          />
        </p>
      </DocsShow>
    </DocsPageSection>
    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <p>By default, text truncates to one line.</p>

      <h3>Customizing the number of lines</h3>
      <p>Use <code>maxLines</code> to control the number of lines before truncation.</p>
      <DocsShow>
        <p>
          <KTextTruncator
            text="This text is too long to fit in the available space. It truncates after three lines instead of two.This text is too long to fit in the available space. This text truncates after three lines instead of two.This text is too long to fit in the available space.This text truncates after three lines instead of two.This text is too long to fit in the available space. It truncates after three lines instead of two."
            :maxLines="3"
          />
        </p>
      </DocsShow>
      <DocsShowCode language="html">
        <KTextTruncator
          text="This text is too long to fit in the available space. It truncates after three lines instead of two.This text is too long to fit in the available space. This text truncates after three lines instead of two.This text is too long to fit in the available space.This text truncates after three lines instead of two.This text is too long to fit in the available space. It truncates after three lines instead of two."
          :maxLines="3"
        />
      </DocsShowCode>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
