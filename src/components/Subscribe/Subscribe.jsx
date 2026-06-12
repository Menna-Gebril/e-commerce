import React, { useEffect, useState } from "react";
import classes from "./Subscribe.module.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

export default function Subscribe() {
  const [valueInput, setValueInput] = useState(false);
  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      setValueInput(true);
    },
  });

  useEffect(() => {
    if (valueInput) {
      const timer = setTimeout(() => {
        setValueInput(false);
        formik.values.email = "";
      }, 2500);

      () => clearTimeout(timer);
    }
  }, [valueInput]);

  return (
    <>
      <section className={`${classes.Subscribe} mb-12`}>
        <div className="container mx-auto px-6">
          <div
            className="grid lg:grid-cols-5 gap-8  bg-gradient-to-br
           from-emerald-50 via-white to-teal-50 rounded-2xl p-2 lg:p-7 "
          >
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-14 h-14 bg-gradient-to-br
                 from-emerald-500 to-teal-500 rounded-2xl flex 
                 items-center justify-center text-white text-xl
                 shadow-lg shadow-emerald-500/30"
                >
                  <i className="fa-solid fa-envelope"></i>
                </span>

                <div>
                  <h3 className="uppercase text-emerald-600 font-semibold tracking-wide text-sm ">
                    Newsletter
                  </h3>
                  <p className="text-gray-500 text-xs">50,000+ subscribers</p>
                </div>
              </div>
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900 
              leading-snug mb-3"
              >
                Get the Freshest Updates
                <span className="text-emerald-600"> Delivered Free</span>
              </h2>
              <p className="text-gray-400 font-medium mb-5">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>

              <div className="row items-center gap-2 mb-5">
                <div
                  className="flex items-center w-fit gap-3 rounded-full
                 bg-white/80 shadow-sm px-4 py-2.5  border border-emerald-100 
                 "
                >
                  <span className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-100 text-xs text-emerald-600">
                    <i className="fa-solid fa-leaf"></i>
                  </span>
                  <span>Fresh Picks Weekly</span>
                </div>

                <div
                  className="flex items-center w-fit gap-3 rounded-full
                 bg-white/80 shadow-sm px-4 py-2.5  border border-emerald-100 
                 "
                >
                  <span className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-100 text-xs text-emerald-600">
                    <i className="fa-solid fa-truck"></i>
                  </span>
                  <span>Free Delivery Codes</span>
                </div>

                <div
                  className="flex items-center w-fit gap-3 rounded-full
                 bg-white/80 shadow-sm px-4 py-2.5  border border-emerald-100 
                 "
                >
                  <span className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-100 text-xs text-emerald-600">
                    <i className="fa-solid fa-tag"></i>
                  </span>
                  <span>Members-Only Deals</span>
                </div>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col lg:flex-row gap-3 mb-3 "
              >
                <input
                  required
                  className="w-full
                   border py-3 px-5 rounded-xl shadow-sm
                  placeholder-gray-400 outline-none focus:border-emerald-500 
                  transition-all
                   "
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="you@example.com"
                />
                <button
                  type="submit"
                  className="border px-8 py-3 whitespace-nowrap rounded-xl bg-white
bg-gradient-to-r from-emerald-600 to-emerald-500
 hover:from-emerald-500 hover:to-teal-500 shadow-sm
 text-white shadow-emerald-500/30 hover:scale-[1.02]
  hover:shadow-emerald-500/40 transition duration-200 flex items-baseline justify-center gap-2
                "
                >
                  {valueInput ? (
                    <>
                      <span className="w-4 h-4 flex items-center justify-center bg-white  rounded-full">
                        <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
                      </span>
                      you're in
                    </>
                  ) : (
                    <>
                      Subscribe
                      <i className="fa-solid fa-arrow-right text-white text-xs"></i>
                    </>
                  )}
                </button>
              </form>

              <p className="text-gray-500 text-xs mb-5">
                Unsubscribe anytime. No spam, ever.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800  rounded-3xl p-8">
                <div className="rounded-full bg-emerald-500/20 px-3 py-1.5 w-fit border border-emerald-500/30 mb-5">
                  <span className="uppercase text-emerald-400 font-semibold text-xs">
                    Mobile App
                  </span>
                </div>

                <h3 className="text-white text-2xl font-bold leading-tight mb-5">
                  Shop Faster on Our App
                </h3>

                <p className="text-gray-400 mb-5">
                  Get app-exclusive deals & 15% off your first order.
                </p>

                <div className="space-y-5 mb-5">
                  <Link
                    to="/"
                    className="flex items-center gap-3 w-full rounded-xl 
                bg-white/10 hover:bg-white/15 border
                 border-white/10  transition-all hover:scale-[1.02]
                px-4 py-3 bg-white-10"
                  >
                    <span>
                      <i className="fa-brands fa-google-play text-white"></i>
                    </span>
                    <div>
                      <span className="uppercase text-gray-400 text-xs">
                        get it on
                      </span>
                      <p className="text-white font-bold text-sm">
                        Google Play
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/"
                    className="flex items-center gap-3 w-full rounded-xl 
                bg-white/10 hover:bg-white/15 border
                 border-white/10  transition-all hover:scale-[1.02]
                px-4 py-3 bg-white-10 "
                  >
                    <span>
                      <i className="fa-brands fa-apple text-white"></i>
                    </span>
                    <div>
                      <span className="uppercase text-gray-400 text-xs">
                        download on
                      </span>
                      <p className="text-white font-bold text-sm">App Store</p>
                    </div>
                  </Link>
                </div>

                <div className="">
                  <span>
                    <i className="fa-solid fa-star text-yellow-300 text-xs"></i>
                    <i className="fa-solid fa-star text-yellow-300 text-xs"></i>
                    <i className="fa-solid fa-star text-yellow-300 text-xs"></i>
                    <i className="fa-solid fa-star text-yellow-300 text-xs"></i>
                    <i className="fa-solid fa-star text-yellow-300 text-xs"></i>
                  </span>
                  <span className="text-gray-400 text-xs ml-2">
                    4.9 • 100K+ downloads
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
