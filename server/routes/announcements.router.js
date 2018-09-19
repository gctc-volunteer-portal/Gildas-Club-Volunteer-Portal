const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorizedManager } = require('../modules/manager-authorization');

// post a new announcement
router.post('/', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
    const queryText = `INSERT INTO "announcements" ("title", "description", "date") VALUES ($1, $2, $3);`
    pool.query(queryText, [req.body.title, req.body.description, req.body.date])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error on /api/announcements POST:', error);
            res.sendStatus(500)
        })
});

// get all announcements from database
router.get('/', rejectUnauthenticated, (req, res) => {
        const queryText = `SELECT * FROM "announcements"
            ORDER BY date DESC;`
        pool.query(queryText)
            .then((results) => {
                res.send(results.rows);
            })
            .catch((error) => {
                console.log('Error on /api/announcements GET', error);
                res.sendStatus(500)
            })
});

// delete an announcement
router.delete('/:id', rejectUnauthenticated, rejectUnauthorizedManager, (req, res) => {
    const queryText = `DELETE FROM "announcements" WHERE id=$1`;
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error on /api/announcements DELETE:', err);
            res.sendStatus(500);
        });
});

module.exports = router;