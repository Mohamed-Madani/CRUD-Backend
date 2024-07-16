const express = require("express");
const connectDB = require("./config/db");
const dotenv = require('dotenv').config();
const port = 5000;

//connect to db
connectDB();

const app = express();

//middlewares qui permet de traiter les requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    "/post",
    require("./routes/post.routes")
);

//lancer le serveur express
app.listen (
    port, () => console.log (`Server is running on port ${port}`)
);