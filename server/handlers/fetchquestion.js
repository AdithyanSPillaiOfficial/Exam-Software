const { ObjectId } = require('mongodb');
const getans = require('../utilities/getans');

module.exports = async function (req, res) {
    const database = require('../connector')
    const collectionName = "examdetails";
    const collection = database.collection(collectionName);
    const questionCollectionName = 'questions';
    const questionCollection = database.collection(questionCollectionName);
    const verifysession = require('../utilities/varifysession');


    var exams = [];
    const session = await verifysession(req.body.sessionid);
    if (session.sucess) {

        try {
            const cursor = await collection.find({ name: session.data.exam });
            exams = await cursor.toArray();
            if (exams.length == 1) {
                if (exams[0].status == 'ongoing') {
                    const questionCursor = await questionCollection.find({ _id: new ObjectId(exams[0].questioncode) });
                    const questionsArray = await questionCursor.toArray();
                    if(questionsArray.length==1){
                        const questions = questionsArray[0].questions
                        // const answers = getans(req.body.sessionid);
                        // if(answers!=false){
                        //     questions.forEach((question, index) => {
                        //         if(answers[index]){
                        //             question.answer = answers[index];
                        //         }
                        //     });
                        // }
                        res.json({'status' : 'OK', questions : questions, totalSections : exams[0].totalsections});
                    }
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