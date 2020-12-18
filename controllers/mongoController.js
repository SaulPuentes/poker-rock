import { MongoClient, ObjectID } from 'mongodb'

export default async function connection() {
    const baseUrl = process.env.DATABASE;
    const client = await MongoClient.connect(baseUrl);
    const database = client.db('Poker-Rock');
    return {
        database: database,
        collections: {
            users: database.collection('Users'),
            games: database.collection('Games')
        },
        ObjectID: ObjectID
    };
};
