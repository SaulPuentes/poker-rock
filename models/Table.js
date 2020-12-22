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
    _winner = null;

    
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
            let card = this._deck.nextCard();
            this._cards.push(card);
            console.log(card);
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
     * @description Determines the winner hand, brings the data for all the users hands
     * and the table, so it can makes a comparison to determine who is the winner. 
     * @returns The index of the player who has the higher score.
     */
    winnerHand(){
        let t = this._cards;
        let hands = [];;
        let hands_r = [];
        let hands_s = [];
        let points = [];
        let i = 0;
        let counts = {};
        let count_t = 0;
        let count_p = 0;
        let tempArr_p = [];
        let flag_rf = false;
        let flag_pair = false;
        let flag_three = false;
        let flag_pok = false;
        
        let p = [];
        for(let b=0; b<this._players.length;b++){
            p[b]= t.concat(this._players[b]._cards);
            hands.push(p[b]);
            points.push(0);
        }
        console.log("p", p);

        let p_r = [];
        for(let c = 0; c<p.length; c++){
            p_r[c] = p[c].map(e => e.rank);
            hands_r.push(p_r[c]);
        }
        console.log("pr", p_r);
        
        let p_s = [];
        for(let d = 0; d<p.length; d++){
            p_s[d] = p[d].map(e => e._suit);
            hands_s.push(p_s[d])
        }
        console.log("ps", p_s);

        //Winner hand
        while(i<hands.length){
            //Same Suits ----------------------------------------------------------
            if(hands_s[i].every(v => v == "H") || hands_s[i].every(v => v == "C") || hands_s[i].every(v => v == "S") 
            || hands_s[i].every(v => v == "D")){
                //Royal Flush
                flag_rf = true;
                if(hands_r[i].includes("A") && hands_r[i].includes("Q") && hands_r[i].includes("K") 
                && hands_r[i].includes("J") && hands_r[i].includes("10")){
                    points[i] += 300;   
                    console.log(`Royal Flush`);
                }
                //Straight flush
                else if(hands_r[i].includes("10") && hands_r[i].includes("9") && hands_r[i].includes("8") 
                && hands_r[i].includes("7") && hands_r[i].includes("6")){
                    points[i] += 250;
                    console.log(`Straight Flush Player`);
                    
                } 
                //Flush
                else{
                    points[i] += 65;
                    console.log(`Flush`);
                }
            }
            //Differents Suits ------------------------------------------------------ 
            //Straight
            else if(flag_rf == false && hands_r[i].includes("10") && hands_r[i].includes("9") && hands_r[i].includes("8") && hands_r[i].includes("7") && hands_r[i].includes("6")){
                points[i] += 100;
                flag_s = true;
                console.log(`Straight`);
            } 
            else if(flag_rf == false){
                //Splits the cards into objects, so it can counts how many incidences of a same card
                //can occur. 
                let count_fh = 0; 
                hands_r[i].forEach(l => counts[l] = (counts[l]||0)+1);
                tempArr_p.push(counts);
                counts = {};
                let arr = Object.entries(tempArr_p[i]);

                for(let m = 0; m<arr.length; m++){
                    if(arr[m][1] == 4)
                    {
                        //Poker
                        points[i]+= 160;
                        points[i]+= 4*(eval_r(arr[m][0]));
                        flag_poke = true;
                        console.log("Poker")
                    }
                    else if(arr[m][1]==3)
                    {
                        //Three of a kind
                        count_t += 1;
                        count_fh += 1;
                        points[i] += 60
                        points[i]+= 3*(eval_r(arr[m][0]));
                        flag_three = true;
                        console.log("Three of a kind")
                    }
                    else if(arr[m][1] == 2)
                    {
                        //One Pair
                        count_p += 1;
                        count_fh += 1;
                        points[i] += 15
                        points[i]+= 2*(eval_r(arr[m][0]));
                        flag_pair = true;
                        console.log("One Pair")
                    }
                    else if(flag_pok == false && flag_three == false && flag_pair == false)
                    {
                        points[i]+=(eval_r(arr[m][0]))/10;
                    }

                    if(count_p == 2){
                        console.log("two_pairs")
                    }
                    if(count_fh ==2 && count_t>=1){
                        //Full House
                        console.log("Full House");
                        points[i] += 10;
                    }

                }//End of pair and threes
                count_p = 0;
                count_t = 0;
                count_fh = 0;
                flag_pair = false;
                flag_pok = false;
                flag_three = false;
                flag_rf = false;
                
            }
            console.log(`Player ${i}: `,points[i]);
            i++
        }//End of while for winner hand
        let pw = points.indexOf(Math.max(...points));
        console.log(`Player wins ${this._players[pw]._user}, Score:`, Math.max(...points));
        return pw;

    }//End of Winner Hand

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

//Function used in winner hand, depending of the coincidence returns a value
//so it can be added to the current user score and can determine who
//the winner is. 
function eval_r(rank_p){
    let total = 0;

    switch(rank_p){
        case "A":
            total += 13;
            break;
        case "K":
            total += 12;
            break;
        case "Q":
            total += 11;
            break;
        case "J":
            total += 10;
            break;
        case "10":
            total += 9;
            break;
        case "9":
            total += 8;
            break;
        case "8":
            total += 7;
            break;
        case "7":
            total += 6;
            break;
        case "6":
            total += 5;
            break;
        case "5":
            total += 4;
            break;
        case "4":
            total += 3;
            break;
        case "3":
            total += 2;
            break;
        case "2":
            total += 1;
            break;
        default:
            total = 0;
    }

    return total

}//End of eval_r

