/**
 * Assertion class used to throw exceptions in case a given test does not pass.
 * @private
 * @static
 * @since 1.0.0
 */
export default class Assert {

  /**
   * Check if a object is of a given type using typeof.
   * @param {*} value
   * @param {string} type
   * @throws Error
   * @since 1.0.0
   */
  static typeOf(value, type) {
    typeof value === type || throw new Error(`Value not of type ${type}`)
  }

  /**
   * Check if a object is an instance of a given type using instanceof.
   * @param {*} value
   * @param {*} type
   * @since 1.0.0
   * @throws Error
   */
  static instanceOf(value, type) {
    value instanceof type || throw new Error(`Value was not an instance of ${type}`);
  }

}
