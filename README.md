# Events

[![Known Vulnerabilities](https://dev.snyk.io/test/npm/@jitesoft/events/badge.svg)](https://dev.snyk.io/test/npm/@jitesoft/events)
[![pipeline status](https://gitlab.com/jitesoft/open-source/javascript/events/badges/master/pipeline.svg)](https://gitlab.com/jitesoft/open-source/javascript/events/commits/master)
[![coverage report](https://gitlab.com/jitesoft/open-source/javascript/events/badges/master/coverage.svg)](https://gitlab.com/jitesoft/open-source/javascript/events/commits/master)
[![npm](https://img.shields.io/npm/dt/@jitesoft/events)](https://www.npmjs.com/package/@jitesoft/events)
[![Back project](https://img.shields.io/badge/Open%20Collective-Tip%20the%20devs!-blue.svg)](https://opencollective.com/jitesoft-open-source)


A simple event handling system for browser and node alike.

---

## Installation

Install will npm or yarn:

```bash
npm install @jitesoft/events
yarn add @jitesoft/events
```

## Classes

The event handler class is the main instance which handles listening and emitting of events.

### EventHandler

The following methods are exposed on the event handler:

`on(string: eventName, function: listener, number: priority = 0, boolean: once = false): number`

The `on` method attaches a callback to the handler which will be fired once the given event is emitted by the handler.  
It's possible to set a priority on the callback by changing the priority `number` value, where 0 is lowest priority. The `once` argument
determines if the callback should be removed after first run or not and defaults to `false`.  
The method returns a handle id (`number`) which can be used to remove the event listener if wanted.

If the listener callback returns FALSE, the event will not bubble to the next handler.

`once(string: eventName, function: listener, number: priority): number`

The `once` method does pretty much the same as `on`, but is always a `fire once` listener type.

`clear(): void`

Clear empties all the listeners from the handler.

`off(string: eventName, function|number: listener): boolean`

The `off` method removes a given listener from the handler either by its handle or by passing its callback method.

`emit(string: eventName, Event: event): void`

Emits a event and fires each listener that listens to the given event.

`emitAsync(string: eventName, Event: event, boolean: throw = false): Promise<void>`

The emitAsync method works just like the Emit method, with the exception that it is an async method.  
When used, it will group all the listeners by their priority and call them in batches, and just as with `emit`, if 
one of the callback returns false, it will not call the next batch.

It uses the `Promise.allSettled` function - by default - which does not throw exceptions from the listeners.
If the `throw` parameter is passed, it will instead use `all` which will throw exceptions from the listeners.

### Event

When emitting a event, the `Event` class is used as a object which passes the data. It accepts a `data` object, which can be accessed
via the exposed `data` getter and an optional `callee` argument which can be used to pass information (or a reference) to the calling object.  

---

## Example

The following example shows the most simple way create a handler and a listener and emit an event.

```javascript
import { EventHandler, Event } from '@jitesoft/events';

const handler = new Handler();

handler.on('test-event', (event) => {
  console.log(event.data.message);
});

handler.emit('test-event', new Event({
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
