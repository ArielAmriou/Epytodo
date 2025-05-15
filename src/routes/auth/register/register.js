const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../../../config/db.js');


router.post('/', async (req, res) => {
    let user = req.body;
    const salt = await bcrypt.genSalt(10)
    let token = 0;
    let jwtSecretKey = process.env.SECRET

    user.password = await bcrypt.hash(user.password, salt)
    const insertQuery = `INSERT INTO user (email, name, firstname, password) VALUES ("${user.email}", "${user.name}", "${user.firstname}", "${user.password}");`;
    try {
        await db.promise().query(insertQuery);
    } catch (error) {
        res.json({ "msg" : "Bad parameter" })
        console.error({ "msg" : "Bad parameter" })
        console.error(error)
        return
    }
    const id = `SELECT id FROM user WHERE email=${user.email};`;
    token = jwt.sign(id, jwtSecretKey)
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
    })
    res.json({ token : token})
    console.log({"Successfully created an account for": `${user.email}`, "with this token": `${token}`})
    return token
});

module.exports = router;