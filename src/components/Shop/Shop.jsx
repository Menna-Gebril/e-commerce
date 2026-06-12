import React, { useEffect, useMemo, useState } from "react";
import classes from "./Shop.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import LoadingError from "../LoadingError/LoadingError";
import { Link, useSearchParams } from "react-router-dom";
import Product from "../Product/Product";
import PageHeader from "../PageHeader/PageHeader";
import { pageHeaderConfig } from "../../Config/DataConfig.js";
import { Helmet } from "react-helmet-async";

export default function Shop() {
  const [shop, setShop] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get("category");
  async function getShopProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
      );
      setShop(data.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredProducts = categoryId
    ? shop.filter(
      (product) => product.category._id === categoryId
    )
    : shop;


  const categoryName = shop.find(
    (product) => product.category._id === categoryId
  )?.category.name;



  const categoryImage = shop.find(
    (product) => product.category._id === categoryId
  )?.category.image;


  useEffect(() => {
    getShopProducts();
  }, []);

  return (
    <>
      {

        categoryName ? (
          <PageHeader
            title={categoryName}
            description={`Browse products in ${categoryName}`}
            image={categoryImage}
            bgStyle="bg-gradient-to-r from-green-600 to-green-400"
            breadcrumbs={[
              { name: "Home", path: "/" },

              { name: "Categories", path: "/categories" },

              {
                name: categoryName,

              },
            ]}
          />

        )
          :
          (
            <PageHeader
              {...pageHeaderConfig.shop}
              breadcrumbs={[
                { name: "Home", path: "/" },
                { name: "All Products" },
              ]}
            />
          )
      }



      <section className={`${classes.Shop} min-h-screen pt-5`}>
        <div className="container mx-auto px-6">


          <Helmet>
            <title>Products</title>
            <meta name="description" content="All Products Page" />
          </Helmet>

          {categoryName && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-gray-600 text-sm ">
                Active Filters:
              </span>

              <Link to="/products" className="flex items-baseline gap-2
               bg-green-100 hover:bg-green-200 text-green-700  px-3 py-1 rounded-full text-sm transition-colors duration-100">
                <i class="fa-solid fa-layer-group text-xs"></i>
                {categoryName}
                <i class="fa-solid fa-xmark text-xs"></i>
              </Link>



              <Link to="/products" className="
                 text-gray-500  hover:text-gray-700 text-sm  underline transition-colors duration-100">
                Clear all
              </Link>
            </div>
          )}



          <div className="mb-3">
            <span className="text-gray-600 text-sm">
              Showing {filteredProducts.length} products
            </span>
          </div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <LoadingError onRetry={getShopProducts} />
          ) : filteredProducts.length !== 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                    lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-11"
            >
              {filteredProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <>
              <div className=" flex flex-col py-16 items-center">
                <div>
                  <span
                    className="w-24 h-24 rounded-full bg-gradient-to-br
                               from-gray-200 to-gray-100 flex items-center justify-center"
                  >
                    <i className="fa-solid fa-box-open text-5xl text-gray-300"></i>
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    No Products Found
                  </h2>
                </div>
                <div className="text-gray-500 mb-8 leading-relaxed text-center">
                  <p>No products match your current filters.</p>
                </div>

                <div>
                  <Link
                    to="/products"
                    className="w-full bg-gradient-to-r 
                                from-green-500 to-green-600 text-white 
                                py-4 px-6 rounded-xl font-semibold hover:from-green-700
                                 hover:to-green-800 transition-all duration-150  shadow-lg shadow-green-600/20 
                                 "
                  >
                    View All Products

                  </Link>
                </div>
              </div>
            </>
          )
          }
        </div>
      </section>
    </>
  );
}
