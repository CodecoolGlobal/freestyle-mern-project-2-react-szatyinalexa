import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import "../navbar.css";

function Welcome() {
  const paw = "🐾";
  const cat = "😺";
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const userObject = JSON.parse(loggedInUser);
      setUser(userObject.name);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="welcome">
        <br />
        <br />
        <h1>
          {paw}
          {paw}
          {paw} {cat} {paw}
          {paw}
          {paw}
        </h1>
        <br />
        <h2>
          Welcome <span>{user.toUpperCase()}</span> to the Purrfectly Pawsome
          Memory Game!
        </h2>
        <br />
        <p>
          Match adorable kitty cards and embark on a fur-ociously fun adventure.
        </p>
        <p>
          Sharpen those claws and stretch those paws for a challenge where only
          the sharpest minds will prevail.
        </p>
        <p> Good luck, and may the purrs be ever in your favor!</p>

        <br />
        <br />
        <h1>
          {paw}
          {paw}
          {paw} {cat} {paw}
          {paw}
          {paw}
        </h1>
      </div>
    </>
  );
}

export default Welcome;
