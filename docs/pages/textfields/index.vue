<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Text fields allow users to enter or edit text within forms and modals. They also support multiple text formats including email and numbers. Additionally, they can trigger the appearance of dropdown menus.
      </p>
      <p>
        You can use the <DocsLibraryLink component="KTextbox" /> component to implement text fields.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Text" anchor="#text">
      <ul>
        <li>Do not use placeholder text</li>
        <li>Do not autocapitalize text inputs</li>
        <li>Label text should be aligned with the input line</li>
        <li>Keep label text short and concise</li>
        <li>Some text fields can be restricted to numeric input</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Layout" anchor="#layout">
      <ul>
        <li>Do not wrap text or icons to a new line</li>
        <li>When text fields are vertically stacked (e.g. in a form), no one field should extend past the form container</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Assistive elements" anchor="#assistiveelements">
      <p>
        Assistive elements provide users with helpful information regarding their input:
      </p>
    </DocsPageSection>

    <DocsDoNot>
      <template #do>
        <img src="./assistive-1.png">
        <p class="do-dont">
          Use helper text to indicate an input is required
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot>
      <template #do>
        <img src="./assistive-2.png">
        <p class="do-dont">
          Show a ratio of characters used and total character limit for fields with character limits
        </p>
      </template>
    </DocsDoNot>

    <DocsPageSection title="Iconography" anchor="#iconography">
      <p>
        Iconography should be used sparingly and purposefully. Here are common text field and icon pairings:
      </p>
    </DocsPageSection>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./icon-1.png">
        <p class="do-dont">
          Include a clear icon to indicate an ability to clear the field when text is present
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./icon-2.png">
        <p class="do-dont">
          Include a copy icon to indicate information is able to be copied
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./icon-3.png">
        <p class="do-dont">
          Include an info icon that reveals more information on hover or click
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./icon-4.png">
        <p class="do-dont">
          Include controls that can affect the the input of a numeric text field
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./icon-5.png">
        <p class="do-dont">
          Include a dropdown icon to indicate the presence of a nested menu component
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot style="display: inline-block;">
      <template #do>
        <img src="./icon-6.png">
        <p class="do-dont">
          Include an icon signifier to the left of the label to indicates a theme or category of the dropdown menu options
        </p>
      </template>
    </DocsDoNot>

    <DocsPageSection title="Error text" anchor="#errortext">
      <p>
        Error text appears when there is an error detected with the user's input. Error text should replace helper text where applicable.
      </p>
      <ul>
        <li>Error text is written in sentence case</li>
        <li>Error text should describe specifically how to resolve the error</li>
        <li>Error text disappears when the error is resolved</li>
        <li>Error text should be paired with an error icon to aid visibility for colorblind users</li>
      </ul>

      <DocsDoNot>
        <template #do>
          <img src="./errors-1.png">
          <p class="do-dont">
            Be specific as possible about how to resolve the error
          </p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template #do>
          <img src="./errors-2.png">
          <p class="do-dont">
            Provide general error text for nonspecific errors
          </p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template #not>
          <img src="./errors-3.png">
          <p class="do-dont">
            Stack error text below helper text
          </p>
        </template>
      </DocsDoNot>

    </DocsPageSection>

    <DocsPageSection title="Advanced configurations" anchor="#advanced">
      <p>
        Text fields can have a few behavioral exceptions:
      </p>
    </DocsPageSection>

    <DocsDoNot>
      <template #do>
        <img src="./advanced-1.png">
        <p class="do-dont">
          Prompt autocomplete suggestions to help users navigate lengthy dropdown menus
        </p>
      </template>
    </DocsDoNot>

    <DocsDoNot>
      <template #do>
        <img src="./advanced-2.png">
        <p class="do-dont">
          Display multiple selections as chips
        </p>
      </template>
    </DocsDoNot>


    <DocsPageSection title="Specifications" anchor="#specifications">
      <ul>
        <li>Height: 54px</li>
        <li>Min width: 252px</li>
        <li>Corner radius: 2px</li>
        <li>
          Fill color:
          <DocsInternalLink code text="palette.grey.v_400" href="/colors#palette-grey-v_400" />, 0.25 opacity
        </li>
        <li>
          Bottom stroke color:
          <DocsInternalLink code text="palette.grey.v_600" href="/colors#palette-grey-v_600" />
        </li>
        <li>
          Bottom stroke focused color:
          <DocsInternalLink code text="tokens.primary" href="/colors#tokens.primary" />
        </li>
        <li>
          Label text color:
          <DocsInternalLink code text="palette.grey.v_200" href="/colors#palette-grey-v_200" />
        </li>
        <li>
          Focused text color:
          <DocsInternalLink code text="tokens.text" href="/colors#tokens.primary" />
        </li>
      </ul>
    </DocsPageSection>



  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped>

  img,
  .do-dont {
    width: 400px;
  }

</style>
