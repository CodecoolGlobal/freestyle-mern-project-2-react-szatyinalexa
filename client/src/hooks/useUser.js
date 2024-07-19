import { useState, useEffect } from "react";

export default function useUser() {
  const [user, setUser] = useState('');

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		if (loggedInUser) {
			const userObject = JSON.parse(loggedInUser);
			setUser(userObject.name);
		}
	}, []);

  return [user, setUser];
}
