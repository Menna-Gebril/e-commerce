import React, { useState } from "react";
import classes from "./PromoBanners.module.css";
import { Link } from "react-router-dom";

export default function PromoBanners() {
  return (
    <>
      <section className={`${classes.PromoBanners} mb-12`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div
              className="w-full lg:w-1/2 rounded-2xl bg-gradient-to-br
             from-emerald-500 to-emerald-700 p-5 lg:p-8 text-white py-10  "
            >
              <div className="bg-white/20 w-fit px-3 py-1 rounded-full mb-3">
                <span className="text-sm font-medium">Deal of the Day</span>
              </div>
              <h3 className="text-3xl font-bold mb-3">Fresh Organic Fruits</h3>
              <p className="text-white/80 mb-3">
                Get up to 40% off on selected organic fruits
              </p>
              <div className="flex items-center gap-3 mb-8">
                <p className="font-bold text-3xl">40% OFF</p>
                <p className="text-white/80 font-semibold">
                  Use code:
                  <span className="text-white  text-sm"> ORGANIC40</span>
                </p>
              </div>

              <Link to="/products"
                className=" bg-white px-6 py-3 rounded-full
               text-emerald-600 font-semibold"
              >
                Shop Now
              </Link>
            </div>

            <div
              className="w-full lg:w-1/2 rounded-2xl bg-gradient-to-br
             from-orange-400 to-rose-500 p-5 lg:p-8 text-white py-10  "
            >
              <div className="bg-white/20 w-fit px-3 py-1 rounded-full mb-3">
                <span className="text-sm font-medium">New Arrivals</span>
              </div>
              <h3 className="text-3xl font-bold mb-3">Exotic Vegetables</h3>
              <p className="text-white/80 mb-3">
                Discover our latest collection of premium vegetables
              </p>
              <div className="flex items-center gap-3 mb-8">
                <p className="font-bold text-3xl">25% OFF</p>
                <p className="text-white/80 font-semibold">
                  Use code:
                  <span className="text-white  text-sm"> FRESH25</span>
                </p>
              </div>

              <Link
                to="/products"
                className=" bg-white px-6 py-3 rounded-full
               text-orange-500 font-semibold"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
