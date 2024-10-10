import React from 'react'
import './app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Courses from './Pages/Coureses/Courses'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Account from './Pages/Account/Account'
import Footer from './Components/Footer/Footer'
import { UserData } from './Context/UserContext'
import Verify from './Pages/Auth/Verify'
import CourseDescription from './Pages/CourseDescription/CourseDescription'
import PaymentSuccess from "./Pages/PaymentSuccess/PaymentSuccess";
import Dashboard from './Pages/Dashboard/Dashboard'
import CourseStudy from './Pages/CourseStudy/CourseStudy'
import Lecture from './Pages/Lecture/Lecture'
import AdminDashbord from './Admin/DashBoard/AdminDashboard'
import AdminCourses from './Admin/Courses/AdminCourses'
import AdminUsers from './Admin/Users/AdminUsers'


const App = () => {
  const { isAuth, user } = UserData();
  return (
    <>
      <BrowserRouter>
        <Header isAuth={isAuth} />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
          <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          <Route path="/register" element={isAuth ? <Home /> : <Register />} />
          <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          <Route path="/course/:id" element={isAuth ? <CourseDescription user={user} /> : <Login />} />
          <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user={user} /> : <Login />} />
          <Route path="/:id/dashboard" element={isAuth ? <Dashboard user={user} /> : <Login />} />
          <Route path="/course/study/:id" element={isAuth ? <CourseStudy user={user} /> : <Login />} />
          <Route path="/lectures/:id" element={isAuth ? <Lecture user={user} /> : <Login />} />
          <Route path="/admin/dashboard" element={isAuth ? <AdminDashbord user={user} /> : <Login />} />
          <Route path="/admin/course" element={isAuth ? <AdminCourses user={user} /> : <Login />} />
          <Route path="/admin/users" element={isAuth ? <AdminUsers user={user} /> : <Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
