const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, html }) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD, // App Password required
        },
    });

    await transporter.sendMail({
        from: `"Collab" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
}

module.exports = sendEmail;  // <-- IMPORTANT
    