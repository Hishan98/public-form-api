const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose")

//Configuration
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to MongoDB.."));

//routes 
const postsRoute = require('./routes/postsRoute');
const commentRoute = require('./routes/commentRoute');
const usrGenRoute = require('./routes/usrGenRoute');
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//route middlewares
app.use('/api', postsRoute);
app.use('/api', commentRoute);
app.use('/api', usrGenRoute);

app.listen(port, () => console.log(`Server up and running on port ${port}...`));