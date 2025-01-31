import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "../form.css";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const paw = "🐾";

  async function handleSubmit(event) {
    event.preventDefault();

    const body = { userName, password };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        console.log(error);
        alert(error);
        setUserName("");
        setPassword("");
      } else {
        if (error) setError("");
        navigate("/");
      }
    } catch (error) {
      setError(`Authentication failed. ${error}`);
    }
  }

  return (
    <>
      <Logo />
      <div>
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="username-register-input">Username {paw}</label>
          <input
            id="username-register-input"
            name="username"
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          ></input>
          <br />
          <label htmlFor="password-register-input">Password {paw}</label>
          <input
            id="password-register-input"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <br />
          <div>
            <button type="submit">Register</button>
            <Link to="/">
              <button id="cancel-btn" type="button">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
