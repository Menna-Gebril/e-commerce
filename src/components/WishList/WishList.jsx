import React, { useContext, useEffect, useState } from "react";
import classes from "./WishList.module.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import Loader from "../Loader/Loader";
import LoadingError from "../LoadingError/LoadingError";
import { Helmet } from "react-helmet-async";

export default function WishList() {
  const { addToCart, isInCart } = useContext(cartContext);
  const { wishListDetails, removeProductFromWishList, isLoading, error } =
    useContext(wishListContext);
  const [addedProductId, setAddedProductId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  async function handleAddToCart(productId) {
    try {
      setLoadingId(productId);

      await addToCart(productId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <>
      <section className={`min-h-screen ${classes.WishList} bg-gray-50 py-10 `}>
        <div className="container mx-auto px-6">
          <Helmet>
            <title>Wishlist</title>
            <meta name="description" content="Wishlist Page" />
          </Helmet>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <LoadingError />
          ) : wishListDetails?.data?.length ? (
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
                  Wishlist
                </span>
              </div>
              <div className="mb-5 flex items-center gap-5">
                <span
                  className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shadow-sm shadow-green-500/25 shrink-0"
                >
                  <i className="fa-solid fa-heart text-2xl"></i>
                </span>

                <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      My Wishlist
                    </h1>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {wishListDetails.count} items saved
                    </p>
                  </div>

                  <div className="text-sm text-green-500 font-medium">
                    <i className="fa-solid fa-bag-shopping text-xs mr-1"></i>
                    <Link to="/">Continue Shopping</Link>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50">
                <div
                  className="bg-white rounded-2xl border
             border-gray-100 overflow-hidden"
                >
                  <div
                    className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50
               border-b border-gray-100 text-sm font-medium text-gray-500"
                  >
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2 text-center">Actions</div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {wishListDetails.data.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-12 
                gap-4 p-4 md:px-6 md:py-5
                 items-center hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="md:col-span-6 flex items-center gap-4">
                          <div
                            className="w-20 h-20 rounded-xl bg-gray-50 
                    border border-gray-100 overflow-hidden shrink-0"
                          >
                            <img
                              src={item.imageCover}
                              className="w-full h-full object-contain p-2"
                              alt={item.title}
                            />
                          </div>
                          <div>
                            <Link
                              to={`/product-details/${item.id}/${item.category?.name}`}
                              className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
                            >
                              {item?.title}
                            </Link>
                            <p className="text-sm text-gray-400 mt-1">
                              {item.category?.name}
                            </p>
                          </div>
                        </div>

                        <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                          <span className="md:hidden text-sm text-gray-500">
                            Price:{" "}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.price} EGP
                            </p>
                          </div>
                        </div>

                        <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                          <span className="md:hidden text-sm text-gray-500">
                            Status:{" "}
                          </span>
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                     bg-green-50 text-green-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            In Stock
                          </span>
                        </div>

                        <div className="md:col-span-2 flex md:justify-center items-center gap-2 ">
                          {loadingId === item.id ? (
                            <button
                              type="button"
                              disabled
                              className="flex-1 md:flex-none flex items-center 
                              justify-center gap-2 px-4 py-2.5 rounded-lg text-sm 
                              font-medium bg-green-600 text-white"
                            >
                              <i className="fa-solid fa-check text-xs"></i>
                              <span>Added!</span>
                            </button>
                          ) : isInCart(item.id) ? (
                            <Link
                              to="/cart"
                              className="flex-1 md:flex-none flex items-center
                               justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                                bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                            >
                              <i className="fa-solid fa-check text-xs text-green-600"></i>
                              <span>View Cart</span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => (
                                handleAddToCart(item.id)
                              )
                              }
                              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-all"
                            >
                              <i className="fa-solid fa-cart-shopping text-xs"></i>
                              <span>Add Cart</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              removeProductFromWishList(item.id);
                            }}
                            type="button"
                            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50
                     transition-all disabled:opacity-50"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="min-h-screen flex flex-col items-center gap-5">
                <div>
                  <span
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br
                             from-gray-200 to-gray-100 flex items-center justify-center"
                  >
                    <i className="fa-regular fa-heart text-4xl text-gray-300"></i>
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your wishlist is empty
                  </h2>
                </div>
                <div className="text-gray-500  leading-relaxed text-center">
                  <p>Browse products and save your favorites here.</p>
                </div>

                <div>
                  <Link
                    to="/products"
                    className="w-full bg-gradient-to-r 
                              from-green-500 to-green-600 text-white 
                              py-4 px-10 rounded-xl font-semibold hover:from-green-700
                               hover:to-green-800 transition-all duration-150 flex items-baseline 
                               justify-center gap-3 shadow-lg shadow-green-600/20 
                               "
                  >
                    Browse Products
                    <i className="fa-solid fa-arrow-right text-xs"></i>
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
