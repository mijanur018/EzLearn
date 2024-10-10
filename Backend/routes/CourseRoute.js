const express=require('express')
const CourseController =require('../controller/CourseController')
const {isAuth}=require('../middlewares/isAuth')
const router=express.Router();

router.get("/getallcourse", CourseController.getAllCourses);
router.get("/getsinglecourse/:id", CourseController.getSingleCourse);
router.get("/fetchalllectures/:id", isAuth,CourseController.fetchallLectures);
router.get("/fetchsinglelecture/:id", isAuth,CourseController.fetchsingleLecture);
router.get("/mycourse", isAuth,CourseController.getMyCourses);
router.post("/checkout/:id", isAuth,CourseController.checkout);
router.post("/verification/:id", isAuth,CourseController.paymentVerification);






module.exports=router
