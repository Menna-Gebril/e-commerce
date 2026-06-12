import React, { useEffect, useState } from "react";
import classes from "./AllCategories.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
import { pageHeaderConfig } from "../../Config/DataConfig.js";
import { Helmet } from "react-helmet-async";

export default function AllCategories() {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function getAllCategories() {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
      );
      console.log(data.data);
      setAllCategories(data.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <PageHeader
        {...pageHeaderConfig.categories}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Categories" },
        ]}
      />
      <section className={`${classes.AllCategories} my-12`}>
        <div className="container mx-auto px-6">
          <Helmet>
            <title>Categories</title>
            <meta name="description" content="Categories Page" />
          </Helmet>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {allCategories.map((category) => (
              <Link to={`/categories/${category._id}`} key={category._id}>
                <div
                  className="bg-white rounded-lg shadow-md 
              text-center hover:shadow-lg transition duration-150 py-3
             group/parent"
                >
                  <div className="flex items-center justify-center aspect-square  overflow-hidden rounded-xl">
                    <img
                      src={category.image}
                      className="w-60 h-60 object-cover rounded-xl
    group-hover/parent:scale-110 transition duration-300"
                      alt={category.name}
                    />
                  </div>

                  <div>
                    <h3
                      className="font-bold mb-1
                   group-hover/parent:text-green-500 
                    transition duration-300"
                    >
                      {category.name}
                    </h3>
                  </div>
                  <div
                    className="opacity-0 group-hover/parent:opacity-100 
                transition-opacity"
                  >
                    <div className="text-xs  text-green-600 flex items-center justify-center gap-1">
                      View Subcategories
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
