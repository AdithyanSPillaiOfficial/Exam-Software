const verfysession = require('../utilities/varifysession');
module.exports = async function (req,res) {
    const sessionId = req.body.sessionid;

    const sessionObj = await verfysession(sessionId);
    console.log('Session Deails Requested from ', sessionId);
    console.log('Session Details : ', sessionObj);
    if (sessionObj.sucess) {
        res.json({ 'status': 'OK', 'sessiondetails': sessionObj.data });
    }
    else {
        res.json({ 'status': 'Session Expired', 'message' : sessionObj.message });
    }
}