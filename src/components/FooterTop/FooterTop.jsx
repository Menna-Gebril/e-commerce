import React from "react";
import classes from "./FooterTop.module.css";
export default function FooterList() {
  return (
    <>
      <section className={`${classes.FooterTop}  py-5`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="row items-center">
              <div>
                <span className="fa-stack fa-x">
                  <i className="fa-solid fa-square fa-stack-2x text-green-100"></i>
                  <i className="fa-solid fa-truck fa-stack-1x fa-inverse text-green-500"></i>
                </span>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-900 ">
                  Free Shipping
                </span>
                <p className="text-xs text-gray-500">On orders over 500 EGP</p>
              </div>
            </div>

            <div className="row items-center">
              <div>
                <span className="fa-stack fa-x">
                  <i className="fa-solid fa-square fa-stack-2x text-green-100"></i>
                  <i className="fa-solid fa-arrow-rotate-left fa-stack-1x fa-inverse text-green-500"></i>
                </span>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-900 ">
                  Easy Returns
                </span>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>

            <div className="row items-center ">
              <div>
                <span className="fa-stack fa-x">
                  <i className="fa-solid fa-square fa-stack-2x text-green-100"></i>
                  <i className="fa-solid fa-shield-halved fa-stack-1x fa-inverse text-green-500"></i>
                </span>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-900 ">
                  Secure Payment
                </span>
                <p className="text-xs text-gray-500">100% secure checkout</p>
              </div>
            </div>

            <div className="row items-center ">
              <div>
                <span className="fa-stack fa-x">
                  <i className="fa-solid fa-square fa-stack-2x text-green-100"></i>
                  <i className="fa-solid fa-headset fa-stack-1x fa-inverse text-green-500"></i>
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
