import collection from '@database/collections/users';
import User from '@models/User';

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
    const user = new User();
    user.name = req.body.username;
    user.password = req.body.password;
    // database call
    const created = await collection.create(user);
    // send response
    if(created) {
        return res.status(201).json(user);
    } else {
        return res.status(400).json(user);
    }
}
