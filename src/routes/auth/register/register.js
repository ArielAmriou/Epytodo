const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../../../config/db.js');


router.post('/', async (req, res) => {

    let user = req.body;
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)
    const insertQuery = `INSERT INTO user (password, name, firstname, email) VALUES ("${user.password}", "${user.name}", "${user.firstname}", "${user.email}");`;
    try {
        await db.promise().query(insertQuery);
    } catch (error) {
        res.json({ "msg" : "Bad parameter" })
        console.error('{ "msg" : "Bad parameter" }')
        console.error(error)
    }
    res.json(`{Successfully created an account for ${user.firstname}}`)
});

module.exports = router;