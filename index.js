const express = require('express')
const dotenv = require('dotenv').config()
const db = require('./database/db-connection')

const app = express();
const PORT = 5000;

db.connect(e=> {if (e) throw e
else console.log("db connection success"); })
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/hospitals', require('./src/api/hospital/hospital-router'))


app.listen(PORT, () => {
    console.log("server is running on port 5000");
});

