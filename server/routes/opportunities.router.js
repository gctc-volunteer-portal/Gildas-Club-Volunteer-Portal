const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorizedManager } = require('../modules/manager-authorization');
const moment = require('moment');

// GET request for all volunteer opportunities in database
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT opportunities.id,
    opportunities.upload_image,
    opportunities.title,
    opportunities.start_time,
    opportunities.end_time,
    opportunities.address_line1,
    opportunities.address_line2,
    opportunities.city,
    opportunities.state,
    opportunities.zip,
    opportunities.description,
    opportunities.date,
    opportunities.status,
    opportunities.private_notes,
    opportunities.max_volunteers,
    opportunities.certification_needed,
    certifications.certification_name,
    count(user_opportunities.opportunity_id)as number_of_volunteers FROM opportunities
    LEFT JOIN certifications on opportunities.certification_needed = certifications.id
    LEFT JOIN user_opportunities on opportunities.id = user_opportunities.opportunity_id
    GROUP BY opportunities.id, certifications.certification_name
    ORDER BY opportunities.date, opportunities.start_time;`;
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
	"opportunities"."upload_image",
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
    "certifications"."certification_name",
    count("user_opportunities"."opportunity_id")as number_of_volunteers FROM "opportunities"
    LEFT JOIN "user_opportunities" on "opportunities"."id" = "user_opportunities"."opportunity_id"
    LEFT JOIN "certifications" on "opportunities"."certification_needed" = "certifications"."id"
    WHERE "user_opportunities"."user_id" = $1 AND "opportunities"."status" = 2
    GROUP BY opportunities.id, certifications.certification_name
    ORDER BY opportunities.date, opportunities.start_time;`;
    pool.query(queryText, [req.user.id])
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

router.get('/enrolled/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user_opportunities"
    WHERE "user_id" = $1 AND "opportunity_id" = $2;`
    pool.query(queryText, [req.user.id, req.params.id])
        .then(results => {
            res.send(results.rows)
        })
        .catch(error => {
            console.log('Error on /api/opportunities/enrolled GET:', error);
            res.sendStatus(500);
        });
});

router.get('/info', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT user_opportunities.user_id,
                              user_opportunities.opportunity_id,
                              users.first_name,
                              users.last_name,
                              opportunities.id,
                              opportunities.title,
                              opportunities.start_time,
                              opportunities.end_time,
                              opportunities.description,
                              opportunities.date,
                              opportunities.certification_needed,
                              certifications.certification_name
                       FROM "user_opportunities"
                       LEFT OUTER JOIN "users" ON "users".id = "user_opportunities".user_id
                       LEFT OUTER JOIN "opportunities" ON "opportunities".id = "user_opportunities".opportunity_id
                       LEFT OUTER JOIN "certifications" ON "certifications".id = "opportunities".certification_needed;`;
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows)
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});


router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT
    user_opportunities.user_id,
    user_opportunities.id,
user_opportunities.opportunity_id,
users.first_name,
users.middle_name,
users.last_name,
users.email,
users.primary_phone,
users.secondary_phone,
users.street_address1,
users.street_address2,
users.access_level,
users.admin_notes,
users.active,
users.regular_basis,
users.specific_event,
users.as_needed,
users.limitations_allergies,
users.why_excited,
users.employer,
users.job_title,
users.date_of_birth,
opportunities.id,
opportunities.upload_image,
opportunities.title,
opportunities.start_time,
opportunities.end_time,
opportunities.address_line1,
opportunities.address_line2,
opportunities.city,
opportunities.state,
opportunities.zip,
opportunities.description,
opportunities.date,
opportunities.status,
opportunities.private_notes,
opportunities.max_volunteers,
opportunities.certification_needed,
certifications.certification_name
 FROM "user_opportunities"
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


// POST request to add volunteer into a volunteer opportunity
router.post('/add_volunteer', rejectUnauthenticated, (req, res) => {

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

// DELETE request for removing a volunteer from volunteer opportunity
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

//POST request for creating new volunteer opportunity, only users with manager or admin access can make server side POST request
router.post('/', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
    const newOpportunity = req.body;
    const certId = parseInt(newOpportunity.certification_needed);

    const queryText = `INSERT INTO "opportunities"("title","start_time","end_time","address_line1","address_line2","city","state","zip","description","date","status","private_notes","max_volunteers","upload_image", "certification_needed")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);`;

    // format start and end time values with moment.js before inputting into the database
    const momentStartTime = moment(newOpportunity.start_time).format('HH:mm:ss');
    const momentEndTime = moment(newOpportunity.end_time).format('HH:mm:ss');

    // serialize data on req.body
    const serializedData = [newOpportunity.title, momentStartTime, momentEndTime, newOpportunity.address_line1, newOpportunity.address_line2, newOpportunity.city, newOpportunity.state, newOpportunity.zip, newOpportunity.description, newOpportunity.date, newOpportunity.status, newOpportunity.private_notes, newOpportunity.max_volunteers, newOpportunity.uploadImage, certId];

    pool.query(queryText, serializedData)
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error on /api/opportunities POST:', error)
            res.sendStatus(500);
        })
});

// PUT request for updating volunteer opportunity
router.put('/:id', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
    const updateOpportunityData = req.body;

    // PUT query
    const queryText = `UPDATE "opportunities" SET "title" = $2, "start_time" = $3, 
    "end_time" = $4, "address_line1" = $5, "address_line2" = $6, "city" = $7, 
    "state" =$8, "zip" = $9, "description" = $10, "date" = $11, "status" = $12, 
    "private_notes" = $13, "max_volunteers" = $14, "certification_needed" = $15, "upload_image" = $16
    WHERE "id" = $1;`;

    // format start and end time values with moment.js before inputting into the database
    const momentStartTime = moment(updateOpportunityData.start_time, 'HH:mm:ss').format('HH:mm:ss');
    const momentEndTime = moment(updateOpportunityData.end_time, 'HH:mm:ss').format('HH:mm:ss');

    // serialize data on req.body
    const serializedData = [req.params.id, updateOpportunityData.title, momentStartTime,
        momentEndTime, updateOpportunityData.address_line1, updateOpportunityData.address_line2,
    updateOpportunityData.city, updateOpportunityData.state, updateOpportunityData.zip,
    updateOpportunityData.description, updateOpportunityData.date, updateOpportunityData.status,
    updateOpportunityData.private_notes, updateOpportunityData.max_volunteers,
    updateOpportunityData.certification_needed, updateOpportunityData.upload_image];

    pool.query(queryText, serializedData)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

// PUT request to update volunteer opportunity status
router.put('/status/:id', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
    const queryText = `UPDATE "opportunities" SET "status" = $2 
                       WHERE "id" = $1;`;
    const serializedData = [req.params.id, req.body.status];
    pool.query(queryText, serializedData)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

//PUT route to update admin notes on volunteer opportunity
router.put('/admin_note/:id', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
    const updateOpportunityData = req.body;
    const queryText = `UPDATE "opportunities" SET "private_notes" = $2
    WHERE "id" = $1;`;

    pool.query(queryText, [req.params.id, updateOpportunityData.new_notes])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

module.exports = router;