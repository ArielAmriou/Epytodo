const express = require('express');
const db = require('../../config/db.js');
const router = express.Router();
const check_token = require('../auth/check_token');
const bcrypt = require('bcryptjs');

router.get('/:user', async (req, res) => {
    const user = req.params.user;
    let token = req.headers.cookie;

    if (!token) {
        return res.status(400).json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.status(400).json({"msg": "Token is not valid"})
    }
    db.query(`SELECT * FROM user WHERE id = "${user}" or email = "${user}";`, (err, rows) => {
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

router.put('/:user', async (req, res) => {
    const user = req.params.user;
    let body = req.body;
    const salt = await bcrypt.genSalt(10);
    let token = req.get('Authorization');

    body.password = await bcrypt.hash(body.password, salt);
    if (!token) {
        return res.status(400).json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.status(400).json({"msg": "Token is not valid"})
    }
    db.query(`UPDATE user SET email = "${body.email}", password = "${body.password}", name = "${body.name}", firstname = "${body.firstname}" WHERE id = "${user}";`, (err, rows) => {
        if (err) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
    })
    db.query(`SELECT * FROM user WHERE id = "${user}";`, (err, rows) => {
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

router.delete('/:user', async (req, res) => {
    const user = req.params.user;
    let token = req.get('Authorization');

    if (!token) {
        return res.status(400).json({ "msg": "No token, authorization denied" })
    }
    if (!check_token(token)) {
        return res.status(400).json({"msg": "Token is not valid"})
    }
    try {
        await db.promise().query(`DELETE FROM user WHERE id = "${user}";`);
    } catch (error) {
        return res.status(500).json({"msg": "Internal server error"});
    }
    res.status(200).json({ "msg": `Successfully deleted record number : ${user}` });
});

module.exports = router;