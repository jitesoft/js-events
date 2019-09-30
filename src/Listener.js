/**
 * @internal
 * @description Class storing data about a given event listener.
 * @since 1.0.0
 */
export default class Listener {
  #priority = 0;
  #once = false;
  #callback;
  #id = null;

  /**
   * Create a event handler.
   * @param {Function} callback Callback to fire on invocation.
   * @param {Boolean} once If event is one time only or not.
   * @param {Number} priority Priority of the event (0 is lowest).
   * @param {Number} id Handler ID.
   * @since 1.0.0
   */
  constructor (callback, once = false, priority = 0, id = 0) {
    this.#callback = callback;
    this.#once = once;
    this.#priority = priority;
    this.#id = id;
  }

  /**
   * Get handler ID of the event listener.
   * @return {Number}
   * @since 1.2.0
   */
  get id () {
    return this.#id;
  }

  /**
   * Event priority (0 is lowest priority and will be last in list)
   * @return {Number}
   * @since 1.0.0
   */
  get priority () {
    return this.#priority;
  }

  /**
   * If the event is a one time event only or not.
   * @return {Boolean}
   * @since 1.0.0
   */
  get once () {
    return this.#once;
  }

  /**
   * Asynchronous invoke method.
   *
   * @param {Event} event
   * @return {Promise<Boolean>}
   * @since 1.3
   */
  async invokeAsync (event) {
    return this.#callback(event);
  }

  /**
   * Invoke the listener.
   * @param {Event} event
   * @since 1.0.0
   */
  invoke (event) {
    return this.#callback(event);
  }

  /**
   * Get the callback handler is using.
   * @return {Function}
   * @since 1.0.0
   */
  get callback () {
    return this.#callback;
  }
}
