const express = require('express');
const db = require('../../config/db.js');
const router = express.Router();
const check_token = require('../auth/check_token');

router.get('/:user', (req, res) => {
    const user = req.params.user;
    db.query(`SELECT * FROM user WHERE id = "${user}" or email = "${user}";`, (err, rows) => {
        if (err) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
        if (!rows.length) {
            res.status(400).json({"msg": "Not found"});
            return;
        }
        res.status(201).json(rows);
    })
});
// db.query(`UPDATE user SET email = "${email}", password = "${password}", name = "${name}", firstname = "${firstname}" WHERE id = "${user}";`, (err, rows) => {
//     if (err) throw err;
//     console.log(rows.affectedRows + " record(s) updated");
// })
module.exports = router;