/* init dotenv */
require('dotenv').config()

/* init express */
const express = require("express");
const app = express();

const port = process.env.PORT;

const routerUser = require('./routes/user/user.js');



app.use("/user", routerUser);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
