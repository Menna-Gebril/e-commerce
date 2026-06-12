import React, { useEffect, useRef, useState } from "react";
import classes from "./CodeStep.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function CodeStep({
  email,
  sendCode,
  resendCode,
  changeEmail,
  isLoading,
}) {
  const [code, setCode] = useState("");
  const inputRef = useRef(null);
  const initialValues = {
    resetCode: "",
  };
  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("Reset code is required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: sendCode,
    validationSchema,
  });

  return (
    <>
      <div className="shadow-lg rounded-lg text-center py-5 px-6 space-y-4">
        <p className="font-bold text-3xl">
          <span className="text-green-500">Fresh</span>Cart
        </p>
        <h2 className="font-bold text-2xl">Check Your Email</h2>
        <p className="text-gray-700">Enter the 6-digit code sent to {email} </p>
        <div className="flex items-center justify-center gap-4">
          <span className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
            <i className="fa-solid fa-check text-white text-xs"></i>
          </span>

          <span className=" border border-gray-200 w-20"></span>
          <span
            className="w-9 h-9 rounded-full bg-green-500 ring-4 ring-green-100
                      flex items-center justify-center"
          >
            <i class="fa-solid fa-key text-white text-xs"></i>
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
              Verification Code
            </label>
            <div className="relative">
              <span className="absolute top-4 left-4 ">
                <i className="fa-solid fa-shield-halved text-gray-400"></i>
              </span>
              <input
                ref={inputRef}
                type="text"
                minLength={6}
                value={formik.values.resetCode}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="resetCode"
                placeholder="......"
                className=" w-full text-center  rounded-xl px-4 py-3
                 pl-12 border-2 border-gray-200 outline-none focus:border-green-500 
                       focus:ring-2 focus:ring-green-100 
                       transition-all text-2xl
                        tracking-[0.5em]                        
                       "
              />
              {formik.errors.resetCode && formik.touched.resetCode && (
                <p className="text-red-500 text-sm text-center">
                  {formik.errors.resetCode}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?
              <button
                onClick={resendCode}
                type="button"
                className="text-green-500 hover:text-green-600 
              ms-2 font-semibold "
              >
                Resend Code
              </button>
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                if (formik.values.resetCode === "") {
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
                  <span>Verifing</span>
                </>
              ) : (
                <>Verify Code </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-green-500 hover:text-green-600 transition-colors duration-200">
          <i className="fa-solid fa-arrow-left text-xs mr-1"></i>
          <button type="button" onClick={changeEmail}>
            Change email address
          </button>
        </div>
      </div>
    </>
  );
}
