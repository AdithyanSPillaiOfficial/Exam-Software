module.exports = async function (req, res) {
    const database = require('../../connector')
    const collection = database.collection('users')
    const sessionCollection = database.collection('adminsessions');

    const { username, password } = req.body
    try {
        const user = await collection.find({ username: username, password: password }).toArray()
        if (user.length > 0) {
            const currentISOTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            const insertResult = await sessionCollection.insertOne({name: user[0].name, username: username,organisation : user[0].organisation, login_time: currentISOTime })
            const userdetails = {
                'username': username,
                'name': user[0].name,
                'organisation': user[0].organisation,
                'sessionid': insertResult.insertedId
            }
            res.json({ 'status': 'OK', 'sessionid': insertResult.insertedId, 'userdetails': userdetails })
        }
        else {
            res.json({ 'status': 'NOT OK', message: 'Invalid Username or Password' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'failed', 'error': error });
    }

}