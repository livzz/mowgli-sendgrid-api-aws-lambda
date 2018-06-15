const sendgrid = require('../util/sendgrid');
const messageBuilder = require('../util/message');

exports.main = async (req, res) => {
    let msgBuilder = new messageBuilder(req.body);
    let response = {
        error: "Sending email Failed!!",
        message: null
    };
    try {
        [resultClient, resultOwner] = await Promise.all([sendgrid.send(msgBuilder.getMessageForClient()), sendgrid.send(msgBuilder.getMessageForOwner())]);
        if (resultClient && resultOwner) {
            console.log("Success for Client: ",resultClient);
            console.log("Success for Owner: ",resultOwner);
            response.error = null;
            response.message = resultClient;
        }
    } catch (e) {
        response.message = e;
        console.log("Error: ",e);
    }
    res.json(response);
};