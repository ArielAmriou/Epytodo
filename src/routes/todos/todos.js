const express = require('express');
const db = require('../../config/db.js');
const router = express.Router();
const check_token = require('../auth/check_token');

router.post('/', async (req, res) => {
    let token = req.headers.cookie;
    const user = req.params.user
    const insertQuery = `INSERT INTO user (title, description, due_time, user_id, status) VALUES ("${user.title}", "${user.description}", "${user.due_time}", "${user.user_id}", "${user.status}");`;

    if (!token) {
        return res.status(400).json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.status(400).json({"msg": "Token is not valid"})
    }
    try {
        await db.promise().query(insertQuery)
    } catch (error) {
        return res.status(500).json({"msg": "Internal server error"});
    }
    return res.json.token
});

module.exports = router;