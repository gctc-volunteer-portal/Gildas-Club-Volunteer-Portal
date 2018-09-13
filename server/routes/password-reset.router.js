const express = require('express');
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const transporter = require('../modules/nodemailer-password-reset');
const Chance = require('chance');
const queryString = require('query-string');
const router = express.Router();

const chance = new Chance();

router.put('/forgot-pass', (req, res) => {
    let token = chance.string({length: 16, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
    let email = req.body.email;

    const mailOptions = {
        from: process.env.NODEMAILER_CLIENT_USER,
        to: email,
        subject: `'Follow this link to reset your password'`,
        text: `Use this link within 24 hours to reset your password: localhost:3000/#/reset_password?token=${token}`,
    }

    let queryText = `SELECT * FROM users WHERE users.email = $1;`
    pool.query(queryText, [email])
        .then(results => {
            user = results.rows[0]
            if(user) {
                let expiration = Date.now() + 1440000;
                queryText = `UPDATE users SET token = $1, token_expiration = $2 where email = $3;`
                pool.query(queryText, [token, expiration, email])
                    .then(results => {
                        transporter.sendMail(mailOptions, (error, info) => {
                            if(error) {
                                console.log('Email failed:', error);
                                res.sendStatus(500);
                            }
                            else {
                                console.log('Message sent:', info.messageId);
                                res.sendStatus(200);
                            }
                        })
                    })
                    .catch(error => {
                        console.log('Error on /api/password/forgot-pass:', error)
                        res.sendStatus(500);
                    });
            }
            else {res.sendStatus(404)}
        })
        .catch(error => {
            console.log('Error on /api/password/forgot-pass:', error)
            res.sendStatus(500);
        })
});


router.put('/reset-pass', (req, res) => {
    console.log(req.body)
    const parsedQueryParams = queryString.parse(req.body.queryParams);
    let email = req.body.email;
    let token = parsedQueryParams.token;
    console.log(token)
    let newPassword = encryptLib.encryptPassword(req.body.password);
    let expirationTime = Date.now();
    let queryText = `SELECT * FROM users where email = $1 and token = $2;`
    pool.query(queryText, [email, token])
        .then(results => {
            user = results.rows[0];
            console.log(user)
            if(expirationTime < user.token_expiration) {
                queryText = `UPDATE users SET password = $1, token = null, token_expiration = null WHERE email = $2 and token = $3;`
                pool.query(queryText, [newPassword, email, token])
                    .then(results => {
                        res.sendStatus(200);
                    })
                    .catch(error => {
                        console.log('Error on 2nd query:', error);
                        res.sendStatus(500);
                    })
            }
            else {res.sendStatus(400)}
        })
        .catch(error => {
            console.log('Error on 1st query:', error);
            res.sendStatus(500);
        })
});

module.exports = router;