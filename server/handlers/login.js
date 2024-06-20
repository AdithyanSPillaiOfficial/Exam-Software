module.exports = async function (req, res) {
    const database = require('../connector')
    const collectionName = "candidates";
    const collection = database.collection(collectionName);

    const sessionCollectionName = 'sessions';
    const sessionCollection = database.collection(sessionCollectionName);

    var users = [];

    try {
        const cursor = await collection.find({ regno: req.body.username, password: req.body.password });
        users = await cursor.toArray();
        if (users.length == 1) {
            if (users[0].submitted) {
                res.json({ 'status': 'Exam Already Submitted' });
            }
            else {
                const currentISOTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                const currentYear = new Date().getFullYear();
                console.log("Login Request from the user : "+req.body.username);
                const insertResult = await sessionCollection.insertOne({
                    'regno': req.body.username,
                    'name': users[0].name,
                    'sysname': req.body.sysname,
                    'exam': users[0].exam,
                    'login_time': currentISOTime
                });

                const userdetails = {
                    'regno': req.body.regno,
                    'name': users[0].name,
                    'sysname': req.body.sysname,
                    'exam': users[0].exam,
                    'sessionid': insertResult.insertedId
                }

                res.json({ 'status': 'OK', 'sessionid': insertResult.insertedId, 'userdetails': userdetails })
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