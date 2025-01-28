import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import '../navbar.css';
import '../form.css';

function UpdatePassword() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	function handleUpdatePassword() {}

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
