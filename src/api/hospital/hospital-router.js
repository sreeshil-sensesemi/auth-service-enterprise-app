const express = require("express")
const router = express.Router()
const {register, checkEnteredOtp, mobileNumberLogin ,test, verifyEnteredOtp, resendOTP} = require("./hospital-controller")


router.post('/register', register)
router.post('/login', mobileNumberLogin)
//router.post('/mobilenumber', mobileNumberLogin)

//verify entered otp for register
router.post('/verifyotp', verifyEnteredOtp)

//check entered otp for login
router.post('/checkotp', checkEnteredOtp)

//resend otp
router.get('/resendotp', resendOTP)

//home
//router.get('/home', home)

router.get('/test', test)

module.exports = router;