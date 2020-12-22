import connection from '@database/connection';
import { pusher } from '@util/pusher'

const handleError = (e) => {
    // TODO - handle database error
    // every call to a method in mongo.collection.games will most likely return a promise
    // when awaited, the returned value is the promise resolved value, but when the promise is rejected
    // the return value is undefined.
    // furthermore, if an error is triggered inside the method call, this will bubble up to our
    // call in that method. This can be handled by i.e.
    // mongo.collection.games.insertOne(game).catch(handleError)
}

export const onCreate = async(game) => {
    const mongo = await connection();
    const result = await mongo.collections.games.insertOne(game);
    game.id = result.insertedId;
    return result;
}

export const onRead = async(game) => {
    const mongo = await connection();
    if(mongo.ObjectID.isValid(game.id)) {
        const filter = { _id: mongo.ObjectID(game.id) };
        const result = await mongo.collections.games.findOne(filter);
        if(result != undefined) {
            game.players.splice(0, game.players.length);
            console.log(result)
            for (const player of result._players) {
                game.players.push(player);
            }
            game.movements.splice(0, game.movements.length);
            for (const movement of result._movements) {
                game.movements.push(movement);
            }
            return result;
        }
    }
    return false;
}

export const onUpdate = async(game) => {
    const mongo = await connection();
    if(mongo.ObjectID.isValid(game.id)) {
        const filter = { _id: mongo.ObjectID(game.id) };
        // FIXME - Declare update without explicitly specifing the fields to update
        const update = {
            $set: { _players: game.players, _movements: game.movements }
        };
        const result = await mongo.collections.games.findOneAndUpdate(filter, update);
        console.log('result: ', result);
        console.log('game.movements: ', game.movements);
        pusher.trigger('poker-rock', 'new-movement', game.movements)
        return result != undefined;
    }
    return false;
}

export const onDelete = async(game) => {
    const mongo = await connection();
    if(mongo.ObjectID.isValid(game.id)) {
        const filter = { _id: mongo.ObjectID(game.id) };
        const result = await mongo.collections.games.deleteOne(filter);
        return result.deletedCount == 1;
    }
    return false;
}

export default {
    create: onCreate,
    read: onRead,
    update: onUpdate,
    delete: onDelete
}
