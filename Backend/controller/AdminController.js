const Coursemodel = require('../model/CoursesModel')
const LectureModel = require('../model/LectureModel')
const UserModel = require('../model/UserModel')
const { rm } = require('fs')
const { promisify } = require('util')
const fs = require('fs')
const unlinkAsync = promisify(fs.unlink);


class AdminController {
    static createCourse = async (req, res) => {
        try {
            const { title, description, category, createdBy, duration, price } = req.body;

            const image = req.file;

            await Coursemodel.create({
                title,
                description,
                category,
                createdBy,
                image: image?.path,
                duration,
                price,
            });

            res.status(201).json({
                message: "Course Created Successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error during registration" });
        }
    }

    static addLectures = async (req, res) => {

        try {
            const course = await Coursemodel.findById(req.params.id);

            if (!course)
                return res.status(404).json({
                    message: "No Course with this id",
                });

            const { title, description } = req.body;

            const file = req.file;

            const lecture = await LectureModel.create({
                title,
                description,
                video: file?.path,
                course: course._id,
            });

            res.status(201).json({
                message: "Lecture Added",
                lecture,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error during registration" });
        }

    };

    static deleteLecture = async (req, res) => {
        try {
            const lecture = await LectureModel.findById(req.params.id);

            rm(lecture.video, () => {
                console.log("Video deleted");
            });

            await lecture.deleteOne();

            res.json({ message: "Lecture Deleted" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error during registration" });
        }
    }


    static deleteCourse = async (req, res) => {

        try {
            const course = await Coursemodel.findById(req.params.id);

            const lectures = await LectureModel.find({ course: course._id });

            await Promise.all(
                lectures.map(async (lecture) => {
                    await unlinkAsync(lecture.video);
                    console.log("video deleted");
                })
            );
            rm(course.image, () => {
                console.log("image deleted");
            });

            await LectureModel.find({ course: req.params.id }).deleteMany();

            await course.deleteOne();

            await UserModel.updateMany({}, { $pull: { subscription: req.params.id } });

            res.json({
                message: "Course Deleted",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error during registration" });
        }

    }
    static getAllStats = async (req, res) => {
        try {
            const totalCoures = (await Coursemodel.find()).length;
            const totalLectures = (await LectureModel.find()).length;
            const totalUsers = (await UserModel.find()).length;

            const stats = {
                totalCoures,
                totalLectures,
                totalUsers,
            };

            res.json({
                stats,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error during registration" });
        }
    }

    static getAllUser = async (req, res) => {
        try {
            const users = await UserModel.find({ _id: { $ne: req.user._id } }).select(
                "-password"
            )

            res.json({ users });
        } catch (error) {
            console.log(error)
        }
    }

    static updateRole = async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);

            if (user.role === "user") {
                user.role = "admin";
                await user.save();

                return res.status(200).json({
                    message: "Role updated to admin",
                });
            }

            if (user.role === "admin") {
                user.role = "user";
                await user.save();

                return res.status(200).json({
                    message: "Role updated",
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
}




module.exports = AdminController