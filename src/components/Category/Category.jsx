import React, { useState } from "react";
import classes from "./Category.module.css";
export default function Category({ category }) {
  return (
    <>
      <section className={`${classes.Category}`}>
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg py-4 text-center">
          <div className="flex items-center justify-center overflow-hidden mb-3">
            <img
              src={category.image}
              className="h-20 w-20 rounded-full "
              alt={category.name}
            />
          </div>
          <h3 className="font-medium">{category.name}</h3>
        </div>
      </section>
    </>
  );
}
