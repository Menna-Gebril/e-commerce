import React, { useContext, useEffect, useState } from "react";
import classes from "./MyOrders.module.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../Loader/Loader";
import LoadingError from "../LoadingError/LoadingError";
import { Helmet } from "react-helmet-async";
export default function MyOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { ownerId } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);

  async function getMyOrders() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}`,
      );

      setMyOrders(data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (ownerId) {
      getMyOrders();
    }
  }, [ownerId]);

  return (
    <>
      <section className={`${classes.MyOrders} min-h-screen bg-gray-50 py-10`}>
        <div className="container mx-auto px-6">
          <Helmet>
            <title>Orders</title>
            <meta name="description" content="Orders Page" />
          </Helmet>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <LoadingError onRetry={getMyOrders} />
          ) : myOrders.length !== 0 ? (
            <>
              <div className="mb-5">
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-green-600 transition mr-1"
                >
                  Home
                </Link>
                <span className="text-sm text-gray-500"> / </span>

                <span className="text-gray-900 text-sm font-medium ml-1 ">
                  My Orders
                </span>
              </div>
              <div className="mb-5 flex items-center gap-5">
                <span
                  className="w-14 h-14 rounded-lg bg-green-500
               text-white flex items-center justify-center shadow-sm shadow-green-500/25"
                >
                  <i className="fa-solid fa-box text-2xl"></i>
                </span>

                <div className="w-full flex flex-col gap-4 md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      My Orders
                    </h1>
                    <p className="text-gray-500 text-sm mt-0.5">
                      Track and manage your orders
                    </p>
                  </div>

                  <div className="text-sm text-green-500 font-medium">
                    <i className="fa-solid fa-bag-shopping text-xs mr-1"></i>
                    <Link to="/">Continue Shopping</Link>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-5">
                {myOrders?.map((myOrder) =>
                  myOrder.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-2xl border transition-all duration-300 border-gray-100 shadow-sm hover:shadow-md  hover:border-gray-200 flex gap-3   p-5"
                    >
                      <div className="relative shrink-0">
                        <div
                          className=" w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 
              to-white border border-gray-100 p-2.5 overflow-hidden"
                        >
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div
                          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs
                 font-bold rounded-full flex items-center justify-center shadow-lg"
                        >
                          <span className="">+{item.count}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <div className="w-fit px-2.5 py-1 bg-amber-100 rounded-lg mb-2 text-xs font-semibold text-amber-600">
                              <i className="fa-solid fa-clock mr-1"></i>
                              <span>Processing</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">
                              <i className="fa-solid fa-hashtag text-gray-400 text-xs mr-1"></i>
                              {myOrder.id}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                              <span>
                                <i className="fa-solid fa-calendar-days text-xs mr-1"></i>
                                May 24, 2026
                              </span>

                              <span>
                                <i className="fa-solid fa-box text-xs mr-1"></i>
                                {item.count} items
                              </span>

                              <span>
                                <i className="fa-solid fa-location-dot text-xs mr-1"></i>
                                {myOrder.shippingAddress?.city}
                              </span>
                            </div>

                            <p className="font-bold text-2xl">
                              {item.count * item.price}
                              <span className="text-sm ml-1 text-gray-500">
                                EGP
                              </span>
                            </p>
                          </div>

                          <div>
                            <span className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                              <i className="fa-solid fa-money-bill"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )),
                )}
              </div>
            </>
          ) : (
            <>

              <div className="flex flex-col items-center gap-1">
                <div>
                  <span
                    className="w-24 h-24 rounded-xl bg-gradient-to-br
                               from-gray-200 to-gray-100 flex items-center justify-center"
                  >
                    <i className="fa-solid fa-box-open text-5xl text-gray-300"></i>
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    No orders yet
                  </h2>
                </div>
                <div className="text-gray-500 mb-8 leading-relaxed text-center">
                  <p>When you place orders, they'll appear here.</p>
                  <p>so you can track them.</p>
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
                    <i className="fa-solid fa-bag-shopping text-sm"></i>
                    Start Shopping

                  </Link>
                </div>
              </div>

            </>
          )
          }
        </div>
      </section>
    </>
  );
}
