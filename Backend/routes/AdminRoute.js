const express=require('express');
const { isAuth, isAdmin } = require('../middlewares/isAuth');
const AdminController=require('../controller/AdminController')
const uploadFiles = require('../middlewares/multer');

const router=express.Router();

router.post('/createcourse',isAuth,isAdmin,uploadFiles,AdminController.createCourse)
router.post('/addlecture/:id',isAuth,isAdmin,uploadFiles,AdminController.addLectures)
router.delete('/deletelecture/:id',isAuth,isAdmin,AdminController.deleteLecture)
router.delete('/deletecourse/:id',isAuth,isAdmin,AdminController.deleteCourse)
router.get('/getallstats',isAuth,isAdmin,AdminController.getAllStats);
router.put("/user/:id", isAuth, isAdmin, AdminController.updateRole);
router.get("/users", isAuth, isAdmin, AdminController.getAllUser);






module.exports=router