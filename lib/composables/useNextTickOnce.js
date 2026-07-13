import { nextTick } from 'vue';

/**
 * Returns an `once(fn)` function that defers `fn`
 * to the next Vue tick. If called again before
 * the tick fires, the call is ignored. After the
 * tick, the lock resets so future calls can schedule
 * again. Useful for preventing from multiple calls
 * of the same function in the same tick.
 */
export default function useNextTickOnce() {
  let isPending = false;

  function once(fn) {
    if (isPending) return;

    isPending = true;
    nextTick(() => {
      fn();
      isPending = false;
    });
  }

  return { once };
}
