import { MongoClient, ObjectID } from 'mongodb'

export default async function connection() {
    const baseUrl = "mongodb+srv://poker-rock-master:j3T1bIQ2T6oWiOh5@poker-rock.scwog.mongodb.net/poker-rock";
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
