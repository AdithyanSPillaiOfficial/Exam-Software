const { ObjectId } = require('mongodb');
const varifysession = require('../../utilities/varifysession');

module.exports = async function (req, res) {
    database = require('../../connector')
    const collectionName = "examdetails";
    const collection = database.collection(collectionName); 

    const sessionCollectionName = "adminsessions";
    const sessionCollection = database.collection(sessionCollectionName);

    try {
        const user = await sessionCollection.find({_id : new ObjectId(req.body.sessionid)}).toArray();
        if (user.length != 1) {
            res.json({ 'status': 'failed', message : "Session Not found" });
            return;
        }
        console.log("Session Verify : ", user[0]);

        const cursor = await collection.find({ createdby: user[0].userid });
        const exams = await cursor.toArray();
        if (exams.length > 0) {
            res.json({ "status": "OK", "exams": exams })
        } else {
            res.json({ 'status': 'Could Not Find an Exam' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status : 'failed', 'Error': error });
    }

}