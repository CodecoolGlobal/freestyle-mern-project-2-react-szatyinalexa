import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import '../navbar.css';
import '../form.css';

function UpdatePassword() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const navigate = useNavigate();

	async function handleUpdatePassword(id) {
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newPassword),
		};

		try {
			const response = await fetch(`/api/users/${id}`, options);
			if (response.ok) {
                navigate('/user-profile');
			} else {
				console.error('Failed to update user');
			}
		} catch (error) {
			console.error('Internal server error', error);
		}
	}

	return (
		<>
			<Navbar />
			<h3>Update Password</h3>
			<div>
				<form className="password-update-form" onSubmit={handleUpdatePassword}>
					<label>
						Current Password:
						<input
							id="password-current-input"
							name='old-password'
							type="password"
							value={currentPassword}
							onChange={(event) => setCurrentPassword(event.target.value)}
						/>
					</label>
					<br />
					<label>
						New Password:
						<input
							id="password-update-input"
							name='new-password'
							type="password"
							value={newPassword}
							onChange={(event) => setNewPassword(event.target.value)}
						/>
					</label>
					<br />
					<button type="submit">Update Password</button>
					<Link to="/user-profile">
						<button id="cancel-password-btn" type="button">
							Cancel
						</button>
					</Link>
				</form>
			</div>
		</>
	);
}

export default UpdatePassword;
