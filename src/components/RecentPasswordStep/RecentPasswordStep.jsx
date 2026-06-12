import React, { useRef, useState } from "react";
import classes from "./RecentPasswordStep.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function RecentPasswordStep({ resetPassword, email, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const initialValues = {
    email,
    newPassword: "",
    rePassword: "",
  };
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "*Password must be at least 8 characters long")
      .max(18)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must be 8+ characters and include uppercase, lowercase, number, and special character.",
      )
      .required("Password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("*Please confirm your password"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: resetPassword,
    validationSchema,
  });

  return (
    <>
      <div className="shadow-lg rounded-lg text-center py-5 px-6 space-y-4">
        <p className="font-bold text-3xl">
          <span className="text-green-500">Fresh</span>Cart
        </p>
        <h2 className="font-bold text-2xl">Create New Password</h2>
        <p className="text-gray-700">
          Your new password must be different from previous passwords{" "}
        </p>
        <div className="flex items-center justify-center gap-4">
          <span className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
            <i className="fa-solid fa-check text-white text-xs"></i>
          </span>

          <span className=" border border-gray-200 w-20"></span>
          <span
            className="w-9 h-9 rounded-full bg-green-500
                      flex items-center justify-center"
          >
            <i class="fa-solid fa-check text-white text-xs"></i>
          </span>
          <span className=" border border-gray-200 w-20"></span>

          <span
            className="w-9 h-9 rounded-full bg-green-500 ring-4 ring-green-100
                      flex items-center justify-center"
          >
            <i className="fa-solid fa-lock text-white text-xs"></i>
          </span>
        </div>

        <form onSubmit={formik.handleSubmit} className="text-left space-y-6 ">
          <div className="space-y-1">
            <label htmlFor="user-password" className="text-sm font-semibold">
              New Password
            </label>
            <div className="relative">
              <span className="absolute top-4 left-2">
                <i className="fa-solid fa-lock text-gray-400"></i>
              </span>
              <input
                ref={newPasswordRef}
                type={showPassword ? "text" : "password"}
                id="user-password"
                name="newPassword"
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter your password"
                className="border-2 w-full rounded-lg px-4 py-3 pl-10
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
              />

              <span onClick={() => {
                setShowPassword(!showPassword)
              }} className="absolute top-4 right-2">
                <i
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 cursor-pointer
                     hover:text-gray-600 transition-colors duration-150`}
                ></i>
              </span>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-500">{formik.errors.newPassword}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="confirm-password" className="text-sm font-semibold">
              Confirm Password
            </label>
            <div className="relative flex align-baseline">


              <span className="absolute top-4 left-2">
                <i className="fa-solid fa-lock text-gray-400"></i>
              </span>
              <input
                ref={confirmPasswordRef}
                type={showRePassword ? "text" : "password"}
                id="confirm-password"
                name="rePassword"
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Confirm new password"
                className="border-2 w-full rounded-lg px-4 py-3 pl-10
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
              />
              <span onClick={() => {
                setShowRePassword(!showRePassword)
              }} className="absolute top-4 right-2">
                <i
                  className={`fa-solid ${showRePassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 cursor-pointer
                     hover:text-gray-600 transition-colors duration-150`}
                ></i>
              </span>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-red-500">{formik.errors.rePassword}</p>
            )}
          </div>

          <div>
            <button
              onClick={() => {
                if (formik.values.newPassword === "") {
                  newPasswordRef.current?.focus();
                } else if (formik.values.rePassword === "") {
                  confirmPasswordRef.current?.focus();
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
                  <span>Resetting Password...</span>
                </>
              ) : (
                <> Reset Password </>
              )}

            </button>
          </div>
        </form>
      </div>
    </>
  );
}
