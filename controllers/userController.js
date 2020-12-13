import connection from './mongoController';

export const onCreate = async function(user) {
    user = {
        name: user.name,
        password: user.password,
        score: 5000
    };
    const cleanResult = (result) => result.ops; // TODO - delete password property
    const mongo = await connection();
    return mongo.collections.users.insertOne(user).then(cleanResult); 
}

export const onRead = async function(user) {
    const filter = { name: user.name };
    const cleanResult = (result) => result; // TODO - delete password property
    const mongo = await connection();
    return mongo.collections.users.findOne(filter).then(cleanResult);
}

export const onUpdate = async function(user) {
    const filter = { name: user.name };
    const update = { $set: { score: user.score } };
    console.log(filter);
    const cleanResult = (result) => result.ops; // TODO - delete password property
    const mongo = await connection();
    return mongo.collections.users.findOneAndUpdate(filter, update).then(cleanResult); // FIXME - TypeError: argument entity is required
}

export const onDelete = async function(user) {
    const filter = { name: user.name };
    const mongo = await connection();
    return mongo.collections.users.deleteOne(filter); // FIXME - This is not working
}
