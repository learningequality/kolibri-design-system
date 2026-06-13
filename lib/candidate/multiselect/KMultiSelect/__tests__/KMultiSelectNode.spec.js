import { render, screen } from '@testing-library/vue';
import { provide } from 'vue';
import KMultiSelectNode from '../components/KMultiSelectNode.vue';

function renderComponent(props = {}) {
  const Wrapper = {
    components: { KMultiSelectNode },
    template: `<KMultiSelectNode :node="node" :depth="depth" :indeterminateValues="indeterminateValues" />`,
    data() {
      return {
        node: props.node || { value: 'leaf1', label: 'Leaf 1' },
        depth: props.depth || 0,
        indeterminateValues: props.indeterminateValues || new Set(),
      };
    },
    setup() {
      provide('klistbox', {
        registerOption: jest.fn(),
        unregisterOption: jest.fn(),
        isSelected: jest.fn(() => false),
        isFocused: jest.fn(() => false),
      });
      return {};
    },
  };
  return render(Wrapper);
}

describe('KMultiSelectNode', () => {
  it('renders a basic leaf node', async () => {
    renderComponent({ node: { value: 'leaf1', label: 'Leaf 1' } });
    expect(await screen.findByText('Leaf 1')).toBeInTheDocument();
  });

  it('renders a group node when children are present', async () => {
    renderComponent({
      node: {
        value: 'group1',
        label: 'Group 1',
        children: [{ value: 'child1', label: 'Child 1' }],
      },
    });
    // The group header text
    expect(await screen.findByText('Group 1')).toBeInTheDocument();
    // The child node
    expect(await screen.findByText('Child 1')).toBeInTheDocument();
  });
});
