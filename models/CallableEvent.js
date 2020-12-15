
/**
 * @class Represents an event handler that can be invoked in order to 
 * let listeners know that the event has taken place
 */
export default class CallableEvent {

    _listeners = [];

    /**
     * @constructor Provides a new handler for an event.
     */
    constructor() {
        Object.seal(this);
    }

    /**
     * @description Invokes the listeners of the event.
     * @param {object} argument A object meant to be recieved by the listeners of the event.
     * @returns {undefined} Nothing.
     */
    call(argument = {}, caller = this) {
        for(let i = 0; i < this._listeners; i++) {
            this._listeners.call(caller, argument);
        }
    }

    /**
     * @description Adds a function as a listener of the event, if the function is not already listening.
     * @param {function(object)} listener A function to invoke, which takes an object as an argument.
     * @returns ```True``` when added successfully, ```false``` when already added.
     */
    addListener(listener) {
        let index = this._listeners.indexOf(listener);
        if(index === -1) {
            this._listeners.push(listener);
            return true;
        }
        return false;
    }

    /**
     * @description Removes a function from the listeners of the event, if the function is already listening.
     * @param {function(object)} listener The function to stop invoking next time the event occurs.
     * @returns ```True``` when removed successfully, ```false``` when not listening.
     */
    removeListener(listener) {
        let index = this._listeners.indexOf(listener);
        if(index > -1) {
            this._listeners.splice(index, 1);
            return true;
        }
        return false;
    }

}
