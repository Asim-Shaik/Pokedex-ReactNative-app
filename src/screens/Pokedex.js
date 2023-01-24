import React, { useState, useEffect } from "react";

import {
  getPokemonsApi,
  getPokemonDetailsByUrlApi,
  getPokemonsApiTotal,
} from "../api/pokemon";
import PokemonList from "../components/PokemonList";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [load, setLoad] = useState(false);

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    (async () => {
      await loadPokemons();
      // await loadPokemonsTotal();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      // const response = await getPokemonsApi(nextUrl);

      const response = await getPokemonsApiTotal(nextUrl);

      setNextUrl(response.next);
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }
      console.log("first");
      console.log([...pokemons]);
      console.log("second");

      console.log([...pokemonsArray]);
      console.log("results");

      setPokemons([...pokemons, ...pokemonsArray]);
      setFilterData([...pokemons, ...pokemonsArray]);
      setLoad(true);
      console.log(pokemons);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
        filterData={filterData}
        setFilterData={setFilterData}
        valor={true}
        load={load}
      />
    </>
  );
}
