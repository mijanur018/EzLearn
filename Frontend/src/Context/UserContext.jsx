import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]); //user data store
    const [isAuth, setIsAuth] = useState(false); //true and false toggle
    const [btnLoading, setBtnLoading] = useState(false); //button loading(please wait)


    async function loginUser(email, password, navigate) { //ei func. cl hobe jokhon login.jsx e submit click hobe
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/user/loginUser`, {
                email,
                password,
            });

            toast.success(data.message);
            localStorage.setItem("token", data.token); //loaclStorage e token store kora ho66e
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");

        } catch (error) {
            setBtnLoading(false);
            setIsAuth(false);
            toast.error(error.response.data.message);
        }
    }


    async function registerUser(name, email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/user/register`, {
                name,
                email,
                password,
            });

            toast.success(data.message);
            localStorage.setItem("activationToken", data.activationToken);
            setBtnLoading(false);
            navigate("/verify");
        } catch (error) {
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }

    async function verifyOtp(otp, navigate) {
        setBtnLoading(true);
        const activationToken = localStorage.getItem("activationToken");
        try {
            const { data } = await axios.post(`${server}/user/verify`, {
                otp: Number(otp),
                activationToken,
            });

            toast.success(data.message);
            navigate("/login");
            localStorage.clear();
            setBtnLoading(false);
        } catch (error) {
            toast.error(error.response.data.msg);
            setBtnLoading(false);
        }
    }

    async function fetchUser() {
        try {
            const { data } = await axios.get(`${server}/user/Profile`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });

            setIsAuth(true);
            setUser(data.user);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider // provider er value jekono jaigai use korte pari
            value={{
                user,
                setUser,
                setIsAuth,
                isAuth,
                loginUser,
                btnLoading,
                registerUser,
                verifyOtp,
                fetchUser,
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);