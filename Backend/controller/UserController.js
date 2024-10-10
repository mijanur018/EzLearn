const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../middlewares/sendmails');
const UserModel = require('../model/UserModel');

class UserController {
    static register = async (req, res) => {
        try {
            const { email, name, password } = req.body;
            let user = await UserModel.findOne({ email }); // Check if email already exists
            if (user) {
                return res.status(400).json({
                    msg: "User already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            user = {
                name,
                email,
                password: hashedPassword
            };

            const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

            const activationToken = jwt.sign(
                { user, otp },
                process.env.activation_secret,
                { expiresIn: "5m" }
            );

            const data = { name, otp };
            await sendMail(email, "E-learning OTP Verification", data); // Send OTP via email

            res.status(200).json({
                msg: "OTP sent to your email",
                activationToken // Send activation token to client
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error during registration" });
        }
    }

    static verifyUser = async (req, res) => {
        try {
            const { otp, activationToken } = req.body;
    
            console.log("Client OTP:", otp); // Log OTP from client
    
            // Verify the activation token
            let verify;
            try {
                verify = jwt.verify(activationToken, process.env.activation_secret);
                // console.log("Decoded Token:", verify); // Log decoded token
            } catch (err) {
                return res.status(400).json({ msg: "Invalid or expired token" });
            }
    
            // Check if the OTP matches
            if (verify.otp != otp) {
                return res.status(400).json({ msg: "Wrong OTP" });
            }
    
            // Create the user in the database
            await UserModel.create({
                name: verify.user.name,
                email: verify.user.email,
                password: verify.user.password
            });
    
            res.json({ msg: "User registered successfully!" });
    
        } catch (error) {
            console.error("Verification error:", error.message);
            res.status(500).json({ msg: "Server error during verification" });
        }
    }
    

    static loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) return res.status(400).json({ msg: "No user with this email" });

            const mathPassword = await bcrypt.compare(password, user.password);
            if (!mathPassword) return res.status(400).json({ msg: "wrong Password" });

            const token = jwt.sign({ _id: user._id }, process.env.activation_secret, {
                expiresIn: "15d",
            });

            res.json({ message: `Welcome back ${user.name}`, token, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error during registration" });
        }
    }

    static myProfile = async (req, res) => {
        try {
            const user = await UserModel.findById(req.user._id);
            res.json({ user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error during registration" });
        }
    }
}

module.exports = UserController;
