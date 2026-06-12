import React, { useState } from 'react'
import classes from './Profile.module.css'
import { pageHeaderConfig } from '../../Config/DataConfig'
import PageHeader from "../PageHeader/PageHeader";
import { NavLink, Outlet } from 'react-router-dom';
import ProfileSideBar from '../ProfileSideBar/ProfileSideBar';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
export default function Profile() {



  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile Page" />
      </Helmet>
      <PageHeader
        {...pageHeaderConfig.account}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "My Account" },
        ]}
      />
      <section className={`${classes.Profile} bg-gray-50`}>
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <ProfileSideBar />


            <main className="flex-1">
              <Outlet />
            </main>
          </div>



        </div>
      </section>
    </>
  )
}
