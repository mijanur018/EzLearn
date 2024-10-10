const jwt = require('jsonwebtoken')
const User = require('../model/UserModel')

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token)
            return res.status(403).json({
                message: "Please Login",
            });

        const decodedData = jwt.verify(token, process.env.activation_secret);
        req.user = await User.findById(decodedData._id);
        

        next();
    } catch (error) {
        res.status(500).json({
            message: "Login First",
        });
    }
};

const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({
                message: "You are not admin",
            });

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports={isAuth,isAdmin}