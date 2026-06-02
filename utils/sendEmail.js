const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (subject, text) => {

    const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.EMAIL_USER,
        subject: subject,
        text: text
    });

    return response;

};

module.exports = sendEmail;