import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
export const cartContext = createContext(null);
export default function CartContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const { authToken } = useContext(AuthContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  const api_url = "https://ecommerce.routemisr.com/api/v1/cart";
  const headers = {
    token: authToken,
  };

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(api_url, { productId }, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        await getCartDetails();
        setCartId(data.cartId);
      }

      return data;
    } catch (error) {
      console.log("error addToCart", error);
      return error;
    }
  }

  async function getCartDetails() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(api_url, { headers });
      console.log(data);
      if (data.status === "success") {
        setCartDetails(data.data);
        setNumOfCartItems(data.numOfCartItems);
        setCartId(data.cartId);
      }
      return data;
    } catch (error) {
      console.log("error getCartDetails", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(`${api_url}/${productId}`, {
        headers,
      });
      console.log("remove", data);
      if (data.status === "success") {
        setCartDetails(data.data);
        setCartId(data.cartId);
        setNumOfCartItems(data.numOfCartItems);
      }
      return data;
    } catch (error) {
      console.log("error remove", error);
      return error;
    }
  }

  async function updatItemFromCart(productId, count) {
    try {
      const { data } = await axios.put(
        `${api_url}/${productId}`,
        { count },
        {
          headers,
        },
      );
      console.log("update", data);
      if (data.status === "success") {
        setCartDetails(data.data);
        setCartId(data.cartId);

        setNumOfCartItems(data.numOfCartItems);
      }
      return data;
    } catch (error) {
      console.log("error update", error);
      return error;
    }
  }

  async function clearItemsFromCart() {
    try {
      const { data } = await axios.delete(api_url, { headers });
      console.log("clear", data);
      if (data.message === "success") {
        setCartDetails(null);
        setNumOfCartItems(0);
        setCartId(null);
      }
    } catch (error) {
      console.log("error clear", error);
    }
  }

  function isInCart(productId) {
    return cartDetails?.products?.some(
      (item) => item.product?.id === productId
    );
  }

  async function handlePayment(shippingAddress, isOnline) {
    try {
      const API = isOnline
        ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5176`
        : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

      const { data } = await axios.post(API, { shippingAddress }, { headers });
      if (data.message === "success") {
      }
      return data;
    } catch (error) {
      console.log("error handlepayment", error);
      return error;
    }
  }
  useEffect(() => {
    if (authToken) {
      getCartDetails();
    } else {
      setCartDetails(null);
      setNumOfCartItems(0);
      setCartId(null);
    }
  }, [authToken]);
  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        addToCart,
        getCartDetails,
        removeFromCart,
        updatItemFromCart,
        clearItemsFromCart,
        handlePayment,
        cartDetails,
        isLoading,
        isInCart,
        setNumOfCartItems,
        setCartDetails,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
