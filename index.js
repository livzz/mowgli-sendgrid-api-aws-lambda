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
        const result = await sendgrid.send(msgBuilder.getMessage());
        if (result) {
            console.log("Success: ",result);
            response.error = null;
            response.message = result;
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


