import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import LayOut from "./components/LayOut/LayOut.jsx";
import Error from "./components/Error/Error.jsx";
const Home = lazy(() => import("./components/Home/Home.jsx"));
const Products = lazy(() => import("./components/Products/Products.jsx"));
const AllCategories = lazy(() => import("./components/AllCategories/AllCategories.jsx"));
const Brands = lazy(() => import("./components/Brands/Brands.jsx"));
const Cart = lazy(() => import("./components/Cart/Cart.jsx"));
const Login = lazy(() => import("./components/Login/Login.jsx"));
const Register = lazy(() => import("./components/Register/Register.jsx"));
const ForgetPassword = lazy(() => import("./components/ForgetPassword/ForgetPassword.jsx"));
const NotFound = lazy(() => import("./components/NotFound/NotFound.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetails/ProductDetails.jsx"));
const Shop = lazy(() => import("./components/Shop/Shop.jsx"));
const SubCategroies = lazy(() => import("./components/SubCategroies/SubCategroies.jsx"));
const CheckOut = lazy(() => import("./components/CheckOut/CheckOut.jsx"));
const MyOrders = lazy(() => import("./components/MyOrders/MyOrders.jsx"));
const WishList = lazy(() => import("./components/WishList/WishList.jsx"));
const Profile = lazy(() => import("./components/Profile/Profile.jsx"));
const Address = lazy(() => import("./components/Address/Address.jsx"));
import AuthContextProvider from "./Context/AuthContext.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import WishListProvider from "./Context/WishListContext.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from "./components/Loader/Loader.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      errorElement: <Error />,
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          )
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Shop />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <AllCategories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories/:id",
          element: (
            <ProtectedRoutes>
              <SubCategroies />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),

          children: [
            {
              path: "address",

              element: (
                <Address />
              )
            },

          ],

        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "product-details/:id/:category",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoutes>
              <MyOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "*",
          element: (
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <WishListProvider>
          <CartContextProvider>
            <HelmetProvider>
              <Suspense fallback={<Loader />}>
                <RouterProvider router={router} />
              </Suspense>
            </HelmetProvider>
            <ToastContainer />
          </CartContextProvider>
        </WishListProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
