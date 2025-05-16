const express = require('express');
const db = require('../../config/db.js');
const router = express.Router();
const check_token = require('../auth/check_token');

router.get('/:user', async (req, res) => {
    let token = req.get('Authorization');
    const user = req.params.user

    if (!token) {
        return res.status(400).json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.status(400).json({"msg": "Token is not valid"})
    }
    try {
        await db.promise().query(`SELECT * FROM user WHERE id = "${user}" or email = "${user}";`);
    } catch (error) {
        return res.status(500).json({"msg": "Internal server error"});
    }
    res.status(201).json(rows);
});

module.exports = router;