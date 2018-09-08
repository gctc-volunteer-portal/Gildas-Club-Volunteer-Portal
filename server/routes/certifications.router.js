const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET route for certifications to show up on create opportunities form

router.get('/', rejectUnauthenticated, (req, res, next) => {
  const opportunityData = req.body

  const queryText = `SELECT * FROM "certifications";`;

  pool.query(queryText)
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      console.log('Error on /api/certifications/ GET:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
