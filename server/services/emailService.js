import nodemailer from 'nodemailer';

// Robust Nodemailer transport configuration using Resend SMTP (Cloud-Friendly & 100% Reliable)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.resend.com',
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'resend',
    pass: process.env.EMAIL_PASS || '',
  },
});

export default transporter;
