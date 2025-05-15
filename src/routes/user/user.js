const express = require('express');
const db = require('../../config/db.js');
const router = express.Router();
const check_token = require('../auth/check_token');

router.get('/:user', async (req, res) => {
    let token = req.headers.cookie;
    const user = req.params.user

    if (!token) {
        return res.json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.json({"msg": "Token is not valid"})
    }
    db.query(`SELECT * FROM user WHERE id = "${user}" or email = "${user}";`, (err, rows) => {
        if (err) {
            return res.json({"msg": "Internal server error"});
        }
        res.json(rows);
    })

});

module.exports = router;