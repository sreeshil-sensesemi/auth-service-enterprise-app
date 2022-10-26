
const db = require('../../../database/db-connection')
const { sendOtp, verifyOtp } = require('../../utils/otpConfig')


//login with mobile number
// @route POST => /api/hospitals/login
const mobileNumberLogin = async (req, res)=> {
   
    const {phonenumber: PhoneNumber} = req.body;
    db.query('SELECT * FROM hospitals WHERE PhoneNumber = ?', [PhoneNumber], async(stop, chkhospital) => {
        if (stop) throw stop

        if (chkhospital[0]) {
            //twillio otp  sent 
            //const sendOtpRes = await sendOtp(PhoneNumber);

            return res.json({status: 1, message: "OTP sent successfully"}) 

        } else {
            return res.json({status:0, message: "not registered redirect to register page"})
        }
    })

}



// hospital register
// @route POST => /api/hospitals/register
const register = async (req, res) => {
    
    const {hospitalname:HospitalName, phonenumber:PhoneNumber, email:Email, city:City } = req.body;

    db.query('SELECT PhoneNumber FROM  hospitals WHERE PhoneNumber = ?', [PhoneNumber], async (stop, chkhospital) =>  {
        if (stop) throw stop
        if (chkhospital[0]) return res.json({status: 0, message: "hospital already exists"})

      
        db.query('INSERT INTO hospitals SET ?' ,{HospitalName, PhoneNumber, Email, City}, (err, result) => {
            if (err) throw err
            return res.json({status: 1, message:" Hospital has been registered"})
        
        })
    })
}

//otp verify 
// @route POST => /api/hospitals/checkotp
const checkEnteredOtp = async (req, res) => {
    const {otp} = req.body;
    // twillio otp verify
    const verifyOtpRes = await verifyOtp(otp, userData.phonenumber)

}

// homepage
// @route get => /api/hospitals/home




//testing server
const test = async (req, res) => {
    
    console.log("test ok");
    res.send("success");
}



module.exports = {register, mobileNumberLogin, checkEnteredOtp, test};