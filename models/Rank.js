import Enum from './Enum';

/** 
 * @class Represents a rank/number in a card.
 */
export default class Rank {

    /**
     * @description The enum reference to the class.
     * @returns {Enum} An enum instance.
     */
    static enum = new Enum();

    static TWO = new Rank('2');
    static THREE = new Rank('3');
    static FOUR = new Rank('4');
    static FIVE = new Rank('5');
    static SIX = new Rank('6');
    static SEVEN = new Rank('7');
    static EIGHT = new Rank('8');
    static NINE = new Rank('9');
    static TEN = new Rank('10');
    static JACK = new Rank('J');
    static QUEEN = new Rank('Q');
    static KING = new Rank('K');
    static ACE = new Rank('A');

    _value = undefined;

    /**
     * @private Cannot instanciate outside itself.
     * @constructor Provides a new rank.
     * @param {string} value The text representing the rank.
     * @throws Will result in an error when instanciated outside itself.
     */
    constructor(value) {
        this._value = value;
        Object.freeze(this);
        Rank.enum.add(this);
    }

    /**
     * @description Returns the text representation of the rank.
     * @returns {string} A text which represents this enum.
     */
    get value() {
        return this._value;
    }

}
Rank.enum.close();
