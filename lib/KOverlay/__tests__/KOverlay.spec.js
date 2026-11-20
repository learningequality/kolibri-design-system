import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import Vue from 'vue';
import { compileStyle, parse } from 'vue/compiler-sfc';
import { cleanup, render, waitFor, within } from '@testing-library/vue';
import KOverlay from '../index.vue';

const targetId = 'k-overlay';

function createTarget() {
  const target = document.createElement('div');
  target.id = targetId;
  return target;
}

function trackTargetLookups() {
  const queries = [document, Element.prototype].flatMap(scope => [
    jest.spyOn(scope, 'querySelector'),
    jest.spyOn(scope, 'querySelectorAll'),
  ]);
  const spies = [...queries, jest.spyOn(document, 'getElementById')];
  return {
    count: () =>
      spies
        .flatMap(spy => spy.mock.calls)
        .filter(([selector]) => selector === `#${targetId}` || selector === targetId).length,
    restore: () => spies.forEach(spy => spy.mockRestore()),
  };
}

function renderOverlay(
  props = {},
  content = '<button>First</button><button v-if="extra">Second</button>',
) {
  return render(
    {
      components: { KOverlay },
      props: {
        extra: Boolean,
        labels: { type: Array, default: () => [] },
      },
      template: `<KOverlay>${content}</KOverlay>`,
    },
    { props },
  );
}

