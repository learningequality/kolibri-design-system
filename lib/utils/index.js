/**
 * Check if Nuxt is server side rendering
 * @returns {Boolean}
 */
export function isNuxtServerSideRendering() {
  return process && process.server;
}
