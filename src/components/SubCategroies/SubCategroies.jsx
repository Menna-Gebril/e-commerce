import React, { useEffect, useState } from "react";
import classes from "./SubCategroies.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../PageHeader/PageHeader";
export default function SubCategroies() {
  const [subCategories, setSubCategories] = useState([]);
  const [details, setDetails] = useState({});
  const { id } = useParams();

  async function getDeatlais(id) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    );
    console.log("dataaaaaaaaaa", data.data);
    setDetails(data.data);
  }

  async function getSubCategories() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
      );

      console.log(data.data);
      setSubCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSubCategories();
    getDeatlais(id);
  }, []);

  return (
    <>
      <PageHeader
        title={details.name}
        description="Choose a subcategory to browse products"
        image={details.image}
        bgStyle="bg-gradient-to-r from-green-600 to-green-400"
        breadcrumbs={[
          { name: "Home", path: "/" },

          { name: "Categories", path: "/categories" },

          {
            name: details.name,

          },
        ]}
      />
      <section className={`${classes.SubCategroies} py-8`}>
        <div className="container mx-auto px-6">
          <div className="mb-5">
            <Link
              to="/categories"
              className="inline-flex items-baseline 
            gap-2 text-gray-600
             hover:text-green-500 transition-colors"
            >
              <i className="fa-solid fa-arrow-left-long text-sm"></i>
              Back To Categories
            </Link>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            {subCategories.length} Subcategories in {details.name}
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 "
          >
            {subCategories.map((subcategory) => (
              <div
                key={subcategory._id}
                className="
            group bg-white 
            rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl
             hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
              >
                <span
                  className="w-14 h-14 rounded-xl
               bg-green-200/50 text-green-600 flex items-center justify-center mb-4 
              group-hover:bg-green-100 transition-colors"
                >
                  <i className="fa-solid fa-folder-open"></i>
                </span>
                <h3
                  className="font-bold
               text-gray-900 text-lg
                group-hover:text-green-600 transition-colors mb-2"
                >
                  {subcategory.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
