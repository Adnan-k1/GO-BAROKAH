import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();
  const noLayoutPages = ["/login", "/signup"];
  const showLayout = !noLayoutPages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      {showLayout && <Navbar />}
      <main className="flex-grow">
        <Outlet /> 
      </main>
      {showLayout && <Footer />}
    </div>
  );
};

export default MainLayout;