import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../Context/CourseContext";

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const { user, isAuth } = UserData();

    const { fetchCourses } = CourseData();

    const deleteHandler = async (id) => {
        if (confirm("Are you sure you want to delete this course")) {
            try {
                const { data } = await axios.delete(`${server}/admin/deletecourse/${id}`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });

                toast.success(data.message);
                fetchCourses();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };
    return (
        <div className="course-card">
            <img src={`${server}/${course.image}`} alt="" className="course-image" />
            <h3>{course.title}</h3>
            <p>Instructor- {course.createdBy}</p>
            <p>Duration- {course.duration} weeks</p>
            <p>Price- ₹{course.price}</p>
            {isAuth ? (                 // check authenticated or not?
                <>
                    {user && user.role !== "admin" ? (      //user is not admin
                        <>
                            {user.subscription.includes(course._id) ? (  //subscription array te check korbe id ta a6e ki na?
                                <button
                                    onClick={() => navigate(`/course/study/${course._id}`)}  //jodi thake study page
                                    className="common-btn-card"
                                >
                                    Study
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate(`/course/${course._id}`)} //na thakle subcription page
                                    className="common-btn-card"
                                >
                                    Get Started
                                </button>
                            )}
                        </>
                    ) : (
                        <button                 //admin hole direct study page
                            onClick={() => navigate(`/course/study/${course._id}`)}
                            className="common-btn-card"
                        >
                            Study
                        </button>
                    )}
                </>
            ) : (           //auth no hoi..then login korte hobe
                <button onClick={() => navigate("/login")} className="common-btn-card">
                    Get Started
                </button>
            )}

            <br />

            {user && user.role === "admin" && (         //use admin hole delete button
                <button
                    onClick={() => deleteHandler(course._id)}
                    className="common-btn-card"
                    style={{ background: "red" }}
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default CourseCard;