import React, { useState } from "react";
import classes from "./Loader.module.css";
export default function Loader() {
  return (
    <>
      <section className="">
        <div className="container mx-auto px-6">
          <div className={classes.box}>
            <div className={classes.spinDots}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
