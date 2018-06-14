const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const sendgrid = require("./sendgrid.js");
const messageBuilder = require("./message");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/notify", async (req, res) => {
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
});

app.use("/", async (req, res) => {
    res.send("You are not authorized!!");
});

module.exports.handler = serverless(app);