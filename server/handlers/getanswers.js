module.exports = async function (req, res) {
    const database = require('../connector')
    const collectionName = "answersheet";
    const collection = database.collection(collectionName);
    const verifysession = require('../utilities/varifysession');


    var answersheets = [];
    const session = await verifysession(req.body.sessionid);
    if (session.sucess) {

        try {
            const cursor = await collection.find({ regno: session.data.regno });
            answersheets = await cursor.toArray();
            if (answersheets.length == 1) {
                res.json({status : 'OK', answers : answersheets[0].answers}) 
            }
            else {
                res.json({ 'status': 'ERROR'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'status': 'ERROR'});
        }
    }
    else {
        res.json({ 'status': 'Auth Failed' });
    }
}