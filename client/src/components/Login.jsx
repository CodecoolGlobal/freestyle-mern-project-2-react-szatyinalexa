import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "../form.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const paw = "🐾";

  async function handleSubmit(event) {
    event.preventDefault();

    const body = { userName, password };

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        alert(error);
      } else {
        if (error) setError("");
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate("/welcome");
      }
    } catch (error) {
      setError(`Authentication failed. ${error}`);
    }
  }

  return (
    <>
      <Logo />
      <div className="login-container">
        <h2>Login or Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username-login-input">Username {paw}</label>
          <input
            id="username-login-input"
            name="username"
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          ></input>
          <br />
          <label htmlFor="password-login-input">Password {paw}</label>
          <input
            id="password-login-input"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <br />
          <div>
            <button type="submit">Log in</button>
            <p className="paragraph">
              ------------------ or ------------------
            </p>
            <Link to="/register">
              <button type="button">Register</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
