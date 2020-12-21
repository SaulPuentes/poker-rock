import collection from '@database/collections/games';
import Game from '@models/Game';

export default async function handler(req, res) {
    switch(req.method) {
        case 'GET':
            return GET(req, res);
        case 'DELETE':
            return DELETE(req, res);
        default:
            return res.status(405).json({error: 'Method not found'});
    }
}

const GET = async (req, res) => {
    // map to model
    const game = new Game();
    game.id = req.query.id;
    // database call
    const readed = await collection.read(game);
    // send response
    if(readed) {
        return res.status(200).json(readed);
    } else {
        return res.status(404).json(game);
    }
}

const DELETE = async (req, res) => {
    // map to model
    const game = new Game();
    game.id = req.query.id;
    // database call
    const deleted = await collection.delete(game);
    // send response
    if(deleted) {
        return res.status(200).json(game);
    } else {
        return res.status(404).json(game);
    }
}
