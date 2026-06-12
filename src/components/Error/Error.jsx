import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="text-center max-w-md bg-white p-10 rounded-2xl shadow-lg border border-gray-100">

        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
          <i className="fa-solid fa-triangle-exclamation text-red-500 text-3xl"></i>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops!
        </h1>

        <p className="text-gray-500 mb-6">
          Something went wrong while loading the page.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg transition font-medium "
          >
            Go Home
          </Link>

        </div>

      </div>
    </section>
  );
}