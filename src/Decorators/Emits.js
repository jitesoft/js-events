export default function emit (eventName, emitResult = false) {
  return (target) => {
    const { kind, key, descriptor } = target;
    if (kind === 'method') {
      const original = descriptor.value;
      descriptor.value = (...args) => {
        let result = null;
        if (callback) {
          result = callback(key, kind, descriptor, ...args)
        }

        window.dispatchEvent(new CustomEvent('hookName', {detail: result}));
        result = original.value.apply(this, args);
      }
    }
    return target
  }
}
