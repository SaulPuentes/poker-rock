import Deck from './Deck';
import User from './User';
import Player from './Player';
import Movement from './Movement';

/**
 * @class Represents a table for a poker game setup.
 */
export default class Table {

    _deck = new Deck();
    _cards = [];
    _players = [];
    _records = [];
    _dealerIndex = -1;
    _currentTurnIndex = -1;
    _bet = 0;

    
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

        users = ['Toño', 'Sebas', 'Saul', 'Javier'];
        // deal cards
        //this._players = users.forEach(u,i => new Player(u));
        var a;
        for(a=0; a<users.length; a++)
        {   
            let us = new Player(users[a]);
            this._players.push(us);
        }
        console.log("players u", this._players)
        
        this._players.forEach(p => p.giveCard(this._deck.nextCard()) );
        this._players.forEach(p => p.giveCard(this._deck.nextCard()) );


        //this._players = new Player();
        //this._players.giveCard(this._deck.nextCard());
        //this._players.giveCard(this._deck.nextCard());

        Object.seal(this);
    }

    /**
     * @description Starts the game.
     * @returns {undefined} Nothing.
     */
    startGame() {
        this._currentTurnIndex = 0;
        this.currentPlayer.takeTurn(this.handleTurnEnd);
    }

    /**
     * @description Handles the movement made from the current player.
     * @param {Movement} movement The movement made by the player.
     * @param {number} bet The bet, if any to Raise or Call.
     * @returns {undefined} Nothing.
     */
    handleTurnEnd(movement, bet = -1) {
        // TODO - validate player movement.
        // record movement
        let player = this.currentPlayer;
        this._records.push({
            userName: player.user.name,
            movement: movement.value,
            amount: bet
        });
        // TODO - call api, update movements record.
        // increase bet, if any
        if(bet > 0) {
            this.bet += bet;
        }
        // update turn index.
        this._currentTurnIndex++;
        // check if folded
        if(movement.value === Movement.FOLD.value) {
            let index = this._players.indexOf(player);
            this._players.splice(index, 1);
        }
        // if has to add card, add it
        if(this.shouldAddCard()) {
            let card = this._deck.nextCard();
            this._cards.push(card);
        }
        // exit condition
        if(!this.gameEnds()) {
            this.currentPlayer.takeTurn(this.handleTurnEnd);
        }
    }

    /**
     * @description Determines if a card should be added at this point.
     * @returns {boolean} ```True``` when a card should be added, ```false``` otherwise.
     */
    shouldAddCard() {
        let sliceIndex = -1 * (this._players.length - 1);
        let lastRecords = this._records.slice(sliceIndex);
        // if everybody folded
        if(lastRecords.map(r => r.movement.value === Movement.FOLD.value).length === lastRecords.length) {
            return true;
        }
        // if everybody called
        else if(lastRecords.map(r => r.movement.value === Movement.RAISE.value).length === lastRecords.length) {
            return true;
        }
        // not if anyone has raised
        else if(lastRecords.find(r => r.movement.value === Movement.RAISE.value) != undefined) {
            return false;
        }
        else {
            return true;
        }
    }

    /**
     * @description Determines if there is a winner to the game.
     * @returns {boolean} ```True``` when game should end, ```false``` otherwise.
     */
    gameEnds() {
        // if there are no more players.
        if(this._players.length < 2) {
            return true;
        }
        else { 
            return true;
        }
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

}
