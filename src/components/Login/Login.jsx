import React, { useContext, useState } from "react";
import classes from "./Login.module.css";
import img from "../../assets/images/2e5810ff3e-e750761ebcd4ae5907db.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken, setAuthToken, userName, setuserName, userEmail, setUserEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values,
      );
      console.log("login", data);
      if (data.message === "success") {
        setAuthToken(data.token);
        setuserName(data.user.name);
        setUserEmail(data.user.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        toast.success("Login successful")
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Please enter your email"),

    password: Yup.string()
      .min(8, "*Password must be at least 8 characters long")
      .max(18)
      .required("*Please enter your password"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <section className={`${classes.Login}`}>
        <div className="container mx-auto px-6">
          <Helmet>
            <title>Login</title>
            <meta name="description" content="login Page" />
          </Helmet>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
             max-w-7xl 
          mx-auto py-12"
          >
            <div className="hidden lg:block">
              <div className="text-center space-y-6">
                <img
                  src={img}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  alt="fresh vegetables and fruits shopping cart"
                />
              </div>

              <div className="text-center space-y-4">
                <h2 className="mt-4 font-bold text-3xl">
                  FreshCart - Your One-Stop Shop for Fresh Products
                </h2>
                <p className="text-xl text-gray-700">
                  Join thousands of happy customers who trust FreshCart for
                  their daily grocery needs
                </p>
                <div className="flex items-center justify-evenly ">
                  <div className="flex items-baseline gap-2">
                    <i className="fa-solid fa-truck text-green-500 text-sm"></i>
                    <span className="text-gray-500">Free Delivery</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <i className="fa-solid fa-shield-halved text-green-500 text-sm"></i>
                    <span className="text-gray-500">Secure Payment</span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <i className="fa-solid fa-clock text-green-500 text-sm"></i>
                    <span className="text-gray-500">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow-lg rounded-lg text-center py-5 px-6 space-y-4">
              <p className="font-bold text-3xl">
                <span className="text-green-500">Fresh</span>Cart
              </p>
              <h2 className="font-bold text-2xl">Welcome Back!</h2>
              <p className="text-gray-700">
                Sign in to continue your fresh shopping experience
              </p>
              <div>
                <button
                  className="border flex items-center gap-2
                 justify-center rounded-lg py-3 px-4 w-full
                 hover:border-green-300 hover:bg-green-300/15 transition-colors duration-150
                 "
                >
                  <i className="fa-brands fa-google text-red-500 text-lg"></i>
                  <span className="font-medium text-lg">
                    Continue with Google
                  </span>
                </button>
              </div>
              <div>
                <button className="border flex items-center gap-2 justify-center rounded-lg py-3 px-4 w-full hover:border-green-300 hover:bg-green-300/15 transition-colors duration-150">
                  <i className="fa-brands fa-facebook text-blue-600 text-lg"></i>
                  <span className="font-medium text-lg">
                    Continue with Facebook
                  </span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center ">
                  <div className="border border-gray-200 w-full"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    OR CONTINUE WITH EMAIL
                  </span>
                </div>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className="text-left space-y-6 "
              >
                <div className="relative space-y-1">
                  <label htmlFor="user-email" className="text-sm font-semibold">
                    Email Address
                  </label>

                  <div className="relative">
                    <span className="absolute top-4 left-2">
                      <i className="fa-solid fa-envelope text-gray-400"></i>
                    </span>
                    <input
                      type="email"
                      id="user-email"
                      autoComplete="email"
                      name="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your email"
                      className="border-2 w-full rounded-lg px-4 py-3 pl-10
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
                    />
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="relative space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="user-password"
                      className="text-sm font-semibold"
                    >
                      Password
                    </label>
                    <Link
                      to="/forget-password"
                      className="text-sm font-semibold text-green-500"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <span className="absolute top-4 left-2">
                      <i className="fa-solid fa-lock text-gray-400"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="user-password"
                      name="password"
                      autoComplete="current-password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your password"
                      className="border-2 w-full rounded-lg px-4 py-3 pl-10
                    focus:outline-green-400 focus:ring-1 focus:ring-green-100"
                    />
                    <span onClick={() => {
                      setShowPassword(!showPassword);

                    }} className="absolute top-4 right-2">
                      <i
                        className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 cursor-pointer
                     hover:text-gray-600 transition-colors duration-150`}
                      ></i>
                    </span>
                  </div>

                  {formik.errors.password && formik.touched.password && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center ">
                  <input
                    id="chechInput"
                    type="checkbox"
                    className="h-4 w-4 accent-green-500"
                  />
                  <label
                    htmlFor="chechInput"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Keep me signed in
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 
                   text-white rounded-lg font-semibold text-lg shadow-lg 
                   transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      <>Sign in</>
                    )}
                  </button>

                </div>


              </form>


              <div className="text-center mt-8 pt-6 border-t border-gray-100">
                <p>
                  New to FreshCart?
                  <Link
                    className="text-green-500 hover:text-green-600 ms-2 font-semibold "
                    to="/register"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
              <div className="flex items-center justify-center gap-10">
                <div className="flex items-baseline gap-1 text-xs text-gray-500">
                  <i className="fa-solid fa-lock"></i>
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-baseline gap-1 text-xs text-gray-500">
                  <i className="fa-solid fa-user"></i>
                  <span>50K+ Users</span>
                </div>
                <div className="flex items-baseline gap-1 text-xs text-gray-500">
                  <i className="fa-solid fa-star"></i>
                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
