import React, { useState } from "react";
import classes from "./PageHeader.module.css";
import { Link } from "react-router-dom";
export default function PageHeader({
  title,
  description,
  image,
  icon,
  bgStyle,
  breadcrumbs = [],
}) {
  return (
    <>
      <section className={`${bgStyle} text-white `}>
        <div className="container mx-auto px-6">
          <div className="px-4 py-12">

            <div className="flex items-center gap-2 mb-8">
              {breadcrumbs?.map((item, index) => (

                <div key={index}>
                  {item.path ? (
                    <Link

                      to={item.path}
                      className={
                        index === breadcrumbs.length - 1
                          ? "text-white font-medium"
                          : "text-white/70 hover:text-white"
                      }
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{item.name}</span>
                  )}

                  {index !== breadcrumbs.length - 1 && (
                    <span className="text-white/40"> /</span>
                  )}
                </div>

              ))}
            </div>


            <div className="flex items-center gap-5">
              <span className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center shrink-0">
                {image ? (
                  <img src={image} alt={title} className="w-12 h-12 object-contain rounded-md" />
                ) : (
                  icon && <i className={`${icon} text-2xl`}></i>
                )}
              </span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {title}
                </h1>
                <p className="text-white/80 mt-1">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
