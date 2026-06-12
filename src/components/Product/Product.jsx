import React, { useEffect, useState } from "react";
import classes from "./Product.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
export default function Product({ product }) {
  const [addProduct, setAddProduct] = useState(false);
  const { numOfCartItems, addToCart } = useContext(cartContext);
  const {
    wishListDetails,
    handleFavourite,
  } = useContext(wishListContext);
  const [addFavouriteProduct, setAddFavouriteProduct] = useState(false);

  async function addProductToCart(productId) {
    const res = await addToCart(productId);
    console.log(res);
    if (res.status !== "success") {
      toast.error("Failed to add product to cart.");
    }
  }

  const isFavourite = wishListDetails?.data?.some(
    (item) => item.id === product.id,
  );

  useEffect(() => {
    if (addProduct) {
      const timer = setTimeout(() => {
        setAddProduct(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [addProduct]);

  return (
    <>
      <section className={`${classes.Product}`}>
        <div className="border w-full rounded-md px-2 py-3 hover:-translate-y-2 hover:shadow-md
         transition duration-300 overflow-hidden">
          <div className="relative ">
            <img
              src={product.imageCover}
              className="w-full h-60 object-contain rounded-md bg-white "
              alt={product.title}
            />
            <div className="icons absolute top-0 right-0 space-y-2">
              <button
                onClick={() => {
                  handleFavourite(product.id);
                }}
                className="border border-gray-50 w-8 h-8 rounded-full flex items-center justify-center 
                  shadow-sm bg-white text-gray-600 hover:text-red-500 transition"
              >
                {isFavourite ? (
                  <i className="fa-solid fa-heart text-red-500 transition"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>

              <Link
                className="border border-gray-50 w-8 h-8 rounded-full flex items-center justify-center 
                  shadow-sm bg-white text-gray-600 hover:text-green-500 transition"
              >
                <i className="fa-solid fa-arrows-rotate"></i>
              </Link>

              <Link
                to={`/product-details/${product.id}/${product.category.name}`}
                className="border border-gray-50 w-8 h-8 rounded-full flex items-center justify-center 
                  shadow-sm bg-white text-gray-600 hover:text-green-500 transition"
              >
                <i className="fa-regular fa-eye"></i>
              </Link>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs my-2">
              {product.category.name}
            </p>
            <Link>
              <h3 className="font-medium mb-1 truncate">{product.title}</h3>
            </Link>
            <div className="text-amber-300">
              {[1, 2, 3, 4, 5].map((star) => {
                if (product.ratingsAverage >= star) {
                  return <i key={star} className="fa-solid fa-star"></i>;
                } else if (product.ratingsAverage >= star - 0.5) {
                  return (
                    <i key={star} className="fa-solid fa-star-half-stroke"></i>
                  );
                } else {
                  return <i key={star} className="fa-regular fa-star"></i>;
                }
              })}

              <span className="text-gray-500 text-xs ml-2">
                {product.ratingsAverage} ({product.ratingsQuantity})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">{product.price} EGP</span>
              <button
                type="button"
                onClick={() => {
                  addProductToCart(product.id);
                  setAddProduct(true);
                }}
                className="border border-gray-50 w-10 h-10 rounded-full flex items-center justify-center 
                  shadow-sm bg-green-500 text-white hover:bg-green-600 transition"
              >
                {addProduct ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className="fa-solid fa-plus"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
