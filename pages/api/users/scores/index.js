import connection from '@database/connection';

export default async function handler(req, res) {
    // intialize params
    const descending = (req.query.descending != undefined)? (req.query.descending == 'true') : true;
    const count = (req.query.count != undefined)? parseInt(req.query.count) : 10;
    // validate
    if(Number.isNaN(count)) {
        return res.status(400).json({});
    }
    // filter
    const filter = { score: ((descending)? -1 : 1) };
    const mongo = await connection();
    const users = await mongo.collections.users.find().sort(filter).limit(count).toArray();
    // send response
    return res.status(200).json(users);
};