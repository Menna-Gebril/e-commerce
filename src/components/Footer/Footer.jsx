import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import img1 from "../../assets/images/freshcart-logo.49f1b44d.svg";
import FooterTop from "../FooterTop/FooterTop.jsx";
import FooterBottom from "../FooterBottom/FooterBottom.jsx";

export default function HFooter() {
  return (
    <>
      <FooterTop />
      <footer className={`${classes.Footer} py-10`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div>
                <div className="bg-white w-fit py-2 px-3 rounded-md mb-6">
                  <img src={img1} alt="logo" />
                </div>
                <p className="text-gray-400 mb-6">
                  FreshCart is your one-stop destination for quality products.
                  From fashion to electronics, we bring you the best brands at
                  competitive prices with a seamless shopping experience.
                </p>
                <ul>
                  <li className="flex items-baseline gap-2 cursor-pointer mb-3">
                    <i className="fa-solid fa-phone text-green-400  text-sm"></i>
                    <span className="text-gray-400 hover:text-green-400 transition duration-75">
                      +1 (800) 123-4567
                    </span>
                  </li>

                  <li className="flex items-baseline gap-2 cursor-pointer mb-3">
                    <i className="fa-solid fa-envelope text-green-400  text-sm"></i>
                    <span className="text-gray-400 hover:text-green-400 transition duration-75">
                      support@freshcart.com
                    </span>
                  </li>

                  <li className="flex items-baseline gap-2 mb-3">
                    <i className="fa-solid fa-location-dot text-green-400  text-sm"></i>
                    <span className="text-gray-400">
                      123 Commerce Street, New York, NY 10001
                    </span>
                  </li>
                </ul>
                <div className="mt-6 flex items-center gap-2">
                  <span
                    className={`${classes.styleIcon} hover:bg-green-400 cursor-pointer transition group/icon`}
                  >
                    <i className="fa-brands fa-facebook-f text-gray-400 group-hover/icon:text-white"></i>
                  </span>

                  <span
                    className={`${classes.styleIcon} hover:bg-green-400 cursor-pointer transition group/icon`}
                  >
                    <i className="fa-brands fa-twitter text-gray-400 group-hover/icon:text-white"></i>
                  </span>

                  <span
                    className={`${classes.styleIcon} hover:bg-green-400 cursor-pointer transition group/icon`}
                  >
                    <i className="fa-brands fa-instagram text-gray-400 group-hover/icon:text-white"></i>
                  </span>

                  <span
                    className={`${classes.styleIcon} hover:bg-green-400 cursor-pointer transition group/icon`}
                  >
                    <i className="fa-brands fa-youtube text-gray-400 group-hover/icon:text-white"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-white text-lg font-semibold mb-3">Shop</h4>
              <ul>
                <li className="mb-3 ">
                  <Link
                    to="/products"
                    className="text-gray-400 text-sm  hover:text-green-400 transition"
                  >
                    All Products
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/categories"
                    className="text-gray-400 text-sm  hover:text-green-400 transition"
                  >
                    Categories
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/brands"
                    className="text-gray-400 text-sm hover:text-green-400 transition"
                  >
                    Brands
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 ">
              <h4 className="text-white text-lg font-semibold mb-3">Account</h4>
              <ul>
                <li className="mb-3 ">
                  <Link
                    to="/profile/address"
                    className="text-gray-400 text-sm  hover:text-green-400 transition"
                  >
                    My Account
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/allorders"
                    className="text-gray-400 text-sm  hover:text-green-400 transition"
                  >
                    Order History
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/wishList"
                    className="text-gray-400 text-sm hover:text-green-400 transition"
                  >
                    Wishlist
                  </Link>
                </li>



                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/cart"
                    className="text-gray-400 text-sm hover:text-green-400 transition"
                  >
                    Shopping Cart
                  </Link>
                </li>


              </ul>
            </div>

            <div className="lg:col-span-2 ">
              <h4 className="text-white text-lg font-semibold mb-3">Support</h4>
              <ul>
                <li className="mb-3 ">
                  <Link
                    to="/contact"
                    className="text-gray-400 text-sm  hover:text-green-400 transition"
                  >
                    Contact Us
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/help"
                    className="text-gray-400 text-sm  hover:text-green-400 transition"
                  >
                    Help Center
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/shipping"
                    className="text-gray-400 text-sm hover:text-green-400 transition"
                  >
                    Shipping Info
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/returns"
                    className="text-gray-400 text-sm hover:text-green-400 transition"
                  >
                    Returns & Refunds
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/track-order"
                    className="text-gray-400 text-sm hover:text-green-400 transition"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 ">
              <h4 className="text-white text-lg font-semibold mb-3">Legal</h4>
              <ul>
                <li className="mb-3 ">
                  <Link
                    to="/privacy"
                    className="text-gray-400 text-sm  hover:text-green-400 transition"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/terms"
                    className="text-gray-400 text-sm  hover:text-green-400 transition"
                  >
                    Terms of Service
                  </Link>
                </li>

                <li className="text-gray-400 mb-3 text-sm">
                  <Link
                    to="/cookies"
                    className="text-gray-400 text-sm hover:text-green-400 transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <FooterBottom />
    </>
  );
}
