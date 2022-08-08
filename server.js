const express = require('express');
require("dotenv").config({path:"./config/.env"})

const connectDB = require('./config/connectDB');

connectDB();

const app = express();

// middleware routing body parse 
app.use(express.json());
//create route
app.use("/api/contact", require('./routes/contactRoutes'))

const PORT = process.env.PORT || 5000 ;

app.listen(PORT , (err)=>
err? console.log(err)
:console.log(`server is running on Port ${PORT}`))
