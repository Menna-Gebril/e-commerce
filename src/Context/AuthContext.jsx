import { useEffect } from "react";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userName, setuserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [ownerId , setOwnerId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && localStorage.getItem("userName")) {
      setAuthToken(token);
      setuserName(localStorage.getItem("userName"));
      setUserEmail(localStorage.getItem("userEmail"));
      const { id } = jwtDecode(token);
      console.log("user id", id);
      setOwnerId(id)
    }
  }, []);

  console.log(authToken);
  console.log("name", userName);
  console.log("user", userEmail);
  

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, userName, setuserName, userEmail, setUserEmail ,ownerId }}
    >
      {children}
    </AuthContext.Provider>
  );
}
