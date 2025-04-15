<template>

  <KCardGrid
    layout="1-1-1"
    :skeletonsConfig="skeletonsConfig"
    :loading="loading"
  >
    <Card
      :to="{ path: '#guidelines' }"
      :headingLevel="4"
      :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
      thumbnailDisplay="large"
      thumbnailAlign="right"
      title="First card"
    >
      <template #select>
        <KCheckbox
          :checked="isFirstCardChecked"
          @change="isFirstCardChecked = !isFirstCardChecked"
        >
          <span class="visuallyhidden">Select 'First card'</span>
        </KCheckbox>
      </template>
      <template #footer>
        <KIconButton
          ariaLabel="Bookmark resource"
          :icon="isBookmarked1 ? 'bookmark' : 'bookmarkEmpty'"
          @click.stop="isBookmarked1 = !isBookmarked1"
        />
      </template>
    </Card>

    <Card
      :to="{ path: '#guidelines' }"
      :headingLevel="4"
      :orientation="windowBreakpoint > 2 ? 'horizontal' : 'vertical'"
      thumbnailDisplay="large"
      thumbnailAlign="right"
      title="Second card"
    >
      <template #select>
        <KCheckbox
          :checked="isSecondCardChecked"
          @change="isSecondCardChecked = !isSecondCardChecked"
        >
          <span class="visuallyhidden">Select 'Second card'</span>
        </KCheckbox>
      </template>
      <template #footer>
        <KIconButton
          ariaLabel="Bookmark resource"
          :icon="isBookmarked2 ? 'bookmark' : 'bookmarkEmpty'"
          @click.stop="isBookmarked2 = !isBookmarked2"
        />
      </template>
    </Card>
  </KCardGrid>

</template>


<script>

  import useKResponsiveWindow from '../../../lib/composables/useKResponsiveWindow';

  export default {
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return { windowBreakpoint };
    },
    data() {
      return {
        isBookmarked1: false,
        isBookmarked2: false,
        isFirstCardChecked: false,
        isSecondCardChecked: false,
        loading: true,
        skeletonsConfig: [
          {
            breakpoints: [0, 1, 2, 3, 4, 5, 6, 7],
            orientation: 'vertical',
            thumbnailDisplay: 'large',
            height: '400px',
          },
          {
            breakpoints: [2],
            height: '380px',
          },
          {
            breakpoints: [3, 4, 5, 6, 7],
            orientation: 'horizontal',
            thumbnailAlign: 'right',
            height: '180px',
          },
        ],
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  };

</script>
