import React, { useEffect, useState } from 'react'
import classes from './Address.module.css'
import { useFormik } from "formik";
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Loader from '../Loader/Loader';
import LoadingError from '../LoadingError/LoadingError';
export default function Address() {
  const [menu, setMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [addressDetails, setaddressDetails] = useState([])
  const { authToken } = useContext(AuthContext);
  const api_url = "https://ecommerce.routemisr.com/api/v1/addresses"
  const headers = {
    token: authToken,
  }
  const initialValues = {
    name: "",
    details: "",
    phone: "",
    city: ""

  }

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(api_url, values, { headers })
      if (data.status === "success") {
        setaddressDetails(data.data);
        setMenu(false);
        formik.resetForm();
        setError(null)
      }
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function getAddressDetails() {
    try {
      setIsLoading(true);

      const { data } = await axios.get(api_url, { headers })
      if (data.status === "success") {
        console.log("drtials", data);
        setaddressDetails(data.data);
        setError(null)

      }
    } catch (error) {
      setError(error)

    } finally {
      setIsLoading(false)
    }
  }

  async function removeAddress(addressId) {

    try {
      setIsLoading(true)
      const { data } = await axios.delete(`${api_url}/${addressId}`, { headers })
      if (data.status === "success") {
        setaddressDetails(data.data);
        setError(null)
      }

    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }



  const formik = useFormik({
    initialValues,
    onSubmit,
  })


  useEffect(() => {
    if (authToken) {
      getAddressDetails()
    }
  }, [authToken])

  return (
    <>

      <div className='flex items-center justify-between mb-6'>
        <div >
          <h2 className='font-bold text-xl'>
            My Addresses
          </h2>
          <p className='text-gray-500 text-sm'>Manage your saved delivery addresses</p>
        </div>
        <button onClick={
          () => { setMenu(true) }
        } className='inline-flex items-baseline gap-2 px-8 py-3 rounded-xl bg-green-600
           text-white font-semibold hover:bg-green-700 
          transition-colors shadow-lg shadow-green-600/25'>
          <i className="fa-solid fa-plus"></i>
          Add Address
        </button>
      </div>
      {
        isLoading ? <Loader />
          : error ? <LoadingError onRetry={getAddressDetails} />
            : addressDetails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addressDetails.map((address) => (
                  <div
                    key={address._id}
                    className='flex justify-between bg-white rounded-3xl shadow-sm hover:shadow-md border border-gray-100 hover:border-green-100 p-4 transition-all duration-150'
                  >
                    <div className='flex items-center gap-4'>
                      <span className='w-12 h-12 rounded-xl flex items-center justify-center bg-green-50 text-green-500 text-lg'><i className="fa-solid fa-location-dot"></i></span>
                      <div>
                        <h3 className='font-bold text-gray-900 mb-1 text-lg'>{address.name}</h3>
                        <p className='text-sm text-gray-600 mb-3 line-clamp-2'>{address.details}</p>
                        <div className='flex items-center gap-5 text-gray-500 text-sm'>
                          <span>
                            <i className="fa-solid fa-phone me-1.5" ></i>
                            {address.phone}
                          </span>
                          <span>
                            <i className="fa-solid fa-city me-1.5"></i>
                            {address.city}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button className='w-9 h-9 rounded-xl bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors duration-150 flex items-center justify-center text-sm'>
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button onClick={
                        () => {
                          removeAddress(address._id)
                        }
                      } className='w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors duration-150 flex items-center justify-center text-sm'>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='bg-white rounded-3xl border border-gray-100 p-12 text-center'>
                <div className='w-20 h-20 rounded-full mb-5 bg-gray-100 text-gray-500 flex items-center justify-center mx-auto text-3xl'>
                  <i className="fa-solid fa-location-dot"></i>
                </div>

                <h3 className='font-bold text-xl mb-5'>No Addresses Yet</h3>

                <p className='text-gray-500 mb-6 max-w-sm mx-auto'>
                  Add your first delivery address to make checkout faster and easier.
                </p>

                <button
                  onClick={() => setMenu(true)}
                  className='inline-flex items-baseline gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25'
                >
                  <i className="fa-solid fa-plus"></i>
                  Add Your First Address
                </button>
              </div>
            )
      }










      <div className={`${menu ? "flex items-center justify-center " : "hidden"}  fixed inset-0 z-50 p-4`}>
        <div onClick={
          () => { setMenu(false) }
        } className='absolute inset-0 bg-black/50 backdrop-blur-sm'></div>

        <div className='relative w-full max-w-lg bg-white rounded-3xl border border-gray-100 p-5'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-xl font-bold text-gray-900'>Add New Address</h2>
            <button onClick={
              () => { setMenu(false) }
            } className='w-9 h-9 rounded-full text-sm bg-gray-100 text-gray-600'>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div>

            <form onSubmit={formik.handleSubmit}>
              <label className='text-sm font-medium text-gray-700' htmlFor="adressName">Address Name</label>
              <input required type="text" name="name" id="adressName"
                placeholder='e.g. Home, Office'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-gray-200 outline-none focus:border-green-500 focus:ring-2 
                focus:ring-green-500/20 w-full py-3 px-4 rounded-xl my-2 ' />

              <label
                className='text-sm font-medium text-gray-700'
                htmlFor="fullAddress">Full Address</label>
              <textarea required type="text" rows="3" name="details" id="fullAddress"
                placeholder='Street, building, apartment...'
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-gray-200 outline-none focus:border-green-500 focus:ring-2 
                focus:ring-green-500/20 w-full py-3 px-4 rounded-xl my-2 resize-none ' />

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className='text-sm font-medium text-gray-700' htmlFor="phone">Phone Number</label>
                  <input required type="tel" name="phone" id="phone"
                    placeholder='01xxxxxxxxx'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-200 outline-none focus:border-green-500 focus:ring-2 
                focus:ring-green-500/20 w-full py-3 px-4 rounded-xl my-2 ' />
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-700' htmlFor="city">City</label>
                  <input required type="text" name="city" id="city"
                    placeholder='Cairo'
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-200 outline-none focus:border-green-500 focus:ring-2 
                focus:ring-green-500/20 w-full py-3 px-4 rounded-xl my-2 ' />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={
                  () => { setMenu(false) }
                } type='button' className='bg-gray-100 hover:bg-gray-200 text-gray-900 p-3 rounded-xl font-medium transition-colors duration-100'>Cancel</button>


                <button type='submit' className='bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-medium transition-colors duration-100'>Add Address</button>

              </div>
            </form>


          </div>
        </div>


      </div>
    </>
  )
}
