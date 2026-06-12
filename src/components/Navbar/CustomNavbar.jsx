import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img from "../../assets/images/freshcart-logo.49f1b44d.svg";
import classes from "./Navbar.module.css";
import NavbarTop from "../NavbarTop/NavbarTop";
import SideBarNav from "../SideBarNav/SideBarNav";
import { AuthContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import axios from "axios";
export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userName, setuserName, userEmail, authToken, setAuthToken } = useContext(AuthContext);
  const [clickOnProfle, setClickOnProfile] = useState(false)
  const navigate = useNavigate()

  const { numOfCartItems } = useContext(cartContext);
  const { numOfProductsInWishList } = useContext(wishListContext);
  function handleLogOut() {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    setAuthToken(null)
    setuserName(null)
    navigate("/login")
  }
  const categories = [
    {
      name: "Electronics",
      categoryId: "6439d2d167d9aa4ca970649f",
    },
    {
      name: "Women's Fashion",
      categoryId: "6439d58a0049ad0b52b9003f",
    },
    {
      name: "Men's Fashion",
      categoryId: "6439d5b90049ad0b52b90048",
    },
    {
      name: "Beauty & Health",
      categoryId: "6439d58a0049ad0b52bu8503f",
    },
  ];
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    function handleChange(e) {
      if (e.matches) {
        setIsOpen(false);
      }
    }
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <NavbarTop />
      <nav className="py-4 border-b shadow-sm sticky top-0 left-0 right-0 bg-white z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center">
            <Link to="/" className="pr-6 shrink-0">
              <img src={img} alt="fresh cart logo" />
            </Link>
            <form className="hidden lg:flex flex-1 max-w-2xl pr-6">
              <div className="search relative w-full">
                <input
                  type="text"
                  className="border rounded-3xl py-3 px-5
                   w-full outline-green-400       
                   "
                  placeholder="Search for products, brands and more..."
                />
                <button
                  type="button"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full 
                 bg-green-500 text-white flex items-center 
                 justify-center hover:bg-green-600 transition-colors"
                >
                  <i className="fa-solid fa-magnifying-glass text-white text-sm"></i>
                </button>
              </div>
            </form>
            <div
              className="
            hidden xl:flex items-center gap-6
            font-medium text-gray-700 "
            >
              <NavLink
                className=" hover:text-green-600 
              transition-colors duration-300 "
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className=" hover:text-green-600 transition-colors duration-300"
                to="/products"
              >
                Shop
              </NavLink>
              {/* opacity-0 invisible group-hover:opacity-100 group-hover:visible   */}
              <div className="relative group">
                <button
                  type="button"
                  className=" hover:text-green-600 transition-colors duration-300"
                >
                  Categories
                </button>
                <div
                  className="absolute left-0 top-5 mt-2 
  bg-white shadow-lg rounded-xl py-5 ps-3 pe-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                >
                  <div className=" text-left">
                    <ul className="flex flex-col gap-3 ">
                      <li>
                        <Link
                          to="/categories"
                          className="hover:text-green-600 whitespace-nowrap"
                        >
                          All Categories
                        </Link>
                      </li>

                      {
                        categories.map((category) => (
                          <li key={category.categoryId}  >
                            <Link
                              to={`products/?category=${category.categoryId}`}
                              className="hover:text-green-600 whitespace-nowrap">
                              {category.name}
                            </Link>
                          </li>
                        ))

                      }
                    </ul>
                  </div>
                </div>
              </div>
              <NavLink
                className="pr-3 hover:text-green-600 transition-colors duration-300"
                to="brands"
              >
                Brands
              </NavLink>
            </div>
            <div
              className="hidden lg:row items-center gap-2 pr-3 
            hover:opacity-75 transition-opacity cursor-pointer"
            >
              <div>
                <span className="fa-stack fa-x">
                  <i className="fa-solid fa-circle fa-stack-2x text-green-100"></i>
                  <i className="fa-solid fa-headset fa-stack-1x fa-inverse text-green-500"></i>
                </span>
              </div>

              <Link to="/contact" className="pb-2 pl-1">
                <span className="text-xs text-gray-500 ">Support</span>
                <p className="text-xs text-gray-900 font-semibold ">
                  24 / 7 help
                </p>
              </Link>
            </div>
            <span className="hidden lg:block w-px h-11 bg-gray-200 ms-6"></span>
            <div className=" px-5 ml-auto flex items-center gap-2">
             <div className="hidden lg:flex items-center gap-2">
               <div className="relative cursor-pointer w-11 h-11 flex items-center justify-center  rounded-full
               hover:bg-gray-200 group/parent transition-colors duration-300"
              >
                <Link to="/wishlist">
                  <i
                    className="fa-regular fa-heart text-lg text-gray-500
                 group-hover/parent:text-red-500  transition-colors duration-300"
                  ></i>
                </Link>
                {

                  numOfProductsInWishList !== 0 && (
                    <div
                      className="absolute top-0 right-0 bg-red-500 rounded-full
                     w-5  h-5
                 text-white text-xs flex items-center justify-center"
                    >
                      {numOfProductsInWishList}
                    </div>
                  )
                }
              </div>



              <div
                className="relative cursor-pointer w-11 h-11 flex items-center justify-center rounded-full
               hover:bg-gray-200 group/parent transition-colors duration-300"
              >
                <Link to="cart">
                  <i
                    className="fa-solid fa-cart-shopping text-lg text-gray-500
                 group-hover/parent:text-green-500 transition-colors duration-300"
                  ></i>
                </Link>
                {numOfCartItems !== 0 && (
                  <div
                    className="absolute top-0 right-0 bg-green-500 rounded-full
                     w-5  h-5
                 text-white text-xs flex items-center justify-center"
                  >
                    {numOfCartItems}
                  </div>
                )}
              </div>
             </div>

              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-green-500"
              >
                <i className="fa-solid fa-bars text-white"></i>
              </button>

              <SideBarNav isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>

            {authToken ? (

              <div className="hidden lg:block relative">
                <button
                  onClick={() => {
                    setClickOnProfile(!clickOnProfle)
                  }}

                  className="cursor-pointer  w-11 h-11  flex items-center justify-center rounded-full
               hover:bg-gray-200 group/parent transition-colors duration-300"
                >
                  <i
                    className="fa-regular fa-circle-user text-lg text-gray-500
                 group-hover/parent:text-green-500 transition-colors duration-300"
                  ></i>
                </button>
                <div className={`absolute top-full right-0 w-64 bg-white border
                 border-gray-100 shadow-xl mt-2 rounded-lg ${clickOnProfle ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                  <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                    <span className="cursor-pointer  w-10 h-10  flex items-center justify-center rounded-full
               bg-green-100">
                      <i
                        className="fa-regular fa-circle-user text-lg
                 text-green-500 "
                      ></i>
                    </span>
                    <div>
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-gray-600">{userEmail}</p>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link onClick={() => { setClickOnProfile(false) }} to="/profile/address" className="block text-sm px-4 py-2.5 text-gray-600 hover:bg-green-50 hover:text-green-600 w-full">
                      <i className="fa-regular fa-user me-3 text-gray-400"></i>
                      My Profile
                    </Link>


                    <Link onClick={() => { setClickOnProfile(false) }} to="/allorders" className="block text-sm px-4 py-2.5 text-gray-600 hover:bg-green-50 hover:text-green-600 w-full group">
                      <i className="fa-solid fa-box-open me-3 text-gray-400"></i>
                      My Orders
                    </Link>


                    <Link onClick={() => { setClickOnProfile(false) }} to="/wishList" className="block text-sm px-4 py-2.5 text-gray-600 hover:bg-green-50 hover:text-green-600 w-full group">
                      <i className="fa-regular fa-heart me-3 text-gray-400"></i>
                      My Wishlist
                    </Link>

                    <Link onClick={() => { setClickOnProfile(false) }} to="/profile/address" className="block text-sm px-4 py-2.5 text-gray-600 hover:bg-green-50 hover:text-green-600 w-full group">
                      <i className="fa-regular fa-address-book me-3 text-gray-400"></i>
                      Addresses
                    </Link>




                  </div>



                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={handleLogOut}
                      className="flex items-baseline gap-2 text-sm px-4 py-2.5  hover:bg-red-50 text-red-600 w-full">
                      <i className="fa-solid fa-right-from-bracket"></i>
                      Sign Out</button>
                  </div>
                </div>

              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="
                    
               hidden lg:flex items-baseline 
               px-5 py-2.5 rounded-full
                bg-green-500 hover:bg-green-600 
                text-white text-sm font-semibold transition-colors shadow-sm
                shadow-green-600/20


               "
                >
                  <i className="fa-regular fa-user mr-2"></i>
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
