import { map } from "lodash";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import {
  getPokemonsApi,
  getPokemonDetailsByUrlApi,
  getPokemonsApiTotal,
} from "../api/pokemon";
import PokemonList from "../components/PokemonList";
const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=151&offset=0";
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;

export default function Pokedex() {
  const [firstGenPokemonDetails, setfirstGenPokemonDetails] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [load, setLoad] = useState(false);

  const [filterData, setFilterData] = useState([]);

  // useEffect(() => {
  //   const fetchFirstGenPokemons = async () => {
  //     const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
  //     const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();

  //     const firstGenPokemonDetails = await Promise.all(
  //       firstGenPokemonIdsBody.results.map(async (p) => {
  //         const pDetails = await fetch(p.url);

  //         return await pDetails.json();
  //       })
  //     );

  //     setfirstGenPokemonDetails(firstGenPokemonDetails);
  //     // console.log(await firstGenPokemonDetails);
  //   };

  //   fetchFirstGenPokemons();
  // }, []);

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
      console.log("uno");
      console.log([...pokemons]);
      console.log("dos");

      console.log([...pokemonsArray]);
      console.log("resultado");

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
        pokemons={firstGenPokemonDetails}
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
