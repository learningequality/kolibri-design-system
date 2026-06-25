import { render, screen } from '@testing-library/vue';
import KListbox from '../../../listbox/KListbox/index.vue';
import KMultiSelectNode from '../components/KMultiSelectNode.vue';

const LISTBOX_ID = 'test-listbox';

const MESSAGES = {
  clickable: 'Options are clickable',
  allOptionsSelected: 'All options selected',
  allOptionsDeselected: 'No options selected',
  optionDeselected: 'Deselected',
};

const LEAF_NODE = { value: 'leaf1', label: 'Leaf 1' };

const GROUP_NODE = {
  value: 'group1',
  label: 'Group 1',
  children: [{ value: 'child1', label: 'Child 1' }],
};

function renderComponent({ node = LEAF_NODE, depth = 0, indeterminateValues = new Set() } = {}) {
  const Wrapper = {
    components: { KListbox, KMultiSelectNode },
    template: `
      <KListbox
        :id="listboxId"
        :value="[]"
        :messages="messages"
        ariaLabel="Test options"
      >
        <KMultiSelectNode
          :node="node"
          :depth="depth"
          :indeterminateValues="indeterminateValues"
        />
      </KListbox>
    `,
    data() {
      return {
        listboxId: LISTBOX_ID,
        messages: MESSAGES,
        node,
        depth,
        indeterminateValues,
      };
    },
  };
  return render(Wrapper);
}

describe('KMultiSelectNode', () => {
  it('renders a leaf node as a listbox option', async () => {
    renderComponent({ node: LEAF_NODE });
    expect(await screen.findByRole('option', { name: 'Leaf 1' })).toBeInTheDocument();
  });

  it('renders a group node with its parent label and child label', async () => {
    renderComponent({ node: GROUP_NODE });
    expect(await screen.findByRole('option', { name: 'Group 1' })).toBeInTheDocument();
    expect(await screen.findByRole('option', { name: 'Child 1' })).toBeInTheDocument();
  });

  it('shows the indeterminate icon when node.value is in indeterminateValues', async () => {
    renderComponent({ node: GROUP_NODE, indeterminateValues: new Set(['group1']) });
    expect(await screen.findByTestId('icon-indeterminateCheck')).toBeInTheDocument();
  });

  it('applies paddingInlineStart indentation proportional to depth', async () => {
    renderComponent({ node: LEAF_NODE, depth: 2 });
    const option = await screen.findByRole('option', { name: 'Leaf 1' });
    expect(option).toHaveStyle({ paddingInlineStart: '64px' });
  });

  it('applies base 16px paddingInlineStart when depth is 0', async () => {
    renderComponent({ node: LEAF_NODE, depth: 0 });
    const option = await screen.findByRole('option', { name: 'Leaf 1' });
    expect(option).toHaveStyle({ paddingInlineStart: '16px' });
  });

  it('renders a node with an empty children array as a leaf, not a group', async () => {
    const nodeWithEmptyChildren = { value: 'empty', label: 'Empty Group', children: [] };
    renderComponent({ node: nodeWithEmptyChildren });
    const option = await screen.findByRole('option', { name: 'Empty Group' });
    expect(option).toBeInTheDocument();
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
  });
});
