import { useState, useEffect } from "react";

export default function useUser() {
  const [user, setUser] = useState('');

	useEffect(() => {
		const loggedInUser = localStorage.getItem('userName');
		if (loggedInUser) {
            setUser(loggedInUser);
		}
	}, []);

  return [user, setUser];
}