/* init dotenv */
require('dotenv').config()

/* init express */
const express = require("express");
const app = express();

/* init server */
const { createServer } = require('node:http');

const port = process.env.PORT;

require('dotenv').config()

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.get("/", (req , res) => {
    res.send("Hello World !");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
