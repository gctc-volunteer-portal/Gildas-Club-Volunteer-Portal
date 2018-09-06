const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM volunteers;`;
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows)
            console.log(results.rows);

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.patch('/updateInfo', (req, res) => {
    console.log('I have :', req.body);
    if(req.isAuthenticated){
        
    }
})





module.exports = router;