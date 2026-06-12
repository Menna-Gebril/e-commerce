import React, { useState } from "react";
import classes from "./HomeNextArrow.module.css";
export default function HomeNextArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="w-10 h-10 rounded-full bg-gray-100 text-green-500
      flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2
       z-10 cursor-pointer shadow-md hover:bg-gray-200 transition"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </>
  );
}
