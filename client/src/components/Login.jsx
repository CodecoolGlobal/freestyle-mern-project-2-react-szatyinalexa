import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../form.css";
import { UserContext } from "./UserContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);
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
        alert(data.message);
        setUserName("");
        setPassword("");
      } else {
        if (error) setError("");
        const userData = data.user;
        localStorage.setItem("user", userData);
        setUser(userData);
        navigate("/");
      }
    } catch (error) {
      setError(`Authentication failed. ${error}`);
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
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
          <p className="paragraph">Don&#39;t have an account yet?</p>
          <Link className="link-to-register" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
