const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);
  const newUser = req.body
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `WITH first_ins AS (INSERT INTO users (email, password, first_name, middle_name, last_name, primary_phone, secondary_phone, street_address1, street_address2, city, state, zip, regular_basis, specific_event, as_needed, limitations_allergies, why_excited, employer, job_title, date_of_birth, active, access_level, admin_notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING id) INSERT INTO "user_certifications" ("user_id", "certification_id", "is_certified") 
  VALUES ((SELECT id FROM first_ins), 1, FALSE),((SELECT id FROM first_ins), 2, FALSE),((SELECT id FROM first_ins), 3, FALSE), ((SELECT id FROM first_ins), 4, FALSE), ((SELECT id FROM first_ins), 5, FALSE), ((SELECT id FROM first_ins), 6, FALSE), ((SELECT id FROM first_ins), 7, FALSE), ((SELECT id FROM first_ins), 8, FALSE), ((SELECT id FROM first_ins), 9, FALSE), ((SELECT id FROM first_ins), 10, FALSE), ((SELECT id FROM first_ins), 11, FALSE), ((SELECT id FROM first_ins), 12, FALSE);`;
  pool.query(queryText, [email, password, newUser.first_name, newUser.middle_name, newUser.last_name, newUser.primary_phone, newUser.secondary_phone, newUser.street_address1, newUser.street_address2, newUser.city, newUser.state, newUser.zip, newUser.regular_basis, newUser.specific_event, newUser.as_needed, newUser.limitations_allergies, newUser.why_excited, newUser.employer, newUser.job_title, newUser.date_of_birth, newUser.active, newUser.access_level, newUser.admin_notes,])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
