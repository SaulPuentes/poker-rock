import collection from '@database/collections/games';
import Game from '@models/Game';

import Table from '@models/Table';

export default async function handler(req, res) {
    switch(req.method) {
        case 'POST':
            return POST(req, res);
        default:
            return res.status(405).json({error: 'Method not found'});
    }
}

const POST = async (req, res) => {
    
    // read map to model
    const game = new Game();
    game.id = req.query.id;
    
    // read call
    const readed = await collection.read(game);
    
    // send response?
    if(!readed) {
        return res.status(404).json(game);
    }
    console.log('readed: ', readed);

    // update map to model TODO - Movement model
    const movement = {
        player: req.body.player,
        movement: req.body.movement,
        bet: req.body.bet
    }
    game.movements.push(movement);
    
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   
    console.log("DATA DUMMY +++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
    
    const table = new Table(game.players);
    
    const newGame = {
        ...game,
        table
    }
    
    //const newGame = readed;

    const newCard = {
        _suit: "H",
        _rank: "10"
    }

    console.log("newGame", newGame);
    
        
        
        if(game._movements[game._movements.length -1].movement == "fold"){
            //newGame.table._cards.push(newCard);
        }
        else if(game._movements[game._movements.length -1].movement == "raise"){
            //Next player
        }
        else if(game._movements[game._movements.length -1].movement == "call"){
            //Equals bet
        }
        

    console.log("\n DATA DUMMY +++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
   

    
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // update call
    const updated = await collection.update(game);
    //const updatedCard = await collection.update(newGame);
    // send response
    if(updated) {
        return res.status(204).json({});
    } else {
        return res.status(400).json({});
    }

}//End of POST












//-------------------------------------------------------------------------------------------------------------------------------
/*
import collection from '@database/collections/games';
import Game from '@models/Game';

import Table from '@models/Table'
import Card from '@models/Card'

export default async function handler(req, res) {
    switch(req.method) {
        case 'POST':
            return POST(req, res);
        default:
            return res.status(405).json({error: 'Method not found'});
    }
}

const POST = async (req, res) => {
    
    // read map to model
    const game = new Game();
    game.id = req.query.id;
    
    // read call
    const readed = await collection.read(game);
    
    // send response
    if(!readed) {
        return res.status(404).json(game);
    }
    console.log('readed: ', readed);
    
    // update map to model TODO - Movement model
    const movement = {
        player: req.body.player,
        movement: req.body.movement,
        bet: req.body.bet
    }
    game.movements.push(movement);



    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   
    /*
    const table = new Table(game.players);
    
    //const newGame = {
    //    ...game,
    //    table
    //}
    
    const newGame = readed;

    const newCard = {
        _suit: "H",
        _rank: "10"
    }


        console.log("DATA DUMMY +++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
        
        if(game._movements[game._movements.length -1].movement == "fold"){
            //newGame.table._cards.push(newCard);
        }
        else if(game._movements[game._movements.length -1].movement == "raise"){
            //Next player
        }
        else if(game._movements[game._movements.length -1].movement == "call"){
            //Equals bet
        }
        

        console.log("\n DATA DUMMY +++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
   

    console.log('newGame: ', newGame);
    */
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
    // update call
    const updated = await collection.update(game);
    //const updatedCard = await collection.update(newGame);
    
    // send response
    if(updated) {
        return res.status(204).json({});
    } else {
        return res.status(400).json({});
    }


    
}//End of POST

*/