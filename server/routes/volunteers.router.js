const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "users" WHERE "access_level" != 3;`;
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows)
            console.log(results.rows);

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.get('/info', (req, res)=> {
    const queryText = `SELECT * 
    FROM crosstab(
    $$
    SELECT
        "users"."email",
        "users"."first_name",
        "users"."middle_name",
        "users"."last_name",
        "users"."primary_phone",
        "users"."secondary_phone",
        "certifications"."certification_name",
        "user_certifications"."is_certified"
    FROM "users"
    JOIN "user_certifications" ON "users"."id" = "user_certifications"."user_id"
    JOIN "certifications" ON "user_certifications"."certification_id" = "certifications"."id"
    WHERE "users"."access_level" != 3
    ORDER BY 1
    $$,
    $$
    SELECT DISTINCT "certifications"."certification_name" FROM "certifications" ORDER BY 1
    $$
    ) 
    AS final_result(
        VolunteerEmail VARCHAR,
        VolunteerFirstName VARCHAR,
        VolunteerMiddleName VARCHAR,
        VolunteerLastName VARCHAR,
        VolunteerPrimaryPhone VARCHAR,
        VolunteerSecondaryPhone VARCHAR,
        AVSupport BOOLEAN,
        CashHandling BOOLEAN,
        ClinicAmbassador BOOLEAN,
        Communications BOOLEAN,
        DataEntry BOOLEAN,
        GildaGreeter BOOLEAN,
        Instructor BOOLEAN,
        Noogieland BOOLEAN,
        OutreachAmbassador BOOLEAN,
        Special1 BOOLEAN,
        Special2 BOOLEAN,
        Special3 BOOLEAN
    ) ;`
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on /api/volunteers/info GET:', error);
            res.sendStatus(500);
        });
});





module.exports = router;