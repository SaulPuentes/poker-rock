import { MongoClient, ObjectID } from 'mongodb'

export default async function connection() {
    
    //Use environmental variables to access the database.
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

};//End of connection
