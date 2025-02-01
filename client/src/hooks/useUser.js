import { useState, useEffect } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const userObject = JSON.parse(loggedInUser);
      setUser(userObject);
    }
  }, []);

  return [user, setUser];
}
