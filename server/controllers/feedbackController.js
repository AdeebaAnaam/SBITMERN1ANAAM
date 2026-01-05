const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // App password
  },
});

exports.sendFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Feedback App" <${process.env.GMAIL_USER}>`, // MUST be your Gmail
      to: email, // ✅ send to user's Gmail
      subject: "Feedback Received",
      text: `Hi ${name},

Thank you for your feedback!

Message received:
"${message}"

We will get back to you soon.

Regards,
Feedback Team`,
    });

    return res.status(200).json({
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("MAIL ERROR:", error);
    return res.status(500).json({
      message: "Email sending failed",
    });
  }
};




