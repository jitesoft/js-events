/**
 * Groups each item in the list by a defined callback return value.
 * Input is expected to be an array-like structure and return value will be a standard map/object.
 *
 * @param {Array<*>} list     Array to group.
 * @param {Function} keySelector Callback to execute on each object in the array to fetch key for grouping.
 * @return {Object}
 */
export default (list, keySelector) => {
  const result = {};
  const count = list.length;
  let val = null;

  for (let i = 0; i < count; i++) {
    val = keySelector(list[i]);

    if (result[val] === undefined) {
      result[val] = [];
    }

    result[val].push(list[i]);
  }

  return result;
};