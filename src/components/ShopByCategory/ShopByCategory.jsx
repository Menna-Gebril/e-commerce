import React, { useEffect, useState } from "react";
import classes from "./ShopByCategory.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Category from "../Category/Category";
import Loader from "../Loader/Loader";
import LoadingError from "../LoadingError/LoadingError";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function getCategories() {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
      );
      console.log(data.data);
      setCategories(data.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className={`${classes.ShopByCategory} mb-12`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-baseline justify-between mb-5">
            <h2 className="text-3xl font-bold text-gray-800 ">
              Shop by <span className="text-emerald-600">Category</span>
            </h2>

            <div>
              <Link
                to="/categories"
                className="flex items-baseline gap-2 text-green-500
             hover:text-green-600 transition-colors duration-150 font-medium"
              >
                View All Categories
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <LoadingError onRetry={getCategories} />
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          lg:grid-cols-4 xl:grid-cols-6 gap-3"
            >
              {categories.map((category) => (
                <Category category={category} key={category._id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