describe('KOverlay', () => {
  it('loads vue2-teleport in Node without a DOM', () => {
    expect(() =>
      execFileSync(process.execPath, ['-e', "require('vue2-teleport')"], {
        cwd: resolve(__dirname, '../../..'),
        stdio: 'pipe',
      }),
    ).not.toThrow();
  });

  it('server-renders the KOverlay slot without a DOM', () => {
    const html = execFileSync(
      process.execPath,
      [
        '-e',
        `
          const { readFileSync } = require('node:fs');
          const { resolve, sep } = require('node:path');
          const { transformSync } = require('@babel/core');
          const vueJest = require('vue-jest');
          const Vue = require('vue');
          const { createRenderer } = require('vue-server-renderer');
          const loadJs = require.extensions['.js'];
          const libPrefix = resolve('lib') + sep;
          require.extensions['.js'] = (module, filename) => {
            if (!filename.startsWith(libPrefix)) {
              return loadJs(module, filename);
            }
            module._compile(transformSync(readFileSync(filename, 'utf8'), { filename }).code, filename);
          };
          require.extensions['.vue'] = (module, filename) => {
            module._compile(vueJest.process(readFileSync(filename, 'utf8'), filename, {
              globals: { 'vue-jest': { hideStyleWarn: true } },
            }).code, filename);
          };
          const KOverlay = require('./lib/KOverlay/index.vue').default;
          const app = new Vue({ render: h => h(KOverlay, [h('button', 'Overlay action')]) });
          createRenderer().renderToString(app).then(html => process.stdout.write(html));
        `,
      ],
      { cwd: resolve(__dirname, '../../..'), encoding: 'utf8' },
    );
    expect(html).toContain('<button>Overlay action</button>');
  });

  describe('target recovery', () => {
    let originalTarget;
    let target;

    beforeEach(() => {
      originalTarget = document.getElementById(targetId);
      originalTarget.remove();
      target = createTarget();
    });

    afterEach(() => {
      cleanup();
      target.remove();
      document.body.appendChild(originalTarget);
    });

    it('recovers a target replaced during the first slot placement', async () => {
      const initialTarget = target;
      const replacement = createTarget();
      const tag = 'k-overlay-replace-on-placement';
      let button;
      customElements.define(
        tag,
        class extends HTMLElement {
          connectedCallback() {
            if (this.parentNode === initialTarget) {
              button = initialTarget.querySelector('button');
              initialTarget.replaceWith(replacement);
              target = replacement;
            }
          }
        },
      );
      document.body.appendChild(initialTarget);

      const app = new Vue({
        render(h) {
          return h(KOverlay, [h('button', 'First'), h(tag)]);
        },
      });
      app.$mount(document.body.appendChild(document.createElement('div')));
      try {
        expect(target).toBe(replacement);
        expect(button).toBeInstanceOf(HTMLButtonElement);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(within(replacement).getByRole('button', { name: 'First' })).toBe(button);
      } finally {
        app.$destroy();
        app.$el.remove();
      }
    });

    it('uses at most one target lookup per mount plus one shared reconciliation', async () => {
      const lookups = trackTargetLookups();
      try {
        render({
          render(h) {
            return h('div', [
              h(KOverlay, [h('button', 'First')]),
              h(KOverlay, [h('button', 'Second')]),
              h(KOverlay, [h('button', 'Third')]),
            ]);
          },
        });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(lookups.count()).toBeLessThanOrEqual(4);
      } finally {
        lookups.restore();
      }
    });

    it('bounds placement retries across changing targets', async () => {
      const first = document.body.appendChild(target);
      const second = document.body.appendChild(document.createElement('div'));
      let placements = 0;
      customElements.define(
        'overlay-switch-target-on-placement',
        class extends HTMLElement {
          connectedCallback() {
            const parent = this.parentNode;
            if ((parent === first || parent === second) && ++placements <= 10) {
              parent.removeAttribute('id');
              (parent === first ? second : first).id = targetId;
            }
          }
        },
      );
      try {
        renderOverlay({}, '<overlay-switch-target-on-placement />');
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(placements).toBeGreaterThan(1);
        expect(placements).toBeLessThanOrEqual(3);
      } finally {
        second.remove();
      }
    });

    it('yields when a custom element clears every slot placement', async () => {
      const rejectingTarget = document.body.appendChild(target);
      let placements = 0;
      customElements.define(
        'overlay-clear-on-placement',
        class extends HTMLElement {
          connectedCallback() {
            if (this.parentNode === rejectingTarget && ++placements <= 10) {
              rejectingTarget.replaceChildren();
            }
          }
        },
      );
      const { container, updateProps } = renderOverlay(
        {},
        '<overlay-clear-on-placement /><button v-if="extra">Extra</button>',
      );

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(placements).toBeGreaterThan(0);
      expect(placements).toBeLessThanOrEqual(2);
      expect(rejectingTarget.childNodes).toHaveLength(0);

      await updateProps({ extra: true });
      const button = within(container).getByRole('button', { name: 'Extra', hidden: true });
      target = createTarget();
      rejectingTarget.replaceWith(target);
      expect(await within(target).findByRole('button', { name: 'Extra' })).toBe(button);
    });

    it('retries when a custom element clears the first placement only', async () => {
      document.body.appendChild(target);
      let button;
      customElements.define(
        'overlay-clear-first-placement',
        class extends HTMLElement {
          connectedCallback() {
            if (this.parentNode === target && !button) {
              button = target.querySelector('button');
              target.replaceChildren();
            }
          }
        },
      );
      renderOverlay({}, '<button>First</button><overlay-clear-first-placement />');

      expect(button).toBeInstanceOf(HTMLButtonElement);
      expect(await within(target).findByRole('button', { name: 'First' })).toBe(button);
    });

    it('retries an exhausted target after it is removed and reinserted in one tick', async () => {
      document.body.appendChild(target);
      let reject = true;
      customElements.define(
        'overlay-clear-until-reinserted',
        class extends HTMLElement {
          connectedCallback() {
            if (reject && this.parentNode === target) {
              target.replaceChildren();
            }
          }
        },
      );
      const { container } = renderOverlay(
        {},
        '<button>First</button><overlay-clear-until-reinserted />',
      );
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(target.childNodes).toHaveLength(0);
      const button = within(container).getByRole('button', { name: 'First', hidden: true });

      reject = false;
      target.remove();
      document.body.appendChild(target);
      expect(await within(target).findByRole('button', { name: 'First' })).toBe(button);
    });

    it('uses at most one lookup when reconciling a shared absent target', async () => {
      render({
        render(h) {
          return h('div', [
            h(KOverlay, [h('button', 'First')]),
            h(KOverlay, [h('button', 'Second')]),
          ]);
        },
      });
      await new Promise(resolve => setTimeout(resolve, 0));

      const lookups = trackTargetLookups();
      const unrelated = document.body.appendChild(document.createElement('div'));
      try {
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(lookups.count()).toBeLessThanOrEqual(1);
      } finally {
        lookups.restore();
        unrelated.remove();
      }
    });

    it('clears the slot when a custom element removes its injected sibling on disconnect', async () => {
      document.body.appendChild(target);
      const foreign = document.createElement('button');
      foreign.textContent = 'Injected';
      customElements.define(
        'overlay-inject-sibling',
        class extends HTMLElement {
          connectedCallback() {
            if (this.parentNode === target) {
              this.after(foreign);
            }
          }

          disconnectedCallback() {
            foreign.remove();
          }
        },
      );
      const { updateProps } = render({
        components: { KOverlay },
        props: { show: { type: Boolean, default: true } },
        template: `
          <div>
            <KOverlay v-if="show"><overlay-inject-sibling /><button>Next</button></KOverlay>
          </div>`,
      });
      expect(within(target).getByRole('button', { name: 'Injected' })).toBe(foreign);

      await updateProps({ show: false });

      expect(target.childNodes).toHaveLength(0);
    });

    it.each(['unmount', 'target replacement'])(
      'leaves foreign slot siblings on %s',
      async change => {
        const original = document.body.appendChild(target);
        const { unmount } = renderOverlay({ extra: true });
        const first = within(original).getByRole('button', { name: 'First' });
        const second = within(original).getByRole('button', { name: 'Second' });
        const foreign = document.createElement('button');
        foreign.textContent = 'Foreign';
        first.after(foreign);

        if (change === 'target replacement') {
          target = createTarget();
          original.replaceWith(target);
          const buttons = await within(target).findAllByRole('button');
          expect(buttons).toHaveLength(2);
          expect(buttons[0]).toBe(first);
          expect(buttons[1]).toBe(second);
          expect(foreign.parentNode).toBe(original);
        }

        unmount();
        expect(original.childNodes).toHaveLength(1);
        expect(original.firstChild).toBe(foreign);
        if (target !== original) {
          expect(target.childNodes).toHaveLength(0);
        }
      },
    );

    it('removes a conditional v-once slot after toggling and unmounting', async () => {
      document.body.appendChild(target);
      const { unmount, updateProps } = renderOverlay(
        { extra: true },
        '<template v-if="extra"><button v-once>A</button></template>',
      );
      expect(target.children).toHaveLength(1);

      await updateProps({ extra: false });
      expect(target.children).toHaveLength(0);
      await updateProps({ extra: true });
      expect(target.children).toHaveLength(1);

      unmount();
      expect(target.childNodes).toHaveLength(0);
    });

    it('keeps sibling overlays as direct children after target recovery', async () => {
      document.body.appendChild(target);
      const { unmount, updateProps } = render({
        components: { KOverlay },
        props: { extra: Boolean },
        template: `
            <div>
              <KOverlay><button v-if="extra">New</button><button>First</button></KOverlay>
              <KOverlay><button>Second</button></KOverlay>
            </div>`,
      });
      const directChildren = () => Array.from(target.children);
      const first = within(target).getByRole('button', { name: 'First' });
      const second = within(target).getByRole('button', { name: 'Second' });
      expect(directChildren()).toEqual([first, second]);

      const replacement = createTarget();
      target.replaceWith(replacement);
      target = replacement;
      await waitFor(() => {
        expect(directChildren()[0]).toBe(first);
        expect(directChildren()[1]).toBe(second);
      });

      first.focus();
      await updateProps({ extra: true });
      expect(directChildren()).toEqual([
        within(target).getByRole('button', { name: 'New' }),
        first,
        second,
      ]);
      expect(first).toHaveFocus();

      unmount();
      expect(target.childNodes).toHaveLength(0);
    });

    it('preserves sibling order when the second overlay updates during target replacement', async () => {
      document.body.appendChild(target);
      const replacement = createTarget();
      const { unmount, updateProps } = render({
        components: { KOverlay },
        props: { extra: Boolean },
        beforeUpdate() {
          if (target !== replacement) {
            target.replaceWith(replacement);
            target = replacement;
          }
        },
        template: `
            <div>
              <KOverlay v-once><button>First</button></KOverlay>
              <KOverlay><button>Second</button><button v-if="extra">New</button></KOverlay>
            </div>`,
      });
      const directChildren = () => Array.from(target.children);
      const first = within(target).getByRole('button', { name: 'First' });
      const second = within(target).getByRole('button', { name: 'Second' });
      expect(directChildren()).toEqual([first, second]);

      await updateProps({ extra: true });
      expect(directChildren()[0]).toBe(first);
      expect(directChildren()[1]).toBe(second);
      expect(directChildren()[2]).toBe(within(target).getByRole('button', { name: 'New' }));
      expect(directChildren()).toHaveLength(3);

      unmount();
      expect(target.childNodes).toHaveLength(0);
    });

    it('preserves sibling order after a v-once overlay child changes root', async () => {
      document.body.appendChild(target);
      const replacement = createTarget();
      const { unmount, updateProps } = render({
        components: {
          KOverlay,
          SwitchingRoot: {
            data: () => ({ linked: false }),
            template:
              '<a v-if="linked" href="#">First</a><button v-else @click="linked = true">First</button>',
          },
        },
        props: { extra: Boolean },
        beforeUpdate() {
          if (target !== replacement) {
            target.replaceWith(replacement);
            target = replacement;
          }
        },
        template: `
            <div>
              <KOverlay v-once><SwitchingRoot /></KOverlay>
              <KOverlay><button>Second</button><button v-if="extra">New</button></KOverlay>
            </div>`,
      });
      const directChildren = () => Array.from(target.children);
      const first = within(target).getByRole('button', { name: 'First' });
      const second = within(target).getByRole('button', { name: 'Second' });
      expect(directChildren()).toEqual([first, second]);

      first.click();
      const link = await within(target).findByRole('link', { name: 'First' });
      await updateProps({ extra: true });
      expect(directChildren()[0]).toBe(link);
      expect(directChildren()[1]).toBe(second);
      expect(directChildren()[2]).toBe(within(target).getByRole('button', { name: 'New' }));
      expect(directChildren()).toHaveLength(3);

      unmount();
      expect(target.childNodes).toHaveLength(0);
    });

    it('cleans up after toggling an empty slot node and adding a button', async () => {
      document.body.appendChild(target);
      const { unmount, updateProps } = render({
        props: { show: Boolean, extra: Boolean },
        render(h) {
          return h(KOverlay, [
            h('button', 'A'),
            this.show ? h() : null,
            this.extra ? h('button', 'B') : null,
          ]);
        },
      });
      const button = within(target).getByRole('button', { name: 'A' });
      await updateProps({ show: true });
      await updateProps({ show: false });
      await updateProps({ extra: true });

      const buttons = within(target).getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toBe(button);
      expect(buttons[1]).toHaveAccessibleName('B');

      unmount();
      expect(target.childNodes).toHaveLength(0);
    });

    it('keeps focus on a slot button when its connected target changes', async () => {
      document.body.appendChild(target);
      renderOverlay();
      const previous = target;
      const button = within(previous).getByRole('button', { name: 'First' });
      button.focus();
      expect(button).toHaveFocus();

      previous.id = 'retired-overlay';
      target = document.body.appendChild(createTarget());
      try {
        expect(await within(target).findByRole('button', { name: 'First' })).toBe(button);
        expect(button).toHaveFocus();
      } finally {
        previous.remove();
      }
    });

    it('recovers the same slot roots when only the target elements are cleared', async () => {
      document.body.appendChild(target);
      renderOverlay({ extra: true });
      const buttons = within(target).getAllByRole('button');
      Array.from(target.children).forEach(child => child.remove());
      const replacement = createTarget();
      target.replaceWith(replacement);
      target = replacement;

      const recoveredButtons = await within(target).findAllByRole('button');
      expect(recoveredButtons).toHaveLength(buttons.length);
      recoveredButtons.forEach((button, index) => expect(button).toBe(buttons[index]));
    });

    it('moves a child root whose in-out leave has not started yet', async () => {
      document.body.appendChild(target);
      let finishEnter;
      let finishLeave;
      const SwitchingRoot = {
        data: () => ({ label: 'A' }),
        render(h) {
          return h(
            'transition',
            {
              props: { css: false, mode: 'in-out' },
              on: {
                enter(element, done) {
                  finishEnter = done;
                },
                leave(element, done) {
                  finishLeave = done;
                },
              },
            },
            [h('button', { key: this.label }, this.label)],
          );
        },
      };
      const host = new Vue({
        render(h) {
          return h(KOverlay, [h(SwitchingRoot, { ref: 'child' })]);
        },
      }).$mount(document.body.appendChild(document.createElement('div')));
      try {
        host.$refs.child.label = 'B';
        await host.$nextTick();
        finishEnter();
        finishLeave();
        finishLeave = undefined;
        const leaving = within(target).getByRole('button', { name: 'B' });

        host.$refs.child.label = 'C';
        await host.$nextTick();
        expect(finishLeave).toBeUndefined();
        const entering = within(target).getByRole('button', { name: 'C' });
        const replacement = createTarget();
        target.replaceWith(replacement);
        target = replacement;
        await waitFor(() =>
          expect(within(target).getAllByRole('button')).toEqual([leaving, entering]),
        );

        finishEnter();
        finishLeave();
        expect(within(target).getAllByRole('button')).toEqual([entering]);
      } finally {
        finishEnter?.();
        finishLeave?.();
        host.$destroy();
        host.$el.remove();
      }
    });

    it('finishes the old leave on same-key re-entry after target replacement', async () => {
      document.body.appendChild(target);
      let finishLeave;
      const afterLeave = jest.fn();
      const host = new Vue({
        data: () => ({ open: true }),
        render(h) {
          return h(KOverlay, [
            h(
              'transition',
              {
                props: { css: false },
                on: {
                  leave(element, done) {
                    finishLeave = done;
                  },
                  afterLeave,
                },
              },
              [this.open ? h('button', { key: 'action' }, 'Action') : null],
            ),
          ]);
        },
      }).$mount(document.body.appendChild(document.createElement('div')));
      try {
        const leaving = within(target).getByRole('button', { name: 'Action' });
        host.open = false;
        await host.$nextTick();
        expect(finishLeave).toEqual(expect.any(Function));
        expect(afterLeave).not.toHaveBeenCalled();

        const replacement = createTarget();
        target.replaceWith(replacement);
        target = replacement;
        expect(await within(target).findByRole('button', { name: 'Action' })).toBe(leaving);

        host.open = true;
        await host.$nextTick();
        expect(afterLeave).toHaveBeenCalledWith(leaving);
        expect(leaving).not.toBeInTheDocument();
        expect(within(target).getAllByRole('button', { name: 'Action' })).toHaveLength(1);
      } finally {
        finishLeave?.();
        host.$destroy();
        host.$el.remove();
      }
    });

    it('preserves sibling focus and moves a deferred transition leave', async () => {
      document.body.appendChild(target);
      let finishLeave;
      const LeavingChild = {
        data: () => ({ visible: false }),
        render(h) {
          return h(
            'transition',
            {
              props: { css: false },
              on: {
                leave(element, done) {
                  finishLeave = done;
                },
              },
            },
            [this.visible ? h('span', 'Leaving') : null],
          );
        },
      };
      const host = new Vue({
        render(h) {
          return h(KOverlay, [h('button', 'A'), h(LeavingChild, { ref: 'child' })]);
        },
      }).$mount(document.body.appendChild(document.createElement('div')));
      try {
        host.$refs.child.visible = true;
        await new Promise(resolve => setTimeout(resolve, 0));
        const button = within(target).getByRole('button');
        button.focus();
        expect(button).toHaveFocus();
        host.$refs.child.visible = false;
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(within(target).getByText('Leaving')).toBeInTheDocument();
        expect(button).toHaveFocus();
        const leaving = within(target).getByText('Leaving');
        const firstReplacement = createTarget();
        target.replaceWith(firstReplacement);
        target = firstReplacement;
        expect(await within(target).findByText('Leaving')).toBe(leaving);
        const secondReplacement = createTarget();
        target.replaceWith(secondReplacement);
        target = secondReplacement;
        expect(await within(target).findByText('Leaving')).toBe(leaving);
        finishLeave();
        expect(within(target).queryByText('Leaving')).not.toBeInTheDocument();
      } finally {
        host.$destroy();
        host.$el.remove();
      }
    });

    it('recovers the slot after an ancestor of the target is removed', async () => {
      const section = document.body.appendChild(document.createElement('section'));
      section.appendChild(target);
      const { container } = renderOverlay();
      const button = within(target).getByRole('button', { name: 'First' });
      await new Promise(resolve => setTimeout(resolve, 0));
      section.remove();
      await waitFor(() => expect(container).toContainElement(button));
      target = document.body.appendChild(createTarget());
      expect(await within(target).findByRole('button', { name: 'First' })).toBe(button);
    });

    it('hides the fallback using its compiled scoped CSS while the target is absent', () => {
      const filename = resolve(__dirname, '../Teleport.vue');
      const [style] = parse({ source: readFileSync(filename, 'utf8'), filename }).styles;
      expect(style.scoped).toBe(true);
      const id = 'data-v-teleport-test';
      const compiled = compileStyle({ source: style.content, filename, id, scoped: style.scoped });
      expect(compiled.errors).toEqual([]);

      const { container } = renderOverlay();
      const button = within(container).getByRole('button', { hidden: true });
      button.parentElement.setAttribute(id, '');
      const stylesheet = document.createElement('style');
      stylesheet.textContent = compiled.code;
      document.head.appendChild(stylesheet);
      try {
        expect(button).not.toBeVisible();
      } finally {
        stylesheet.remove();
      }
    });

    it.each([false, true])(
      'waits for delayed target insertion (initially present: %s)',
      async present => {
        if (present) {
          document.body.appendChild(target);
        }
        const { container } = renderOverlay();
        const fallback = within(container);
        if (present) {
          expect(within(target).getByRole('button', { name: 'First' })).toBeInTheDocument();
          target.remove();
        }

        const button = await waitFor(() => fallback.getByRole('button', { hidden: true }));
        const mutations = [];
        const observer = new MutationObserver(records => mutations.push(...records));
        observer.observe(container, { childList: true, subtree: true });
        const unrelated = document.body.appendChild(document.createElement('div'));
        try {
          await new Promise(resolve => setTimeout(resolve, 0));
          expect(fallback.getByRole('button', { hidden: true })).toBe(button);
          const buttonMoves = mutations.filter(
            ({ addedNodes, removedNodes }) =>
              Array.from(addedNodes).includes(button) || Array.from(removedNodes).includes(button),
          );
          expect(buttonMoves).toHaveLength(0);
        } finally {
          observer.disconnect();
          unrelated.remove();
        }

        document.body.appendChild(target);
        expect(await within(target).findByRole('button', { name: 'First' })).toBe(button);
      },
    );

    it.each(['replaced', 'cleared'])(
      'preserves overlay order when mounting after the target is %s',
      async change => {
        document.body.appendChild(target);
        const host = new Vue({
          data: () => ({ show: false }),
          render(h) {
            return h('div', [
              h(KOverlay, { key: 'a' }, [h('button', 'A')]),
              this.show ? h(KOverlay, { key: 'b' }, [h('button', 'B')]) : null,
            ]);
          },
        }).$mount(document.body.appendChild(document.createElement('div')));
        try {
          await new Promise(resolve => setTimeout(resolve, 0));
          host.show = true;
          if (change === 'replaced') {
            const replacement = createTarget();
            target.replaceWith(replacement);
            target = replacement;
          } else {
            target.replaceChildren();
          }
          await new Promise(resolve => setTimeout(resolve, 0));
          const overlay = within(target);
          expect(overlay.getAllByRole('button')).toEqual([
            overlay.getByRole('button', { name: 'A' }),
            overlay.getByRole('button', { name: 'B' }),
          ]);
        } finally {
          host.$destroy();
          host.$el.remove();
        }
      },
    );

    it('preserves overlay order when patching after the target is cleared', async () => {
      document.body.appendChild(target);
      const host = new Vue({
        data: () => ({ show: false }),
        render(h) {
          return h('div', [
            h(KOverlay, [h('button', 'A')]),
            h(KOverlay, [h('button', 'B'), this.show ? h('button', 'C') : null]),
          ]);
        },
      }).$mount(document.body.appendChild(document.createElement('div')));
      try {
        await new Promise(resolve => setTimeout(resolve, 0));
        host.show = true;
        target.replaceChildren();
        await new Promise(resolve => setTimeout(resolve, 0));
        const overlay = within(target);
        expect(overlay.getAllByRole('button')).toEqual([
          overlay.getByRole('button', { name: 'A' }),
          overlay.getByRole('button', { name: 'B' }),
          overlay.getByRole('button', { name: 'C' }),
        ]);
      } finally {
        host.$destroy();
        host.$el.remove();
      }
    });

    it('moves the updated slot when the target is replaced in the same tick', async () => {
      document.body.appendChild(target);
      const { updateProps } = renderOverlay();
      const replacement = createTarget();
      const update = updateProps({ extra: true });
      target.replaceWith(replacement);
      target = replacement;
      await update;
      const overlay = within(target);
      expect(overlay.getAllByRole('button')).toEqual([
        overlay.getByRole('button', { name: 'First' }),
        overlay.getByRole('button', { name: 'Second' }),
      ]);
    });

    it('recovers when the removed target is reattached under a different id', async () => {
      document.body.appendChild(target);
      renderOverlay();
      const retiredTarget = target;
      const button = within(retiredTarget).getByRole('button', { name: 'First' });
      target = createTarget();
      retiredTarget.replaceWith(target);
      retiredTarget.id = 'retired-overlay';
      document.body.appendChild(retiredTarget);
      try {
        expect(await within(target).findByRole('button', { name: 'First' })).toBe(button);
        expect(within(retiredTarget).queryByRole('button')).not.toBeInTheDocument();
      } finally {
        retiredTarget.remove();
      }
    });

    it('connects slot elements with their following siblings already in the target', () => {
      document.body.appendChild(target);
      let siblingAtConnection;
      customElements.define(
        'overlay-sibling-probe',
        class extends HTMLElement {
          connectedCallback() {
            if (this.parentNode === target) {
              siblingAtConnection = this.nextElementSibling;
            }
          }
        },
      );

      renderOverlay({}, '<overlay-sibling-probe /><button>Next</button>');

      expect(siblingAtConnection).toBe(within(target).getByRole('button', { name: 'Next' }));
    });

    it('mounts new slot children into the replacement target', async () => {
      document.body.appendChild(target);
      let parentAtMount;
      const Child = {
        mounted() {
          parentAtMount = this.$el.parentNode;
        },
        render(h) {
          return h('button', { attrs: { id: 'new-overlay-button' } }, 'New');
        },
      };
      const { updateProps } = render({
        props: { extra: Boolean },
        render(h) {
          return h(KOverlay, [h('button', 'First'), this.extra ? h(Child) : null]);
        },
      });
      await new Promise(resolve => setTimeout(resolve, 0));

      const update = updateProps({ extra: true });
      const replacement = createTarget();
      target.replaceWith(replacement);
      target = replacement;
      await update;

      expect(parentAtMount).toBe(target);
    });

    it.each([false, true])(
      'keeps keyed slot order when the target is replaced (update first: %s)',
      async updateFirst => {
        document.body.appendChild(target);
        const { updateProps } = renderOverlay(
          { labels: ['A', 'B', 'C'] },
          '<button v-for="label in labels" :key="label">{{ label }}</button>',
        );
        const original = within(target);
        const labels = ['C', 'A', 'B'];
        const buttons = labels.map(name => original.getByRole('button', { name }));
        const replacement = createTarget();
        await new Promise(resolve => setTimeout(resolve, 0));
        const update = updateFirst ? updateProps({ labels }) : null;
        target.replaceWith(replacement);
        target = replacement;
        await (update || updateProps({ labels }));

        const movedButtons = within(target).getAllByRole('button');
        expect(movedButtons).toHaveLength(buttons.length);
        buttons.forEach((button, index) => expect(movedButtons[index]).toBe(button));
      },
    );

    it.each(['renamed', 'cleared'])(
      'restores keyed children after the target is %s',
      async change => {
        document.body.appendChild(target);
        const { container, updateProps } = renderOverlay(
          { labels: ['A'] },
          '<button v-for="label in labels" :key="label">{{ label }}</button>',
        );
        const first = within(target).getByRole('button', { name: 'A' });
        const retiredTarget = target;
        try {
          if (change === 'renamed') {
            await new Promise(resolve => setTimeout(resolve, 0));
            retiredTarget.id = 'retired-overlay';
            await waitFor(() => expect(container).toContainElement(first));
            target = document.body.appendChild(createTarget());
          } else {
            target.replaceChildren();
          }

          await updateProps({ labels: ['A', 'B'] });

          const buttons = within(target).getAllByRole('button');
          expect(buttons).toHaveLength(2);
          expect(buttons[0]).toBe(first);
          expect(buttons[1]).toHaveTextContent('B');
        } finally {
          if (retiredTarget !== target) {
            retiredTarget.remove();
          }
        }
      },
    );

    it('keeps the first button focused when another is shown', async () => {
      document.body.appendChild(target);
      const { updateProps } = renderOverlay();
      const overlay = within(target);
      const first = overlay.getByRole('button', { name: 'First' });
      first.focus();
      expect(first).toHaveFocus();

      await updateProps({ extra: true });

      expect(overlay.getByRole('button', { name: 'Second' })).toBeInTheDocument();
      expect(first).toHaveFocus();
    });
  });
});
