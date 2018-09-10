const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorizedManager } = require('../modules/manager-authorization');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM opportunities
    JOIN certifications on opportunities.certification_needed = certifications.id;`;
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows)

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.get('/volunteer', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT
    "opportunities"."id",
	"opportunities"."image",
	"opportunities"."title",
	"opportunities"."start_time",
	"opportunities"."end_time",
	"opportunities"."address_line1",
	"opportunities"."address_line2",
	"opportunities"."city",
	"opportunities"."state",
	"opportunities"."zip",
	"opportunities"."description",
	"opportunities"."date",
	"opportunities"."status",
	"opportunities"."private_notes",
	"opportunities"."max_volunteers",
	"certifications"."certification_name"
    FROM "opportunities"
    JOIN "user_opportunities" on "opportunities"."id" = "user_opportunities"."opportunity_id"
    JOIN "certifications" on "opportunities"."certification_needed" = "certifications"."id"
    WHERE "user_opportunities"."user_id" = $1 AND "opportunities"."status" = 2
    ORDER BY "opportunities"."date";`;
    pool.query(queryText, [req.user.id])
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('Error on /api/opportunities/volunteer GET:', error);
            res.sendStatus(500);
        });
});

router.get('/enrolled/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.user.id, req.params.id)
    const queryText = `SELECT * FROM "user_opportunities"
    WHERE "user_id" = $1 AND "opportunity_id" = $2;`
    pool.query(queryText, [req.user.id, req.params.id])
        .then(results => {
            console.log(results.rows)
            res.send(results.rows)
        })
        .catch(error => {
            console.log('Error on /api/opportunities/enrolled GET:', error);
            res.sendStatus(500);
        });
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

//POST route for new volunteer opportunity, only users with manager or admin access can make server side POST request
router.post('/', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
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

router.put('/:id', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
    const updateOpportunityData = req.body;
    console.log(req.params.id, 'req params')
    console.log(req.body, 'req body');

    const queryText = `UPDATE "opportunities" SET "title" = $2, "start_time" = $3, "end_time" = $4, "address_line1" = $5, "address_line2" = $6, "city" = $7, "state" =$8, "zip" = $9, "description" = $10, "date" = $11, "status" = $12, "private_notes" = $13, "max_volunteers" = $14, "certification_needed" = $15
    WHERE "id" = $1;`;

    const serializedData = [req.params.id, updateOpportunityData.title, updateOpportunityData.start_time, updateOpportunityData.end_time, updateOpportunityData.address_line1, updateOpportunityData.address_line2, updateOpportunityData.city, updateOpportunityData.state, updateOpportunityData.zip, updateOpportunityData.description, updateOpportunityData.date, updateOpportunityData.status, updateOpportunityData.private_notes, updateOpportunityData.max_volunteers, updateOpportunityData.certification_needed];

    pool.query(queryText, serializedData)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});

module.exports = router;
