import connection from './mongoController';
import { conclude } from './utilities';

export const onCreate = async function(game) {
    game = {
        date: new Date(),
        players: game.players,
        movements: []
    };
    const mongo = await connection();
    const promise = mongo.collections.games.insertOne(game);
    const resolution = await conclude(promise);
    return {
        success: resolution.isFulfilled,
        data: Object.assign(game, resolution.data)
    };
};

export const onRead = async function(game) {
    const mongo = await connection();
    const filter = { _id: mongo.ObjectID(game._id) };
    const promise = mongo.collections.games.findOne(filter);
    const resolution = await conclude(promise);
    return {
        success: resolution.isFulfilled,
        data: Object.assign(game, resolution.detail)
    };
};

export const onUpdate = async function(game) {
    // read given game
    const readResult = await onRead({_id: game._id});
    const fullGame = readResult.data;
    // retrieve record/movement to log into db
    const record = {
        movement: game.record.movement,
        player: game.record.player,
        bet: game.record.bet
    };
    // update game object with movement
    fullGame.movements.push(record);
    const update = { $set: { movements: fullGame.movements } };
    const mongo = await connection();
    const filter = { _id: mongo.ObjectID(game._id) };
    const promise = mongo.collections.games.findOneAndUpdate(filter, update);
    const resolution = await conclude(promise);
    return {
        success: resolution.isFulfilled,
        data: Object.assign(game, resolution.detail?.value)
    };
};

export const onDelete = async function(game) {
    // TODO - delete gamee
};
