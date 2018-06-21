class Message {

    constructor(request){
        this.msgToClient = {
            to: request.to,
            from: process.env.DONT_REPLY_EMAIL, // TODO: Change domain name
            // subject: "Sending with SendGrid is Fun",
            // text: "and easy to do anywhere, even with Node.js",
            // html: "<strong>Yeeessss</strong>",
            // templateId: "a09e0e42-eab7-4141-9142-3d6e1e2ff3fe",
            reply_to: process.env.OWNER_EMAIL,
            substitutions: {
                name: request.to.split("@")[0]
            }
        };
        this.msgToOwner = {
            from: process.env.DONT_REPLY_EMAIL,
            to: process.env.OWNER_EMAIL
        };
        this.request = request;
    }

    getMessageForClient(){
        switch (this.request.type){
            // For Newsletter Subscription
            case "0":
                this.msgToClient.subject = "Newsletter Subscription";
                this.msgToClient.text = "You have been successfully registered to our newsletter.";
                this.msgToClient.html = "<div style='text-align: center; color: cadetblue;'>You have been successfully registered to our newsletter.</div>";
                this.msgToClient.templateId = process.env.NEWSLETTER_SUBSCRIPTION_TEMPLATE_ID;
                return this.msgToClient;
            // For Craft Acknowledgement
            case "1":
                this.msgToClient.subject = "Acknowledgement";
                this.msgToClient.text = "We have received your craft, will get back to you soon.";
                this.msgToClient.html = "<div style='text-align: center; color: cadetblue;'>We have received your craft, will get back to you soon.</div>";
                this.msgToClient.templateId = process.env.CRAFT_ACKNOWLEDGEMENT_TEMPLATE_ID;
                return this.msgToClient;
        }
    }

    getMessageForOwner(){
        switch (this.request.type){
            // For Newsletter Subscription
            case "0":
                this.msgToOwner.subject = "New Subscriber";
                this.msgToOwner.text = "You have a new subscriber";
                this.msgToOwner.html = "<div style='text-align: center; color: cadetblue;'>You have a new subscriber</div>";
                this.msgToOwner.templateId = process.env.OWNER_TEMPLATE_ID;
                return this.msgToOwner;
            // For Craft Acknowledgement
            case "1":
                this.msgToOwner.subject = "New Craft";
                this.msgToOwner.text = "You have a new craft request";
                this.msgToOwner.html = "<div style='text-align: center; color: cadetblue;'>You have a new craft request</div>";
                this.msgToOwner.templateId = process.env.OWNER_TEMPLATE_ID;
                return this.msgToOwner;
        }
    }
}

module.exports = Message;