import Enum from './Enum';

/** 
 * @class Represents a movement made by a player.
 */
export default class Movement {

    /**
     * @description The enum reference to the class.
     * @returns {Enum} An enum instance.
     */
    static enum = new Enum();

    static RAISE = new Movement('Raise');
    static CALL = new Movement('Call');
    static FOLD = new Movement('Fold');
    static CHECK = new Movement('Check');

    _value = undefined;

    /**
     * @private Cannot instanciate outside itself.
     * @constructor Provides a new movement.
     * @param {string} value The text representing the movement.
     * @throws Will result in an error when instanciated outside itself.
     */
    constructor(value) {
        this._value = value;
        Object.freeze(this);
        Movement.enum.add(this);
    }

    /**
     * @description Returns the text representation of the movement.
     * @returns {string} A text which represents this enum.
     */
    get value() {
        return this._value;
    }

}
Movement.enum.close();
