<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Simple modals break the user’s attention away from the main UI in order to focus attention on a singular action or task. They can contain alerts about important information and allow the user to edit data.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Layout" anchor="#layout">
      <p>
        Modals have 3 sections that are always present: <strong>title, content</strong>, and <strong>actions</strong>.
      </p>
      <p>
        Optional:
      </p>
      <ul>
        <li>Text prop below title</li>
        <li>Secondary button</li>
      </ul>
      <DocsShow>
        <img class="modal-img" src="./modal.png">
        <img class="modal-img" src="./modal-info.png">
      </DocsShow>
      <h3>
        Title
      </h3>
      <p>
        Keep this short, concise, and easy for the user to understand. Should not be structured as a sentence or question, and should not contain user-generated text.
      </p>
      <DocsDoNot>
        <template v-slot:do>
          <img src="./modal-title.png">
        </template>
        <template v-slot:not>
          <img src="./modal-badtitle.png">
        </template>
      </DocsDoNot>
      <h3>
        Content
      </h3>
      <p>
        Along with text, the following UI elements are allowed in the content section of a modal:
      </p>
      <ul>
        <li>Text field</li>
        <li>Checkboxes</li>
        <li>Radio</li>
        <li>Select dropdown</li>
        <li>List with vertical scrollbar</li>
        <li>Loaders</li>
        <li>Link buttons and icon buttons</li>
      </ul>
      <h3>
        Scrolling
      </h3>
      <p>
        If a modal happens to have a content section that expands beyond the max height, enable vertical scrolling.
      </p>
      <p>
        There should never be horizontal scrolling inside a modal.
      </p>
      <h3>
        Actions
      </h3>
      <p>
        There is always a raised action button present at the bottom right. Should always be affirmative (i.e. will save data or continue user to the next step).
      </p>
      <p>
        If there is a need for a secondary action, use a flat secondary button that is placed to the left of the action button. Secondary actions should always be dismissive (i.e. does not save any altered data, or cancels a next step).
      </p>
      <p>
        The button group should be right-aligned.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Style" anchor="#style">
      <h3>Size</h3>
      <p>
        Generally, modals should be of three sizes to accommodate varied screen sizes:
      </p>
      <ul>
        <li><strong>Small:</strong> 300px width. Default size of modals</li>
        <li><strong>Medium:</strong> 450px width. Use for text-heavy modals</li>
        <li><strong>Large:</strong> 100% width. Use on an exceptional, case-by-case basis</li>
      </ul>
      <p>
        If there are other cases when a simple modal should be increased in width, follow Material’s guide: <strong>increment by 56px</strong>.
      </p>
      <h3>
        Scrim
      </h3>
      <p>
        The scrim is the semi-translucent backdrop which covers the rest of the page. It should be <code>rgba(0,0,0,0.7)</code>.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Behaviors" anchor="#behaviors">
      <h3>
        URL behavior
      </h3>
      <p>
        Simple modals should not have a URL.
      </p>
      <h3>
        Dismissing modals
      </h3>
      <p>
        Modals with a primary button can be dismissed in a few ways: through a “cancel/close” button within the modal, or pressing the escape key. For these modals, the enter key should trigger the primary action.
      </p>
      <p>
        Modals that are purely informational and contain only a single dismissive button can also be dismissed with the escape key or the enter key.
      </p>
      <p>
        Modals are never dismissible by clicking the scrim.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Errors" anchor="#errors">
      <p>
        If the user experiences a client-side or server-side error, the corresponding validation messages should display within the modal.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Accessibility" anchor="#accessibility">
      <p>
        Modals should be keyboard accessible for users who use assistive technology. Tabbing should limit the user to the options within a modal only and not extend to the UI beneath it.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Examples" anchor="#examples">
      <DocsDoNot>
        <template v-slot:do>
          <img src="./modal.png">
          <p class="do-dont">
            Present one modal at a time
          </p>
        </template>
        <template v-slot:not>
          <img src="./modal-overlay.png">
          <p class="do-dont">
            Overlay modals on modals
          </p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template v-slot:do>
          <img src="./modal-checks.png">
          <p class="do-dont">
            Use modals for simple, singular, focused tasks
          </p>
        </template>
        <template v-slot:not>
          <img src="./modal-table.png">
          <p class="do-dont">
            Insert a table or other complex interactions
          </p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template v-slot:do>
          <img src="./modal-delete.png">
          <p class="do-dont">
            Use language which directly implies the result of the action
          </p>
        </template>
        <template v-slot:not>
          <img src="./modal-alert.png">
          <p class="do-dont">
            Use ambiguous language for titles, content, and actions
          </p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template v-slot:do>
          <img src="./modal.png">
          <p class="do-dont">
            Present a single way to continue through and exit the modal
          </p>
        </template>
        <template v-slot:not>
          <img src="./modal-back.png">
          <p class="do-dont">
            Use an ‘X’ button, back, or other duplicative actions
          </p>
        </template>
      </DocsDoNot>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<style lang="scss" scoped>

  img,
  .do-dont {
    width: 250px;
  }

</style>
