import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Add_User from './pages/admin_p/add_users';
import StudentPortal from './pages/student/student-portal';
import TeacherPortal  from './pages/teacher/teacher-portal';
import Remove_user  from './pages/admin_p/remove_users';
import Courses from './pages/student/courses';
import { Bounce, ToastContainer } from "react-toastify";
import DashBoard_Home from './pages/admin_p/admin_dashboard';
import List_Students  from './pages/admin_p/list_students';
import List_Teachers from './pages/admin_p/list_teachers';
import RegisterCourses from './pages/student/reg_courses';

import "react-toastify/dist/ReactToastify.css";


function App() {



  return (

    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard_Home />} />
        <Route path="/dashboard/add-user" element={<Add_User />} />
        <Route path="/studentportal" element={<StudentPortal />} />
        <Route path="/teacherportal" element={<TeacherPortal />} />
        <Route path="/dashboard/remove-user" element={<Remove_user />} />
        <Route path="/dashboard/list-students" element={<List_Students />} />
        <Route path="/dashboard/list-teachers" element={<List_Teachers />} />
        <Route path="/studentportal/courses" element={<Courses />} />
        <Route path="/studentportal/course-registration" element={<RegisterCourses />} />


      </Routes>
    </Router>

   
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;