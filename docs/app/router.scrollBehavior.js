/*
  As described in the README, we do not use client-side routing because
  it interferes with using #anchor links. Because of this, setting complex
  scrollBehavior for Vue Router is unnecessary.

  It is not possible to disable the client-side router completely, but here
  we override the NuxtJS built-in scrollBehavior function with something
  much more basic to cut down on unnecessary JS sent to the client.
*/

export default function() {
  return { x: 0, y: 0 };
}
