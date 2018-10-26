import GlobalEventHandler from './GlobalEventHandler';
import Assert from './Assert';

/**
 * Basic event class.
 * @since 1.0.0
 */
export default class Event {
  _data = {};
  _callee = null;

  /**
   * Create a event instance.
   * @param {Object} [data] Data to pass to handler on invocation.
   * @param {*} [callee] Callee data or object.
   * @since 1.0.0
   */
  constructor (data = {}, callee = null) {
    Assert.instanceOf(data, 'object');

    this._data = data;
    this._callee = callee;
  }

  /**
   * Emit the event, either by passing a handler or to the global handler if one exists.
   * @param {string} event Event name.
   * @since 1.0.0
   */
  emit(event) {
    GlobalEventHandler.emit(event, this);
  }

  /**
   * Callee if one is set.
   * @return {*}
   * @since 1.0.0
   */
  get callee() {
    return this._callee;
  }

  /**
   * Event data
   * @return {*}
   * @since 1.0.0
   */
  get data() {
    return this._data;
  }

}
