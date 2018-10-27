import Assert from '../Assert/Assert';

/**
 * @private
 * @description Class storing data about a given event listener.
 * @since 1.0.0
 */
export default class Listener {
  _priority = 0;
  _once = false;
  _callback = false;
  _id = null;

  /**
   * Create a event handler.
   * @param {function} callback Callback to fire on invocation.
   * @param {boolean} once If event is one time only or not.
   * @param {number} priority Priority of the event (0 is lowest).
   * @param {number} id Handler ID.
   * @since 1.0.0
   */
  constructor (callback, once = false, priority = 0, id = 0) {
    Assert.typeOf(callback, 'function');
    Assert.typeOf(once, 'boolean');
    Assert.typeOf(priority, 'number');
    Assert.typeOf(id, 'number');

    this._callback = callback;
    this._once = once;
    this._priority = priority;
    this._id = id;
  }

  /**
   * Event priority (0 is lowest priority and will be last in list)
   * @return {number}
   * @since 1.0.0
   */
  get priority() {
    return this._priority;
  }

  /**
   * If the event is a one time event only or not.
   * @return {boolean}
   * @since 1.0.0
   */
  get once () {
    return this._once;
  }

  /**
   * Invoke the listener.
   * @param {Event} event
   * @since 1.0.0
   */
  invoke (event) {
    return this._callback(event);
  }

  /**
   * Get the callback handler is using.
   * @return {function}
   * @since 1.0.0
   */
  get callback () {
    return this._callback;
  }

}
