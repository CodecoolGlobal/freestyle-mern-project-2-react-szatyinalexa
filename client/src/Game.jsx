import { useState, useEffect, useContext } from "react";
import "./Game.css";
import Card from "./components/Card.jsx";
import meows from "./components/audio.js";
import purr from "./audio/catpurr.mp3";
import { UserContext } from "./components/UserContext.jsx";

function Game() {
  const imageUrl = "./src/images/backofcard.jpg";
  const cardWidth = 200;
  const cardHeight = 250;

  const [cats, setCats] = useState(null);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [stopFlip, setStopFlip] = useState(false);
  const [winner, setWinner] = useState(false);
  const [imgCount, setImgCount] = useState(6);
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);

  function shuffleDeck(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
    }
  }

  function addID(array) {
    let catArray = [];
    for (let i = 0; i < array.length; i++) {
      let object = { id: i, img: array[i], matched: false };
      catArray.push(object);
    }
    return catArray;
  }

  async function fetchValidImages(requiredCount) {
    try {
      const response = await fetch(`/api/catPics?count=${requiredCount}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        alert(data.message);
      } else {
        setError("");
        return data;
      }
    } catch (error) {
      setError(`Error has occured while fetching images: ${error}`);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const cards = await fetchValidImages(imgCount);
      let deck = [...cards, ...cards];
      shuffleDeck(deck);
      let catArray = addID(deck);
      setCats(catArray);
    };
    fetchData();
  }, []);

  function handleClick(cat) {
    playRandomMeow();
    if (firstCard !== null) {
      setSecondCard(cat);
    } else {
      setFirstCard(cat);
    }
  }

  function removeSelection() {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
  }

  function checkIfOver() {
    let counter = 0;
    for (let cat of cats) {
      if (cat.matched === true) {
        counter++;
        if (counter === 12) {
          setWinner(true);
          handleUpdateScore();
        }
      }
    }
  }

  async function handleUpdateScore() {
    const updatedScore = addScore();
    const updatedUser = { ...user, score: updatedScore };
    const body = { score: updatedScore };

    try {
      const response = await fetch(`api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("successfully updated score");
        setUser(updatedUser);

        localStorage.setItem("user", updatedUser);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addScore() {
    const startingScore = user.score;
    const gameScore = 1;
    return startingScore + gameScore;
  }

  function playRandomMeow() {
    const randomNum = Math.floor(Math.random() * (meows.length - 0));
    const randomMeow = meows[randomNum];
    new Audio(randomMeow).play();
  }

  function playPurr() {
    new Audio(purr).play();
  }

  useEffect(() => {
    function checkIfMatch() {
      setTimeout(() => {
        if (firstCard && secondCard) {
          setStopFlip(true);
          if (firstCard.img === secondCard.img) {
            firstCard.matched = true;
            secondCard.matched = true;
          }
          removeSelection();
          checkIfOver();
        }
      }, 1000);
    }
    checkIfMatch();
  }, [firstCard, secondCard]);

  return (
    <div>
      <div className="game">
        {winner ? (
          <div className="winner-container">
            <h1 className="winner-message">
              Congratulations, you matched all the kitties!
              {playPurr()}
              {user && <h3 className="current-score">Score: {user?.score}</h3>}
            </h1>
          </div>
        ) : cats ? (
          cats.map((cat) => {
            return (
              <Card
                key={cat.id}
                cat={cat}
                width={cardWidth}
                height={cardHeight}
                backOfImage={imageUrl}
                onClick={handleClick}
                selected={
                  cat === firstCard ||
                  cat === secondCard ||
                  cat.matched === true
                }
                stopFlip={stopFlip}
              />
            );
          })
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}

export default Game;
