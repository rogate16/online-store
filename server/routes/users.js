const express = require('express');
const router = express.Router();
const db = require("../config/db")

router.get("/", (req, res) => {
    db.query("SELECT * FROM Details", (err, results) => {
        if(err){
            console.log(err);
        }
        res.send(results);
    })
})    

module.exports = router;
