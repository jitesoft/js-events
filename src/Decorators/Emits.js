import { GlobalEventHandler } from '../Handler';
import { Event } from '../Event/Event';

export default function emit (eventName, before = false, handler = null) {
  return (target) => {
    const { kind, key, descriptor } = target;
    if (kind === 'method') {
      const original = descriptor.value;
      descriptor.value = (...args) => {
        if (!handler) {
          handler = GlobalEventHandler;
        }


        if (before) {
          handler.emit(eventName, new Event());
        }


        let result = original.value.apply(this, args);

        let data = {};
        if (emitResult) {
          data = result;
        }


        handler.emit('eventName', new Event(data, this));
      }
    }
    return target;
  }
}
