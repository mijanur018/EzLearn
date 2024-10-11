import React from "react";
import "./Footer.css";
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>
                    &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
                    with  <a href="">Sk Mijanur Rahaman</a>
                </p>
                <div className="social-links">
                    <a href="">
                        <AiFillFacebook />
                    </a>
                    <a href="">
                        <AiFillTwitterSquare />
                    </a>
                    <a href="">
                        <AiFillInstagram />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
