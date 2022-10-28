const express = require('express')
const dotenv = require('dotenv').config()
const db = require('./database/db-connection')
const hospitalRouter = require('./src/api/hospital/hospital-router')
const indexrouter = require('./src/router/indexrouter')
const session = require('express-session');

const app = express();
const PORT = 3000;

//database connection
db.connect(e=> {
    if (e) throw e
    else console.log("db connection success"); 
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(session({secret:process.env.SECRET_KEY_SESSION, cookie:{maxAge:60000000}}))


app.use(session({cookie: {  path: '/', maxAge: 60000000}, secret: process.env.SECRET_KEY_SESSION}));

app.use('/', indexrouter)

app.use('/api/hospitals', hospitalRouter)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

