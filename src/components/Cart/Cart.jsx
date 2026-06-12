import React, { useContext, useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
export default function Cart() {
  const {
    getCartDetails,
    cartDetails,
    numOfCartItems,
    isLoading,
    removeFromCart,
    clearItemsFromCart,
    updatItemFromCart,
  } = useContext(cartContext);
  const { authToken } = useContext(AuthContext);

  async function removeProduct(productId) {
    const res = await removeFromCart(productId);
    if (res.status === "success") {
      toast.success("Product removed successfully");
    } else {
      toast.error("Failed to remove product. Please try again.");
    }
  }
  return (
    <>
      <section className={`${classes.Cart} min-h-screen bg-gray-50 py-10`}>
        <div className="container mx-auto px-6">
          <Helmet>
            <title>Cart</title>
            <meta name="description" content="Cart Page" />
          </Helmet>
          {isLoading ? (
            <Loader />
          ) : cartDetails?.products?.length ? (
            <>
              <div className="mb-5">
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-green-600 transition mr-1"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 text-sm font-medium ml-1 ">
                  Shopping Cart
                </span>
              </div>
              <div className="mb-5 flex items-baseline gap-3">
                <span
                  className="w-12 h-12 rounded-lg bg-green-500
           text-white flex items-center justify-center"
                >
                  <i className="fa-solid fa-cart-shopping text-2xl"></i>
                </span>

                <h1 className="text-3xl font-bold">Shopping Cart</h1>
              </div>
              <p className="text-gray-500 mb-5">
                You have
                <span className="text-green-600 font-semibold">
                  {" "}
                  {numOfCartItems} items
                </span>{" "}
                in your cart
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2">
                  {cartDetails?.products?.map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col sm:flex-row sm:items-center gap-5 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5"
                    >
                      <div
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl
                 bg-gray-100 p-3 border border-gray-100 overflow-hidden group"
                      >
                        <img
                          src={product?.product?.imageCover}
                          alt={product?.product?.title}
                          className="w-full h-full object-contain 
                  transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-3 flex-1">
                        <h2
                          className="font-semibold text-gray-900
                  hover/title:text-green-600 
                  transition-colors leading-relaxed text-base sm:text-lg"
                        >
                          <Link
                            to={`/product-details/${product?.product?.id}/${product.product.category.name}`}
                          >
                            {product?.product?.title}
                          </Link>
                        </h2>
                        <span
                          className="inline-block px-2.5 py-1
                   bg-green-50 text-green-700 
                  text-xs font-medium rounded-full"
                        >
                          {product?.product?.category?.name}
                        </span>
                        <p className="text-green-600 font-bold text-lg">
                          {product?.price} EGP
                        </p>

                        <div className="flex items-center gap-5 justify-between  ">
                          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200 w-fit">
                            <button
                              onClick={() => {
                                updatItemFromCart(
                                  product?.product?.id,
                                  product?.count - 1,
                                );
                              }}
                              disabled={product?.count === 1}
                              className="h-8 w-8 rounded-lg
                         bg-white shadow-sm flex items-center
                          justify-center text-gray-500 hover:text-gray-700 
                          disabled:opacity-40 disabled:cursor-not-allowed transition-all "
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>

                            <span className="w-12 text-center font-bold text-gray-900">
                              {product?.count}
                            </span>

                            <button
                              disabled={product?.count === 220}
                              onClick={() => {
                                updatItemFromCart(
                                  product?.product?.id,
                                  product?.count + 1,
                                );
                              }}
                              className="h-8 w-8 rounded-lg bg-green-600 shadow-sm flex 
                        items-center justify-center text-white hover:bg-green-700 transition-all"
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <p>
                              Total :{" "}
                              <span className="font-medium">
                                {product?.price * product?.count}
                              </span>{" "}
                              EGP
                            </p>
                            <button
                              onClick={() => {
                                removeProduct(product?.product?.id);
                              }}
                              type="button"
                              className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-100
                       text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 mt-5 py-3">
                    <div className="flex items-center justify-between">
                      <Link
                        to="/"
                        className="flex items-baseline gap-2 font-semibold text-green-600 hover:text-green-700 text-sm "
                      >
                        <i className="fa-solid fa-arrow-left text-xs"></i>
                        <span> Continue Shopping</span>
                      </Link>

                      <button
                        onClick={clearItemsFromCart}
                        type="button"
                        className="flex items-baseline gap-2
                         font-semibold text-gray-400 hover:text-red-500 transition-colors text-sm "
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                        <span> Clear all items</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div
                    className="bg-white rounded-2xl 
              shadow-sm border border-gray-100 overflow-hidden sticky top-4"
                  >
                    <div
                      className="flex items-baseline gap-2 bg-gradient-to-r 
                    from-green-500 to-green-600 p-5 text-white"
                    >
                      <i className="fa-solid fa-bag-shopping text-sm"></i>
                      <h2 className=" font-bold text-lg ">Order Summary</h2>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold">
                          {cartDetails.totalCartPrice} EGP
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">
                          50 EGP
                        </span>
                      </div>

                      <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between text-gray-600">
                          <span className="text-gray-900 font-semibold">
                            Total
                          </span>
                          <span className="text-2xl font-bold text-gray-900">
                            {cartDetails.totalCartPrice + 50}
                            <span className="text-sm text-gray-500 ml-1">
                              EGP
                            </span>
                          </span>
                        </div>
                      </div>

                      <div>
                        <Link
                          to="/checkout"
                          className="w-full bg-gradient-to-r 
                    from-green-500 to-green-600 text-white 
                    py-4 px-6 rounded-xl font-semibold hover:from-green-700
                     hover:to-green-800 transition-all duration-150 flex items-center 
                     justify-center gap-3 shadow-lg shadow-green-600/20 
                     "
                        >
                          <i className="fa-solid fa-lock"></i>
                          Secure Checkout
                        </Link>
                      </div>

                      <div className="text-center text-xs space-x-3 mb-5">
                        <span className="text-gray-500">
                          <i className="fa-solid fa-shield-halved mr-2 text-green-500"></i>
                          Secure Payment
                        </span>

                        <span className="border border-gray-300"></span>

                        <span className="text-gray-500">
                          <i className="fa-solid fa-truck mr-2 text-blue-500"></i>
                          Fast Delivery
                        </span>
                      </div>

                      <div className="mb-5">
                        <Link
                          to="/"
                          className="flex items-baseline justify-center gap-2 text-green-500 font-medium"
                        >
                          <i className="fa-solid fa-arrow-left text-sm"></i>
                          <span>Continue Shopping</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <div>
                  <span
                    className="w-32 h-32 rounded-full bg-gradient-to-br
                   from-gray-200 to-gray-100 flex items-center justify-center"
                  >
                    <i className="fa-solid fa-box-open text-5xl text-gray-300"></i>
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Your cart is empty
                  </h2>
                </div>
                <div className="text-gray-500 mb-8 leading-relaxed text-center">
                  <p>Looks like you haven't added anything to your cart yet.</p>
                  <p>Start exploring our products!</p>
                </div>

                <div>
                  <Link
                    to="/"
                    className="w-full bg-gradient-to-r 
                    from-green-500 to-green-600 text-white 
                    py-4 px-6 rounded-xl font-semibold hover:from-green-700
                     hover:to-green-800 transition-all duration-150 flex items-baseline 
                     justify-center gap-3 shadow-lg shadow-green-600/20 
                     "
                  >
                    Start Shopping
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
