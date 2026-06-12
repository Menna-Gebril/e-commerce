import React, { useEffect, useState } from "react";
import classes from "./Brands.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import LoadingError from "../LoadingError/LoadingError";
import axios from "axios";
import PageHeader from "../PageHeader/PageHeader";
import { pageHeaderConfig } from "../../Config/DataConfig.js";
import { Helmet } from "react-helmet-async";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getBrands() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands",
      );
      console.log(data.data);

      setBrands(data.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <PageHeader
        {...pageHeaderConfig.brands}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Brands" },
        ]}
      />
      <section className={`${classes.Brands} my-6`}>
        <div className="container mx-auto px-6">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <LoadingError onRetry={getBrands} />
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          lg:grid-cols-4 xl:grid-cols-6 gap-6 "
            >
              <Helmet>
                <title>Brands</title>
                <meta name="description" content="Brands Page" />
              </Helmet>
              {brands.map((brand) => (
                <Link
                  key={brand._id}
                  className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 
              shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="aspect-square rounded-xl overflow-hidden
               bg-gray-50 mb-3 p-4 flex items-center justify-center"
                  >
                    <img
                      src={brand.image}
                      className="w-full h-full group-hover:scale-110 transition-transform "
                      alt={brand.name}
                    />
                  </div>
                  <h3
                    className="font-semibold text-gray-900
               text-center text-sm group-hover:text-violet-600 transition-colors mb-3"
                  >
                    {brand.name}
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-xs  text-violet-600 flex items-center justify-center gap-1">
                      View Products
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
