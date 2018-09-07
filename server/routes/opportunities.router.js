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
    LEFT OUTER JOIN "certifications" ON "certifications".id = "opportunities".certification_needed
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
router.post('/add_volunteer', (req, res) => {
    console.log('got to post', req.body);
    console.log('event body', req.body);
    
    if (req.isAuthenticated) {
        const queryText = `INSERT INTO "user_opportunities" ("user_id", "opportunity_id") VALUES ($1, $2)`
        pool.query(queryText, [req.body.volunteerId, req.body.opportunityId])
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }

});

router.delete('/:id', (req, res) => {

    

    if (req.isAuthenticated) {
        const queryText = `DELETE FROM "user_opportunities" WHERE user_id=$2 AND "opportunity_id" = $1 RETURNING "user_opportunities".opportunity_id`;
        pool.query(queryText, [req.params.id, req.body.volunteerId])
            .then((response) => {
                console.log(response.rows)
                res.send(response.rows)
            })
            .catch((err) => {
                console.log('Error deleting', err);
                res.sendStatus(500);
                
            });
    } else {
        res.sendStatus(403);
    }
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