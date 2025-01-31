import useUser from "../hooks/useUser.js";

function Welcome() {
  const paw = "🐾";
  const cat = "😺";
  const [user] = useUser();

  return (
    <>
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
          Welcome <span>{user?.name.toUpperCase()}</span> to the Purrfectly
          Pawsome Meowmory Game!
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
