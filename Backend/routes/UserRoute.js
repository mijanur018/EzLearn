const express=require('express')
const Usercontroller=require('../controller/UserController');
const { isAuth } = require('../middlewares/isAuth');
const router=express.Router();

router.post('/register',Usercontroller.register)
router.post('/verify',Usercontroller.verifyUser)
router.post('/loginUser',Usercontroller.loginUser)
router.get('/Profile',isAuth,Usercontroller.myProfile)


module.exports=router