const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    //if certifcation
    const queryText = `SELECT distinct on (users.first_name)
                        users.id,
                        users.first_name, 
                        users.last_name, 
                        users.email, 
                        users.primary_phone, 
                        user_certifications.user_id, 
                        user_certifications.certification_id
                        FROM users
                        LEFT OUTER JOIN "user_certifications" ON "users".id= user_certifications.user_id
                        ORDER BY users.first_name;`;
    // else query text = select* from users
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
    FROM crosstab (
    $$
    SELECT
        "users"."email",
        "users"."id",
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
        email VARCHAR,
        id INT,
        first_name VARCHAR,
        middle_name VARCHAR,
        last_name VARCHAR,
        primary_phone VARCHAR,
        secondary_phone VARCHAR,
        av_support BOOLEAN,
        cash_handling BOOLEAN,
        clinic_ambassador BOOLEAN,
        communications BOOLEAN,
        data_entry BOOLEAN,
        gilda_greeter BOOLEAN,
        instructor BOOLEAN,
        noogieland BOOLEAN,
        outreach_ambassador BOOLEAN,
        special1 BOOLEAN,
        special2 BOOLEAN,
        special3 BOOLEAN
    );`
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