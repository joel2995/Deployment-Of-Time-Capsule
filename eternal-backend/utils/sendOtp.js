const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // Add these settings to improve deliverability
    tls: {
        rejectUnauthorized: false
    },
    secure: true
});

const sendOtp = async (email, otp) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Eternal Vault - OTP Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <tr>
                                <td style="padding: 40px 30px; text-align: center;">
                                    <h1 style="color: #333333; font-size: 24px; margin: 0;">Eternal Vault</h1>
                                    <p style="color: #666666; font-size: 16px; margin: 20px 0;">Secure OTP Verification</p>
                                    <div style="background-color: #2d2d2d; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                        <p style="color: #ffd700; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 4px;">${otp}</p>
                                    </div>
                                    <p style="color: #666666; font-size: 14px; margin: 20px 0;">This OTP will expire in 5 minutes.</p>
                                    <p style="color: #666666; font-size: 14px;">For security reasons, please don't share this OTP with anyone.</p>
                                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                                        <p style="color: #999999; font-size: 12px; margin: 0;">This is an automated message from Eternal Vault.</p>
                                        <p style="color: #999999; font-size: 12px; margin: 5px 0;">© ${new Date().getFullYear()} Eternal Vault. All rights reserved.</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "Eternal Vault",
            address: process.env.EMAIL_USER
        },
        to: email,
        subject: "Your Secure OTP for Eternal Vault",
        html: htmlContent,
        headers: {
            'Priority': 'High',
            'X-Mailer': 'Eternal Vault Secure Mailer'
        }
    };

    try {
        await transporter.verify(); // Verify connection configuration
        const info = await transporter.sendMail(mailOptions);
        //console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
       //  console.error('Email sending failed:', error);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = sendOtp;
