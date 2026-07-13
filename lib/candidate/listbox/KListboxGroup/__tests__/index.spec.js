import { render, screen } from '@testing-library/vue';
import KListboxGroup from '../index.vue';

function renderComponent({ props = {}, slots = {} } = {}) {
  return render(KListboxGroup, {
    props: { label: 'Test Group', ...props },
    slots: { default: '<li role="option">Option A</li>', ...slots },
  });
}

describe('KListboxGroup', () => {
  it('renders outer li with role="presentation"', () => {
    const { container } = renderComponent();
    const outerLi = container.firstChild;
    expect(outerLi.tagName.toLowerCase()).toBe('li');
    expect(outerLi).toHaveAttribute('role', 'presentation');
    expect(outerLi).toHaveClass('k-listbox-group');
  });

  it('renders inner ul with role="group" and aria-label', () => {
    const { container } = renderComponent({ props: { label: 'Animals' } });
    const innerUl = container.querySelector('ul');
    expect(innerUl).toBeInTheDocument();
    expect(innerUl).toHaveAttribute('role', 'group');
    expect(innerUl).toHaveAttribute('aria-label', 'Animals');
    expect(innerUl).toHaveClass('k-listbox-group-list');
  });

  it('renders visible label div with aria-hidden="true" by default', () => {
    const { container } = renderComponent({ props: { label: 'Land Animals' } });
    const headerDiv = container.querySelector('.k-listbox-group-label');
    expect(headerDiv.tagName.toLowerCase()).toBe('div');
    expect(headerDiv).toHaveAttribute('aria-hidden', 'true');
    expect(headerDiv).toHaveTextContent('Land Animals');
  });

  it('hides visible label when hideLabel is true', () => {
    const { container } = renderComponent({
      props: { label: 'Water Animals', hideLabel: true },
    });
    expect(container.querySelector('.k-listbox-group-label')).toBeNull();
  });

  it('preserves aria-label on the group when hideLabel is true', () => {
    const { container } = renderComponent({
      props: { label: 'Water Animals', hideLabel: true },
    });
    const innerUl = container.querySelector('ul');
    expect(innerUl).toHaveAttribute('role', 'group');
    expect(innerUl).toHaveAttribute('aria-label', 'Water Animals');
  });

  it('renders slotted options inside the group', () => {
    renderComponent({
      slots: { default: '<li role="option">Dog</li><li role="option">Cat</li>' },
    });
    expect(screen.getByRole('option', { name: 'Dog' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Cat' })).toBeInTheDocument();
  });

  it('supports nested groups', () => {
    const { container } = renderComponent({
      props: { label: 'Parent Group' },
      slots: {
        default: `
          <li role="presentation" class="k-listbox-group child-group">
            <ul role="group" aria-label="Child Group">
              <li role="option">Nested Option</li>
            </ul>
          </li>
        `,
      },
    });

    const parentTrack = screen.getByRole('group', { name: 'Parent Group' });
    const childTrack = screen.getByRole('group', { name: 'Child Group' });

    expect(parentTrack).toContainElement(childTrack);
    expect(screen.getByRole('option', { name: 'Nested Option' })).toBeInTheDocument();

    const childGroupWrapper = container.querySelector('.child-group');
    expect(childGroupWrapper.tagName.toLowerCase()).toBe('li');
    expect(childGroupWrapper.parentElement).toBe(parentTrack);
  });
});
