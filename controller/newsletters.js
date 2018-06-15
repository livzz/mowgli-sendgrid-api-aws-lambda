const sendgrid = require('../util/sendgrid');

exports.main = async (req, res) => {
    let response = {
        error: "Sending email Failed!!",
        message: null
    };
    try {
        let result = await sendgrid.send(req.body);
        response.message = result;
        response.error = null;
        console.log("Success: ", result);
    } catch (e) {
        response.message = e;
    }
    res.json(response);
};