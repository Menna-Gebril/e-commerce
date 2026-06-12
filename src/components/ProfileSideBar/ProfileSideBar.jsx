import React, { useState } from 'react'
import classes from './ProfileSideBar.module.css'
import { NavLink } from 'react-router-dom'

export default function ProfileSideBar() {
  return (
    <>
      <aside className="w-full lg:w-72 shrink-0">
        <div className='bg-white border border-gray-100 rounded-lg shadow-md'>
          <div className='p-4 border-b border-gray-100'>
            <h2 className='font-bold text-gray-900'>My Account</h2>
          </div>
          <ul className='p-2'>
            <li>
              <NavLink to="/profile/address"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                    ? "bg-green-50 text-green-700"
                    : "hover:bg-gray-50 text-gray-600"
                  }`
                }>

                {({ isActive }) => (
                  <>
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      <i className="fa-solid fa-location-dot"></i>
                    </span>

                    <span
                      className={`font-medium flex-1 ${isActive ? "text-green-700" : "text-gray-600"
                        }`}
                    >
                      My Address
                    </span>

                    <i
                      className={`fa-solid fa-angle-right ${isActive ? "text-green-700" : "text-gray-400"
                        }`}
                    ></i>
                  </>
                )}
              </NavLink>
            </li>


          </ul>




        </div>
      </aside>
    </>
  )
}
