import Listener from './Listener';
import Event from './Event';

/**
 * Event handler class.
 * Holds listeners and emits events when called.
 *
 * @since 1.0.0
 */
export default class EventHandler {
  _listeners = {};
  _handlerId = 0;

  constructor () {

  }

  /**
   * Remove all listeners from the handler.
   */
  clear () {
    delete this._listeners;
    this._listeners = {};
  }

  /**
   * Emits a event and invokes all handlers listening for it.
   * @param {string} type Event type.
   * @param {Event} event The event to emit.
   */
  emit (type, event) {
    if (!(type in this._listeners)) {
      return;
    }

    let stop = false;
    this._listeners[type] = this._listeners[type].filter((listener) => {
      if (stop) {
        return true;
      }

      stop = listener.invoke(event) === false;
      return listener.once === false;
    });
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
  on(event, handler, priority = 0, once = false) {
    if (!(event in this._listeners)) {
      this._listeners[event] = [];
    }

    let id = this._handlerId++;
    this._listeners[event].push(new Listener(handler, once, priority));
    this._listeners[event].sort((a, b) => a.priority - b.priority);
    return id;
  }

  /**
   * Create a fire-once event listener that will be removed after invocation.
   * @param {string} event Event name.
   * @param {function} handler Callback to fire on invocation.
   * @param {number} priority Listener priority (0 lowest).
   * @returns {number} Listener id. Could be stored for easy removal.
   * @since 1.0.0
   */
  once(event, handler, priority = 0) {
    return this.on(event, handler, priority, true);
  }

  /**
   * Removes listener from the event handler.
   * @param {string} event Event name.
   * @param {function|number} handler Handler as id or callback.
   * @return {boolean} True if removed, else false.
   * @since 1.0.0
   */
  off(event, handler) {
    if (!(event in this._listeners)) {
      return false;
    }

    let c = this._listeners[event].length;
    this._listeners[event] = (
      typeof handler === 'number' ? ofId(handler, this._listeners[event]) : ofCb(handler, this._listeners[event])
    );
    return c !== this._listeners[event].length;
  }

}

function ofId (id, list) {
  for (let i = list.length; i-- > 0;) {
    if (list[i].id === id) {
      return list.splice(i, 1);
    }
  }
  return list;
}

function ofCb (cb, list) {
  for (let i = list.length; i-- > 0;) {
    if (list[i].callback === cb) {
      return list.splice(i, 1);
    }
  }
  return list;
}
