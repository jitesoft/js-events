import Assert from '../Assert/Assert';

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
    Assert.typeOf(data, 'object');

    this._data = data;
    this._callee = callee;
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
