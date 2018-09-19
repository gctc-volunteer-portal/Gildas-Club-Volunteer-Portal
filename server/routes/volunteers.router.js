const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// router.get('/', rejectUnauthenticated, (req, res) => {
    
//     const queryText = `SELECT distinct on (users.first_name)
//                         users.id,
//                         users.first_name, 
//                         users.last_name, 
//                         users.email, 
//                         users.primary_phone, 
//                         user_certifications.user_id, 
//                         user_certifications.certification_id
//                         FROM users
//                         LEFT OUTER JOIN "user_certifications" ON "users".id= user_certifications.user_id
//                         ORDER BY users.first_name;`;
   
//     pool.query(queryText)
//         .then((results) => {
//             res.send(results.rows)
//         }).catch((err) => {
//             console.log(err);
//             res.sendStatus(500);
//         })
// });

router.get('/new', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * 
    FROM crosstab (
    $$
    SELECT
        "users"."email",
        "users"."id",
        "users"."dynamics_id",
        "users"."first_name",
        "users"."middle_name",
        "users"."last_name",
        "users"."primary_phone",
        "users"."secondary_phone",
        "users"."street_address1",
        "users"."street_address2",
        "users"."city",
        "users"."state",
        "users"."zip",
        "users"."access_level",
        "users"."admin_notes",
        "users"."active",
        "users"."regular_basis",
        "users"."specific_event",
        "users"."as_needed",
        "users"."limitations_allergies",
        "users"."why_excited",
        "users"."employer",
        "users"."job_title",
        "users"."date_of_birth",
        "certifications"."certification_name",
        "user_certifications"."is_certified"
    FROM "users"
    JOIN "user_certifications" ON "users"."id" = "user_certifications"."user_id"
    JOIN "certifications" ON "user_certifications"."certification_id" = "certifications"."id"
    WHERE "users"."access_level" != 3 AND "users".dynamics_id ISNULL
    ORDER BY 1
    $$,
    $$
    SELECT DISTINCT "certifications"."certification_name" FROM "certifications" ORDER BY 1
    $$
    ) 
    AS final_result(
        email VARCHAR,
        id INT,
        dynamics_id INT,
        first_name VARCHAR,
        middle_name VARCHAR,
        last_name VARCHAR,
        primary_phone VARCHAR,
        secondary_phone VARCHAR,
        street_address1 VARCHAR,
        street_address2 VARCHAR,
        city VARCHAR,
        state VARCHAR,
        zip INT,
        access_level INT,
        admin_notes VARCHAR,
        active BOOLEAN,
        regular_basis BOOLEAN,
        specific_event BOOLEAN,
        as_needed BOOLEAN,
        limitations_allergies VARCHAR,
        why_excited VARCHAR,
        employer VARCHAR,
        job_title VARCHAR,
        date_of_birth DATE,
        av_support BOOLEAN,
        cash_handling BOOLEAN,
        clinic_ambassador BOOLEAN,
        communications BOOLEAN,
        data_entry BOOLEAN,
        gilda_greeter BOOLEAN,
        instructor BOOLEAN,
        noogieland BOOLEAN,
        open_to_all BOOLEAN,
        special1 BOOLEAN,
        special2 BOOLEAN,
        special3 BOOLEAN,
        outreach_ambassador BOOLEAN

    );`

    pool.query(queryText)
        .then((results) => {
            res.send(results.rows)
        }).catch((err) => {
            res.sendStatus(500);
        })
});

router.get('/indVolunteer/:id/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated) {
        const queryText = `SELECT * FROM users WHERE users."id" = $1`;
        pool.query(queryText, [req.params.id]).then((results) => {
            res.send(results.rows)

        })
    }
})

//editing volunteer
router.put('/updateInfo', rejectUnauthenticated, (req, res) => {
    let info = req.body.state
    if (req.isAuthenticated) {
        const queryText = `UPDATE "users" SET "first_name" = $1, "middle_name" = $2, "last_name" = $3, "email"= $4 , "primary_phone"= $5,
                                            "secondary_phone"= $6, "street_address1"= $7, "street_address2"= $8, "city"= $9,
                                            "zip"= $10, "admin_notes"= $11, "active"= $12, "regular_basis"= $13, "specific_event"= $14,
                                            "as_needed"= $15, "limitations_allergies"= $16, "why_excited"= $17, "employer"= $18,
                                             "job_title"= $19, "date_of_birth" = $20, "access_level" = $21, "dynamics_id"= $22, "state" = $23 WHERE users."id" = $24;`
        pool.query(queryText, [info.first_name, info.middle_name, info.last_name, info.email, info.primary_phone,
        info.secondary_phone, info.street_address1, info.street_address2, info.city, info.zip, info.admin_notes,
        info.active, info.regular_basis, info.specific_event, info.as_needed,
        info.limitations_allergies, info.why_excited, info.employer, info.job_title, info.date_of_birth, info.access_level, info.dynamics_id, info.state, req.body.volunteerId])
            .then(() => {
                res.sendStatus(201)
            })
    } else {
        res.sendStatus(403)
    }
})

//Update request for chips on volunteer edit dialog
router.put('/updateCerts', rejectUnauthenticated, (req, res) => {

    const certs = Object.values(req.body.certs)

    let isError = false;
    for (let i = 0; i < certs.length; i++) {
        let queryText = `UPDATE user_certifications SET "is_certified" = $1 WHERE  "certification_id" = $2 and "user_id" = $3;`

        //sanitizing 
        pool.query(queryText, [certs[i].certified, certs[i].id, req.body.id]).then(() => {

        }).catch(err => {
            isError = true
        })
    } if (isError == true) {
        res.sendStatus(500)
    } else {
        res.sendStatus(201)
    }
})


router.get('/info', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * 
    FROM crosstab (
    $$
    SELECT
        "users"."email",
        "users"."id",
        "users"."dynamics_id",
        "users"."first_name",
        "users"."middle_name",
        "users"."last_name",
        "users"."primary_phone",
        "users"."secondary_phone",
        "users"."street_address1",
        "users"."street_address2",
        "users"."city",
        "users"."state",
        "users"."zip",
        "users"."access_level",
        "users"."admin_notes",
        "users"."active",
        "users"."regular_basis",
        "users"."specific_event",
        "users"."as_needed",
        "users"."limitations_allergies",
        "users"."why_excited",
        "users"."employer",
        "users"."job_title",
        "users"."date_of_birth",
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
        dynamics_id INT,
        first_name VARCHAR,
        middle_name VARCHAR,
        last_name VARCHAR,
        primary_phone VARCHAR,
        secondary_phone VARCHAR,
        street_address1 VARCHAR,
        street_address2 VARCHAR,
        city VARCHAR,
        state VARCHAR,
        zip INT,
        access_level INT,
        admin_notes VARCHAR,
        active BOOLEAN,
        regular_basis BOOLEAN,
        specific_event BOOLEAN,
        as_needed BOOLEAN,
        limitations_allergies VARCHAR,
        why_excited VARCHAR,
        employer VARCHAR,
        job_title VARCHAR,
        date_of_birth DATE,
        av_support BOOLEAN,
        cash_handling BOOLEAN,
        clinic_ambassador BOOLEAN,
        communications BOOLEAN,
        data_entry BOOLEAN,
        gilda_greeter BOOLEAN,
        instructor BOOLEAN,
        noogieland BOOLEAN,
        open_to_all BOOLEAN,
        special1 BOOLEAN,
        special2 BOOLEAN,
        special3 BOOLEAN,
        outreach_ambassador BOOLEAN

    );`
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

router.get('/my_available_events', rejectUnauthenticated, (req, res) => {
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
    user_certifications.user_id,
    user_certifications.certification_id,
    user_certifications.is_certified,
    certifications.certification_name,
	count("user_opportunities"."opportunity_id")as number_of_volunteers
    FROM opportunities 
                       LEFT JOIN user_certifications ON certification_needed = certification_id
                       LEFT JOIN users ON user_certifications.user_id = users.id
                       LEFT JOIN certifications ON opportunities.certification_needed = certifications.id
                       LEFT JOIN user_opportunities ON users.id = user_opportunities.user_id
                       WHERE users.id = $1 AND is_certified = true AND opportunities.status = 2
                       GROUP BY opportunities.id,
                       user_certifications.user_id,
                       user_certifications.certification_id,
                       user_certifications.is_certified,
                       certifications.certification_name
                       ORDER BY opportunities.date, opportunities.start_time;`
    pool.query(queryText, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

module.exports = router;