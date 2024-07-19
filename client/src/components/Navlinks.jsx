import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import meows from "./audio";

function playRandomMeow() {
  const randomNum = Math.floor(Math.random() * (meows.length - 0));
  const randomMeow = meows[randomNum];
  new Audio(randomMeow).play();
}

function Navlinks() {
  const [user] = useUser();

  return (
    <div className="buttons">
      <button onClick={playRandomMeow}>Meow</button>
      <Link to={"/game"}>
        <button>Play</button>
      </Link>
      <Link to={"/scoreboard"}>
        <button>Scoreboard</button>
      </Link>

      {user ? (
        <Link to={"/user-profile"}>
          <button>{user}</button>
        </Link>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
}

export default Navlinks;
