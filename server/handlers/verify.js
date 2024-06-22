module.exports = async function (req, res) {
    const database = require('../connector')
    const collectionName = "candidates";
    const collection = database.collection(collectionName);


    var users = [];

    try {
        const cursor = await collection.find({ regno: req.body.username });
        users = await cursor.toArray();
        if (users.length == 1) {
            if (users[0].submitted) {
                res.json({ 'status': 'Exam Already Submitted' });
            }
            else {
                console.log(users[0]);
                const userDetails = {
                    name: users[0].name,
                    exam: users[0].exam,
                }
                res.json({ 'status': 'OK', 'userdetails': userDetails })
            }
        }
        else {
            res.json({ 'status': 'Authentication Failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': error });
    }
}