
const db = require('../../../database/db-connection')
const { sendOtp, verifyOtp } = require('../../utils/otpConfig')


//login with mobile number
// @route POST => /api/hospitals/login
const getLandingPage = async (req, res) => {
    console.log(req.session, " req.session.userData in landing route");

    res.send("landing page")

}

//login with mobile number
// @route POST => /api/hospitals/login
const mobileNumberLogin = async (req, res) => {

    try {
        const { phonenumber: PhoneNumber } = req.body;
        db.query('SELECT * FROM hospitals WHERE PhoneNumber = ?', [PhoneNumber], async (stop, chkhospital) => {
            if (stop) throw stop

            if (chkhospital[0]) {
                console.log(chkhospital[0], " =checkhospital");
                req.session.hospitalDetails = chkhospital[0]
                req.session.enteredNumber = PhoneNumber

                //twillio otp  sent 
                const sendOtpRes = await sendOtp(chkhospital[0].PhoneNumber);

                return res.json({ status: 1, message: "OTP sent successfully" })

            } else {
                return res.json({ status: 0, message: "not registered redirect to register page" })
            }
        })

    } catch (error) {
        console.log(error);
        return res.json({ status: 400, message: "internal server error" })
    }

}



// hospital register
// @route POST => /api/hospitals/register
const register = async (req, res) => {

    try {
        const { hospitalname: HospitalName, phonenumber: PhoneNumber, email: Email, city: City } = req.body;

        db.query('SELECT PhoneNumber FROM  hospitals WHERE PhoneNumber = ?', [PhoneNumber], async (stop, chkhospital) => {
            if (stop) throw stop
            if (chkhospital[0]) return res.json({ status: 0, message: "hospital already exists" })


            const hospital = {
                hospitalname: HospitalName,
                phonenumber: PhoneNumber,
                email: Email,
                city: City
            }
            req.session.hospitalData = hospital

            const sendOtpRes = await sendOtp(PhoneNumber);

            return res.json({ status: 200, message: " OTP sent successfully, Enter the OTP to continue" })
        })

    } catch (error) {
        console.log(error);
        return res.json({ status: 400, message: "internal server error" })
    }

}

//otp verify for register 
// @route POST => /api/hospitals/checkotp
const verifyEnteredOtp = async (req, res) => {

    try {
        const { otp } = req.body;
        const { hospitalname: HospitalName, phonenumber: PhoneNumber, email: Email, city: City } = req.session.hospitalData

        // twilio otp verify
        const verifyOtpRes = await verifyOtp(otp, PhoneNumber)

        if (verifyOtpRes) {
            if (verifyOtpRes.status == 'approved' && verifyOtpRes.valid == true) {

                db.query('INSERT INTO hospitals SET ?', { HospitalName, PhoneNumber, Email, City }, (err, result) => {
                    if (err) throw err

                    return res.json({ status: 201, message: " Hospital has been registered successfully" })

                })

            } else {
                return res.status(400).json({ verified: false, message: "OTP verification failed " })
            }

        } else {
            return res.status(400).json({ verified: false, message: "OTP verification failed " })
        }


    } catch (error) {
        console.log(error);
        return res.json({ status: 0, message: "internal server error" })
    }
}

//otp verify  for login
// @route POST => /api/hospitals/checkotp
const checkEnteredOtp = async (req, res) => {

    try {
        const { otp } = req.body;
        const hospitalData = req.session.hospitalDetails
        const { hospitalID, PhoneNumber } = req.session.hospitalDetails

        // twillio otp verify
        const verifyOtpRes = await verifyOtp(otp, PhoneNumber)

        if (verifyOtpRes) {
            if (verifyOtpRes.status == 'approved' && verifyOtpRes.valid == true) {

                    return res.status(200).json({ message: "OTP verification success", verified:true ,hospitalData: hospitalData})
            } else {
                return res.status(400).json({ verified: false, message: "OTP verification failed " })
            }

        } else {
            return res.status(400).json({ verified: false, message: "OTP verification failed " })
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: 400, message: "internal server error" })
    }
}

// homepage
// @route get => /api/hospitals/home




//resend otp
//@route get => /api/hospitals/resendotp
const resendOTP = async (req, res) => {
  try {

    const PhoneNumber = req.session.enteredNumber
     //twillio otp  sent 
     const sendOtpRes = await sendOtp(PhoneNumber);

     return res.json({ status: 200, message: "OTP resend successfully" })
    
  } catch (error) {
    console.log(error); 
    return res.json({ status: 400, message: "internal server error" })
  }
}

//testing server
const test = async (req, res) => {
    console.log(req.session, " req.session.userData in test");
    console.log("test ok");
    res.send("success");
}



module.exports = { register, mobileNumberLogin, checkEnteredOtp, test, getLandingPage, verifyEnteredOtp, resendOTP};