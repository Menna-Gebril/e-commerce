import React, { useState } from 'react'
import classes from './NotFound.module.css'
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <section className={`${classes.NotFound} min-h-screen bg-gray-50`}>
        <div className="container mx-auto px-6 py-10">
          <div className='flex flex-col items-center gap-5'>
            <div className='relative'>
              <span className='w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl
               shadow-gray-200/60 border border-gray-100
               flex items-center justify-center overflow-hidden text-green-500'>
                <i className="fa-solid fa-cart-shopping text-6xl sm:text-7xl text-green-400/80"></i>
              </span>
              <div className='absolute -top-5 -right-8 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg'>
                <div className='relative  bg-gradient-to-br from-green-500 to-green-600  rounded-full w-16 h-16 flex items-center justify-center'>
                  <span className='text-2xl font-bold text-white'>404</span>
                </div>
              </div>
            </div>
            <h1 className='text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight'>Oops! Nothing Here</h1>
            <p className='text-gray-500 text-lg leading-relaxed max-w-md text-center'>Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore. </p>
            <div>
              <Link to="/" className="w-full bg-gradient-to-r 
                    from-green-500 to-green-600 text-white 
                    py-4 px-6 rounded-xl font-semibold hover:from-green-700
                     hover:to-green-800 transition-all duration-150 flex items-baseline 
                     justify-center gap-3 shadow-lg shadow-green-600/20  
                     ">
                <i class="fa-solid fa-house"></i>
                Go To Home Page</Link>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}
