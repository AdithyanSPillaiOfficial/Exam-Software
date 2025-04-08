const { ObjectId } = require('mongodb');
const getans = require('../../utilities/getans');

module.exports = async function (req, res) {
    const database = require('../../connector')
    const collectionName = "examdetails";
    const collection = database.collection(collectionName);
    const questionCollectionName = 'questions';
    const questionCollection = database.collection(questionCollectionName);
    const sessionCollectionName = "adminsessions";
    const sessionCollection = database.collection(sessionCollectionName);
    const verifysession = require('../../utilities/varifysession');


    var exams = [];
    const user = await sessionCollection.find({ _id: new ObjectId(req.body.sessionid) }).toArray();
    if (user.length != 1) {
        res.json({ 'status': 'failed', message: "Session Not found" });
        return;
    }
    console.log("Session Verify : ", user[0]);
    const examId = req.body.examid;
    if (user.length == 1) {

        try {
            const cursor = await collection.find({ _id: new ObjectId(examId) });
            exams = await cursor.toArray();
            if (exams.length == 1 && exams[0].createdby.toString() == user[0].userid.toString()) {

                const questionCursor = await questionCollection.find({ _id: new ObjectId(exams[0].questioncode) });
                const questionsArray = await questionCursor.toArray();
                if (questionsArray.length == 1) {
                    const questions = questionsArray[0].questions
                    const answers = await getans(req.body.sessionid);
                    if (answers != false) {
                        questions.forEach((section, sectionIndex) => {
                            section.forEach((question, index) => {
                                if (answers[sectionIndex] && (typeof answers[sectionIndex][index] != 'undefined' && answers[sectionIndex][index] != null)) {
                                    question.answer = answers[sectionIndex][index];
                                    question.answered = true;
                                }
                            });
                        });
                    }
                    res.json({ 'status': 'OK', questions: questions, totalSections: exams[0].totalsections });
                }
            }
            else {
                res.json({ 'status': 'ERROR' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'status': 'ERROR', 'error': error });
        }
    }
    else {
        res.json({ 'status': 'Auth Failed' });
    }
}