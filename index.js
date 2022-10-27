const express = require('express')
const dotenv = require('dotenv').config()
const db = require('./database/db-connection')
const hospitalRouter = require('./src/api/hospital/hospital-router')
const indexrouter = require('./src/router/indexrouter')

const app = express();
const PORT = 5000;

//database connection
db.connect(e=> {
    if (e) throw e
    else console.log("db connection success"); 
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', indexrouter)
app.use('/api/hospitals', hospitalRouter)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

