import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "../form.css";

const paw = "🐾";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const data = { name, password };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("/api/user", options)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          console.log("Result on frontend: ", result.user);
          localStorage.setItem("user", JSON.stringify(result.user));
          navigate("/");
        } else {
          console.log("Login failed:", result.message);
          alert("Not a registered user. Please register.");
        }
      })
      .catch((error) => console.log("Error:", error));
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
            value={name}
            onChange={(event) => setName(event.target.value)}
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
