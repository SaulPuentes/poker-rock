import collection from '@database/collections/games';
import Game from '@models/Game';

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
    // update map to model TODO - Movement model
    const movement = {
        player: req.body.player,
        movement: req.body.movement,
        bet: req.body.bet
    }
    game.movements.push(movement);
    // update call
    const updated = await collection.update(game);
    // send response
    if(updated) {
        return res.status(204).json({});
    } else {
        return res.status(400).json({});
    }
}
