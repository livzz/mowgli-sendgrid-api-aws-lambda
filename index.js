const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const sendgrid = require("./sendgrid.js");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const msg = {
    to: "alibh@righthemisphere.in",
    from: "dont-reply@droidvue.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>Yeeessss</strong>",
    templateId: "a09e0e42-eab7-4141-9142-3d6e1e2ff3fe",
    substitutions: {
        name: "Yaaaai"
    }
};

app.post("/notify", async (req, res) => {
    let response = {
        error: "Sending email Failed!!",
        message: null
    };
    msg.to = req.body.to;
    try {
        const result = await sendgrid.send(msg);
        if (result) {
            console.log("Success: ",result);
            response.error = null;
            response.message = result;
        }
    } catch (e) {
        response.message = result;
        console.log("Error: ",result);
    }
    res.json(response);
});

app.use("/", async (req, res) => {
    res.send("You are not authorized!!");
});

module.exports.handler = serverless(app);


