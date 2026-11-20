<template>

  <div class="hidden teleporter">
    <slot></slot>
  </div>

</template>


<script>

  const slotEndKey = Symbol();
  const groups = new Map();
  const slotEnds = new WeakSet();
  let observer;

  function reconcileGroup(group, target, updating, previousChildren) {
    group.target = target;
    for (const teleport of group.teleports) {
      teleport.placeSlot(
        target || teleport.$el,
        teleport === updating ? previousChildren : undefined,
      );
    }
  }

  function resetReinsertedTarget(group, target, records) {
    if (
      !target ||
      target !== group.target ||
      !records.some(record => Array.from(record.addedNodes).some(node => node.contains(target)))
    ) {
      return false;
    }
    let reset = false;
    for (const teleport of group.teleports) {
      if (teleport.placementFailure?.target === target) {
        teleport.placementFailure = null;
        reset = true;
      }
    }
    return reset;
  }

  function reconcileTeleports(records, activeObserver) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      for (const [selector, group] of groups) {
        const target = document.querySelector(selector);
        if (attempt === 0) {
          resetReinsertedTarget(group, target, records);
        }
        reconcileGroup(group, target);
      }
      if (!activeObserver.takeRecords().length) {
        break;
      }
    }
  }

  function slotRoots(children) {
    return children.map(child =>
      child.componentInstance ? child.componentInstance.$el : child.elm,
    );
  }

  function restoreDetachedRoots(nodes, roots, source) {
    let nextIndex = nodes.length;
    for (let rootIndex = roots.length - 1; rootIndex >= 0; rootIndex -= 1) {
      const root = roots[rootIndex];
      if (!root.parentNode) {
        nodes.splice(nextIndex, 0, root);
      } else if (root.parentNode === source) {
        const index = nodes.indexOf(root);
        if (index !== -1) {
          nextIndex = index;
        }
      }
    }
  }

  function insertSlot(parent, source, nodes) {
    const fragment = document.createDocumentFragment();
    const placement = nodes.map(node => [node, node.parentNode]);
    for (const [node, originalParent] of placement) {
      if (node.parentNode === originalParent) {
        fragment.appendChild(node);
      }
    }
    if (source?._pending) {
      for (const key of Reflect.ownKeys(source._pending)) {
        const pending = source._pending[key];
        if (pending?.elm.parentNode === fragment && pending.elm._leaveCb) {
          delete source._pending[key];
          (parent._pending || (parent._pending = {}))[key] = pending;
        }
      }
    }
    parent.appendChild(fragment);
  }

  // Adapted from vue2-teleport 1.2.2 src/Teleport.vue (CC0-1.0).
  export default {
    name: 'Teleport',
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    beforeMount() {
      const patch = this.__patch__;
      this.__patch__ = (previous, next, ...args) => {
        if (!this.slotEnd || !next) {
          return patch(previous, next, ...args);
        }

        const target = document.querySelector(this.to);
        const previousChildren = previous.children;
        const oldChildren = previousChildren || [];
        if (this.slotEnd.elm.parentNode !== (target || this.$el)) {
          reconcileGroup(groups.get(this.to), target, this, oldChildren);
        }
        const oldSlot = this.$createElement('div');
        const newSlot = this.$createElement('div');
        oldSlot.elm = this.slotEnd.elm.parentNode;
        oldSlot.children = [...oldChildren, this.slotEnd];
        newSlot.children = [...(next.children || []), this.slotEnd];
        slotRoots(oldChildren).forEach(root => this.ownedRoots.add(root));
        patch(oldSlot, newSlot);

        const children = newSlot.children.slice(0, -1);
        previous.children = undefined;
        next.children = undefined;
        try {
          return patch(previous, next, ...args);
        } finally {
          previous.children = previousChildren;
          next.children = children;
        }
      };
    },
    mounted() {
      const target = document.querySelector(this.to);
      let group = groups.get(this.to);
      if (!group) {
        group = { target, teleports: new Set() };
        groups.set(this.to, group);
      }
      const records = (target && target === group.target && observer?.takeRecords()) || [];
      const needsReconciliation =
        target !== group.target ||
        resetReinsertedTarget(group, target, records) ||
        (target &&
          records.some(
            record =>
              record.target === target &&
              Array.from(record.removedNodes).some(node => slotEnds.has(node)),
          ));

      this.ownedRoots = new WeakSet(slotRoots(this._vnode.children || []));
      this.slotStart = this.$el.insertBefore(document.createComment(''), this.$el.firstChild);
      this.slotEnd = this._e();
      this.slotEnd.key = slotEndKey;
      this.slotEnd.elm = this.$el.appendChild(document.createComment(''));
      slotEnds.add(this.slotEnd.elm);
      group.teleports.add(this);
      if (!observer) {
        observer = new MutationObserver(reconcileTeleports);
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['id'],
        });
      }
      if (needsReconciliation) {
        reconcileGroup(group, target);
      } else {
        this.placeSlot(target || this.$el);
      }
    },
    beforeDestroy() {
      const group = groups.get(this.to);
      group.teleports.delete(this);
      if (group.teleports.size === 0) {
        groups.delete(this.to);
      }
      if (groups.size === 0) {
        observer.disconnect();
        observer = null;
      }
      this.placeSlot(this.$el);
      this.slotStart.remove();
      slotEnds.delete(this.slotEnd.elm);
      this.slotEnd.elm.remove();
      this.slotEnd = null;
    },
    methods: {
      placeSlot(parent, children = this._vnode.children || []) {
        const end = this.slotEnd.elm;
        const start = this.slotStart;
        const roots = slotRoots(children);
        roots.forEach(root => this.ownedRoots.add(root));
        const failures = this.placementFailure?.target === parent ? this.placementFailure.count : 0;
        if (failures >= 2) {
          return;
        }
        this.placementFailure = null;
        if (start.parentNode === parent && end.parentNode === parent) {
          return;
        }
        const source = end.parentNode;
        let nodes = roots;
        if (source && start.parentNode === source) {
          const owned = new Set(nodes);
          if (source._pending) {
            const instances = new Set(
              children.map(child => child.componentInstance).filter(Boolean),
            );
            for (const pending of Object.values(source._pending)) {
              for (let vnode = pending; vnode; vnode = vnode.parent) {
                if (instances.has(vnode.componentInstance)) {
                  owned.add(pending.elm);
                  break;
                }
              }
            }
          }
          nodes = [];
          for (let node = start.nextSibling; node && node !== end; node = node.nextSibling) {
            if (owned.has(node) || (node._leaveCb && this.ownedRoots.has(node))) {
              nodes.push(node);
            }
          }
          if (roots.some(root => !root.parentNode)) {
            restoreDetachedRoots(nodes, roots, source);
          }
        }

        nodes.forEach(node => this.ownedRoots.add(node));
        const slot = [start, ...nodes, end];
        const focused =
          source?.isConnected && parent.isConnected && parent !== this.$el
            ? document.activeElement
            : null;
        const restoreFocus = focused && nodes.some(node => node.contains(focused));
        insertSlot(parent, source, slot);
        if (restoreFocus && document.activeElement === document.body && parent.contains(focused)) {
          focused.focus({ preventScroll: true });
        }
        if (parent !== this.$el && (start.parentNode !== parent || end.parentNode !== parent)) {
          this.placementFailure = { target: parent, count: failures + 1 };
          insertSlot(
            this.$el,
            parent,
            slot.filter(node => !node.parentNode || node.parentNode === parent),
          );
        }
      },
    },
  };

</script>


<style scoped>

  .hidden {
    display: none;
    visibility: hidden;
  }

</style>
