import React, { useState } from "react";
import classes from "./HomeSlider.module.css";
import { Link } from "react-router-dom";
import SliderImport from "react-slick";
import HomeNextArrow from "../HomeNextArrow/HomeNextArrow";
import HomePrevArrow from "../HomePrevArrow/HomePrevArrow";
export default function HomeSlider() {
  const Slider = SliderImport.default;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <HomeNextArrow />,
    prevArrow: <HomePrevArrow />,
  };

  return (
    <>
      <section>
        <Slider {...settings}>
          <div className={` px-6 ${classes.HomeSlider}`}>
            <div
              className={`flex flex-col justify-center ${classes.SliderContent} `}
            >
              <div className="text-white  px-9">
                <h2 className=" font-bold text-3xl max-w-96  mb-5">
                  Fresh Products Delivered To your Door
                </h2>
                <p className="font-semibold">Get 20% off your first order</p>
                <div className="flex flex-col lg:flex-row gap-3 mt-7">
                  <Link
                    to="products"
                    className="w-full md:w-fit bg-white text-green-500 py-3 px-7
              rounded-md font-bold border-2 border-transparent mr-3"
                  >
                    Shop Now
                  </Link>

                  <Link
                    to="/deals"
                    className="w-full md:w-fit bg-transparent text-white border-2
                 border-white py-3 px-7
              rounded-md font-bold"
                  >
                    View Deals
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={`px-6 ${classes.HomeSlider}`}>
            <div
              className={`flex flex-col justify-center  ${classes.SliderContent} `}
            >
              <div className="text-white p-9">
                <h2 className=" font-bold text-3xl max-w-96 mb-5">
                  Premium Quality Guaranteed
                </h2>
                <p className="font-semibold">Fresh from farm to your table</p>
                <div className="flex flex-col lg:flex-row gap-3 mt-7">
                  <Link
                    to="products"
                    className="w-full md:w-fit bg-white text-green-400 py-3 px-7
              rounded-md font-medium border-2 border-transparent mr-3"
                  >
                    Shop Now
                  </Link>

                  <Link
                    to="/about"
                    className="w-full md:w-fit bg-transparent text-white border-2
                 border-white py-3 px-7
              rounded-md font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={` px-6 ${classes.HomeSlider}`}>
            <div
              className={`flex flex-col justify-center ${classes.SliderContent} `}
            >
              <div className="text-white  px-9">
                <h2 className=" font-bold text-3xl max-w-96 mb-5">
                  Fast & Free Delivery
                </h2>
                <p className="font-semibold">Same day delivery available</p>
                <div className="flex flex-col lg:flex-row gap-3 mt-7">
                  <Link
                    to="products"
                    className="w-full md:w-fit
                     bg-white text-green-400 py-3 px-7
              rounded-md font-medium border-2 border-white mr-3"
                  >
                    Order Now
                  </Link>

                  <Link
                    to="/delivery"
                    className="w-full md:w-fit bg-transparent
                     text-white border-2
                 border-white py-3 px-7
              rounded-md font-medium"
                  >
                    Delivery Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>
    </>
  );
}
