const { ObjectId } = require('mongodb');

module.exports = async function (req, res) {
    database = require('../../connector')
    const collectionName = "examdetails";
    const collection = database.collection(collectionName); 

    try {
        const cursor = await collection.find({ createdby: new ObjectId(req.body.userid) });
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