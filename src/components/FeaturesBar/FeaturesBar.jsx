import React, { useState } from "react";
import classes from "./FeaturesBar.module.css";
export default function FeaturesBar() {
  return (
    <>
      <section className={`${classes.FeaturesBar} py-12 mb-12 bg-gray-50`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className=" row items-center gap-2
            bg-white shadow-sm p-4 rounded-lg hover:shadow-md
             transition-shadow duration-200
            "
            >
              <div>
                <span
                  className=" w-10 h-10 rounded-full bg-blue-50
                   text-blue-500 flex items-center justify-center"
                >
                  <i className="fa-solid fa-truck"></i>
                </span>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-900 ">
                  Free Shipping
                </span>
                <p className="text-xs text-gray-500">On orders over 500 EGP</p>
              </div>
            </div>

            <div
              className="row items-center gap-2
            bg-white shadow-sm p-4 rounded-lg hover:shadow-md
             transition-shadow duration-200"
            >
              <div>
                <span
                  className="w-10 h-10 rounded-full bg-green-50
                   text-green-500 flex items-center justify-center"
                >
                  <i className="fa-solid fa-shield-halved"></i>
                </span>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-900 ">
                  Easy Returns
                </span>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>

            <div
              className="row items-center gap-2
            bg-white shadow-sm p-4 rounded-lg hover:shadow-md
             transition-shadow duration-200 "
            >
              <div>
                <span
                  className="w-10 h-10 rounded-full bg-orange-50
                   text-orange-500 flex items-center justify-center"
                >
                  <i className="fa-solid fa-rotate-left"></i>
                </span>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-900 ">
                  Secure Payment
                </span>
                <p className="text-xs text-gray-500">100% secure checkout</p>
              </div>
            </div>

            <div
              className="row items-center gap-2
            bg-white shadow-sm p-4 rounded-lg hover:shadow-md
             transition-shadow duration-200"
            >
              <div>
                <span
                  className="w-10 h-10 rounded-full bg-purple-50
                   text-purple-500 flex items-center justify-center"
                >
                  <i className="fa-solid fa-headphones"></i>
                </span>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-900 ">
                  24/7 Support
                </span>
                <p className="text-xs text-gray-500">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
