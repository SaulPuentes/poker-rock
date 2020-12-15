import Deck from './Deck';
import User from './User';
import Player from './Player';
import Movement from './Movement';
import image from 'next/image';

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
        
        //Dummy data +++++++++++++++++++++++++++++++++++++++++++++++++
        users = ['Toño', 'Sebas', 'Saul', 'Javier'];
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
        
        //this._records.push({
            //userName: player.user.name,
            //movement: movement.value,
            //amount: bet
        //});
    

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
        //Dummy data ++++++++++++++++++++++++++++++++++++++++++++
        this._records.push({
            userName: 'Toño',
            movement: 'Fold',
            amount: 500
        });
    
        this._records.push({
            userName: 'Sebas',
            movement: 'Fold',
            amount: 500
        });
        
        this._records.push({
            userName: 'Saul',
            movement: 'Fold',
            amount: 500
        });
        //Dummy data ++++++++++++++++++++++++++++++++++++++++++

        let sliceIndex = -1 * (this._players.length - 1);
        let lastRecords = this._records.slice(sliceIndex);
        
        // if everybody folded
        //if(lastRecords.map(r => r.movement.value === Movement.FOLD.value).length === lastRecords.length)
        let f1 = lastRecords.map(r => r.movement == Movement.FOLD.value);
        let f = f1.every(u => u === true);

        let r1 = lastRecords.map(r => r.movement == Movement.RAISE.value);
        let r = r1.every(v => v === true);
        
        //If everybody falls, then the table gets another card
        if(f == true) {
            console.log("Fold");
            let card = this._deck.nextCard();
            this._cards.push(card);
            return true;
        }
        // if everybody called
        //if(lastRecords.map(r => r.movement.value === Movement.RAISE.value).length === lastRecords.length)
        else if(r == true ) {
            console.log("Raise");

            return true;
        }
        // not if anyone has raised
        else if(lastRecords.find(r => r.movement.value == Movement.RAISE.value) != undefined) {
            console.log("Raise Not")
            return false;
        }
        else {
            console.log("??")
            return true;
        }
    }

    /**
     * @description Determines if there is a winner to the game.
     * @returns {boolean} ```True``` when game should end, ```false``` otherwise.
     */
    gameEnds() {

        //Dummy data ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let t = this._cards;
        let p1 = t.concat(this._players[0]._cards);
        let p2 = t.concat(this._players[1]._cards);
        let p3 = t.concat(this._players[2]._cards);
        let p4 = t.concat(this._players[3]._cards);
        
        console.log("p1",p1);
        console.log("p2",p2);
        console.log("p3",p3);
        console.log("p4",p4);

        let p1_r = p1.map(e => e._rank);
        let p2_r = p2.map(e => e._rank);
        let p3_r = p3.map(e => e._rank);
        let p4_r = p4.map(e => e._rank);

        let p1_s = p1.map(e => e._suit);
        let p2_s = p2.map(e => e._suit);
        let p3_s = p3.map(e => e._suit);
        let p4_s = p4.map(e => e._suit);
        
        let i = 0;
        let hands = [p1, p2, p3, p4];
        let hands_r = [p1_r, p2_r, p3_r, p4_r];
        let hands_s = [p1_s, p2_s, p3_s, p4_s];
        let points = [];
        
        let count = 0;
        let counts = {};
        let count_aux = 0;
        let tempArr_p = [];
        let flag_fh = false;
        let flag_f = false;
        let flag_r = false;
        let flag_p = false;
        let flag_s = false;
        let flag_2 = false;
        let flag_3 = false;

        //console.log("C", hands_s[i].every(v => v == "H") || hands_s[i].every(v => v == "C") || hands_s[i].every(v => v == "S") || hands_s[i].every(v => v == "D"));
        //console.log("A",hands_r[i].includes("A"))
        
        //Winner hand
        while(i<hands.length){
            if(hands_s[i].every(v => v == "H") || hands_s[i].every(v => v == "C") || hands_s[i].every(v => v == "S") || hands_s[i].every(v => v == "D")){
                //Royal Flush
                if(hands_r[i].includes("A") && hands_r[i].includes("Q") && hands_r[i].includes("K") && hands_r[i].includes("J") && hands_r[i].includes("10")){
                    flag_r = true;
                    points[i] = 100;
                    console.log(`Royal Flush Player ${i} wins`);
                }
                //Straight flush
                else if(hands_r[i].includes("10") && hands_r[i].includes("9") && hands_r[i].includes("8") && hands_r[i].includes("7") && hands_r[i].includes("6")){
                    console.log(`Straight Flush Player ${i} wins`);
                    points[i] = 90;
                } 
            }
            //Pairs and Threes
            else if(flag_r == false){
                
                hands_r[i].forEach(l => counts[l] = (counts[l]||0)+1);
                tempArr_p.push(counts);
                counts = {};

                let arr = Object.entries(tempArr_p[i]);
                
            }
            //Flush
            else if(flag_p == false && flag_3 == false && flag_2 == false && flag_r == false){
                if(hands_s[i].every(v => v == "H") || hands_s[i].every(v => v == "C") || hands_s[i].every(v => v == "S") || hands_s[i].every(v => v == "D")){
                    points[i] = 60;
                    flag_f = true;
                    console.log(`Flush Player ${i} wins`);
                }
            }
            else if(flag_p == false && flag_3 == false && flag_2 == false && flag_r == false && flag_f == false){
                //Straight
                if(flag_f == false && hands_r[i].includes("10") && hands_r[i].includes("9") && hands_r[i].includes("8") && hands_r[i].includes("7") && hands_r[i].includes("6")){
                points[i] = 50;
                flag_s = true;
                console.log(`Straight Player ${i} wins`);
            }
            }

            i++
        }//End of while for winner hand
        console.log(points);
        

        // if there are no more players.
        if(this._players.length < 2) {
            console.log("No more players")
            return true;
        }
        else { 
            console.log("We can play")
            return true;
        }
    }//End of gameEnds

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


/*

                 for(let o = 0; o<hands_r[i].length; o++){
                    for(let p = o+1; p<hands_r[i].length; p++ ){
                        if(hands_r[i][o] == hands_r[i][p]){
                            count++;    
                            break;
                        }
                    }
                }


                //Poker
                if(count >= 4)
                {
                    points[i] = 80;
                    flag_p = true;
                    console.log(`Poker Player ${i} wins`);
                }
                //Three of a kind
                else if(count == 3)
                {
                    points[i] = 40;
                    flag_3 = true;
                    console.log(`Three of a kind Player ${i} wins`);
                }
                //One Pair
                else if(count == 2 && count < 3){
                    points[i] = 20;
                    flag_2 = true;
                    console.log(`One Pair Player ${i} wins`);
                }
                count = 0;

            */