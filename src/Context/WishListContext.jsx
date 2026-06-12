import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
export const wishListContext = createContext(null);

export default function WishListProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const api_url = "https://ecommerce.routemisr.com/api/v1/wishlist";
  const [wishListDetails, setWishListDetails] = useState({});
  const headers = {
    token: authToken,
  };
  const [numOfProductsInWishList, setNumOfProductsInWishList] = useState(0);

  async function addProductToWishList(productId) {
    try {
      const { data } = await axios.post(api_url, { productId }, { headers });
      console.log("wishListAdd", data);
      if (data.status === "success") {
        setNumOfProductsInWishList(data.data.length);
        await getWishListDetails();
      }
      return data;
    } catch (error) {
      console.log("error addToWishList",error);
      return error;
    }
  }

  async function getWishListDetails() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(api_url, { headers });
      console.log("wishListdetails123", data);
      if (data.status === "success") {
        setNumOfProductsInWishList(data.data.length);
        setWishListDetails(data);
      }
      setError(null);
      return data;
    } catch (error) {
      console.log("error getWishListDetails",error);
      setError(error);
      return error;
    } finally {
      setIsLoading(false);
    }
  }

  async function removeProductFromWishList(productId) {
    try {
      const { data } = await axios.delete(`${api_url}/${productId}`, {
        headers,
      });

      if (data.status === "success") {
        setWishListDetails((prevDetails) => {
          if (!prevDetails) return null;

          const updatedData = prevDetails.data.filter(
            (item) => item.id !== productId,
          );

          return {
            ...prevDetails,
            data: updatedData,
            count: updatedData.length,
          };
        });
        setNumOfProductsInWishList(data.data.length);
      }
      return data;
    } catch (error) {
      console.log("error remove wishlist",error);
      return error;
    }
  }


  async function handleFavourite(productId) {
    const isFavourite = wishListDetails?.data?.some(
      (item) => item.id === productId,
    );

    if (isFavourite) {
      return await removeProductFromWishList(productId);
    } else {
      return await addProductToWishList(productId);
    }
  }


  useEffect(() => {
    if (authToken) {
      getWishListDetails();
    } else {
      setWishListDetails(null);
      setNumOfProductsInWishList(0);

    }
  }, [authToken]);

  return (
    <wishListContext.Provider
      value={{
        addProductToWishList,
        numOfProductsInWishList,
        wishListDetails,
        error,
        isLoading,
        handleFavourite,
        getWishListDetails,
        removeProductFromWishList,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
