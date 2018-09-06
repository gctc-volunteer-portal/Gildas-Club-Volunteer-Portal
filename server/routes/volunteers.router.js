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



module.exports = router;