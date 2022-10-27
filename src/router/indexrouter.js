const express = require("express")
const indexrouter = express.Router()
const {getLandingPage } = require('../api/hospital/hospital-controller')
 
indexrouter.get('/', getLandingPage)




module.exports = indexrouter;