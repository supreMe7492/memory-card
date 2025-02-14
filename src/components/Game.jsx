import { useState, useEffect } from "react";
import Gallery from "./gallery";
import { Win, Lose } from "./Result";
import Header from "./Header";
export default function Game() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [memorised, setMemorised] = useState([]);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  useEffect(() => {
    async function pokemons() {
      try {
        const pokemons = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=20&limit=12"
        );
        const data = await pokemons.json();

        const moredat = await Promise.all(
          data.results.map((det) => fetch(det.url))
        );
        const result = await Promise.all(moredat.map((a) => a.json()));
        setPokemons(result);
      } catch {
        throw new Error("Failed fetching data");
      } finally {
        setLoading(false);
      }
    }
    pokemons();
  }, []);

  function handleScores(e) {
    const clickedEl = e.target.closest(".card");
    const alreadyMemorised = memorised.includes(clickedEl);
    if (alreadyMemorised) {
      setScore(0);
      setMemorised([]);
      setLose(true);
    } else {
      setScore((prev) => prev + 1);
      setMemorised([...memorised, clickedEl]);
      if (score === bestScore) {
        setBestScore((prev) => prev + 1);
      }
      if (score == 11) {
        setWin(true);
        setScore(0);
        setMemorised([]);
      }
    }
  }

  function again() {
    setWin(false);
  }

  function tryAgain() {
    setLose(false);
  }

  function shuffle() {
    let copyMons = [...pokemons];

    for (let i = 0; i < copyMons.length; i++) {
      let random = Math.floor(Math.random() * copyMons.length);
      let temp = copyMons[random];
      copyMons[random] = copyMons[i];
      copyMons[i] = temp;
    }

    setPokemons(copyMons);
  }
  if (win) {
    return (
      <>
        <Win again={again} />
      </>
    );
  } else if (lose) {
    return (
      <>
        <Lose again={tryAgain} />
      </>
    );
  } else {
    return (
      <>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <Header score={score} bestScore={bestScore} />
            <Gallery
              details={pokemons}
              handleShuffle={shuffle}
              handleScore={handleScores}
            />
          </>
        )}
      </>
    );
  }
}
