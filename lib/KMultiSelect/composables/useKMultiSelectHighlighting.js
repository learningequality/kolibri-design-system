import { computed } from 'vue';

export default function useKMultiSelectHighlighting(props, searchText) {
  const shouldHighlight = computed(() => {
    return props.autocomplete && searchText.value && searchText.value.length > 0;
  });

  function getHighlightedSegments(text, query) {
    if (!shouldHighlight.value || !query || !text) {
      return [{ text, highlight: false }];
    }

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          text: text.substring(lastIndex, match.index),
          highlight: false,
        });
      }

      segments.push({
        text: match[1],
        highlight: true,
      });

      lastIndex = match.index + match[1].length;
    }

    if (lastIndex < text.length) {
      segments.push({
        text: text.substring(lastIndex),
        highlight: false,
      });
    }

    return segments;
  }

  function handleInput(event) {
    if (props.autocomplete) {
      return event.target.value;
    } else {
      event.preventDefault();
      return '';
    }
  }

  function clearSearch() {
    return '';
  }

  function getSearchResultsMessage(displayedOptionsCount) {
    if (!props.autocomplete) {
      return `${displayedOptionsCount} options available`;
    }

    if (searchText.value && searchText.value.length > 0) {
      return `${displayedOptionsCount} results found`;
    }

    return `${displayedOptionsCount} options available`;
  }

  function shouldHighlightText(text) {
    return (
      props.autocomplete &&
      searchText.value &&
      searchText.value.length > 0 &&
      text &&
      text.length > 0
    );
  }

  function getSearchPlaceholder() {
    if (props.value && props.value.length > 0) {
      return '';
    }
    return props.placeholder || 'Search options...';
  }

  function getSearchInputPadding() {
    if (props.autocomplete && (!props.value || props.value.length === 0)) {
      return '0 40px 0 40px';
    }
    return '0 40px 0 8px';
  }

  return {
    shouldHighlight,
    getHighlightedSegments,
    handleInput,
    clearSearch,
    getSearchResultsMessage,
    shouldHighlightText,
    getSearchPlaceholder,
    getSearchInputPadding,
  };
}
