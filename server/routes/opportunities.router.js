const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM opportunities;`;
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows)

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user_opportunities"
    LEFT OUTER JOIN "users" ON "users".id = "user_opportunities".user_id
    LEFT OUTER JOIN "opportunities" ON "opportunities".id = "user_opportunities".opportunity_id
    LEFT OUTER JOIN "certifications" ON "certifications".id = "opportunities".certification_needed
    WHERE "user_opportunities"."opportunity_id" = $1;` ;
    pool.query(queryText, [req.params.id])
        .then((results) => {
            res.send(results.rows)

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.post('/', rejectUnauthenticated, (req, res) => {
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
})
    router.post('/add_volunteer', rejectUnauthenticated, (req, res) => {
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

    router.delete('/:id', rejectUnauthenticated, (req, res) => {

        if (req.isAuthenticated) {
            const queryText = `DELETE FROM "user_opportunities" WHERE user_id=$2 AND "opportunity_id" = $1 RETURNING "user_opportunities".opportunity_id`;
            pool.query(queryText, [req.params.id, req.body.volunteerId])
                .then((response) => {
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

    router.post('/', rejectUnauthenticated, (req, res) => {
        const newOpportunity = req.body;
        const certId = parseInt(newOpportunity.certification_needed);

        console.log(req.body, 'req body');

        const queryText = `INSERT INTO "opportunities"("title","start_time","end_time","address_line1","address_line2","city","state","zip","description","date","status","private_notes","max_volunteers","certification_needed")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);`;

        const serializedData = [newOpportunity.title, newOpportunity.start_time, newOpportunity.end_time, newOpportunity.address_line1, newOpportunity.address_line2, newOpportunity.city, newOpportunity.state, newOpportunity.zip, newOpportunity.description, newOpportunity.date, newOpportunity.status, newOpportunity.private_notes, newOpportunity.max_volunteers, certId];
        console.log(serializedData)

        pool.query(queryText, serializedData)
            .then((results) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                console.log('error on /api/opportunities POST:', error)
                res.sendStatus(500);
            })
    });

    module.exports = router;