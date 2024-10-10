import React from "react";
import "./dashbord.css";
import { CourseData } from "../../Context/CourseContext";
import CourseCard from "../../Components/Coursecard/CourseCard";

const Dashboard = () => {
  const { mycourse } = CourseData();
  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No course Enrolled Yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;