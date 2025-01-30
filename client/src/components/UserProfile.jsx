import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import '../navbar.css';
import useUser from '../hooks/useUser.js';

function UserProfile() {
	const [user] = useUser();
	const navigate = useNavigate();

	/*useEffect(() => {
		const loggedInUser = localStorage.getItem('user');

		if (loggedInUser) {
			const userObject = JSON.parse(loggedInUser);
			setUser(userObject);
		} else {
			navigate('/');
		}
	}, []);*/

	function handleLogout() {
		localStorage.removeItem('user');
		navigate('/');
	}

	async function handleDeleteAccount(id) {
		/* console.log('Deleting user: ', id); */
		alert(`Deleting your account... We are sorry to see you go, ${user.name}`)

		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await fetch(`/api/users/${id}`, options);
			if (response.ok) {
				console.log('User is deleted.');
                localStorage.removeItem('user');
                navigate('/');
			} else {
				console.error('Failed to delete user');
			}
		} catch (error) {
			console.error('Internal server error', error);
		}
	}

    

	return (
		<div>
			{user && (
				<>
					<Navbar />
					<br /><br />
					<h2>User Profile</h2>
					<br />
					<p>{user.name}</p>
					<p>Score: {user.score}</p><br /><br />
                    <Link to="/update-password">
						<button type="button">
                        Update Password
						</button><br /><br />
					</Link>
					<button onClick={handleLogout}>Logout</button><br /><br />
					<button onClick={() => handleDeleteAccount(user._id)}>Delete Account</button>
				</>
			)}
			{!user && <p>Loading...</p>}
		</div>
	);
}

export default UserProfile;