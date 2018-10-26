class AssertionError extends Error {
  constructor(...args) {
    super(...args)
  }
}

/**
 * Assertion class used to throw exceptions in case a given test does not pass.
 * @private
 * @static
 */
export default class Assert {

  /**
   * Check if a object is of a given type using typeof.
   * @param {*} value
   * @param {string} type
   * @throws AssertionError
   */
  static typeOf(value, type) {
    typeof value === type || throw new AssertionError(`Value not of type ${type}`)
  }

  /**
   * Check if a object is an instance of a given type using instanceof.
   * @param {*} value
   * @param {*} type
   */
  static instanceOf(value, type) {
    value instanceof type || throw new AssertionError(`Value was not an instance of ${type}`);
  }

}

export {
  Assert,
  AssertionError
}
