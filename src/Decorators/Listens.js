const Listens = function (eventName, handlerName, eventHandler = null) {

  return function decorator(target) {
    if (!eventHandler) {
      eventHandler = (window.EventHandler ?? global.EventHandler);
    }
    if (!eventHandler) {
      throw new Error('No handler found.');
    }

    eventHandler.on(eventName, target[handlerName]);
  }

};

export default Listens;
