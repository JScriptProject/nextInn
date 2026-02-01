import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();
//create a transport

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});


export const sendOTPEmail = async(email, otp) =>{
    if(!otp || !email){
      throw new Error("Opps OTP Backend having issue. ");
    }
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "NextInn Admin Verification Code",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Admin Verification</h2>
        <p>Your verification code for Super Admin access is:</p>
        <h1 style="color: #ea580c; letter-spacing: 5px;">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `,
    };

    try
    {
        await transporter.sendMail(mailOptions);
        console.log("OTP email sent succesfully!");
    }
    catch(err){
        console.error("Error in sending email:", err);
        throw new Error("Email sending failed!!");
    }
}


