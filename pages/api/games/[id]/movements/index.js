import collection from '@database/collections/games';
import { pusher } from '@util/pusher'
import gameEnds from '@util/gameEnds'
import winnerHand from '@util/winnerHand'
import handleTurnEnd from '@util/handleTurnEnd'

export default async function handler(req, res) {
    switch(req.method) {
        case 'POST':
            return POST(req, res);
        default:
            return res.status(405).json({error: 'Method not found'});
    }
}

const POST = async (req, res) => {
    // read call
    const game = await collection.read(req.query);
    
    // send response?
    if(!game) {
        return res.status(404).json(game);
    }

    // update map to model TODO - Movement model
    const movement = {
        player: req.body.player,
        movement: req.body.movement,
        bet: req.body.bet
    }                                     

    game._movements.push(movement);
    
    // save last move in game players
    game.table._players.forEach(player => {
        if(player._user === movement.player)
            player._lastMove = movement.movement
    });

    if(!gameEnds(game.table)) {
        game.table = handleTurnEnd(game.table, movement);
    } else {
        const { _cards, _players } = game.table;
        game.table._winner = winnerHand(_cards, _players);
    }

    // update in mongoDB
    const updated = await collection.update(game);
    // update in pusher channel
    pusher.trigger('poker-rock', 'new-movement', game._movements)

    if(updated) {
        return res.status(204).json({});
    } else {
        return res.status(400).json({});
    }

}