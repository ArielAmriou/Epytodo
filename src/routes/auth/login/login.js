const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../../../config/db.js');
const check_token = require('../check_token');

function create_token(id) {
    let jwtSecretKey = process.env.SECRET

    return jwt.sign({"id": `${id}`}, jwtSecretKey)
}
router.post('/', async (req, res) => {
    //initialisation des variables/création des query
    let user = req.body;
    let newToken = null
    let id = null
    const passwordQuery = `SELECT password FROM user WHERE email="${user.email}"`;
    let password = null
    let checkPassword = null
    const id_query = `SELECT id FROM user WHERE email="${user.email}";`

    //teste si l'email est présente dans la db
    try {
        id = await db.promise().query(id_query)
    } catch (error) {
        res.json({"msg": "Invalid Credentials"})
        console.error({"msg": `Bad Credentials for : ${user.email} user isn't in db`});
        return
    }
    password = await db.promise().query(passwordQuery)
    //deuxième check parcequ'on a jamais trop d'error handling
    try {
        checkPassword = await bcrypt.compare(user.password, password[0][0].password)
    } catch (error) {
    res.json({"msg": "Invalid Credentials"})
    console.error({"msg": `Bad Credentials for : ${user.email} user isn't in db`});
    return
    }
    //si le password est bon on créé un token, sinon on renvoie un message d'erreur
    if (checkPassword) {
        newToken = create_token(id)
        res.json({"token": `${newToken}`})
        console.log({"msg": `Successfully logged in : ${user.email}`})
        return newToken
    } else {
        res.json({"msg": "Invalid Credentials"})
        console.error({"msg": `Bad Credentials for : ${user.email}`})
    }
});

module.exports = router;