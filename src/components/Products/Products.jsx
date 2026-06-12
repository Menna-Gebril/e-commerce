import React, { useEffect, useState } from "react";
import classes from "./Products.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Product from "../Product/Product.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadingError from "../LoadingError/LoadingError.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function getProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,
      );
      console.log(data.data);
      setProducts(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section className={`${classes.Products}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-11 line">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <LoadingError onRetry={getProducts} />
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-11"
            >
              {products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
