import Enum from './Enum';

/** 
 * @class Represents a suit/color in a card.
 */
export default class Suit {

    /**
     * @description The enum reference to the class.
     * @returns {Enum} An enum instance.
     */
    static enum = new Enum();

    static CLUBS = new Suit('C');
    static HEARTS = new Suit('H');
    static SPADES = new Suit('S');
    static DIAMONDS = new Suit('D');

    _value = undefined;

    /**
     * @private Cannot instanciate outside itself.
     * @constructor Provides a new suit.
     * @param {string} value The text representing the suit.
     * @throws Will result in an error when instanciated outside itself.
     */
    constructor(value) {
        this._value = value;
        Object.freeze(this);
        Suit.enum.add(this);
    }

    /**
     * @description Returns the text representation of the suit.
     * @returns {string} A text which represents this enum.
     */
    get value() {
        return this._value;
    }

};
Suit.enum.close();
