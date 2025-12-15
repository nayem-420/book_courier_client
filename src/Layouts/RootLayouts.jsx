import React from 'react';

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