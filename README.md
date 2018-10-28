# Events

A simple event handling system for browser and node alike.

---

## Classes

The event handler class is the main instance which handles listening and emitting of events.  
A `GlobalEventHandler` is exposed and intended to be used globally, but it's possible to create multiple handlers to be used in different ways.

### EventHandler

The following methods are exposed on the event handler:

`on(string: eventName, function: listener, number: priority = 0, boolean: once = false): number`

The `on` method attaches a callback to the handler which will be fired once the given event is emitted by the handler.  
It's possible to set a priority on the callback by changing the priority `number` value, where 0 is lowest priority. The `once` argument
determines if the callback should be removed after first run or not and defaults to `false`.  
The method returns a handle id (`number`) which can be used to remove the event listener if wanted.

`once(string: eventName, function: listener, number: priority): number`

The `once` method does pretty much the same as `on`, but is always a `fire once` listener type.

`clear(): void`

Clear empties all the listeners from the handler.

`off(string: eventName, function|number: listener): boolean`

The `off` method removes a given listener from the handler either by its handle or by passing its callback method.

`emit(string: eventName, Event: event): void`

Emits a event and fires each listener that listens to the given event.

### Event

When emitting a event, the `Event` class is used as a object which passes the data. It accepts a `data` object, which can be accessed
via the exposed `data` getter and an optional `callee` argument which can be used to pass information (or a reference) to the calling object.  

A `emit` method is exposed which will emit the event to the `GlobalEventHandler`.

---

## Example

The following example shows the most simple way create a listener and emit an event to it through the global event handler.

```javascript
import { GlobalEventHandler, Event } from '@jitesoft/events';

GlobalEventHandler.on('test-event', (event) => {
  console.log(event.data.message);
});

GlobalEventHandler.emit(new Event({
  message: 'This is a simple example...'
}));
```

---

## License

```text
MIT License

Copyright (c) 2018 Jitesoft

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
