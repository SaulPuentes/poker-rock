import Table from '../../models/Table';
import Card from '../../models/Card';
import Deck from '../../models/Deck';
import Player from '../../models/Player';
import React from 'react';
import Image from 'next/image'

export default function Dummy(){

    const deck = new Deck();
    const card = new Card();
    const table = new Table();
    const player = new Player();

    console.log("table", table._cards);
    console.log("table_1", table._cards[0]._img)
    console.log(deck.count);
    //console.log("deck",deck._cards);
    console.log("one",deck._cards[5]._img);
    //console.log(deck.nextCard());
    console.log("shuffle", deck.shuffle());
    //const path = '../../PNG/3S.png'
    const path = deck._cards[6]._img;
    //<Image src ={table._cards[0]._img} width = {60} height = {100} />
    //<Image src ={path} width={60} height={100}/>

    //console.log("player",table._players._cards)

    console.log("table players", table._players);

    return<>
        <h2>Table Cards</h2>
        <table>
            {
                table._cards.map((i,j) =>
                    <th key={j}><Image src ={i._img} width={60} height={120}/></th>
                )
            }
        </table>


        <h2>Player Cards</h2>
        <table>

            {  
                table._players.map( (element,index) => element._cards.map((i,j) => 
                <th key={j}><p>{table._players[index]._user}</p><Image src ={i._img} width={60} height={120}/></th>
                ))
            }

        </table>
        




    </>
    //End of return/render()



}//End of Dummy


/*




        <p>Player 1 Cards</p>
        <ul>
            {
                table._players[0]._cards.map((i,j) =>
                    <li key={j}><Image src ={i._img} width={60} height={120}/></li>
                )
            }
        </ul>

        <p>Player 2 Cards</p>
        <ul>
            {
                table._players[1]._cards.map((i,j) =>
                    <li key={j}><Image src ={i._img} width={60} height={120}/></li>
                )
            }
        </ul>

        <>Player 3 Cards</>
        <ul>
            {
                table._players[2]._cards.map((i,j) =>
                    <li key={j}><Image src ={i._img} width={60} height={120}/></li>
                )
            }
        </ul>



*/