import React, { useState } from "react";
import classes from "./Register.module.css";
import img from "../../assets/images/review-author.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Helmet } from "react-helmet-async";

export default function Register() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
    box: false,
  };

  async function onSubmit(values) {
    console.log("submit", values);

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );
      console.log(data);
      if (data.message === "success") {
        navigate("/login");
      }
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "name is too short")
      .max(15)
      .required("*Please enter your name"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Please enter your email"),
    phone: Yup.string()
      .matches(
        /^(002)?01[0-25][0-9]{8}$/,
        "*Only Egyptian phone numbers are allowed",
      )
      .required("*Please enter your phone number"),
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters long")
      .max(18)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "*Password must be 8+ characters and include uppercase, lowercase, number, and special character.",
      )
      .required("*Please enter your password"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "should match password")
      .required("*Please confirm your password"),
    box: Yup.boolean()
      .oneOf([true], "*You must accept the terms and conditions")
      .required("*You must accept the terms and conditions"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,

  });

  return (
    <>
      <section className={`${classes.Register}`}>
        <div className="container mx-auto px-6">
          <Helmet>
            <title>Register</title>
            <meta name="description" content="Register Page" />
          </Helmet>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl m-auto
 gap-12 py-12"
          >
            <div className="hidden lg:block space-y-6">
              <h1 className="text-4xl font-bold">
                Welcome to <span className="text-green-500">FreshCart</span>
              </h1>
              <p className="text-xl">
                Join thousands of happy customers who enjoy fresh groceries
                delivered right to their doorstep.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span
                    className="w-12 h-12 flex items-center justify-center 
                  rounded-full bg-green-100"
                  >
                    <i className="fa-solid fa-star text-lg text-green-500"></i>
                  </span>
                  <div>
                    <span className="text-lg font-semibold">
                      Premium Quality
                    </span>
                    <p className="text-gray-600">
                      Premium quality products sourced from trusted suppliers.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="w-12 h-12 flex items-center justify-center 
                  rounded-full bg-green-100"
                  >
                    <i className="fa-solid fa-truck-fast text-lg text-green-500"></i>
                  </span>
                  <div>
                    <span className="text-lg font-semibold">Fast Delivery</span>
                    <p className="text-gray-600">
                      Same-day delivery available in most areas.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="w-12 h-12 flex items-center justify-center 
                  rounded-full bg-green-100"
                  >
                    <i className="fa-solid fa-shield-halved text-lg text-green-500"></i>
                  </span>
                  <div>
                    <span className="text-lg font-semibold">
                      Secure Shopping
                    </span>
                    <p className="text-gray-600">
                      Your data and payments are completely secure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-50 shadow-sm p-4 rounded-md">
                <div className="flex items-center gap-4">
                  <img src={img} className="w-12 h-12" alt="review author" />
                  <div>
                    <h3 className="text-gray-800">Sarah Johnson</h3>
                    <div className="text-yellow-300">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                </div>
                <blockquote>
                  <p className="text-gray-500 text-lg italic font-semibold mt-5">
                    "FreshCart has transformed my shopping experience. The
                    quality of the products is outstanding, and the delivery is
                    always on time. Highly recommend!"
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="shadow-lg rounded-lg text-center py-5 px-6">
              <h2 className="text-3xl font-semibold mb-3">
                Create Your Account
              </h2>
              <p className="mb-8">Start your fresh journey with us today</p>

              <div className="flex items-center justify-center gap-2 mb-5">
                <div>
                  <button
                    className="border flex items-center gap-4
                 justify-center rounded-lg py-2 px-6 lg:px-16
                 hover:border-gray-300 hover:bg-gray-100 transition-colors duration-150
                 "
                  >
                    <i className="fa-brands fa-google text-red-500 text-lg"></i>
                    <span className="font-medium text-lg">Google</span>
                  </button>
                </div>
                <div>
                  <button
                    className="border flex items-center gap-2 justify-center
                 rounded-lg py-2 px-6 lg:px-16 hover:border-green-300 hover:bg-green-300/15 transition-colors duration-150"
                  >
                    <i className="fa-brands fa-facebook text-blue-600 text-lg"></i>
                    <span className="font-medium text-lg">Facebook</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center ">
                  <div className="border border-gray-200 w-full"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    or
                  </span>
                </div>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className="text-left space-y-6 "
              >
                <div className="space-y-1">
                  <label htmlFor="user-name">Name*</label>
                  <input
                    type="text"
                    id="user-name"
                    name="name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Menna"
                    className="border-2 w-full rounded-lg px-4 py-3
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
                  />
                  {formik.errors.name && formik.touched.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="userEmail">Email*</label>
                  <input
                    type="email"
                    id="userEmail"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="menna@example.com"
                    className="border-2 w-full rounded-lg px-4 py-3
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                  {error && (
                    <p className="text-red-600 text-sm">
                      *An account with this email already exists
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="userPassword">Password*</label>
                  </div>

                  <input
                    type="password"
                    id="userPassword"
                    name="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="create a strong password"
                    className="border-2 w-full rounded-lg px-4 py-3
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmPassword">Confirm Password*</label>
                  </div>

                  <input
                    type="password"
                    id="confirmPassword"
                    name="rePassword"
                    value={formik.values.rePassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="confirm your password"
                    className="border-2 w-full rounded-lg px-4 py-3
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
                  />

                  {formik.errors.rePassword && formik.touched.rePassword && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.rePassword}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="phone">Phone Number*</label>
                  </div>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="+20100111111"
                    className="border-2 w-full rounded-lg px-4 py-3
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center  ">
                    <input
                      id="checkTerm"
                      type="checkbox"
                      name="box"
                      value={formik.values.box}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="h-4 w-4 accent-green-500"
                    />
                    <label
                      htmlFor="checkTerm"
                      className="ml-3  text-gray-700 text-lg"
                    >
                      I agree to the{" "}
                      <Link
                        className="text-green-500 hover:underline"
                        to="/terms"
                      >
                        Terms of Service{" "}
                      </Link>{" "}
                      and{" "}
                      <Link
                        className="text-green-500 hover:underline"
                        to="/privacy"
                      >
                        Privacy Policy
                      </Link>{" "}
                      *
                    </label>
                  </div>

                  {formik.errors.box && formik.touched.box && (
                    <p className="text-red-500 text-sm ">{formik.errors.box}</p>
                  )}
                </div>
                <div className="">
                  <button
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty) || isLoading}
                    className="w-full flex items-baseline justify-center gap-2 py-2 px-4 bg-green-500 hover:bg-green-600 
                   text-white rounded-lg font-semibold text-lg 
                   shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      <>
                        <i className="fa-solid fa-user-plus text-sm"></i>
                        Create My Account
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center my-8 pt-6 border-t border-gray-100">
                <p>
                  Already have an account?
                  <Link
                    className="text-green-500 
                    hover:underline hover:text-green-600 ms-2
                     "
                    to="/login"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
