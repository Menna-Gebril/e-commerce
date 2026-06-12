import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import HomeSlider from "../HomeSlider/HomeSlider";
import FeaturesBar from "../FeaturesBar/FeaturesBar";
import ShopByCategory from "../ShopByCategory/ShopByCategory";
import PromoBanners from "../PromoBanners/PromoBanners";
import Products from "../Products/Products";
import Subscribe from "../Subscribe/Subscribe";
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <section className={`${classes.Home}`}>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <HomeSlider />
        <FeaturesBar />
        <ShopByCategory />
        <PromoBanners />
        <Products />
        <Subscribe />
      </section>
    </>
  );
}
