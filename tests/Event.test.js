import Event from '../src/Event';
import { AssertionError } from '../src/Assert';
import GlobalEventHandler from '../src/GlobalEventHandler';
import EventHandler from '../src/EventHandler';


describe('Tests for the Event class.', () => {

  describe('Constructor tests.', () => {
    test('Data must be an object.', () => {
      expect(() => new Event('string')).toThrowError(AssertionError);
      expect(() => new Event({a: 'b'})).toBeDefined();
    });
  });

  describe('Getter tests.', () => {
    test('Return value of data.', () => {
      let event = new Event({a: 'b'});
      expect(event.data).toEqual({a: 'b'});
    });

    test('Return value of callee.', () => {
      const test = function() {};
      let event = new Event({}, new test);
      expect(event.callee).toBeInstanceOf(test);
      event = new Event();
      expect(event.callee).toBeNull();
    });
  });

  describe('Emit tests.', () => {

    test('Emits to a global handler.', () => {
      const event = new Event({result: true});
      const mock = jest.fn(() => {});

      GlobalEventHandler.on('test', mock);
      event.emit('test');
      event.emit('no-test');

      expect(mock).toHaveBeenCalledTimes(1);
      GlobalEventHandler.clear();
    });

  });

});
