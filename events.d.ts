/**
 * Basic event class.
 * @since 1.0.0
 */
declare class Event {
    /**
     * Create a event instance.
     * @param data Data to pass to handler on invocation.
     * @param callee Callee data or object.
     * @since 1.0.0
     */
    constructor(data?: any, callee?: any);
}

/**
 * Event handler class.
 * Holds listeners and emits events when called.
 *
 * @since 1.0.0
 */
declare class EventHandler {
    /**
     * Remove all listeners from the handler.
     * @since 1.0.0
     */
    clear(): void;
    /**
     * Emits a event and invokes all handlers listening for it.
     * @param type Event type.
     * @param event The event to emit.
     * @since 1.0.0
     * @deprecated since 1.3.12 - In next major value, the emit function will be async and could break current implementations if not handled correctly.
     */
    emit(type: string, event: Event): Promise<void>;
    /**
     * Creates a event listener for a given event.
     * @param event Event to listen for.
     * @param handler Callback to fire on invocation.
     * @param priority Listener priority (0 lowest).
     * @param once If the listener should be removed after invocation @see once
     * @return Listener id. Could be stored for easy removal.
     * @since 1.0.0
     */
    on(event: string, handler: Function, priority?: number, once?: boolean): number;
    /**
     * Create a fire-once event listener that will be removed after invocation.
     * @param event Event name.
     * @param handler Callback to fire on invocation.
     * @param priority Listener priority (0 lowest).
     * @returns Listener id. Could be stored for easy removal.
     * @since 1.0.0
     */
    once(event: string, handler: Function, priority?: number): number;
    /**
     * Removes listener from the event handler.
     * @param event Event name.
     * @param handler Handler as id or callback.
     * @return True if removed, else false.
     * @since 1.0.0
     */
    off(event: string, handler: number | Function): boolean;
}

declare const handler: EventHandler;
export { Event, EventHandler, handler };
