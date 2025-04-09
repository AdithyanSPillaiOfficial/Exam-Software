const { ObjectId } = require('mongodb');
const adminverifysession = require('../../utilities/adminverifysession');

module.exports = async function (req,res) {
    const database = require('../../connector')
    const collectionName = "examdetails";
    const collection = database.collection(collectionName);

    console.log("Request Received for Editing Exam : ", req.body);

    const responce = await adminverifysession(req.body.sessionid);
    if (responce.status != 'OK') {
        res.json({ 'status': 'failed', message: "Session Not found" });
        return;
    }
    const user = responce.data;
    const exam = req.body.exam;

    const examDetails = await collection.find({ _id: new ObjectId(exam._id) }).toArray();
    if (examDetails.length != 1) {
        res.json({ 'status': 'failed', message: "Exam Not found" });
        return;
    }
    else if(examDetails[0].createdby.toString() != user.userid.toString()) {
        res.json({ 'status': 'failed', message: "You are not allowed to edit this exam" });
        return;
    }
    else {
        try {
            const examId = exam._id;
            delete exam._id;
            delete exam.createdby;
            delete exam.questioncode;
            const result = await collection.updateOne({ _id: new ObjectId(examId) }, { $set: exam });
            if (result.modifiedCount == 1) {
                res.json({ 'status': 'OK', message: "Exam updated successfully" });
            }
            else {
                res.json({ 'status': 'failed', message: "Could not update exam" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'status': 'ERROR', 'error': error });
        }
    }
    
}