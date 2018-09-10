const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('got to post', req.body);
        const queryText = `INSERT INTO "announcements" ("title", "description", "date") VALUES ($1, $2, $3)`
        pool.query(queryText, [req.body.title, req.body.description, req.body.date])
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500)
            })
    

});

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('got to get', req.body);
        const queryText = `SELECT * FROM "announcements";`
        pool.query(queryText)
            .then((results) => {
                res.send(results.rows);
            })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500)
            })


});



module.exports = router;