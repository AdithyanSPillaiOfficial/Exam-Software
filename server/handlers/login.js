module.exports = async function (req, res) {
    const database = require('../connector')
    const collectionName = "candidates";
    const collection = database.collection(collectionName);

    const sessionCollectionName = 'sessions';
    const sessionCollection = database.collection(sessionCollectionName);

    const answerSheetCollectionName = 'answersheet';
    const answerSheetCollection = database.collection(answerSheetCollectionName);

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
                console.log("Login Request from the user : " + req.body.username);
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

                // Document to be inserted
                // Define unique index on regno field
                await answerSheetCollection.createIndex({ regno: 1 }, { unique: true });

                // Document to be inserted or updated
                const doc = { regno: users[0].regno, answers: [] };

                // Upsert operation: Insert document if regno does not exist, update if it does
                const filter = { regno: users[0].regno };
                const update = {
                    $setOnInsert: doc // Set the document if inserting
                };
                const options = { upsert: true };

                // Perform the upsert operation
                const result = await answerSheetCollection.updateOne(filter, update, options);;

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