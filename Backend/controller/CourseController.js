const Coursemodel = require('../model/CoursesModel')
const UserModel = require('../model/UserModel')
const LectureModel = require('../model/LectureModel')
const paymentModel=require('../model/payment')
const crypto =require('crypto')
// const instance =require('../server')
const instance = require("../razorpayInstance.js");
class CourseController {
    static getAllCourses = async (req, res) => {
        try {
            const courses = await Coursemodel.find();
            res.json({
                courses,
            });
        } catch (error) {
            console.log(error)
        }
    };

    static getSingleCourse = async (req, res) => {
        try {
            const course = await Coursemodel.findById(req.params.id);

            res.json({
                course,
            });
        } catch (error) {
            console.log(error)
        }

    };

    static fetchallLectures = async (req, res) => {
        try {
            const lectures = await LectureModel.find({ course: req.params.id });

            const user = await UserModel.findById(req.user._id);

            if (user.role === "admin") {
                return res.json({ lectures });
            }

            if (!user.subscription.includes(req.params.id))
                return res.status(400).json({
                    message: "You have not subscribed to this course",
                });

            res.json({ lectures });
        } catch (error) {
            console.log(error)
        }

    };

    static fetchsingleLecture = async (req, res) => {
        try {
            const lecture = await LectureModel.findById(req.params.id);

            const user = await UserModel.findById(req.user._id);

            if (user.role === "admin") {
                return res.json({ lecture });
            }

            if (!user.subscription.includes(lecture.course))
                return res.status(400).json({
                    message: "You have not subscribed to this course",
                });

            res.json({ lecture });
        } catch (error) {
            console.log(error)
        }
    }

    static getMyCourses = async (req, res) => {
        try {
            const courses = await Coursemodel.find({ _id: req.user.subscription });
            console.log(req.user);
            res.json({
                courses,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static checkout = async (req, res) => {
        try {
            const user = await UserModel.findById(req.user._id);

            const course = await Coursemodel.findById(req.params.id);

            if (user.subscription.includes(course._id)) {
                return res.status(400).json({
                    message: "You already have this course",
                });
            }

            const options = {
                amount: Number(course.price * 100),
                currency: "INR",
            };

            const order = await instance.orders.create(options)

            res.status(201).json({
                order,
                course,
            });
        } catch (error) {
            console.log(error);
        }

    };

    static paymentVerification = async (req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
                req.body;

            const body = razorpay_order_id + "|" + razorpay_payment_id;

            const expectedSignature = crypto
                .createHmac("sha256", process.env.Razorpay_Secret)
                .update(body)
                .digest("hex");

            const isAuthentic = expectedSignature === razorpay_signature;

            if (isAuthentic) {
                await paymentModel.create({
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                });

                const user = await UserModel.findById(req.user._id);

                const course = await Coursemodel.findById(req.params.id);

                user.subscription.push(course._id);

                await user.save();

                res.status(200).json({
                    message: "Course Purchased Successfully",
                });
            } else {
                return res.status(400).json({
                    message: "Payment Failed",
                });
            }
        }
        catch (error) {
            console.log(error)
        }
    }


}

module.exports = CourseController;