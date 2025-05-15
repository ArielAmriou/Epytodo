/* init dotenv */
const dotenv = require('dotenv').config()

/* init express */
const express = require("express");
const app = express();


const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

const routerUser = require('./routes/user/user.js');
const routerRegister = require('./routes/auth/register/register.js');
const routerLogin = require('./routes/auth/login/login.js');

app.use("/user", routerUser);
app.use("/register", routerRegister);
app.use("/login", routerLogin)
app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
