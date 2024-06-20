const { ObjectId } = require('mongodb');

module.exports = async function (sessionId) {
    const database = require('../connector')
    const collectionName = "sessions";
    const collection = database.collection(collectionName);


    var sessions = [];

    try {
        const cursor = await collection.find({ _id: new ObjectId(sessionId) });
        sessions = await cursor.toArray();
        if (sessions.length == 1) {
            return({sucess : true, data : sessions[0]})
        }
        else {
            return({sucess : false})
        }
    } catch (error) {
        console.log(error);
        return({sucess : false});
    }
}