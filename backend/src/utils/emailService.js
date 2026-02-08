import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
//create a transport

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  if (!otp || !email) {
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

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent succesfully!");
  } catch (err) {
    console.error("Error in sending email:", err);
    throw new Error("Email sending failed!!");
  }
};

export const sendBookingConfirmation = async (user, booking) => {

  console.log("Performing the email sent!!!");
  // basic validation on place
  if (!user || !booking) {
    console.error("Missing user or booking data for email confirmation.");
    return;
  }

  //format the dates for readability
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const checkInDate = formatDate(booking.checkIn);
  const checkOutDate = formatDate(booking.checkOut);
  console.log("EMail to",user.email);
  console.log("From Email:", process.env.EMAIL_USER);
  const mailOptions = {
    from: `"NextInn Luxury Hotel" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `Booking Confirmed! Reference #${booking._id.toString().slice(-6).toUpperCase()}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; background-color: #f9fafb;">
        
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
           <h1 style="color: #ea580c; margin: 0; font-family: 'Playfair Display', serif; font-size: 28px;">NextInn</h1>
           <p style="color: #e5e7eb; margin: 5px 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Luxury Hotel</p>
        </div>

        <div style="padding: 30px 20px; background-color: #ffffff;">
          <h2 style="color: #111827; margin-top: 0;">Reservation Confirmed</h2>
          <p style="color: #4b5563;">Dear <strong>${user.firstname} ${user.lastname}</strong>,</p>
          <p style="color: #4b5563;">Thank you for choosing NextInn! We are delighted to confirm your stay. Your room has been reserved.</p>
          
          <div style="background-color: #fff7ed; border: 1px solid #fdba74; border-radius: 8px; padding: 20px; margin: 25px 0;">
            
            <h3 style="color: #9a3412; margin-top: 0; border-bottom: 1px solid #fdba74; padding-bottom: 10px;">Booking Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Check-In:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right; color: #1f2937;">${checkInDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Check-Out:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right; color: #1f2937;">${checkOutDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Guests:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right; color: #1f2937;">${booking.guestDetails.adults} Adults, ${booking.guestDetails.children} Children</td>
              </tr>
               <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Rooms:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right; color: #1f2937;">${booking.guestDetails.roomsCount}</td>
              </tr>
            </table>

            <div style="border-top: 1px dashed #fdba74; margin: 15px 0;"></div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; color: #6b7280; font-size: 14px;">Total Amount:</td>
                <td style="padding: 5px 0; font-weight: bold; text-align: right; font-size: 18px; color: #ea580c;">₹${booking.totalAmount}</td>
              </tr>
               <tr>
                <td style="padding: 5px 0; color: #6b7280; font-size: 12px;">Payment Status:</td>
                <td style="padding: 5px 0; text-align: right; font-size: 12px; text-transform: uppercase; font-weight: bold; color: ${booking.paymentStatus === "paid" ? "#16a34a" : "#ca8a04"};">${booking.paymentStatus}</td>
              </tr>
            </table>

          </div>

          <p style="text-align: center;">
            <a href="${process.env.ORIGIN || "http://localhost:5173"}/user-dashboard" style="background-color: #ea580c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Booking</a>
          </p>
        </div>

        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
          <p>&copy; ${new Date().getFullYear()} NextInn Luxury Hotel. All rights reserved.</p>
          <p>Questions? Contact us at support@nextinn.com</p>
        </div>
      </div>
    `,
  };
  try {
    console.log("Mail Options",mailOptions);
    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to user`);
  } catch (error) {
    console.error("Error while sending booking confirmation email");
  }
};
