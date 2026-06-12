import React, { useState } from "react";
import classes from "./NextArrow.module.css";
export default function NextArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="next-arrow w-10 h-10 rounded-full bg-gray-100 text-black 
      flex items-center justify-center absolute right-0 -top-12 
       z-10 cursor-pointer shadow-md hover:bg-gray-200 transition"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </>
  );
}
