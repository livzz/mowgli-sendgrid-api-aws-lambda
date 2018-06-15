const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers("{{", "}}");
exports.send = function (msg) {
    return sgMail
        .send(msg);
};