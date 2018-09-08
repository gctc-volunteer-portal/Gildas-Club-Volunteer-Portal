const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    //if certification
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

// router.put('/updateInfo', (req, res) => {	
//     console.log('I have :', req.body);	
//     let info = req.body	
//     if(req.isAuthenticated){	
//         const queryText = `UPDATE "users" SET "first_name" = $1, "middle_name" = $3, "last_name" = $4, "email"= $5 , "primary_phone"= $6,	
//                                             "secondary_phone"= $7, "street_address1"= $8, "street_address2"= $9, "city"= $10,	
//                                             "zip"= $11, "admin_notes"= $12, "active"= $13, "regular_basis"= $14, "specific_event"= $15,	
//                                             "as_needed"= $16, "limitation_allergies"= $17, "why_excited"= $18, "employer"= $19,	
//                                             "job_title"= $20, "date_of_birth" = $21 WHERE user."id" = $22;`,	
//                                             [info.first_name,]	
//     }	
// });

router.get('/info', rejectUnauthenticated, (req, res) => {
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
router.get('/my_available_events', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM opportunities 
                       JOIN user_certifications ON certification_needed = certification_id
                       JOIN users ON user_certifications.user_id = users.id
                       WHERE users.id = $1 AND is_certified = true`
    pool.query(queryText, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on /api/volunteers/my_available_events GET:', error);
            res.sendStatus(500);
        });
});


module.exports = router;