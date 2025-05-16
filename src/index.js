/* init dotenv */
const dotenv = require('dotenv').config()

/* init express */
const express = require("express");
const app = express();


const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

const routerUsers = require('./routes/user/users.js');
const routerRegister = require('./routes/auth/register/register.js');
const routerLogin= require('./routes/auth/login/login.js');
const routerUserInfo = require('./routes/user/user')
//const routerTodos = require('./routes/todos/todos.js')

app.use("/users", routerUsers)
app.use("/register", routerRegister)
app.use("/login", routerLogin)
app.use("/user", routerUserInfo)
//app.use("/todos", routerTodos)
/*app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});*/
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
