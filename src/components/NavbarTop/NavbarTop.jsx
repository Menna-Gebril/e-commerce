import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./NavbarTop.module.css";
import { AuthContext } from "../../Context/AuthContext";

export default function NavbarTop() {
  const { userName, setuserName, authToken, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate()

  function handleLogOut() {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    setAuthToken(null)
    setuserName(null)
    navigate("/login")
  }
  return (
    <>
      <section
        className={`${classes.NavbarTop} hidden lg:block text-sm border-b py-2 border-gray-100`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                <i className="fa-solid fa-truck text-green-500 mr-2 text-xs"></i>
                <span className="text-gray-500 text-sm">
                  Free Shipping on Orders 500 EGP
                </span>
              </div>

              <div>
                <i className="fa-solid fa-gift text-green-500 mr-2 text-xs"></i>
                <span className="text-gray-500 text-sm">
                  New Arrivals Daily
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-gray-500 mr-3 cursor-pointer hover:text-green-500 transition duration-75">
                <i className="fa-solid fa-phone mr-2 text-xs"></i>
                <span className="text-sm font-medium">+1 (800) 123-4567</span>
              </div>

              <div
                className="text-gray-500 mr-3 cursor-pointer
               hover:text-green-500 transition duration-75"
              >
                <i className="fa-regular fa-envelope mr-2 text-xs"></i>
                <span className="text-sm font-medium">
                  support@freshcart.com
                </span>
              </div>
              <span className="w-px h-4 bg-gray-200 me-5"></span>


              {
                authToken ? (
                  <>

                    <Link to="/profile/address"
                      className="text-gray-500 mr-3 cursor-pointer
               hover:text-green-500 transition duration-75"
                    >
                      <i className="fa-regular fa-user mr-2 text-xs"></i>
                      <span className="text-sm font-medium">{userName}</span>
                    </Link>

                    <button onClick={handleLogOut}
                      className="text-gray-500 mr-3 
               hover:text-red-500 transition duration-75"
                    >
                      <i className="fa-solid fa-right-from-bracket mr-2 text-xs"></i>
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>


                  </>
                ) :
                  (
                    <>

                      <div className="text-gray-500 ml-3  mr-3 cursor-pointer hover:text-green-500 transition duration-75">
                        <Link to="/login">
                          <i className="fa-regular fa-user mr-2 text-xs"></i>
                          <span className="text-sm font-medium">Sign In</span>
                        </Link>
                      </div>
                      <div
                        className="text-gray-500  cursor-pointer
               hover:text-green-500 transition duration-75"
                      >
                        <Link to="/register">
                          <i className="fa-solid fa-user-plus mr-2 text-xs"></i>
                          <span className="text-sm font-medium">Sign Up</span>
                        </Link>
                      </div>

                    </>
                  )
              }







            </div>
          </div>
        </div>
      </section>
    </>
  );
}
