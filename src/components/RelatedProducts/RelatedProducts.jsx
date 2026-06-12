import React, { useEffect, useState } from "react";
import classes from "./RelatedProducts.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import SliderImport from "react-slick";
import Product from "../Product/Product";
import NextArrow from "../NextArrow/NextArrow";
import PrevArrow from "../PrevArrow/PrevArrow";
import Loader from "../Loader/Loader";
import LoadingError from "../LoadingError/LoadingError";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
export default function RelatedProducts() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { category } = useParams();
  // const Slider = SliderImport.default;

  // var settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,

  //   responsive: [
  //     {
  //       breakpoint: 1280,
  //       settings: {
  //         slidesToShow: 4,
  //       },
  //     },

  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //       },
  //     },

  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },

  //     {
  //       breakpoint: 640,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };

  async function getRelatedProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,
      );
      console.log(data.data);
      const res = data.data.filter(
        (product) => product.category.name === category,
      );
      setRelatedProducts(res);
      console.log(res);

      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRelatedProducts();
  }, []);

  return (
    <>
      <section className={`${classes.RelatedProducts} mb-5 px-2`}>
        <h2 className="text-3xl font-bold text-gray-800 mb-12 line">
          You May Also <span className="text-emerald-600">Like</span>
        </h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <LoadingError />
        ) : (
          <>
            {
              relatedProducts.length > 0 &&(
                 <div className="relative">
              <NextArrow />
              <PrevArrow />
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".next-arrow",
                  prevEl: ".prev-arrow",
                }}
                loop={relatedProducts.length > 4}
                speed={600}
                spaceBetween={10}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 5 },
                }}
              >
                {relatedProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Product product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
              )

            }
          </>
        )}
      </section>
    </>
  );
}
