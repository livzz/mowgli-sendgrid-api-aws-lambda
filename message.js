class Message {

    constructor(request){
        this.msgClient = {
            to: request.to,
            from: "dont-reply@mowglitrails.com",
            // subject: "Sending with SendGrid is Fun",
            // text: "and easy to do anywhere, even with Node.js",
            // html: "<strong>Yeeessss</strong>",
            // templateId: "a09e0e42-eab7-4141-9142-3d6e1e2ff3fe",
            // substitutions: {
            //     name: "Yaaaai"
            // }
        };
        this.msgOwner = {
            from: "dont-reply@mowglitrails.com",
        };
        this.request = request;
    }

    getMessage(){
        switch (this.request.type){
            // For Newsletter Subscription
            case "0":
                this.msgClient.subject = "Newsletter Subscription";
                this.msgClient.text = "You have been successfully registered to our newsletter.";
                this.msgClient.html = "<div style='text-align: center; color: cadetblue;'>You have been successfully registered to our newsletter.</div>";
                this.msgClient.templateId = "566dbd06-2a9c-4668-813c-4aa12d52f465";
                return this.msgClient;
            // For Craft Acknowledgement
            case "1":
                this.msgClient.subject = "Acknowledgement";
                this.msgClient.text = "We have received your craft, will get back to you soon.";
                this.msgClient.html = "<div style='text-align: center; color: cadetblue;'>We have received your craft, will get back to you soon.</div>";
                this.msgClient.templateId = "566dbd06-2a9c-4668-813c-4aa12d52f465";
                return this.msgClient;
            case "2":
        }
    }
}

module.exports = Message;