import { render, screen } from '@testing-library/vue';
import KDateDay from '../KDateDay.vue';

const DAY = 14;

function renderKDateDay(props = {}) {
  return render(KDateDay, { props: { day: DAY, activeMonth: 0, ...props } });
}

const getDay = () => screen.getByRole('button');

describe('KDateDay colors', () => {
  it('leaves an ordinary day the flat button background', () => {
    renderKDateDay();

    expect(getDay()).toHaveStyle({ '--k-button-color': 'var(--palette-grey-v700)' });
    expect(getDay().style.getPropertyValue('--k-button-background-color')).toBe('');
  });

  it('tints a day inside the range', () => {
    renderKDateDay({ isInRange: true });

    expect(getDay()).toHaveStyle({
      '--k-button-color': 'var(--palette-grey-v700)',
      '--k-button-background-color': 'var(--brand-primary-v100)',
      '--k-button-hover-background-color': 'var(--palette-grey-v300)',
    });
  });

  it('fills a selected day, and keeps that fill under the pointer', () => {
    renderKDateDay({ isSelected: true });

    expect(getDay()).toHaveStyle({
      '--k-button-color': 'var(--palette-white)',
      '--k-button-background-color': 'var(--brand-primary-v500)',
      '--k-button-hover-background-color': 'var(--brand-primary-v500)',
    });
  });

  // an endpoint of the range is selected and in range at once
  it('prefers the selected color on an endpoint, which is also in range', () => {
    renderKDateDay({ isSelected: true, isInRange: true });

    expect(getDay()).toHaveStyle({
      '--k-button-color': 'var(--palette-white)',
      '--k-button-background-color': 'var(--brand-primary-v500)',
      '--k-button-hover-background-color': 'var(--brand-primary-v500)',
    });
  });

  it('sets no plain color or background declaration', () => {
    renderKDateDay({ isSelected: true });

    expect(getDay().getAttribute('style')).not.toMatch(/(^|;)\s*color:/);
    expect(getDay().getAttribute('style')).not.toMatch(/(^|;)\s*background-color:/);
  });
});
