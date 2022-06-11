"use strict"; 
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');
const logger = require('./middleware/logger');


app.get("/",(req,res) => {
    res.send("This is the home page");
})
// app.get("/foods",(req,res) => {
//     res.status(500).send("500 internal error");
// })

app.use(express.json());
app.use(logger);
app.use(foodRouter);
app.use(clothesRouter);
app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};