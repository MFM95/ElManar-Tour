// app/api/send-email/route.js
import nodemailer from 'nodemailer';
import {EMAIL_PASS, EMAIL_TO, EMAIL_USER} from "@lib/utils/Constants";

export async function POST(req) {
  const { tourTitle, name, contactNumber, numberOfGuests, date } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER, // Your email address
      pass: EMAIL_PASS,
    },
  });

  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_TO, // Your email address where you'll receive the messages
      subject: `New Booking Request for ${tourTitle}`,
      // text: message,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Contact Number:</strong> ${contactNumber}</p> <p><strong>Number of Guests:</strong><br/>${numberOfGuests}</p><p><strong>Preferred Date:</strong><br/>${date}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to send email.' }), {
      status: 500,
    });
  }
}
