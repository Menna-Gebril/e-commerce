import React, { useRef, useState } from "react";
import classes from "./EmailStep.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function EmailStep({ sendEmail, isLoading }) {
  const initialValues = {
    email: "",
  };
  const inputRef = useRef(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Please enter your email"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: sendEmail,
    validationSchema,
  });
  return (
    <>
      <div className="shadow-lg rounded-lg text-center py-5 px-6 space-y-4">
        <p className="font-bold text-3xl">
          <span className="text-green-500">Fresh</span>Cart
        </p>
        <h2 className="font-bold text-2xl">Forgot Password?</h2>
        <p className="text-gray-700">No worries, we'll send you a reset code</p>
        <div className="flex items-center justify-center gap-4">
          <span className="w-9 h-9 rounded-full bg-green-500 ring-4 ring-green-100 flex items-center justify-center">
            <i class="fa-solid fa-envelope text-white text-xs"></i>
          </span>
          <span className=" border border-gray-200 w-20"></span>

          <span
            className="w-9 h-9 rounded-full bg-gray-200 
                   flex items-center justify-center"
          >
            <i class="fa-solid fa-key text-gray-400 text-xs"></i>
          </span>

          <span className=" border border-gray-200 w-20"></span>

          <span
            className="w-9 h-9 rounded-full bg-gray-200 
                   flex items-center justify-center"
          >
            <i className="fa-solid fa-lock text-gray-400 text-xs"></i>
          </span>
        </div>

        <form onSubmit={formik.handleSubmit} className="text-left space-y-6 ">
          <div className="relative space-y-1">
            <label htmlFor="user-email" className="text-sm font-semibold">
              Email Address
            </label>

            <div className="relative">
              <span className="absolute top-4 left-4 ">
                <i className="fa-solid fa-envelope text-gray-400"></i>
              </span>
              <input
                ref={inputRef}
                type="email"
                id="user-email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter your email"
                className="border-2 w-full rounded-lg px-4 py-3 pl-10
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>


          </div>

          <div>
            <button
              onClick={() => {
                if (formik.values.email === "") {
                  inputRef.current.focus();
                }
              }}
              disabled={isLoading}
              type="submit"
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 
                   text-white rounded-lg font-semibold text-lg shadow-lg 
                   transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  <span>Sending Code...</span>
                </>
              ) : (
                <>Send Rest Code </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-green-500 hover:text-green-600 transition-colors duration-200">
          <i className="fa-solid fa-arrow-left text-xs mr-1"></i>
          <Link to="/login">back to Sign in</Link>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p>
            Remember your password?
            <Link
              className="text-green-500 hover:text-green-600 ms-2 font-semibold "
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
