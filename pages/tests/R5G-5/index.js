import CardComponent from '../../components/card';
import Deck from '../../../models/Deck';
import React from 'react';

export default function Dummy(){
    const deck = new Deck();
    const cards = [];
    let count = 0; 
    for(let i = deck.count; i > 0; i--) {
        let card = deck.nextCard();
        let component = <CardComponent rank={card.rank} suit={card.suit} />
        cards.push(component);
        count++;
        if(count == 4) {
            cards.push(<br/>);
            count = 0 ;
        }
    };
    
    return(
        <div>
            {cards}
        </div>
    );

}