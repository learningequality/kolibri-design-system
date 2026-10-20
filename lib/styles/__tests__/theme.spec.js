import Vue, { nextTick } from 'vue';
import { render, screen } from '@testing-library/vue';
import { setBrandColors } from '../theme';
import { defaultBrandColors } from '../colorsDefault';
import { generateThemeCssVariables } from '../themeCssVariables';

// omits `v_50` in both families
const TEST_BRAND_COLORS = {
  primary: {
    v_100: '#CCE7E7',
    v_200: '#99CFCF',
    v_300: '#66B7B7',
    v_400: '#339F9F',
    v_500: '#008787',
    v_600: '#006C6C',
  },
  secondary: {
    v_100: '#F3D5CC',
    v_200: '#E7AB99',
    v_300: '#DB8166',
    v_400: '#CF5733',
    v_500: '#C32D00',
    v_600: '#9C2400',
  },
};

let warn;

beforeEach(() => {
  warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  warn.mockRestore();
});

describe('setBrandColors', () => {
  afterEach(() => {
    setBrandColors(defaultBrandColors);
  });

  it('re-runs computeds that read $themeBrand, matching the CSS variables', async () => {
    let runs = 0;
    render({
      template: '<span data-testid="color">{{ color }}</span>',
      computed: {
        color() {
          runs++;
          return this.$themeBrand.primary.v_600;
        },
      },
    });
    setBrandColors(TEST_BRAND_COLORS);
    await nextTick();
    expect(runs).toBe(2);
    expect(screen.getByTestId('color')).toHaveTextContent(TEST_BRAND_COLORS.primary.v_600);
    expect(generateThemeCssVariables()['--brand-primary-v600']).toBe(
      TEST_BRAND_COLORS.primary.v_600,
    );
  });

  it('warns once, naming exactly the missing shades', () => {
    setBrandColors(TEST_BRAND_COLORS);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      'Theme issue: brand colors are missing primary.v_50, secondary.v_50',
    );
  });

  it('does not warn for a complete tree', () => {
    setBrandColors(defaultBrandColors);
    expect(warn).not.toHaveBeenCalled();
  });

  it('leaves the exported defaults untouched', () => {
    const v600 = defaultBrandColors.primary.v_600;
    setBrandColors(TEST_BRAND_COLORS);
    expect(defaultBrandColors.primary.v_600).toBe(v600);
  });

  it('drops families absent from the new tree', () => {
    setBrandColors({ ...defaultBrandColors, tertiary: { v_500: '#000000' } });
    setBrandColors(defaultBrandColors);
    expect(Vue.prototype.$themeBrand.tertiary).toBeUndefined();
  });
});

describe('$themeBrand', () => {
  it('is configurable, so reinstalling the plugin can redefine it', () => {
    expect(Object.getOwnPropertyDescriptor(Vue.prototype, '$themeBrand').configurable).toBe(true);
  });

  it('warns when assigned on Vue.prototype itself', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Vue.prototype, '$themeBrand');
    try {
      Vue.prototype.$themeBrand = { primary: { v_600: '#000000' } };
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('Vue.prototype.$themeBrand');
      expect(Vue.prototype.$themeBrand.primary.v_600).toBe('#000000');
    } finally {
      Object.defineProperty(Vue.prototype, '$themeBrand', descriptor);
    }
  });

  it('can be overridden by a test mock, without warning', () => {
    const mock = { primary: { v_600: '#000000' } };
    render(
      { template: '<span data-testid="color">{{ $themeBrand.primary.v_600 }}</span>' },
      { mocks: { $themeBrand: mock } },
    );
    expect(screen.getByTestId('color')).toHaveTextContent(mock.primary.v_600);
    expect(warn).not.toHaveBeenCalled();
  });
});
