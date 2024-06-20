module.exports = async function (req, res) {
    const database = require('../connector')
    const collectionName = "examdetails";
    const collection = database.collection(collectionName);


    var exams = [];

    try {
        const cursor = await collection.find({ name: req.body.name });
        exams = await cursor.toArray();
        if (exams.length == 1) {
            res.json({"status" : "OK", "examdetails" : exams[0]})
        }
        else {
            res.json({ 'status': 'Could Not Find an Exam' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': error });
    }
}