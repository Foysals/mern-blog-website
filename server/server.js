const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config('');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const dashboardRouter = require('./routes/dashboard.route');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
connectDB();

app.use(cors());
 

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use(express.json({ extended: false }));

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));



//DASHBOARD ROUTE
app.use("/",dashboardRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
