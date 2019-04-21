import Listener from '../src/Listener';
import { Event } from '../src/';

describe('Tests for the Listener class.', () => {
  describe('Constructor tests.', () => {
    test('Callback must be function', () => {
      expect(() => new Listener(() => {})).toBeDefined();
    });

    test('Once must be bool', () => {
      expect(() => new Listener(() => {}, true)).toBeDefined();
    });

    test('Priority must be number', () => {
      expect(() => new Listener(() => {}, true, 1)).toBeDefined();
    });

    test('Id must be number.', () => {
      expect(() => new Listener(() => {}, true, 1, 1)).toBeDefined();
    });
  });

  describe('Async listener invocation.', () => {
    test('Should be called async.', async () => {
      const cb = jest.fn(async () => Promise.resolve());
      const listener = new Listener(cb);
      await listener.invokeAsync(new Event());

      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  describe('Getter tests.', () => {
    test('Return value of callback', () => {
      let listener = new Listener(() => 'abc');
      expect(listener.callback).toBeInstanceOf(Function);
      expect(listener.callback()).toBe('abc');
    });

    test('Return value of once', () => {
      let listener = new Listener(() => {}, true);
      expect(listener.once).toBe(true);
      listener = new Listener(() => {}, false);
      expect(listener.once).toBe(false);
      listener = new Listener(() => {});
      expect(listener.once).toBe(false);
    });

    test('Return value of priority', () => {
      let listener = new Listener(() => {}, false, 123);
      expect(listener.priority).toBe(123);
      listener = new Listener(() => {}, false, 231);
      expect(listener.priority).toBe(231);
      listener = new Listener(() => {}, false);
      expect(listener.priority).toBe(0);
    });
  });

  describe('Invocation test.', () => {
    test('Event is sent to callback', () => {
      let listener = new Listener((test) => {
        expect(test.data.a).toBe('b');
        return 'hej';
      });

      const fn = jest.fn((event) => listener.invoke(event));
      fn(new Event({ 'a': 'b' }));
      expect(fn).toHaveReturnedWith('hej');
    });
  });
});
