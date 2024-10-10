import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { SiStudyverse } from "react-icons/si";

const Header = ({ isAuth }) => {
  return (
    <header>
      
        <div className="logo"><SiStudyverse size={'1em'} />  EzLearn</div>

        <div className="link">
          <Link to={"/"}>Home</Link>
          <Link to={"/courses"}>Courses</Link>
          <Link to={"/about"}>About</Link>
          {isAuth ? (
            <Link to={"/account"}><FaRegCircleUser size={'1.5em'} /></Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      

    </header>
  );
};

export default Header;