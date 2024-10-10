import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
    const { setIsAuth, setUser } = UserData();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.clear();
        setUser([]);
        setIsAuth(false);
        toast.success("Logged Out");
        navigate("/login");
    };
    return (
        <div className="main">
            <div className="backgr">
                {user && (                  //jodi user thake taholei value gulo show korbe
                    <div className="profile">
                        <h2>My Profile</h2>
                        <div className="profile-info">
                            <p>
                                <strong>Name - {user.name}</strong>
                            </p>

                            <p>
                                <strong>Email - {user.email}</strong>
                            </p>

                            <button
                                onClick={() => navigate(`/${user._id}/dashboard`)}
                                className="profile-btn"
                            >
                                <MdDashboard />
                                Dashboard
                            </button>

                            <br />

                            {user.role === "admin" && (
                                <button
                                    onClick={() => navigate(`/admin/dashboard`)}
                                    className="profile-btn"
                                >
                                    <MdDashboard />
                                    Admin Dashboard
                                </button>
                            )}

                            <br />

                            <button
                                onClick={logoutHandler}
                                className="profile-btn"
                                style={{ background: "red" }}
                            >
                                <IoMdLogOut />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;