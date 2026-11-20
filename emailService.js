import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendEmailToManager(subject, messageContent) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.MANAGER_EMAIL,
        subject: subject,
        text: messageContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
}