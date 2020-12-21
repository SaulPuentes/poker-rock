import Rank from './Rank';
import Suit from './Suit';
import { useSession } from 'next-auth/client'



/**
 * @class Represents an inmutable card.
 */
export default class Card {

    _suit = undefined;
    _rank = undefined;

    /**
     * @constructor Provides a new inmutable card.
     * @param {Suit} suit The suit/color of the card.
     * @param {Rank} rank The rank/number of the card.
     */
    constructor(suit, rank) {
        this._suit = suit;
        this._rank = rank;
        //this._img = 
        Object.freeze(this);
    }

    /**
     * @description Returns the suit/color of the card.
     * @returns {Suit} The suit of the card
     */
    get suit() {
        return this._suit;
    }

    /**
     * @description Returns the rank/number of the card.
     * @returns {Suit} The rank of the card
     */
    get rank() {
        return this._rank;
    }

    /**
     * @description Returns the path of the card. If the current user is active, they
     * can see their cards, otherwise they will see the backside
     * @returns a String, so it can be called in other parts of the project when
     * in React renders the page. 
     */
    get path() { 
        //TODO - Modify this for the current user.
        const current_user = true;
        const [ session, loading ] = useSession();
    
        // console.log("loading", loading);
        // console.log("Card user", session.user.name);
        
        if(session.user.name){
            return `/img/${this._rank}${this._suit}.jpg`;
        }
        else {
            return `/img/Red_back.jpg`;
        }
        
    }

}
