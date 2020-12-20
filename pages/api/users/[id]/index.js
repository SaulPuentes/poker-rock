import collection from '@database/collections/users';
import User from '@models/User';

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
    const user = new User();
    user.id = req.query.id;
    // database call
    const readed = await collection.read(user);
    // send response
    if(readed) {
        return res.status(200).json(user);
    } else {
        return res.status(404).json({});
    }
}

const DELETE = async (req, res) => {
    // map to model
    const user = new User();
    user.id = req.query.id;
    // database call
    const deleted = await collection.delete(user);
    // send response
    if(deleted) {
        return res.status(204).json({});
    } else {
        return res.status(404).json({});
    }
}
