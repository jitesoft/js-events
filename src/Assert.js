class AssertionError extends Error {
  constructor(...args) {
    super(...args)
  }
}

export default class Assert {

  static instanceOf(value, type) {
    typeof value === type || throw new AssertionError(`Value not of type ${type}`)
  }

  static nullOrInstanceOf(value, type) {
    (value === null || typeof value === type) || throw new AssertionError(`Value was not null or of type ${type}`);
  }
}

export {
  Assert,
  AssertionError
}
