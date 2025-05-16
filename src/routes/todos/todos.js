const express = require('express');
const db = require('../../config/db.js');
const router = express.Router();
const check_token = require('../auth/check_token');

router.post('/', async (req, res) => {
    let token = req.headers.cookie;
    const user = req.body
    const insertQuery = `INSERT INTO todo (title, description, due_time, user_id, status) VALUES ("${user.title}", "${user.description}", "${user.due_time}", "${user.user_id}", "${user.status}");`;

    console.log(user)
    console.log(user.due_time)
    if (!token) {
        return res.status(400).json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.status(400).json({"msg": "Token is not valid"})
    }
    try {
        await db.promise().query(insertQuery);
    } catch (error) {
        res.status(500).json({ "msg": "Internal server error" })
        console.error({ "msg" : " Account already exists" })
        console.error(error)
    }
    res.status(201).json({"msg": "Well I tried"})});

module.exports = router;