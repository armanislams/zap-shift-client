import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
      <div className="max-w-7xl mx-auto">
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
        <ToastContainer/>
      </div>
    );
};

export default Root;