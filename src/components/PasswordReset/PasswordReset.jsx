import React, { useState } from "react";
import classes from "./PasswordReset.module.css";
import { Link } from "react-router-dom";

export default function PasswordReset() {
  return (
    <>
      <div className="shadow-lg rounded-lg text-center py-5 px-6 space-y-4">
        <p className="font-bold text-3xl">
          <span className="text-green-500">Fresh</span>Cart
        </p>

        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <span className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fa-solid fa-check text-green-600 text-3xl"></i>
            </span>
          </div>

          <h2 className="font-bold text-2xl">Password Reset!</h2>

          <p className="text-gray-700">
            Your password has been successfully reset. You can now sign in with
            your new password.
          </p>

          <div>
            <Link to="/login" className="py-3 px-4 bg-green-500 hover:bg-green-600 
                      text-white rounded-lg font-semibold text-lg shadow-lg 
                      transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
