import React, { useContext, useEffect, useState } from "react";
import classes from "./CheckOut.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
export default function CheckOut() {
  const navigate = useNavigate();
  const { cartDetails, handlePayment, setCartDetails, setNumOfCartItems } =
    useContext(cartContext);
  const [isOnline, setIsOnline] = useState(false);
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };
  const validationSchema = Yup.object().shape({
    city: Yup.string()
      .min(2, "*City name must be at least 2 characters")
      .required("*City name must be at least 2 characters"),

    details: Yup.string()
      .min(10, "*Address details must be at least 10 characters")
      .required("*Address details must be at least 10 characters"),

    phone: Yup.string()
      .matches(
        /^(002)?01[0-25][0-9]{8}$/,
        "*Only Egyptian phone numbers are allowed",
      )
      .required("*Please enter a valid Egyptian phone number"),
  });
  async function onSubmit(values) {
    const res = await handlePayment(values, isOnline);
    console.log(res);
    if (res.status === "success") {
      if (isOnline) {
        location.href = res.session.url;
      } else {
        toast.success("Order placed successfully");
        setCartDetails(null);
        setNumOfCartItems(0);
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } else {
      toast.error("Something wrong, try again!");
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <section className={`${classes.CheckOut} bg-gray-50 py-10`}>
        <div className="container mx-auto px-6">
          <div className="mb-5">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-green-600 transition mr-1"
            >
              Home
            </Link>
            <span className="text-sm text-gray-500"> / </span>
            <Link
              to="/cart"
              className="text-sm text-gray-600 hover:text-green-600 transition mr-1"
            >
              Cart
            </Link>

            <span className="text-sm text-gray-500"> / </span>
            <span className="text-gray-900 text-sm font-medium ml-1 ">
              Checkout
            </span>
          </div>
          <div className="mb-5 flex items-center gap-3">
            <span
              className="w-12 h-12 rounded-lg bg-green-500
               text-white flex items-center justify-center"
            >
              <i className="fa-solid fa-receipt text-2xl"></i>
            </span>

            <h1 className="text-3xl font-bold">Complete Your Order</h1>
          </div>
          <p className="text-gray-500 mb-5">
            Review your items and complete your purchase
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl  shadow-sm border border-gray-100 overflow-hidden mb-4">
                <div
                  className=" bg-gradient-to-r 
                        from-green-500 to-green-600 p-5 text-white"
                >
                  <div className="flex items-baseline gap-2">
                    <i className="fa-solid fa-house"></i>
                    <h2 className=" font-bold text-lg ">Shipping Address</h2>
                  </div>
                  <p className="text-sm text-gray-100">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl py-3 px-4 ">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className=" text-blue-600 text-sm shrink-0">
                        <i className="fa-solid fa-circle-info"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-blue-800 font-medium">
                        Delivery Information
                      </p>
                      <p className="text-xs text-blue-600 mt-0.5">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>

                  <form id="checkoutForm" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        htmlFor="city"
                      >
                        City
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-1/2 -translate-y-1/2 left-4">
                          <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 text-sm flex items-center justify-center">
                            <i className="fa-solid fa-city"></i>
                          </span>
                        </div>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.city}
                          className={`w-full pl-14 border-2 rounded-xl outline-none transition-all
                         border-gray-200  py-3.5 px-4  ${formik.errors.city && formik.touched.city
                              ? "border-red-500 ring-2 ring-red-100"
                              : " focus:border-green-500 focus:ring-2 focus:ring-green-100 "
                            }
`}
                          placeholder=".g. Cairo, Alexandria, Giza"
                        />
                      </div>
                      {formik.errors.city && formik.touched.city && (
                        <p className="text-red-500 text-sm font-medium">
                          {formik.errors.city}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        htmlFor="street"
                      >
                        Street Address
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-4">
                          <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 text-sm flex items-center justify-center">
                            <i className="fa-solid fa-location-dot"></i>
                          </span>
                        </div>
                        <textarea
                          id="street"
                          name="details"
                          rows="3"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.details}
                          type="text"
                          className={`w-full pl-14 border-2 rounded-xl outline-none resize-none  transition-all
                         border-gray-200  py-3.5 px-4  ${formik.errors.details && formik.touched.details
                              ? "border-red-500 ring-2 ring-red-100"
                              : " focus:border-green-500 focus:ring-2 focus:ring-green-100 "
                            }
`}
                          placeholder="Street name, building number, floor, apartment..."
                        />
                      </div>
                      {formik.errors.details && formik.touched.details && (
                        <p className="text-red-500 text-sm font-medium">
                          {formik.errors.details}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        htmlFor="phone"
                      >
                        Phone Number
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-1/2 -translate-y-1/2 left-4">
                          <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 text-sm flex items-center justify-center">
                            <i className="fa-solid fa-phone"></i>
                          </span>
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                          className={`w-full pl-14 border-2 rounded-xl outline-none transition-all
                         border-gray-200  py-3.5 px-4  ${formik.errors.phone && formik.touched.phone
                              ? "border-red-500 ring-2 ring-red-100"
                              : " focus:border-green-500 focus:ring-2 focus:ring-green-100 "
                            }
`}
                          placeholder="01xxxxxxxxx"
                        />
                        <span className="hidden sm:block  absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          Egyptian numbers only
                        </span>
                      </div>
                      {formik.errors.phone && formik.touched.phone && (
                        <p className="text-red-500 text-sm font-medium">
                          {formik.errors.phone}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl 
                  shadow-sm border border-gray-100 overflow-hidden"
              >
                <div
                  className=" bg-gradient-to-r 
                        from-green-500 to-green-600 p-5 text-white"
                >
                  <div className="flex items-baseline gap-2">
                    <i className="fa-solid fa-wallet"></i>
                    <h2 className=" font-bold text-lg ">Payment Method</h2>
                  </div>
                  <p className="text-sm text-gray-100">
                    Choose how you'd like to pay
                  </p>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOnline(false);
                      }}
                      className={`group w-full mb-5 flex items-center 
                       justify-between border
                       ${isOnline
                          ? "hover:border-green-400 hover:bg-gray-50"
                          : "border-green-500 bg-green-50 shadow-sm"
                        }
                        0 p-4 rounded-xl`}
                    >
                      <div className=" flex items-center gap-3 ">
                        <span
                          className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0   
                        transition-all
                        ${isOnline
                              ? "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                              : " bg-green-500   text-white shadow-lg shadow-green-500/30"
                            } `}
                        >
                          <i className="fa-solid fa-money-bill text-xl"></i>
                        </span>
                        <div>
                          <h3 className="font-bold w-fit">Cash on Delivery</h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            Pay when your order arrives at your doorstep
                          </p>
                        </div>
                      </div>

                      <span
                        className={`w-7 h-7 rounded-full border shrink-0
                        ${!isOnline && "bg-green-500 text-white"} flex items-center justify-center
                          `}
                      >
                        {!isOnline && (
                          <i className="fa-solid fa-check text-xs"></i>
                        )}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsOnline(true);
                      }}
                      className={`group w-full mb-5 flex items-center 
                       justify-between border
                       ${isOnline
                          ? " border-green-500 bg-gradient-to-r from-green-50 to-blue-50 shadow-sm"
                          : "hover:border-green-400 hover:bg-gray-50"
                        }
                         p-4 rounded-xl`}
                    >
                      <div className=" flex items-center gap-3 ">
                        <span
                          className={`w-14 h-14 rounded-xl flex items-center justify-center 
                        transition-all shrink-0   
                        ${isOnline
                              ? "bg-gradient-to-br from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/30"
                              : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                            } `}
                        >
                          <i className="fa-solid fa-credit-card text-xl"></i>
                        </span>
                        <div>
                          <h3 className="font-bold w-fit">Pay Online</h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            Secure payment with Credit/Debit Card via Stripe
                          </p>
                        </div>
                      </div>

                      <span
                        className={`w-7 h-7 rounded-full border shrink-0 ${isOnline && "bg-green-500 text-white"} flex items-center justify-center`}
                      >
                        {isOnline && (
                          <i className="fa-solid fa-check text-xs"></i>
                        )}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl py-3 px-4 ">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className=" text-green-600 text-sm shrink-0">
                        <i className="fa-solid fa-shield-halved"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">
                        Secure & Encrypted
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Your payment info is protected with 256-bit SSL
                        encryption
                      </p>
                    </div>
                  </div>
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
                  <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                    {cartDetails?.products.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product?.product?.imageCover}
                            className="w-12 h-12"
                            alt={product?.product?.title}
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {" "}
                              {product?.product?.title}
                            </p>
                            <p className="text-gray-600 text-xs">
                              {product?.count} × {product?.price} EGP
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {product?.price * product?.count}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-lg">
                      {cartDetails?.totalCartPrice} EGP
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <div>
                      <i className="fa-solid fa-truck mr-1 text-sm"></i>
                      <span>Shipping</span>
                    </div>
                    <span className="font-medium text-green-600 text-lg">
                      50
                    </span>
                  </div>

                  <div className="border-t border-gray-100">
                    <div className="flex items-center justify-between py-3">
                      <span className="font-bold text-xl">Total</span>
                      <span className="text-sm text-gray-600">
                        <span className="font-bold text-xl text-green-500 mr-1">
                          {(cartDetails?.totalCartPrice ?? 0) + 50}
                        </span>
                        EGP
                      </span>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      form="checkoutForm"
                      className="w-full bg-gradient-to-r  from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-150 flex items-baseline justify-center gap-3 shadow-lg shadow-green-600/20 "
                    >
                      <i className="fa-solid fa-shield-halved  text-sm"></i>
                      {isOnline ? "Proceed to Payment" : "Place Order"}
                    </button>
                  </div>

                  <div className="border-t border-gray-100 flex flex-wrap gap-3 md:justify-center  text-xs py-3 mb-5">
                    <span className="text-gray-500 ">
                      <i className="fa-solid fa-shield-halved mr-2 text-green-500"></i>
                      Secure Payment
                    </span>

                    <span className="border border-gray-300"></span>

                    <span className="text-gray-500">
                      <i className="fa-solid fa-truck mr-2 text-blue-500"></i>
                      Fast Delivery
                    </span>

                    <span className="border border-gray-300"></span>

                    <span className="text-gray-500">
                      <i className="fa-solid fa-box mr-2 text-orange-500"></i>
                      Easy Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
