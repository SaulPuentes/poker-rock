import collection from '@database/collections/games';
import { pusher } from '../../../util/pusher'
import Game from '@models/Game';
import Table from '../../../models/Table'


export default async function handler(req, res) {
    switch(req.method) {
        case 'POST':
            return POST(req, res);
        default:
            return res.status(405).json({error: 'Method not found'});
    }
}//End of handler

const POST = async (req, res) => {
    // map to model
    const game = new Game();
    for (const player of req.body.players) {
        game.players.push(player);
    }
    const table = new Table(game.players);
    const newGame = {
        ...game,
        table
    }

    
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    //console.log("gameid",newGame._id);
    //table.shouldAddCard();
    //table.shouldAddCard();
    //const winner = table.winnerHand();
    //console.log(winner);

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    // database call
    const { insertedCount, insertedId } = await collection.create(newGame);
    console.log('BEFORE CREATE');
    pusher.trigger('poker-rock', 'new-game', insertedId)
    
    // send response
    if(insertedCount === 1) {
        return res.status(201).json(newGame);
    } else {
        return res.status(400).json(newGame);
    }

}//End of post
