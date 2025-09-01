import { computed } from 'vue';

export default function useKMultiSelectHighlighting(props, searchText) {
  // Computed properties for highlighting
  const shouldHighlight = computed(() => {
    return props.autocomplete && searchText.value && searchText.value.length > 0;
  });

  // Safe highlighting function that returns text segments
  function getHighlightedSegments(text, query) {
    if (!shouldHighlight.value || !query || !text) {
      return [{ text, highlight: false }];
    }

    // Escape special regex characters in the query
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        segments.push({
          text: text.substring(lastIndex, match.index),
          highlight: false,
        });
      }

      // Add the highlighted match
      segments.push({
        text: match[1],
        highlight: true,
      });

      lastIndex = match.index + match[1].length;
    }

    // Add remaining text after the last match
    if (lastIndex < text.length) {
      segments.push({
        text: text.substring(lastIndex),
        highlight: false,
      });
    }

    return segments;
  }

  // Search text management
  function handleInput(event) {
    if (props.autocomplete) {
      // Let parent handle the actual search text update
      return event.target.value;
    } else {
      event.preventDefault();
      return '';
    }
  }

  // Clear search functionality
  function clearSearch() {
    return '';
  }

  // Get search results count message
  function getSearchResultsMessage(displayedOptionsCount) {
    if (!props.autocomplete) {
      return `${displayedOptionsCount} options available`;
    }

    if (searchText.value && searchText.value.length > 0) {
      return `${displayedOptionsCount} results found`;
    }

    return `${displayedOptionsCount} options available`;
  }

  // Check if text should be highlighted
  function shouldHighlightText(text) {
    return (
      props.autocomplete &&
      searchText.value &&
      searchText.value.length > 0 &&
      text &&
      text.length > 0
    );
  }

  // Get search placeholder text
  function getSearchPlaceholder() {
    if (props.value && props.value.length > 0) {
      return ''; // No placeholder when options are selected
    }
    return props.placeholder || 'Search options...';
  }

  // Get search input padding based on state
  function getSearchInputPadding() {
    if (props.autocomplete && (!props.value || props.value.length === 0)) {
      return '0 40px 0 40px'; // Space for search icon
    }
    return '0 40px 0 8px'; // Standard padding
  }

  return {
    // State
    shouldHighlight,

    // Functions
    getHighlightedSegments,
    handleInput,
    clearSearch,
    getSearchResultsMessage,
    shouldHighlightText,
    getSearchPlaceholder,
    getSearchInputPadding,
  };
}
