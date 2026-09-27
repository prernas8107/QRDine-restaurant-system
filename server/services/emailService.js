import nodemailer from 'nodemailer';

// Robust Nodemailer transport configuration optimized for cloud deployment (Render)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'prernas8107@gmail.com',
    pass: process.env.EMAIL_PASS || 'qdmb jcyg wymi wxny',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
