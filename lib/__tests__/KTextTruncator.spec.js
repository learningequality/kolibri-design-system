import { render } from '@testing-library/vue';
import KTextTruncator from '../KTextTruncator.vue';

const TEXT = 'Some text';

function renderTruncator(maxLines) {
  const { container } = render(KTextTruncator, { props: { text: TEXT, maxLines } });
  return container.querySelector('.k-text-truncator');
}

describe('KTextTruncator', () => {
  it('smoke test', () => {
    expect(renderTruncator(1)).toHaveTextContent(TEXT);
  });

  it('truncates a single line with a class alone', () => {
    const truncator = renderTruncator(1);

    expect(truncator).toHaveClass('k-text-truncator-single-line');
    expect(truncator).not.toHaveAttribute('style');
  });

  it('truncates several lines with an inline line clamp', () => {
    const truncator = renderTruncator(3);

    expect(truncator).toHaveClass('k-text-truncator-multi-line');
    expect(truncator).toHaveStyle({ '-webkit-line-clamp': '3' });
  });
});
