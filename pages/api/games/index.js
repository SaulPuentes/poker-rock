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
    // map to model
    const game = new Game();
    for (const player of req.body.players) {
        game.players.push(player);
    }
    // database call
    const created = await collection.create(game);
    // send response
    if(created) {
        return res.status(201).json(game);
    } else {
        return res.status(400).json(game);
    }
}
