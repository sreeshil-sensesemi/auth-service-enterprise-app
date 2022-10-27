const express = require("express")
const router = express.Router()
const {register, checkEnteredOtp, mobileNumberLogin ,test} = require("./hospital-controller")


router.post('/register', register)
router.post('/login', mobileNumberLogin)
//router.post('/mobilenumber', mobileNumberLogin)

//check entered otp
router.post('/checkotp', checkEnteredOtp)

//home
//router.get('/home', home)

router.get('/test', test)

module.exports = router;