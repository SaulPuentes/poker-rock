
/** 
 * @class Represents an enumerable set.
 */
export default class Enum {

    _values = [];

    /**
     * @description The amount of values to enumerate.
     * @returns {number} A numeric value bigger or equal to 0.
     */
    get count() {
        return this._values.length;
    }
    
    /**
     * @description Determines if the enum accepts changes.
     * @returns {boolean} ```True``` when no changes are accepted,  ```false``` otherwise.
     */
    get isClosed() {
        return Object.isFrozen(this);
    }

    /**
     * @description The currently contained values.
     * @returns {Array} An array of the values.
     */
    get values() {
        return this._values;
    }

    /**
     * @description Adds a new value to this enum.
     * @param {any} value The value to add.
     * @returns {undefined} Nothing.
     * @throws Will result in an error when enumeration is closed.
     */
    add(value) {
        if(this.isClosed) {
            throw Error('Cannot instanciate after enumeration is closed.');
        } else {
            this._values.push(value);
        }
    }

    /**
     * @description Restricts more variables to be added.
     * @param {any} value The value to add.
     * @returns {undefined} Nothing.
     */
    close() {
        Object.freeze(this);
    }

}
