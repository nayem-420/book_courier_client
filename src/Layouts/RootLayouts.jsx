import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const RootLayouts = () => {
    return (
      <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
        <Navbar></Navbar>
        <div className="flex-1 my-8">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default RootLayouts;