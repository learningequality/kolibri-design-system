<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Introduction" anchor="#introduction">
      <p>
        The <code>KCard</code> component is a versatile and accessible base component
        for creating various card types, including lesson cards, resource cards, and channel cards.
        It provides slots for adding content such as titles, subtitles, and footers,
        along with options for displaying thumbnail images and customizing the layout.
      </p>

    </DocsPageSection>
    <DocsPageSection title="Layouts" anchor="#layouts">
      <p>
        <code>KCard</code> offers two main types of layouts to accommodate different content needs: horizontal and vertical.
      </p> 
      <h3>Horizontal Layout</h3>
      <p> The horizontal layout displays the thumbnail image on the left and the content on the right. </p>
      <p> Here's an example of how to use the horizontal layout: </p>
      <DocsShow block>
        <div>
          <KCard
            :to="{ name: 'kcard' }"
            :headingLevel="2"
            layout="horizontal"
            thumbnailDisplay="large"
            :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
          >
            <template #title>
              <div>
                <KTextTruncator
                  text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
                  :maxLines="2"
                />
              </div>
            </template>
            <template #aboveTitle>
              <KGrid>

                <KGridItem
                  :layout12="{ span: 9 }"
                  :layout8="{ span: 6 }"
                >
                  <span><KIcon icon="readSolid" class="icon-size" /></span>
                  <span
                    :style="{ 'color': $themePalette.grey.v_400,
                              'font-size': '1.2em' }"
                  >Rutrum pellentesque utrum...</span>
                </KGridItem>

                <KGridItem
                  :layout12="{ span: 3 }"
                  :layout8="{ span: 2 }"
                >
                  <div style="float:right">
                    <KIcon icon="infoOutline" class="icon-size" />
                  </div>
                </KGridItem>
              </KGrid>
            </template>
            <template #footer>
              <div>
                <div class="footer-top-header">
                  <span>
                    <KIcon icon="practiceSolid" class="icon-size" />
                    Practice
                  </span>
                  <span
                    :style="{ 'background-color': $themePalette.grey.v_100 , 'padding': '2px' }"
                  >
                    Short Activity
                  </span>
                </div>  
              </div>
            </template>
          </kcard>
        </div>
      </DocsShow>

      <h3>Vertical Layout</h3>
      <p> The vertical layout displays the thumbnail image above the content. </p>
      <p> Here's an example of how to use the vertical layout: </p> 
      <DocsShow block>
        <div>
          <KCard
            :to="{ name: 'kcard' }"
            :headingLevel="2"
            layout="vertical"
            thumbnailDisplay="small"
            :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
          >
            <template #title>
              <div>
                <KTextTruncator
                  text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
                  :maxLines="2"
                />
              </div>
            </template>
            <template #aboveTitle>
              <KGrid>

                <KGridItem
                  :layout12="{ span: 8 }"
                  :layout8="{ span: 6 }"
                >
                  <span><KIcon icon="readSolid" class="icon-size" /></span>
                  <span
                    :style="{ 'color': $themePalette.grey.v_400,
                              'font-size': '1.2em' }"
                  >Rutrum pellentesque utrum...</span>
                </KGridItem>

                <KGridItem
                  :layout12="{ span: 4 }"
                  :layout8="{ span: 2 }"
                >
                  <div style="float:right">
                    <KIcon icon="infoOutline" class="icon-size" />
                  </div>
                </KGridItem>
              </KGrid>
            </template>
            <template #footer>
              <div>
                <div class="footer-top-header">
                  <span>
                    <KIcon icon="createShaded" class="icon-size" />
                    Practice
                  </span>
                  <span
                    :style="{ 'background-color': $themePalette.grey.v_100,'padding': '2px' }"
                  >
                    Short Activity
                  </span>
                </div>

                <KGrid>
                  <KGridItem
                    :layout12="{ span: 8 }"
                    :layout8="{ span: 6 }"
                  >
                    <progress
                      value="20"
                      max="100"
                      style="height:0.5em;width:100%"
                    ></progress>
                  </KGridItem>
                  <KGridItem
                    :layout12="{ span: 4 }"
                    :layout8="{ span: 2 }"
                  >
                    <div class="" style="float:right;">
                      <KIcon icon="schedule" class="icon-size" />
                      <KIcon icon="download" class="icon-size" />
                    </div>
                  </KGridItem>
                </KGrid>
              </div>
            </template>
          </kcard>
        </div>
      </DocsShow>
    </DocsPageSection> 

    <DocsPageSection title="Thumbnails" anchor="#thumbnails">
      <p>
        KCard provides options for displaying thumbnails alongside content. 
        The <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
          <code>thumbnailDisplay</code>
        </DocsInternalLink> prop controls whether a thumbnail is shown or hidden.
      </p> 
      <p>
        The thumbnail's display options depend on two factors: the size of the original image and the chosen
        <DocsInternalLink href="/kcard#prop:thumbnailScaleType">
          <code>thumbnailScaleType</code>
        </DocsInternalLink> prop. This property controls how the image is scaled to fit the designated thumbnail area. 
        The available scaling options are the same as those offered by the KImg component's scaleTypes property.
      </p> 
      <p>
        If the <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
          <code>thumbnailDisplay</code>
        </DocsInternalLink> prop is set to "none", the thumbnail will not be displayed.
      </p>
      <DocsShowCode language="html">
        <div>
          <KCard
            :to="{ name: 'kcard' }"
            :headingLevel="2"
            layout="vertical"
            thumbnailDisplay="none"
          >
            <template #title>
              <div>
                <KTextTruncator
                  text="This is a sample lesson title that goes to two lines and truncates at the end of the two lines This is a sample title that goes"
                  :maxLines="2"
                />
              </div>
            </template>
            <template #aboveTitle>
              <div :style="{ 'color': $themePalette.grey.v_400,'font-size': '1.2em' }">
                Class name 1
              </div>
            </template>
            <template #footer>
              <KGrid>
                <KGridItem
                  :layout8="{ span: 4 }"
                  :layout12="{ span: 6 }"
                >
                  <KIcon
                    icon="mastered"
                    style="font-size:20px;margin-bottom:-5px"
                  />
                  <span>score 30%</span>
                </KGridItem>
                <KGridItem
                  :layout8="{ span: 4 }"
                  :layout12="{ span: 6 }"
                >
                  <div class="" style="float:right">
                    <KIcon icon="optionsVertical" />
                  </div>
                </KGridItem>
              </KGrid>
            </template>
          </KCard>
        </div>
      </DocsShowCode>
      <DocsShow block>
        <div>
          <KCard
            :to="{ name: 'kcard' }"
            :headingLevel="2"
            layout="vertical"
            thumbnailDisplay="none"
          >
            <template #title>
              <div>
                <KTextTruncator
                  text="This is a sample lesson title that goes to two lines and truncates at the end of the two lines This is a sample title that goes"
                  :maxLines="2"
                />
              </div>
            </template>
            <template #aboveTitle>
              <div :style="{ 'color': $themePalette.grey.v_400,'font-size': '1.2em' }">
                Class name 1
              </div>
            </template>
            <template #footer>
              <KGrid>
                <KGridItem
                  :layout8="{ span: 4 }"
                  :layout12="{ span: 6 }"
                >
                  <KIcon
                    icon="mastered"
                    style="font-size:20px;margin-bottom:-5px"
                  />
                  <span>score 30%</span>
                </KGridItem>
                <KGridItem
                  :layout8="{ span: 4 }"
                  :layout12="{ span: 6 }"
                >
                  <div class="" style="float:right">
                    <KIcon icon="optionsVertical" />
                  </div>
                </KGridItem>
              </KGrid>
            </template>
          </KCard>
        </div>
      </DocsShow>
      <p>
        And if the <DocsInternalLink href="/kcard#prop:thumbnailDisplay">
          <code>thumbnailDisplay</code>
        </DocsInternalLink> prop is set to "small", the thumbnail will be displayed at a small size.
      </p> 

      <DocsShow block>
        <div>
          <KCard
            :to="{ name: 'kcard' }"
            :headingLevel="2"
            layout="vertical"
            thumbnailDisplay="small"
            :thumbnailSrc="require('../assets/hummingbird CC BY-SA 4.0.jpg')"
          >
            <template #title>
              <div>
                <KTextTruncator
                  text="This is a sample resource title that goes to three lines and truncates at the end of the three lines This is a sample title that goes"
                  :maxLines="2"
                />
              </div>
            </template>
            <template #aboveTitle>
              <KGrid>

                <KGridItem
                  :layout12="{ span: 8 }"
                  :layout8="{ span: 6 }"
                >
                  <span><KIcon icon="readSolid" class="icon-size" /></span>
                  <span
                    :style="{ 'color': $themePalette.grey.v_400,
                              'font-size': '1.2em' }"
                  >Rutrum pellentesque utrum...</span>
                </KGridItem>

                <KGridItem
                  :layout12="{ span: 4 }"
                  :layout8="{ span: 2 }"
                >
                  <div style="float:right">
                    <KIcon icon="infoOutline" class="icon-size" />
                  </div>
                </KGridItem>
              </KGrid>
            </template>
            <template #footer>
              <div>
                <div class="footer-top-header">
                  <span>
                    <KIcon icon="createShaded" class="icon-size" />
                    Practice
                  </span>
                  <span
                    :style="{ 'background-color': $themePalette.grey.v_100,'padding': '2px' }"
                  >
                    Short Activity
                  </span>
                </div>

                <KGrid>
                  <KGridItem
                    :layout12="{ span: 8 }"
                    :layout8="{ span: 6 }"
                  >
                    <progress
                      value="20"
                      max="100"
                      style="height:0.5em;width:100%"
                    ></progress>
                  </KGridItem>
                  <KGridItem
                    :layout12="{ span: 4 }"
                    :layout8="{ span: 2 }"
                  >
                    <div class="" style="float:right;">
                      <KIcon icon="schedule" class="icon-size" />
                      <KIcon icon="download" class="icon-size" />
                    </div>
                  </KGridItem>
                </KGrid>
              </div>
            </template>
          </kcard>
        </div>
      </DocsShow>
      <p>
        The thumbnail's display options depend on two factors: the size of the original image and the chosen
        thumbnailScaleType prop. This property controls how the image is scaled to fit the designated thumbnail area. 
        The available scaling options are the same as those offered by the KImg component's scaleTypes property.
      </p>
      <h5>
        Thumbnail Display 
      </h5>

      <ul>
        <li>none: No thumbnail is displayed.</li>
        <li>small: Sets thumbnailDisplay to a small size.</li>
        <li>large: Sets thumbnailDisplay to a large size.</li>
      </ul>
      <h5>
        Thumbnail Src
      </h5>
      <p> The thumbnailSrc prop is used to set the source URL of the thumbnail image.</p>

      <h5> humbnail Scale Type</h5>
      <p>
        The thumbnailScaleType prop is used to set the scaling type of the thumbnail image. ptions: 'centerInside', 'contain', 'fitXY'. 
        The available scaling options are the same as those offered by the KImg component's scaleTypes property.
      </p>
    </DocsPageSection>
  </DocsPageTemplate>

</template> 
