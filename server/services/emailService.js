import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  
  service : "gmail",
  auth: {
    user: "prernas8107@gmail.com",
    pass: "qdmb jcyg wymi wxny",
  },
});


export default transporter;