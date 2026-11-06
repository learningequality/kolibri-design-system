import { render, screen } from '@testing-library/vue';
import KDateDay from '../KDateDay.vue';

const DAY = 14;

function renderKDateDay(props = {}) {
  return render(KDateDay, { props: { day: DAY, activeMonth: 0, ...props } });
}

const getDay = () => screen.getByRole('button');

// jsdom applies no stylesheet, so visual.spec.js reads the colors in a browser
describe('KDateDay state classes', () => {
  it('marks an ordinary day with the base class alone', () => {
    renderKDateDay();

    expect(getDay()).toHaveClass('calendar-day');
    expect(getDay()).not.toHaveClass('calendar-days-in-range');
    expect(getDay()).not.toHaveClass('calendar-days-selected');
  });

  it('marks a day inside the range', () => {
    renderKDateDay({ isInRange: true });

    expect(getDay()).toHaveClass('calendar-day', 'calendar-days-in-range');
    expect(getDay()).not.toHaveClass('calendar-days-selected');
  });

  // the calendar never sets both, but a caller can
  it('keeps both classes when both props are set', () => {
    renderKDateDay({ isSelected: true, isInRange: true });

    expect(getDay()).toHaveClass('calendar-day', 'calendar-days-in-range');
    expect(getDay()).toHaveClass('calendar-days-selected');
  });

  it('sets no color of any kind inline', () => {
    renderKDateDay({ isSelected: true });

    const style = getDay().getAttribute('style');
    expect(style).not.toMatch(/color/);
    expect(style).not.toMatch(/--k-button/);
  });
});
