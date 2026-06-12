import React, { useState } from "react";
import classes from "./TabsProductDetails.module.css";
export default function TabsProductDetails({ productDetails }) {
  const [step, setStep] = useState(1);
  const tabs = [
    {
      id: 1,
      title: "Product Details",
      icon: "fa-box",
    },
    {
      id: 2,
      title: `Reviews (${productDetails.reviews?.length})`,
      icon: "fa-star",
    },
    {
      id: 3,
      title: "Shipping & Returns",
      icon: "fa-truck",
    },
  ];

  return (
    <>
      <section className={`${classes.TabsProductDetails} my-12`}>
        <div className="border rounded-lg shadow-sm ">
          <div className="border-b flex flex-col lg:flex-row lg:items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStep(tab.id)}
                className={`
        flex gap-1 items-baseline font-medium px-4 py-5
        transition duration-150 border-b-2 ${
          step === tab.id
            ? "text-green-600 bg-green-50 border-green-600"
            : "text-gray-600 border-transparent hover:text-green-600 hover:bg-gray-50"
        }
      `}
              >
                <i
                  className={`fa-solid ${tab.icon} text-sm`}
                ></i>
                {tab.title}
              </button>
            ))}

            {/* <button
              onClick={() => {
                setStep(1);
              }}
              className="text-gray-600 flex gap-1 items-baseline font-medium
            hover:text-green-600 hover:bg-gray-50
            focus:text-green-600 focus:bg-green-50 
             px-4 py-5 transition duration-150 border-b-2 focus:border-green-600
            "
            >
              <i className="fa-solid fa-box text-sm"></i>
              Product Details
            </button>

            <button
              onClick={() => {
                setStep(2);
              }}
              className="text-gray-600 flex gap-1 items-baseline font-medium
            hover:text-green-600 hover:bg-gray-50
            focus:text-green-600 focus:bg-green-50
             px-4 py-5 transition duration-150 border-b-2 focus:border-green-600
            "
            >
              <i className="fa-solid fa-star text-sm"></i>
              Reviews(6)
            </button>

            <button
              onClick={() => {
                setStep(3);
              }}
              className="text-gray-600 flex gap-1 items-baseline font-medium
            hover:text-green-600 hover:bg-gray-50
            focus:text-green-600 focus:bg-green-50 
             px-4 py-5 transition duration-150 border-b-2 focus:border-green-600
            "
            >
              <i className="fa-solid fa-truck text-sm"></i>
              Shipping & Returns
            </button> */}
          </div>

          {step === 1 && (
            <>
              <div className="px-4 py-5">
                <h3 className="text-gray-900 font-semibold text-lg mb-3">
                  About this Product
                </h3>
                <p className="text-gray-600 leading-relaxed ">
                  {productDetails.description}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-3 px-4 py-5">
                <div className="w-full lg:w-1/2  bg-gray-50 px-3 py-5 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Product Information
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Subcategory</span>
                      <span className="font-medium text-gray-900">
                        {productDetails.subcategory?.[0]?.name}
                      </span>
                    </li>

                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Brand</span>
                      <span className="font-medium text-gray-900">
                        {productDetails.brand?.name}
                      </span>
                    </li>

                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium text-gray-900">
                        {productDetails.category?.name}
                      </span>
                    </li>

                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Items Sold</span>
                      <span className="font-medium text-gray-900">
                        {productDetails.sold}+ sold
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="w-full lg:w-1/2  bg-gray-50 px-3 py-5 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-baseline gap-1 text-gray-600 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Premium Quality Product
                    </li>

                    <li className="flex items-baseline gap-1 text-gray-600 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      100% Authentic Guarantee
                    </li>

                    <li className="flex items-baseline gap-1 text-gray-600 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Fast & Secure Packaging
                    </li>

                    <li className="flex items-baseline gap-1 text-gray-600 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Quality Tested
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div
                className="px-4 py-5 flex items-start
             flex-col md:flex-row gap-8  md:items-center  "
              >
                <div className="text-center">
                  <span className="text-5xl font-bold text-gray-900">
                    {productDetails.ratingsAverage}
                  </span>
                  <div className="my-3 text-amber-300">
                    {[1, 2, 3, 4, 5].map((star) => {
                      if (productDetails.ratingsAverage >= star) {
                        return <i key={star} className="fa-solid fa-star"></i>;
                      } else if (productDetails.ratingsAverage >= star - 0.5) {
                        return (
                          <i
                            key={star}
                            className="fa-solid fa-star-half-stroke"
                          ></i>
                        );
                      } else {
                        return (
                          <i key={star} className="fa-regular fa-star"></i>
                        );
                      }
                    })}
                    <p className="ml-3 text-gray-700">
                      based on {productDetails.reviews?.length} reviews
                    </p>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-5">
                  <div className="flex-1 w-full flex items-baseline gap-2">
                    <span className="text-sm text-gray-600">5 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded-lg mb-5">
                      <div
                        className="w-1/4
                    h-full bg-yellow-300 rounded-full mb-5"
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 ">25%</span>
                  </div>

                  <div className="flex-1 w-full flex items-baseline gap-2">
                    <span className="text-sm text-gray-600">4 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded-lg mb-5">
                      <div
                        className="w-3/4
                    h-full bg-yellow-300 rounded-full mb-5"
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 ">75%</span>
                  </div>

                  <div className="flex-1 w-full flex items-baseline gap-2">
                    <span className="text-sm text-gray-600">3 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded-lg mb-5">
                      <div
                        className="w-1/4
                    h-full bg-yellow-300 rounded-full mb-5"
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 ">25%</span>
                  </div>

                  <div className="flex-1 w-full flex items-baseline gap-2">
                    <span className="text-sm text-gray-600">2 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded-lg mb-5">
                      <div
                        className="w-[5%]
                    h-full bg-yellow-300 rounded-full mb-5"
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 ">5%</span>
                  </div>

                  <div className="flex-1 w-full flex items-baseline gap-2">
                    <span className="text-sm text-gray-600">1 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded-lg mb-5">
                      <div
                        className="w-[5%]
                    h-full bg-yellow-300 rounded-full mb-5"
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 ">5%</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex flex-col lg:flex-row gap-3 px-4 py-5 mb-5 ">
                <div className="w-full lg:w-1/2  px-3 py-5 bg-green-50 rounded-lg">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="w-11 h-11 flex items-center justify-center bg-green-500 text-white rounded-full">
                      <i className="fa-solid fa-truck"></i>
                    </span>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Shipping Information
                    </h4>
                  </div>

                  <ul className="space-y-2">
                    <li className="flex items-baseline gap-2 text-gray-700 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Free shipping on orders over $50
                    </li>

                    <li className="flex items-baseline gap-2 text-gray-700 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Standard delivery: 3-5 business days
                    </li>

                    <li className="flex items-baseline gap-2 text-gray-700 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Express delivery available (1-2 business days)
                    </li>

                    <li className="flex items-baseline gap-2 text-gray-700 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Track your order in real-time
                    </li>
                  </ul>
                </div>

                <div className="w-full lg:w-1/2  bg-green-50 px-3 py-5 rounded-lg">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="w-11 h-11 flex items-center justify-center bg-green-500 text-white rounded-full">
                      <i className="fa-solid fa-rotate-left"></i>
                    </span>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Returns & Refunds
                    </h4>
                  </div>

                  <ul className="space-y-2">
                    <li className="flex items-baseline gap-2 text-gray-700 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      30-day hassle-free returns
                    </li>

                    <li className="flex items-baseline gap-2 text-gray-700 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Full refund or exchange available
                    </li>

                    <li className="flex items-baseline gap-2 text-gray-700 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Free return shipping on defective items
                    </li>

                    <li className="flex items-baseline gap-2 text-gray-700 font-medium text-sm">
                      <i className="fa-solid fa-check text-green-500"></i>
                      Easy online return process
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg px-4 py-5 flex gap-4 mb-5 mx-4">
                <div>
                  <span
                    className="w-14 h-14 rounded-full bg-gray-200 text-gray-600 
                  flex items-center justify-center shrink-0"
                  >
                    <i className="fa-solid fa-shield-halved text-2xl"></i>
                  </span>
                </div>

                <div>
                  <h4 className="text-gray-900 font-medium text-lg">
                    Buyer Protection Guarantee
                  </h4>
                  <p className="text-gray-500">
                    Get a full refund if your order doesn't arrive or isn't as
                    described. We ensure your shopping experience is safe and
                    secure.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
