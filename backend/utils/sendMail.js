const nodemailer = require("nodemailer")
require('dotenv').config(); 

// setting up mailing through nodemailer transport
const transporter = nodemailer.createTransport({
    service :"gmail",
    auth :{user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS},
})

const sendMail = async (email, subject, otp) =>{
    //  email template
    const mailOptions ={
        from: `Reset Manager <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: `<div style="font-family: Arial, sans-serif; text-align: center; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: #333;">Password Reset Code</h2>
                <p>Use the following OTP to reset your password.</p>
                <h1 style="color: #007bff; letter-spacing: 5px;">${otp}</h1>
                <p>If you didn't request this, please ignore this email.</p>
            </div>`,
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("Email sent successfully to:", email)
    } catch (error) {
        console.error("Email Error:", error)
        // We throw the error so the Express route knows it failed
        throw new Error("Failed to send email");
    }
}

module.exports = sendMail