//qdmb jcyg wymi wxny

import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  
  service : "gmail",
  auth: {
    user: "prernas8107@gmail.com",
    pass: "qdmb jcyg wymi wxny",
  },
});

// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: 'prernas8107@gmail.com',
    to: "rcert.prernas@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
})();
