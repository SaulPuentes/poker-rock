import connection from '@database/connection';

const handleError = (e) => {
    // TODO - handle database error
    // every call to a method in mongo.collection.users will most likely return a promise
    // when awaited, the returned value is the promise resolved value, but when the promise is rejected
    // the return value is undefined.
    // furthermore, if an error is triggered inside the method call, this will bubble up to our
    // call in that method. This can be handled by i.e.
    // mongo.collection.users.insertOne(game).catch(handleError)
}

export const onCreate = async (user) => {
    const mongo = await connection();
    const result = await mongo.collections.users.insertOne(user);
    user.id = result.insertedId;
    return result.insertedCount == 1;
}

export const onRead = async (user) => {
    const mongo = await connection();
    if(mongo.ObjectID.isValid(user.id)) {
        const filter = { _id: mongo.ObjectID(user.id) };
        const result = await mongo.collections.users.findOne(filter);
        if(result != undefined) {
            user.name = result._name;
            user.score = result._score;
            return true;
        }
    }
    return false;
}

export const onUpdate = async (user) => {
    const mongo = await connection();
    const filter = { _id: mongo.ObjectID(user.id) };
    if(mongo.ObjectID.isValid(user.id)) {
        // HACK - This is untested, and possibly causes an error
        const result = await mongo.collections.users.findOneAndUpdate(filter, user);
        return result != undefined;
    }
    return false;
}

export const onDelete = async (user) => {
    const mongo = await connection();
    if(mongo.ObjectID.isValid(user.id)) {
        const filter = { _id: mongo.ObjectID(user.id) };
        const result = await mongo.collections.users.deleteOne(filter);
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
