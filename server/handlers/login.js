const { ObjectId } = require('mongodb');

module.exports = async function (req, res) {
    const database = require('../connector')
    const collectionName = "candidates";
    const collection = database.collection(collectionName);

    const sessionCollectionName = 'sessions';
    const sessionCollection = database.collection(sessionCollectionName);

    const answerSheetCollectionName = 'answersheet';
    const answerSheetCollection = database.collection(answerSheetCollectionName);

    const examCollectionName = 'examdetails';
    const examCollection = database.collection(examCollectionName);

    var users = [];

    try {
        const cursor = await collection.find({ regno: req.body.username, password: req.body.password });
        users = await cursor.toArray();
        if (users.length == 1) {
            if (users[0].submitted) {
                res.json({ 'status': 'Authentication Failed' });
            }
            else {
                const currentISOTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                const currentYear = new Date().getFullYear();

                const exam = await examCollection.findOne({ _id: new ObjectId(users[0].examid) });
                console.log("Exam Details : ", exam);

                const existingSessions = await sessionCollection.find({ regno: req.body.username }).toArray();
                console.log("Existing Sessions : ", req.body, existingSessions);
                if (existingSessions.length > 0) {
                    const loginTime = existingSessions[0].login_time;
                    const loginTimestamp = new Date(loginTime);

                    const now = new Date(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
                    const duration = existingSessions[0].duration;

                    diff = now - loginTimestamp;
                    const diffInMinutes = Math.floor(diff / (1000 * 60));

                    if (diffInMinutes > duration) {
                        res.json({ 'status': 'Exam Time Finished', statuscode : 'ETF' });
                    }
                    else {
                        const userdetails = {
                            regno: req.body.username,
                            name: existingSessions[0].name,
                            sysname: req.body.sysname,
                            exam: existingSessions[0].exam,
                            sessionid: existingSessions[0]._id,
                            duration: existingSessions[0].duration,
                            timeleft: duration - diffInMinutes
                        }
                        res.json({ 'status': 'OK', 'sessionid': existingSessions[0]._id, 'userdetails': userdetails })
                    }
                }
                else {

                    console.log("Login Request from the user : " + req.body.username);
                    const insertResult = await sessionCollection.insertOne({
                        'regno': req.body.username,
                        'name': users[0].name,
                        'sysname': req.body.sysname,
                        'exam': users[0].exam,
                        'examid': users[0].examid,
                        'duration': exam.time,
                        'login_time': currentISOTime
                    });

                    const userdetails = {
                        'regno': req.body.username,
                        'name': users[0].name,
                        'sysname': req.body.sysname,
                        'exam': users[0].exam,
                        'sessionid': insertResult.insertedId,
                        'duration': exam.time,
                        'timeleft': parseInt(exam.time)
                    }

                    // Document to be inserted
                    // Define unique index on regno field
                    await answerSheetCollection.createIndex({ regno: 1 }, { unique: true });

                    // Document to be inserted or updated
                    const doc = { regno: users[0].regno, answers: [[null], [null], [null]] };

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
        }
        else {

            res.json({ 'status': 'Authentication Failed' });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': error });
    }
}