module.exports = async function (req, res) {
    const database = require('../connector')
    const collectionName = "answersheet";
    const collection = database.collection(collectionName);
    const verifysession = require('../utilities/varifysession');


    var exams = [];
    const session = await verifysession(req.body.sessionid);
    if (session.sucess) {

        try {
            const filter = { regno : session.data.regno }; // The filter to select the document to update
            const update = {
                $set: { [`answers.${req.body.section}.${req.body.index}`]: req.body.answer } // Update the element at index 2 of the array
            };
            const options = { upsert: true };

            const result = await collection.updateOne(filter, update, options);

            console.log(`${result.matchedCount} document(s) matched the filter, upserted ${result.upsertedCount} document(s)`);

            res.json({status : 'OK'});
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'status': 'ERROR', 'error': error });
        }
    }
    else {
        res.json({ 'status': 'Auth Failed' });
    }
}