import Listener from './Listener';

/**
 * Event handler class.
 * Holds listeners and emits events when called.
 *
 * @since 1.0.0
 */
export default class EventHandler {
  #listeners = {};
  #handlerId = 0;

  constructor () {
    this.#listeners = {};
    this.#handlerId = 0;
  }

  /**
   * @internal
   * @return {Array<Listener>}
   * @readonly
   */
  get listeners () {
    return this.#listeners;
  }

  /**
   * Remove all listeners from the handler.
   * @since 1.0.0
   */
  clear () {
    this.#listeners = {};
  }

  /**
   * Emits a event and invokes all handlers listening for it.
   * @param {String} type Event type.
   * @param {Event} event The event to emit.
   * @since 1.0.0
   */
  emit (type, event) {
    if (!(type in this.#listeners)) {
      return;
    }

    let stop = false;
    this.#listeners[type] = this.#listeners[type].filter((listener) => {
      if (stop) {
        // Return true to make sure that fire once listeners are not invoked
        // but the object still stay in the list.
        return true;
      }

      stop = listener.invoke(event) === false; // Must be exactly false to count.
      return !listener.once;
    });
  }

  /**
   * Creates a event listener for a given event.
   * @param {String} event Event to listen for.
   * @param {Function} handler Callback to fire on invocation.
   * @param {Number} [priority] Listener priority (0 lowest).
   * @param {Boolean} [once] If the listener should be removed after invocation @see once
   * @return {Number} Listener id. Could be stored for easy removal.
   * @since 1.0.0
   */
  on (event, handler, priority = 0, once = false) {
    if (!(event in this.#listeners)) {
      this.#listeners[event] = [];
    }

    let id = this.#handlerId++;
    this.#listeners[event].push(new Listener(handler, once, priority, id));
    this.#listeners[event].sort((a, b) => b.priority - a.priority);
    return id;
  }

  /**
   * Create a fire-once event listener that will be removed after invocation.
   * @param {String} event Event name.
   * @param {Function} handler Callback to fire on invocation.
   * @param {Number} priority Listener priority (0 lowest).
   * @returns {Number} Listener id. Could be stored for easy removal.
   * @since 1.0.0
   */
  once (event, handler, priority = 0) {
    return this.on(event, handler, priority, true);
  }

  /**
   * Removes listener from the event handler.
   * @param {String} event Event name.
   * @param {Function|Number} handler Handler as id or callback.
   * @return {Boolean} True if removed, else false.
   * @since 1.0.0
   */
  off (event, handler) {
    if (!(event in this.#listeners)) {
      return false;
    }

    let c = this.#listeners[event].length;
    this.#listeners[event] = isNaN(handler) ? ofCb(handler, this.#listeners[event]) : ofId(handler, this.#listeners[event]);
    return c !== this.#listeners[event].length;
  }
}

const ofCb = (callback, list) => {
  return list.filter(handler => handler.callback !== callback);
};

const ofId = (id, list) => {
  return list.filter(handler => handler.id !== id);
};
