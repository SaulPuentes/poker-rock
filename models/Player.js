import User from './User';
import Card from './Card';
import Movement from './Movement';
import CallableEvent from './CallableEvent';

/**
 * @class Represents a player in a poker game.
 */
export default class Player {

    _user = undefined;
    _cards = [];
    _lastMove = undefined;

    /**
     * @constructor Provides a player for a poker game.
     * @param {User} user The user associated to this player.
     */
    constructor(user) {
        this._user = user;
        Object.seal(this);
    }

    /**
     * @description The user associated to this player.
     * @returns {User} The user of the player.
     */
    get user() {
        return this._user;
    }

    /**
     * @description Represents the last movement made by the player.
     * @return {Movement} The last movement.
     */
    get lastMove() {
        return this._lastMove;
    }

    /**
     * @description Assigns a card to the player, if the player has less than 2 cards.
     * @param {Card} card The card to assign to the player.
     * @return {boolean} ```True``` when assigned, ```false``` otherwise;
     */
    giveCard(card) {
        //                    >
        if(this._cards.length < 2) {
            this._cards.push(card);
            //return true;
            return this._cards
        }
        return false;
    }

    /**
     * @description Removes all cards from the player.
     * @return {Card[]} The removed cards from the player.
     */
    dropCards() {
        return this._cards.slice(0, this._cards.length - 1);
    }

    /**
     * @description Enables the player to take his turn.
     * @param {function(Movement, number)} handler A function to invoke when the move has been made. 
     * @returns {undefined} Nothing.
     */
    async takeTurn(handler) {
        // TODO - Make 30seg timer
        // TODO - Request movement
        handler(Movement.FOLD, undefined);
    }

}
