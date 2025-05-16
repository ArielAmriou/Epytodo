const express = require('express');
const db = require('../../config/db.js');
const router = express.Router();
const check_token = require('../auth/check_token');

router.post('/', async (req, res) => {
    let token = req.headers.cookie;
    const user = req.params.user
    const insertQuery = `INSERT INTO todo (title, description, due_time, user_id, status) VALUES ("${user.title}", "${user.description}", "${user.due_time}", "${user.user_id}", "${user.status}");`;

    if (!token) {
        return res.status(400).json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.status(400).json({"msg": "Token is not valid"})
    }
    db.query(insertQuery, (err, rows) => {
        if (err) {
            return res.status(500).json({"msg": "Internal server error"});
        }
        res.status(201).json(rows);
    })
});

router.get('/:user', async (req, res) => {
    const user = req.params.user;
    let token = req.headers.cookie;

    if (!token) {
        return res.status(400).json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.status(400).json({"msg": "Token is not valid"})
    }
    db.query(`SELECT * FROM todo WHERE id = "${user}";`, (err, rows) => {
        if (err) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
        if (!rows.length) {
            res.status(400).json({"msg": "Not found"});
            return;
        }
        res.status(200).json(rows);
    })
});

module.exports = router;