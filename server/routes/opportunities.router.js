const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM opportunities;`;
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows)
            console.log(results.rows);

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});
router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "user_opportunities"
    LEFT OUTER JOIN "users" ON "users".id = "user_opportunities".user_id
    LEFT OUTER JOIN "opportunities" ON "opportunities".id = "user_opportunities".opportunity_id
    WHERE "user_opportunities"."opportunity_id" = $1;` ;
    pool.query(queryText, [req.params.id])
        .then((results) => {
            res.send(results.rows)
            console.log(results.rows);

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newOpportunity = req.body;
    console.log(req.body, 'req body');
    const queryText = ``;
    const serializedData = []
    pool.query(queryText, serializedData)
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});

module.exports = router;