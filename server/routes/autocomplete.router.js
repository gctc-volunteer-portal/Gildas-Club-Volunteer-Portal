const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorizedManager } = require('../modules/manager-authorization');


// get certified users for autocomplete table when managing opportunities
router.get('/', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
    pool.query(`SELECT distinct users.id, users.first_name, users.last_name, user_certifications.certification_id, user_certifications.is_certified
        FROM users
        LEFT OUTER JOIN "user_certifications" ON "users".id= user_certifications.user_id
        LEFT OUTER JOIN "user_opportunities" ON "users".id = user_opportunities.user_id
        LEFT OUTER JOIN "opportunities" ON opportunities.id = user_opportunities.opportunity_id
        WHERE users.active = true;`)
    .then((results) => {
    res.send(results.rows)
    })
    .catch((err) => {    
    console.log('Error on /api/autocomplete GET:', err);
    res.sendStatus(500);
    })
});

module.exports = router;