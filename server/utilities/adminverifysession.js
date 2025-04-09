const { ObjectId } = require('mongodb');

module.exports = async function (sessionId) {
    const database = require('../connector')
    const collectionName = "adminsessions";
    const sessionCollection = database.collection(collectionName);
    const user = await sessionCollection.find({ _id: new ObjectId(sessionId) }).toArray();
    if (user.length != 1) {
        return({ 'status': 'failed', message: "Session Not found" });
    }
    else {
        return({ 'status': 'OK', message: "Session Found", data : user[0] });
    }
}