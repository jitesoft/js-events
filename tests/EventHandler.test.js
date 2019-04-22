import EventHandler from '../src/EventHandler';
import Event from '../src/Event';

describe('Tests for the EventHandler class.', () => {
  let handler = new EventHandler();

  beforeEach(() => {
    handler = new EventHandler();
  });

  describe('Clear tests.', () => {
    test('listeners is empty after clear.', () => {
      expect(Object.keys(handler.listeners)).toHaveLength(0);
      handler.on('test', () => {});
      handler.on('test', () => {});
      expect(Object.keys(handler.listeners)).toHaveLength(1);
      expect(handler.listeners['test']).toHaveLength(2);
      handler.clear();
      expect(Object.keys(handler.listeners)).toHaveLength(0);
      expect(handler.listeners['test']).toBeUndefined();
    });
  });

  describe('Emit tests.', () => {
    test('Emit calls listeners.', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      handler.on('test', listener1);
      handler.on('test', listener2);

      handler.emit('test', new Event());

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });

    test('Emit does not call listeners on other events.', () => {
      const listener = jest.fn();
      handler.on('test', listener);
      handler.emit('not-test', new Event());
      expect(listener).toHaveBeenCalledTimes(0);
    });

    test('Emit does not bubble if callback returns false.', () => {
      const listener = jest.fn(e => true);
      const listener2 = jest.fn(e => undefined);
      const listener3 = jest.fn(e => false);

      // Prio results: true => undefined => false => not called.
      handler.on('test', listener, 5);
      handler.on('test', listener2, 4);
      handler.on('test', listener3, 3);
      handler.on('test', listener, 2);

      handler.emit('test', new Event());

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
      expect(listener3).toHaveBeenCalledTimes(1);
    });

    test('Emit does not throw errors by default.', async () => {
      const cb = jest.fn(async () => {
        throw new Error('Hi!');
      });

      handler.on('test', cb);

      await expect(handler.emitAsync('test', new Event())).resolves.toBe(undefined);
      expect(cb).toHaveBeenCalledTimes(1);
    });

    test('Emit does throw errors if set to.', async () => {
      const cb = jest.fn(async () => {
        throw new Error('Hi!');
      });

      handler.on('test', cb);

      await expect(handler.emitAsync('test', new Event(), true)).rejects.toThrow('Hi!');
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  describe('Async Emit tests.', () => {
    test('Emit calls listeners.', async () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn(async () => Promise.resolve());

      handler.on('test', listener1);
      handler.on('test', listener2);

      await handler.emitAsync('test', new Event());

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });

    test('Emit does not call listeners on other events.', async () => {
      const listener = jest.fn();
      handler.on('test', listener);
      await handler.emitAsync('not-test', new Event());
      expect(listener).toHaveBeenCalledTimes(0);
    });

    test('Emit does not bubble if callback returns false.', async () => {
      const listener = jest.fn(e => true);
      const listener2 = jest.fn(async () => Promise.resolve(undefined));
      const listener3 = jest.fn(async () => Promise.resolve(false));

      // Prio results: true => undefined => false => not called.
      handler.on('test', listener, 5);
      handler.on('test', listener2, 4);
      handler.on('test', listener3, 3);
      handler.on('test', listener, 2);

      await handler.emitAsync('test', new Event());

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
      expect(listener3).toHaveBeenCalledTimes(1);
    });
  });

  describe('On tests.', () => {
    test('On adds a listener.', () => {
      let fn = () => {};

      expect(Object.keys(handler.listeners)).toHaveLength(0);
      handler.on('test', fn);
      expect(Object.keys(handler.listeners)).toHaveLength(1);
      expect(handler.listeners['test']).toHaveLength(1);
      expect(handler.listeners['test'][0].callback).toBe(fn);
    });

    test('On is called more than once on multiple events.', () => {
      let fn = jest.fn((e) => { return e.data.a; });

      handler.on('test', fn);

      handler.emit('test', new Event({ a: 1 }));
      handler.emit('test', new Event({ a: 2 }));

      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveNthReturnedWith(1, 1);
      expect(fn).toHaveNthReturnedWith(2, 2);
    });

    test('On with priority sorts the events correctly.', () => {
      let fn = jest.fn(e => 0);
      let fn1 = jest.fn(e => 1);
      let fn2 = jest.fn(e => 2);
      let fn3 = jest.fn(e => 3);

      handler.on('test', fn1, 3);
      handler.on('test', fn, 4);
      handler.on('test', fn3, 1);
      handler.on('test', fn2, 2);

      expect(handler.listeners['test'][0].callback).toBe(fn);
      expect(handler.listeners['test'][1].callback).toBe(fn1);
      expect(handler.listeners['test'][2].callback).toBe(fn2);
      expect(handler.listeners['test'][3].callback).toBe(fn3);
    });
  });

  describe('Off tests.', () => {
    test('Off removes listener by handle.', () => {
      let handle = handler.on('test', () => {});
      expect(Object.keys(handler.listeners)).toHaveLength(1);
      expect(handler.listeners['test']).toHaveLength(1);
      handler.off('test', handle);
      expect(Object.keys(handler.listeners)).toHaveLength(1);
      expect(handler.listeners['test']).toHaveLength(0);
    });

    test('Off removes listener by callback', () => {
      let cb = () => {};
      handler.on('test', cb);
      expect(Object.keys(handler.listeners)).toHaveLength(1);
      handler.off('test', cb);
      expect(Object.keys(handler.listeners)).toHaveLength(1);
      expect(handler.listeners['test']).toHaveLength(0);
    });
  });

  describe('Once tests.', () => {
    test('Once adds a listener.', () => {
      let fn = () => {};
      expect(Object.keys(handler.listeners)).toHaveLength(0);
      handler.once('test', fn);
      expect(Object.keys(handler.listeners)).toHaveLength(1);
      expect(handler.listeners['test']).toHaveLength(1);
      expect(handler.listeners['test'][0].callback).toBe(fn);
    });

    test('Once is only called once.', () => {
      let fn = jest.fn((e) => { return e.data.a; });

      handler.once('test', fn);

      handler.emit('test', new Event({ a: 2 }));
      handler.emit('test', new Event({ a: 1 }));

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveNthReturnedWith(1, 2);

      expect(Object.keys(handler.listeners)).toHaveLength(1);
      expect(handler.listeners['test']).toHaveLength(0);
    });

    test('Once with priority sorts the events correctly.', () => {
      let fn = jest.fn(() => 0);
      let fn1 = jest.fn(() => 1);
      let fn2 = jest.fn(() => 2);
      let fn3 = jest.fn(() => 3);

      handler.once('test', fn1, 3);
      handler.once('test', fn, 4);
      handler.once('test', fn3, 1);
      handler.once('test', fn2, 2);

      handler.emit('test', new Event());
      expect(fn).toHaveReturnedWith(0);
      expect(fn1).toHaveReturnedWith(1);
      expect(fn2).toHaveReturnedWith(2);
      expect(fn3).toHaveReturnedWith(3);

      expect(Object.keys(handler.listeners)).toHaveLength(1);
      expect(handler.listeners['test']).toHaveLength(0);
    });
  });
});
