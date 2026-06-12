import React, { useState } from "react";
import classes from "./LayOut.module.css";
import CustomNavbar from "../Navbar/CustomNavbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop.jsx";

export default function LayOut() {
  return (
    <>
      <CustomNavbar />
      <ScrollToTop/>
      <Outlet />
      <Footer />
    </>
  );
}
