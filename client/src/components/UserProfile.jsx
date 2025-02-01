import { Link, useNavigate } from "react-router-dom";
import "../navbar.css";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  async function handleDeleteAccount() {
    alert(`Deleting your account... We are sorry to see you go, ${user.name}`);

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`/api/users/${user.id}`, options);
      if (response.ok) {
        handleLogout();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Internal server error", error);
    }
  }

  return (
    <div>
      {user && (
        <>
          <br />
          <br />
          <h2>User Profile</h2>
          <br />
          <p>{user.name}</p>
          <p>Score: {user.score}</p>
          <br />
          <br />
          <Link to="/update-password">
            <button type="button">Update Password</button>
            <br />
            <br />
          </Link>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <br />
          <button onClick={() => handleDeleteAccount()}>Delete Account</button>
        </>
      )}
      {!user && <p>Loading...</p>}
    </div>
  );
}

export default UserProfile;
