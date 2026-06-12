import React, { useState } from "react";
import classes from "./LoadingError.module.css";
export default function LoadingError({ onRetry }) {
  return (
    <>
      <section className={`${classes.LoadingError}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-sm max-w-md w-full">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full 
      bg-red-100 flex items-center justify-center"
              >
                <i className="fa-solid fa-circle-exclamation text-3xl text-red-500"></i>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Oops!
              </h3>

              <p className="text-gray-500 mb-6">
                Something went wrong while loading.
              </p>

              {onRetry && (
                <button
                  onClick={onRetry}
                  className="bg-red-500 hover:bg-red-600 transition 
            text-white px-5 py-2 rounded-lg"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
