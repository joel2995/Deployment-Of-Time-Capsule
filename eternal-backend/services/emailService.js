const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendCapsuleUnlockNotification = async (email, capsule) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Time Capsule is Unlocked! 🎉",
        text: `Hey! Your capsule "${capsule.name}" is now unlocked! Open it now: http://yourdomain.com/capsule/${capsule._id}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
