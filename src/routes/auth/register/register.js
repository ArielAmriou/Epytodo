const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../../../config/db.js');


router.post('/', async (req, res) => {

    let user = req.body;
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)
    const insertQuery = `INSERT INTO user (email, name, firstname, password) VALUES ("${user.email}", "${user.name}", "${user.firstname}", "${user.password}");`;
    try {
        await db.promise().query(insertQuery);
    } catch (error) {
        res.json({ "msg" : "Bad parameter" })
        console.error({ "msg" : "Bad parameter" })
        console.error(error)
    }
    res.json("Success")
    console.log(`Successfully created an account for ${user.email}`)
});

module.exports = router;