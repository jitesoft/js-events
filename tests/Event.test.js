import Event from '../src/Event';

describe('Tests for the Event class.', () => {
  describe('Getter tests.', () => {
    test('Return value of data.', () => {
      let event = new Event({ a: 'b' });
      expect(event.data).toEqual({ a: 'b' });
    });

    test('Return value of callee.', () => {
      const Test = function () {};
      let event = new Event({}, new Test());
      expect(event.callee).toBeInstanceOf(Test);
      event = new Event();
      expect(event.callee).toBeNull();
    });
  });
});
