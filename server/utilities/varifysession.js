const { ObjectId } = require('mongodb');

module.exports = async function (sessionId) {
    const database = require('../connector')
    const collectionName = "sessions";
    const collection = database.collection(collectionName);


    var sessions = [];

    try {
        const cursor = await collection.find({ _id: new ObjectId(sessionId) });
        sessions = await cursor.toArray();
        if (sessions.length == 1) {
            if(sessions[0].submitted) {
                return({sucess : false, message : 'Exam Already Submitted'})
            }
            const loginTime = sessions[0].login_time;
            const loginTimestamp = new Date(loginTime);

            const now = new Date(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
            const duration = sessions[0].duration;

            diff = now - loginTimestamp;
            const diffInMinutes = Math.floor(diff / (1000 * 60));

            if(diffInMinutes > duration) {
                return({sucess : false, message : 'Session Expired'})
            }

            return({sucess : true, data : sessions[0]})
        }
        else {
            return({sucess : false})
        }
    } catch (error) {
        console.log(error);
        return({sucess : false});
    }
}