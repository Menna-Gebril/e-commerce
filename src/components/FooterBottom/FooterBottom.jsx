import React, { useState } from "react";
import classes from "./FooterBottom.module.css";
export default function FooterBottom() {
  return (
    <>
      <section className={`${classes.FooterBottom} `}>
        <div className="container mx-auto px-6">
          <div className="py-6 border-t-2 text-gray-500 border-gray-800 flex flex-col justify-center items-center md:justify-between md:flex-row">
            <p>© 2026 FreshCart. All rights reserved.</p>
            <div className="icon flex items-center">
              <div className="mr-3">
                <i className="fa-solid fa-credit-card mr-2"></i>
                <span>Visa</span>
              </div>

              <div className="mr-3">
                <i className="fa-solid fa-credit-card mr-2"></i>
                <span>Mastercard</span>
              </div>

              <div>
                <i className="fa-solid fa-credit-card mr-2"></i>
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
