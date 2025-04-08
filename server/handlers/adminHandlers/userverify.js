module.exports = async function (req, res) {
    const database = require('../../connector')
    const collectionName = "users";
    const collection = database.collection(collectionName);


    var users = [];

    try {
        const cursor = await collection.find({ username: req.body.username });
        users = await cursor.toArray();
        if (users.length == 1) {
            const userDetails = {
                name: users[0].name,
                organisation: users[0].organisation,
            }
            res.json({ 'status': 'OK', 'userdetails': userDetails })
        }
        else {
            res.json({ 'status': 'Authentication Failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': error });
    }
}