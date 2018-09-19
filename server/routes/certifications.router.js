const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorizedManager } = require('../modules/manager-authorization');


// GET route to retrieve certifications in database and store them in certificationsReducer.js
router.get('/', rejectUnauthenticated, rejectUnauthorizedManager, (req, res, next) => {

  const queryText = `SELECT * FROM "certifications";`;

  pool.query(queryText)
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {      
      console.log('Error on /api/certifications GET:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
