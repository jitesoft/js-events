/**
 * Basic event class.
 * @since 1.0.0
 */
export default class Event {
  #data = {};
  #callee = null;

  /**
   * Create a event instance.
   * @param {Object} [data] Data to pass to handler on invocation.
   * @param {*} [callee] Callee data or object.
   * @since 1.0.0
   */
  constructor (data = {}, callee = null) {
    this.#data = data;
    this.#callee = callee;
  }

  /**
   * Callee if one is set.
   * @return {*}
   * @since 1.0.0
   */
  get callee () {
    return this.#callee;
  }

  /**
   * Event data
   * @return {Object}
   * @since 1.0.0
   */
  get data () {
    return this.#data;
  }
}
