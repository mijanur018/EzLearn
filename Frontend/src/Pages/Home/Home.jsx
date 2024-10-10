import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../Components/Testimonials/Testimonial";
import heroel from "../../assets/book.avif"



const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="main">
        <div className="home" >
          <h1>Welcome to EzLearn</h1>
          <div className="imgbc">
            <img src={heroel} alt="hero" />
          </div>
          <div className="home-content">
            <h2>Develop your Skills in a New and Unique Way</h2>
            <p>Learn, Grow, Excel</p>
            <button onClick={() => navigate("/courses")} className="common-btn">
              Get Started
            </button>
          </div>

        </div>
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;