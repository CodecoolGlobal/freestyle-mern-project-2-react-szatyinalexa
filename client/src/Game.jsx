import { useState, useEffect, useCallback } from "react";
import "./Game.css";
import Card from "./components/Card.jsx";
import Navbar from "./components/Navbar.jsx";
import meows from "./components/audio.js";
import purr from "./audio/catpurr.mp3";

function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
}

function addID(array) {
  const catArray = [];
  for (let i = 0; i < array.length; i++) {
    const object = { id: i, img: array[i], matched: false };
    catArray.push(object);
  }
  return catArray;
}

const imageUrl = "./src/images/backofcard.jpg";
const apiUrl =
  "https://api.thecatapi.com/v1/images/search?limit=6&api_key=live_Eh5ZLf7mKHLA9mwEJ5hoa8Rykvf1AKghBNe7bgTz41O6HpJmIw0CoTRgrxl2C1CT";

function Game() {
  const [cats, setCats] = useState(null);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [stopFlip, setStopFlip] = useState(false);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await (await fetch(apiUrl)).json();
      const cards = data.map((datum) => datum.url);
      const deck = [...cards, ...cards];
      shuffleDeck(deck);
      setCats(addID(deck));
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

  const checkIfOver = useCallback(
    function () {
      let counter = 0;
      for (let cat of cats) {
        if (cat.matched === true) {
          counter++;
          if (counter === 12) {
            setWinner(true);
          }
        }
      }
    },
    [cats]
  );

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
  }, [firstCard, secondCard, checkIfOver]);

  return (
    <div>
      <Navbar />
      <div className="game">
        {winner ? (
          <h1 className="winner-message">
            Congratulations, you matched all the kitties!
            {playPurr()}
          </h1>
        ) : cats ? (
          cats.map((cat) => {
            return (
              <Card
                key={cat.id}
                cat={cat}
                width={200}
                height={250}
                backOfImage={imageUrl}
                handleClick={handleClick}
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
