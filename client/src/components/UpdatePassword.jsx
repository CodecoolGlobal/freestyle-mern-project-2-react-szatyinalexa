import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import "../navbar.css";
import "../form.css";

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleUpdatePassword(event) {
    event.preventDefault();

    const body = { password };
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`/api/users/${user.id}`, options);
      if (response.ok) {
        navigate("/user-profile");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Internal server error", error);
    }
  }

  return (
    <>
      <h3>Update Password</h3>
      <div>
        <form className="password-update-form" onSubmit={handleUpdatePassword}>
          <label>
            Current Password:
            <input
              id="password-current-input"
              name="old-password"
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
              name="new-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
