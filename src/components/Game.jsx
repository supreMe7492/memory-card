import { useState, useEffect } from "react";
import Gallery from "./gallery";
export default function Game() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function pokemons() {
      const pokemons = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=20&limit=12"
      );
      const data = await pokemons.json();

      const moredat = await Promise.all(
        data.results.map((det) => fetch(det.url))
      );
      const result = await Promise.all(moredat.map((a) => a.json()));
      setPokemons(result);
    }
    pokemons();
  }, []);

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

  return <Gallery details={pokemons} handleShuffle={shuffle} />;
}
