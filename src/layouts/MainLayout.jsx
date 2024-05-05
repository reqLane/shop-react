import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {Outlet} from "react-router-dom";

const MainLayout = () =>{
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout;