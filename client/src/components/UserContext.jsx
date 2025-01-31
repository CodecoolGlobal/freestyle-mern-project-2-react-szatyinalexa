import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const storedUser = getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, [user]);

  const getUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) return null;

    try {
      const userObject = JSON.parse(loggedInUser);
      setUser(userObject);
      return userObject;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
