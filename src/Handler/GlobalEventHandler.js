/**
 * Static event handler to be used globally.
 */
import EventHandler from './EventHandler';

export default class GlobalEventHandler {
  /** @private */
  static _handler;

  /**
   * Remove all listeners from the handler.
   */
  static clear () {
    GlobalEventHandler._handler.clear();
  }

  /**
   * Emits a event and invokes all handlers listening for it.
   * @param {string} type Event type.
   * @param {Event} event
   */
  static emit (type, event) {
    GlobalEventHandler._handler.emit(type, event);
  }

  /**
   * Creates a event listener for a given event.
   * @param {string} event Event to listen for.
   * @param {function} handler Callback to fire on invocation.
   * @param {number} [priority] Listener priority (0 lowest).
   * @param {boolean} [once] If the listener should be removed after invocation @see once
   * @return {number} Listener id. Could be stored for easy removal.
   * @since 1.0.0
   */
  static on (event, handler, priority = 0, once = false) {
    return GlobalEventHandler._handler.on(event, handler, priority, once);
  }

  /**
   * Create a fire-once event listener that will be removed after invocation.
   * @param {string} event Event name.
   * @param {function} handler Callback to fire on invocation.
   * @param {number} priority Listener priority (0 lowest).
   * @returns {number} Listener id. Could be stored for easy removal.
   * @since 1.0.0
   */
  static once (event, handler, priority = 0) {
    return GlobalEventHandler._handler.once(event, handler, priority);
  }

  /**
   * Removes listener from the event handler.
   * @param {string} event Event name.
   * @param {function|number} handler Handler as id or callback.
   * @return {boolean} True if removed, else false.
   * @since 1.0.0
   */
  static off (event, handler) {
    return GlobalEventHandler._handler.off(event, handler);
  }

}

// noinspection JSUnresolvedVariable
GlobalEventHandler._handler = new EventHandler();
