import { createContext, useContext, useEffect, useState } from "react";
import { loginWithGoogle } from "../Services/authservices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("UserData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentialResponseDecoded) => {
    const userData = {
      googleId: credentialResponseDecoded.sub,
      email: credentialResponseDecoded.email,
      name: credentialResponseDecoded.name,
    };

    const response = await loginWithGoogle(userData);
    setUser(response);
    localStorage.setItem("UserData", JSON.stringify(response));
  };

  const logout = () => {
    localStorage.removeItem("UserData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
