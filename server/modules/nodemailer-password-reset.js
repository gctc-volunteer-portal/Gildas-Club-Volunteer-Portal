const nodemailer = require('nodemailer');

// configures connection to email server
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.NODEMAILER_CLIENT_USER,
        clientId: process.env.NODEMAILER_CLIENT_ID,
        clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
        refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
        accessToken: process.env.NODEMAILER_ACCESS_TOKEN,
    }
});

module.exports = transporter;