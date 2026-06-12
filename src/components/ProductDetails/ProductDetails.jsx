import React, { useContext, useEffect, useState } from "react";
import classes from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SliderImport from "react-slick";
import { useRef } from "react";
import Loader from "../Loader/Loader";
import LoadingError from "../LoadingError/LoadingError";
import TabsProductDetails from "../TabsProductDetails/TabsProductDetails";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import { Helmet } from "react-helmet-async";

export default function ProductDetails() {
  const [productDetails, setProductDeatils] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const sliderRef = useRef(null);
  const { id } = useParams();
  const { addToCart } = useContext(cartContext);
  const { addProductToWishList, wishListDetails, handleFavourite } =
    useContext(wishListContext);

  const breadcrumb = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: productDetails.category?.name,
      path: `/categories/${productDetails.category?._id}`,
    },

    {
      name: productDetails.subcategory?.[0]?.name,
      path: `/subcategory/${productDetails.subcategory?.[0]?._id}`,
    },

    {
      name: productDetails.title,
    },
  ].filter((item) => item.name);
  const Slider = SliderImport.default;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    
  };

  async function getProductDetails() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      );
      console.log(data.data);
      setProductDeatils(data.data);
      console.log(data.data.id);

      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function addProductToCart(productId) {
    const res = await addToCart(productId);
    console.log(res);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error("Something happened");
    }
  }
  async function addToFavourite(productId) {
    const res = await addProductToWishList(productId);
    if (res.status === "success") {
      console.log(res.data.length);
    }
  }
  const isFavourite = wishListDetails?.data?.some(
    (item) => item.id === productDetails.id,
  );

  useEffect(() => {
    getProductDetails();
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    if (productDetails.imageCover) {
      setMainImage(productDetails.imageCover);
    }
  }, [productDetails]);
  return (
    <>
      <section className={`${classes.ProductDetails} pt-2`}>
        <div className="container mx-auto px-6">

          {isLoading ? (
            <Loader />
          ) : error ? (
            <LoadingError onRetry={getProductDetails} />
          ) : (
            <>
              <Helmet>
                <title>{productDetails.title}</title>
                <meta name="description" content={productDetails.description} />
                <meta name="keywords" content={productDetails.slug?.replaceAll("-", ",")} />
              </Helmet>
              <ul className="flex flex-wrap items-center gap-3 mb-5">
                {breadcrumb.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.path ? (
                      <Link
                        to={item.path}
                        className="text-gray-500 text-sm hover:text-green-500 transition"
                      >
                        {index === 0 && (
                          <i className="fa-solid fa-house mr-1"></i>
                        )}

                        {item.name}
                      </Link>
                    ) : (
                      <span className="text-sm text-black">{item.name}</span>
                    )}

                    {index !== breadcrumb.length - 1 && (
                      <i className="fa-solid fa-chevron-right ml-3 text-xs text-gray-400"></i>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mb-5 flex justify-center flex-col lg:flex-row overflow-hidden gap-8 ">
                <div className="w-full lg:w-fit xl:w-1/4 border rounded-md shadow-md px-3 py-2">
                  {mainImage && (
                    <img src={mainImage} alt={productDetails.title} />
                  )}
                  <Slider ref={sliderRef} {...settings}>
                    {productDetails.images?.map((image, index) => (
                      <div
                        className="border-4 rounded-md border-transparent outline-none
        hover:border-[#337ab7] transition duration-200 focus:border-[#337ab7] cursor-pointer"
                        key={index}
                        onClick={() => {
                          setMainImage(image);
                          sliderRef.current.slickGoTo(index);
                        }}
                      >
                        <img src={image} className="w-full" />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div
                  className="w-full lg:w-3/4 border rounded-md shadow-md
                 px-3"
                >
                  <div className="my-4">
                    <Link
                      className="mr-2 px-3 py-1 text-xs rounded-full bg-green-50 text-green-700
                  hover:bg-green-100 transition duration-150
                 "
                    >
                      {productDetails.category?.name}
                    </Link>
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100">
                      {productDetails.brand?.name}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    {productDetails.title}
                  </h2>

                  <div className="mb-4 text-amber-300">
                    {[1, 2, 3, 4, 5].map((star) => {
                      if (productDetails.ratingsAverage >= star) {
                        return <i key={star} className="fa-solid fa-star"></i>;
                      } else if (productDetails.ratingsAverage >= star - 0.5) {
                        return (
                          <i
                            key={star}
                            className="fa-solid fa-star-half-stroke"
                          ></i>
                        );
                      } else {
                        return (
                          <i key={star} className="fa-regular fa-star"></i>
                        );
                      }
                    })}

                    <span className="ml-3 text-gray-800">
                      {productDetails.ratingsAverage}(
                      {productDetails.reviews?.length} reviews)
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl font-bold">
                      {productDetails.price} EGP
                    </span>
                  </div>

                  <div className="mb-4">
                    <span
                      className="inline-flex items-baseline gap-1.5 
                    px-3 py-1 text-sm font-semibold rounded-full
                     bg-green-50 text-green-700
                  
                 "
                    >
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      In Stock
                    </span>
                  </div>

                  <div className="my-5 border border-gray-100"></div>

                  <p className="text-gray-700 mb-4">
                    {productDetails.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-gray-700">Quantity</span>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-fit rounded-lg space-x-5 my-2 
                 border border-gray-300 overflow-hidden"
                      >
                        <button
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity(quantity - 1);
                            }
                          }}
                          disabled={quantity === 1}
                          className="text-gray-600 hover:text-green-600
                   hover:bg-gray-100 transition duration-150 px-3 lg:px-4 py-3 disabled:opacity-50"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>

                        <input
                          type="number"
                          min="1"
                          max={productDetails.quantity}
                          value={quantity}
                          onChange={(e) => {
                            const value = Number(e.target.value);

                            if (value >= 1 && value <= productDetails.quantity) {
                              setQuantity(value);
                            }
                          }}
                          className="w-16 font-medium text-lg text-center outline-none"
                        />

                        <button
                          onClick={() => {
                            if (quantity < productDetails.quantity) {
                              setQuantity(quantity + 1);
                            }
                          }}
                          disabled={quantity === 220}
                          className="text-gray-600 hover:text-green-600
                   hover:bg-gray-100 transition duration-150 px-3 lg:px-4 py-3  disabled:opacity-50"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>

                      <span className="text-gray-600 text-sm">
                        {productDetails.quantity} available
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between bg-gray-50 rounded-lg p-4 mb-4">
                    <span className="text-gray-600 text-lg">Total Price:</span>
                    <span className="text-2xl font-bold text-green-500">
                      {productDetails.price * quantity} EGP
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <button
                      onClick={() => {
                        addProductToCart(productDetails.id);
                      }}
                      className="flex items-baseline 
                justify-center text-white bg-green-500
                 hover:bg-green-600 transition duration-150
                 flex-1 py-3.5 px-6 rounded-lg"
                    >
                      <i className="fa-solid fa-cart-shopping mr-2"></i>
                      <span className="text-lg">Add to Cart</span>
                    </button>

                    <button
                      className="flex items-baseline 
                justify-center text-white bg-gray-900
                 hover:bg-gray-800 transition duration-150 flex-1 py-3.5 px-6 rounded-lg"
                    >
                      <i className="fa-solid fa-bolt mr-2"></i>
                      <span className="text-lg">Buy Now</span>
                    </button>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => {
                        handleFavourite(productDetails.id);
                      }}
                      className={`border rounded-lg flex-1 px-4 py-3  text-lg
                        ${isFavourite
                          ? "border-red-200 text-red-600 bg-red-50"
                          : "text-gray-800 hover:text-green-600  hover:border-green-600 transition duration-150"
                        }
                 `}
                    >
                      {isFavourite ? (
                        <>
                          <i className="fa-solid fa-heart text-base mr-2"></i>
                          In wishlist
                        </>
                      ) : (
                        <>
                          <i className="fa-regular fa-heart text-base mr-2"></i>
                          Add to wishlist
                        </>
                      )}
                    </button>
                    <button
                      className="border rounded-lg px-4 py-3
                 text-gray-800 text-lg hover:text-green-600 
                 hover:border-green-600 transition duration-150"
                    >
                      <i className="fa-solid fa-share-nodes"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex gap-3">
                      <span className="w-9 h-9 bg-green-100 text-green-500 flex items-center justify-center rounded-full">
                        <i className="fa-solid fa-truck-fast"></i>
                      </span>
                      <div>
                        <p className="text-sm">Free Delivery</p>
                        <p className="text-xs text-gray-500">Orders over $50</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-9 h-9 bg-green-100 text-green-500 flex items-center justify-center rounded-full">
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                      </span>
                      <div>
                        <p className="text-sm">30 Days Return</p>
                        <p className="text-xs text-gray-500">Money back</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-9 h-9 bg-green-100 text-green-500 flex items-center justify-center rounded-full">
                        <i className="fa-solid fa-shield-halved"></i>
                      </span>
                      <div>
                        <p className="text-sm">Secure Payment</p>
                        <p className="text-xs text-gray-500">100% Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <TabsProductDetails productDetails={productDetails} />
            </>
          )}

          <RelatedProducts />
        </div>
      </section>
    </>
  );
}
