import CardComponent from '../../components/card';
import Deck from '../../../models/Deck';
import Table from '../../../models/Table';
import React from 'react';
import Image from 'next/image'

export default function Dummy(){
    const deck = new Deck();
    const cards = [];
    let count = 0; 

    const table = new Table();
    console.log(table._cards);

    // Original Set up
    /*
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

*/
//Original Setup
    
//Dummy Test for the setup of the table ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
return <>
        <h2>Table Cards</h2>
        <table>
            {
                
                table._cards.map((i,j) =>
                    <th key={j}><Image src ={i.path} width={60} height={120}/></th>
                )
            }
        </table>

        <h2>Player Cards</h2>
        <table>

            {  
                table._players.map( (element,index) => element._cards.map((i,j) => 
                <th key={j}><p>{table._players[index]._user}</p><Image src ={i.path} width={60} height={120}/></th>
                ))
            }

        </table>
</>
//Dummy Test for the setup of the table +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}//End of Dummy