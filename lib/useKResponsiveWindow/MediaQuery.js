/**
 * Class representing a MediaQuery
 */
export default class MediaQuery {
  /**
   *Create a media query
   * @param {String} query - The query string
   * @param {CallableFunction} handler - The event callback function
   */
  constructor(query, handler) {
    this.query = query;
    this.handler = handler;
  }

  /**
   * @returns {Object} Media query list
   */
  mediaQueryList() {
    return window.matchMedia(this.query).addListener;
  }

  /**
   * Check if Nuxt is server side rendering
   * @returns {Boolean}
   */
  isNuxtServerSideRendering() {
    return process && process.server;
  }

  /**
   * Stop listening for media query events
   */
  stopListening() {
    this.mediaQueryList().removeEventListener('change', this.handler);
  }

  /**
   * Add a media query
   * @returns {Object} Containing mediaQueryList, eventHandler, and stopListening
   */
  addMediaQuery() {
    //Prevent function execution if Nuxt is server side rendering
    if (this.isNuxtServerSideRendering()) {
      return;
    }

    if (this.mediaQueryList().addEventListener) {
      this.mediaQueryList().addEventListener('change', this.handler);
    } else {
      this.mediaQueryList().addListener('change', this.handler);
    }

    return {
      mediaQueryList: this.mediaQueryList(),
      eventHandler: this.handler,
      stopListening: this.stopListening,
    };
  }
}
