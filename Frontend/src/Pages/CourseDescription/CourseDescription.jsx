import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../Context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../Context/UserContext";


const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate();

    const { fetchUser } = UserData();

    const { fetchSinlgeCourse, course, fetchallCourses, fetchMyCourse } = CourseData();

    useEffect(() => {
        fetchSinlgeCourse(params.id);
    }, []);

    const checkoutHandler = async () => {
        const token = localStorage.getItem("token");
        
        const {
            data: { order },
        } = await axios.post(
            `${server}/course/checkout/${params.id}`,
            {},
            {
                headers: {
                    token,
                },
            }
        );

        const options = {
            key: "rzp_test_Se3NYFdpwn7AeY", // Enter the Key ID generated from the Dashboard
            amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "E learning", //your business name
            description: "Learn with us",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

            handler: async function (response) {
                const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
                    response;

                try {
                    const { data } = await axios.post(
                        `${server}/course/verification/${params.id}`,
                        {
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature,
                        },
                        {
                            headers: {
                                token,
                            },
                        }
                    );
                    await fetchUser();
                    await fetchallCourses();
                    await fetchMyCourse();
                    toast.success(data.message);
                    navigate(`/payment-success/${razorpay_payment_id}`);
                } catch (error) {
                    toast.error(error.response.data.message);
                    
                }
            },
            theme: {
                color: "#8a4baf",
            },
        };
        const razorpay = new window.Razorpay(options);

        razorpay.open();
    };

    return (

        <>
            {course && (
                <div className="description">
                    <div className="course-card">
                        <div className="">
                            <img
                                src={`${server}/${course.image}`}
                                alt=""
                                className="course-image"
                            />
                            <div className="course-info">
                                <h2>{course.title}</h2>
                                <p>Instructor: {course.createdBy}</p>
                                <p>Duration: {course.duration} weeks</p>
                            </div>
                        </div>

                        <p>{course.description}</p>

                        <p>Let's get started with course At ₹{course.price}</p>

                        {user && user.subscription.includes(course._id) ? (
                            <button
                                onClick={() => navigate(`/course/study/${course._id}`)}
                                className="common-btn"
                            >
                                Study
                            </button>
                        ) : (
                            <button onClick={checkoutHandler} className="common-btn">
                                Buy Now
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>


    );
};

export default CourseDescription;