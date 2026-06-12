import React, { useContext, useState } from "react";
import classes from "./SideBarNav.module.css";
import img from "../../assets/images/freshcart-logo.49f1b44d.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

export default function SideBarNav({ isOpen, setIsOpen }) {
  const { userName, authToken, setAuthToken, setuserName } = useContext(AuthContext);
  const { numOfCartItems } = useContext(cartContext);
  const { numOfProductsInWishList } = useContext(wishListContext);
  function closeSidebar() {
    setIsOpen(false);
  }

  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setAuthToken(null);
    setuserName(null);
    navigate("/login");
  }
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/45 "
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div
          className=" flex items-center justify-between
           p-4 border-b border-gray-100 bg-gray-50/50
"
        >
          <div>
            <img src={img} alt="fresh cart logo" />
          </div>
          <button
            className="w-9 h-9 rounded-full bg-gray-100
           flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-xmark text-gray-600 text-sm"></i>
          </button>
        </div>
        <form className="p-4 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              className="w-full border rounded-lg py-2 px-2 outline-green-400  ring-green-300"
              placeholder="search products..."
            />

            <button
              type="button"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 
                  rounded-lg 
                 bg-green-500 text-white flex items-center 
                 justify-center hover:bg-green-600 transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass text-white text-sm"></i>
            </button>
          </div>
        </form>
        <nav className="p-4 space-y-2 mx-4 border-b border-gray-100">
          <div
            onClick={closeSidebar}
            className="rounded-xl font-medium text-gray-700 cursor-pointer hover:text-green-600
           hover:bg-green-100/50 p-2 transition-colors duration-300"
          >
            <Link className="text-lg" to="/">
              Home
            </Link>
          </div>

          <div
            onClick={closeSidebar}
            className="rounded-xl font-medium text-gray-700 cursor-pointer hover:text-green-600
           hover:bg-green-100/50 p-2 transition-colors duration-300"
          >
            <Link className="text-lg" to="/products">
              Shop
            </Link>
          </div>

          <div
            onClick={closeSidebar}
            className="rounded-xl font-medium text-gray-700 cursor-pointer hover:text-green-600
           hover:bg-green-100/50 p-2 transition-colors duration-300"
          >
            <Link className="text-lg" to="/categories">
              Categories
            </Link>
          </div>

          <div
            onClick={closeSidebar}
            className="rounded-xl font-medium text-gray-700 cursor-pointer hover:text-green-600
           hover:bg-green-100/50 p-2 transition-colors duration-300"
          >
            <Link className="text-lg" to="/brands">
              Brands
            </Link>
          </div>
        </nav>

        <div className="p-4 mx-4 border-b border-gray-100">
          <div
            className="flex items-center gap-2 justify-between rounded-xl font-medium text-gray-700 cursor-pointer
          hover:bg-green-100/50 pb-2 transition-colors duration-300"
          >
            <div  onClick={closeSidebar} className="flex items-center  gap-2">
              <span className="p-2 rounded-full  bg-red-50">
                <i className="fa-regular fa-heart text-red-500"></i>
              </span>
              <Link className="text-lg" to="/wishlist">
                Wishlist
              </Link>
            </div>
            {
              numOfProductsInWishList !== 0 && (
                <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  <span>{numOfProductsInWishList}</span>
                </div>
              )
            }
          </div>

          <div
            onClick={closeSidebar}
            className="flex items-center justify-between gap-2 rounded-xl font-medium text-gray-700 cursor-pointer
          hover:bg-green-100/50 pb-2 transition-colors duration-300"
          >
            <div className="flex items-center  gap-2">
              <span className="p-2 rounded-full  bg-green-50">
                <i className="fa-solid fa-cart-shopping text-green-500"></i>
              </span>
              <Link className="text-lg" to="/cart">
                Cart
              </Link>
            </div>
            {
              numOfCartItems !== 0 && (
                <div className="w-6 h-6 rounded-full  bg-green-600 text-white text-xs flex items-center justify-center">
                  <span>{numOfCartItems}</span>
                </div>
              )
            }
          </div>
        </div>

        {authToken ? (
          <>
            <div className="p-4 mx-4 border-b border-gray-100">
              <div
                className="flex items-center gap-2 rounded-xl text-gray-700 cursor-pointer
          hover:bg-green-100/50 p-2 transition-colors duration-300"
              >
                <span className=" rounded-full w-9 h-9 flex items-center justify-center bg-gray-100">
                  <i className="fa-regular fa-user text-gray-500"></i>
                </span>
                <Link onClick={closeSidebar} className="text-lg" to="/profile/address">
                  {userName}
                </Link>
              </div>

              <div
                onClick={closeSidebar}
                className="flex items-center gap-2 rounded-xl text-red-700 cursor-pointer
          hover:bg-red-50 p-2 transition-colors duration-300"
              >
                <span className=" rounded-full w-9 h-9 flex items-center justify-center  bg-green-50">
                  <i className="fa-solid fa-right-from-bracket text-red-500"></i>
                </span>
                <button onClick={handleLogOut} className="text-lg">
                  Sign Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 p-4 py-8 mx-4 border-b border-gray-100">
              <div>
                <Link
                  onClick={closeSidebar}
                  to="/login"
                  className="text-white font-medium  border-2 border-transparent
               bg-green-500 hover:bg-green-600 transition-colors duration-200
                 py-3 px-8 rounded-lg"
                >
                  Sign in
                </Link>
              </div>

              <div>
                <Link
                  onClick={closeSidebar}
                  to="/register"
                  className="text-green-500 font-medium
              border-2 border-green-500 hover:bg-green-50 transition-colors duration-200
                 py-3 px-8 rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </>
        )}

        <div className="p-4 ">
          <Link to="/contact" onClick={closeSidebar}>
            <div
              className=" flex items-center gap-2 p-3 rounded-lg bg-green-50
            "
            >
              <div>
                <span className="fa-stack fa-x">
                  <i className="fa-solid fa-circle fa-stack-2x text-green-100"></i>
                  <i className="fa-solid fa-headset fa-stack-1x fa-inverse text-green-500"></i>
                </span>
              </div>

              <div className="font-semibold">
                <span className=" text-gray-900 ">Need help?</span>
                <p className="text-sm text-green-500 ">Contact Support</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
