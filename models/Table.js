import Deck from './Deck';
import User from './User';
import Player from './Player';

/**
 * @class Represents a table for a poker game setup.
 */
export default class Table {

    _deck = new Deck();
    _cards = [];
    _players = [];
    _records = [];
    _dealerIndex = 0;
    _currentTurnIndex = 0;
    _bet = 0;
    _winner = {};

    
    /**
     * Provides a table setup for the given users.
     * @param {User[]} users The users to play poker.
     */
    constructor(users) {
        // shuffle deck
        this._deck.shuffle();
        for(let i = 0; i < 3; i++) {
            let card = this._deck.nextCard();
            this._cards.push(card);
        }
        
        // deal cards
        //this._players = users.forEach(u,i => new Player(u));
        var a;
        for(a=0; a<users.length; a++)
        {   
            let us = new Player(users[a]);
            this._players.push(us);
        }
        
        this._players.forEach(p => p.giveCard(this._deck.nextCard()) );
        this._players.forEach(p => p.giveCard(this._deck.nextCard()) );

        Object.seal(this);

    }//End of constructor

    /**
     * @description Starts the game.
     * @returns {undefined} Nothing.
     */
    startGame() {
        this._currentTurnIndex = 0;
        this.currentPlayer.takeTurn(this.handleTurnEnd);
    }

    /**
     * @description The players in the table.
     * @returns {Player[]} The current players playing poker.
     */
    get players() {
        return this._players;
    }

    /**
     * @description The player with the ongoing turn.
     * @returns {Player} The current player.
     */
    get currentPlayer() {
        return this._players[this._currentTurnIndex];
    }

    /**
     * @description The current dealer of the game.
     * @returns {Player} The dealer.
     */
    get dealer() {
        return this._players[this._dealerIndex];
    }

    /**
     * @description The player holding the small blind.
     * @returns {Player} The small blind player.
     */
    get smallBlindPlayer() {
        return this._players[this._dealerIndex + 1];
    }

    /**
     * @description The player holding the big blind.
     * @returns {Player} The big blind player.
     */
    get bigBlindPlayer() {
        return this._players[this._dealerIndex + 2];
    }

    /**
     * @description The bet on the game.
     * @returns {number} The current bet made in the game.
     */
    get bet() {
        return this._bet;
    }

}//End of Class Table


