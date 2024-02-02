import { IPokemon } from "../types/types";
import { doRequest } from "../services/ApiBase";
import ACTIONS from "../context/appActions";

export const getPokemonId = (url: string) =>
  url.split("/")[url.split("/").length - 2];

export const getNewPokemonProcesedData = (pokemon) => ({
  id: pokemon?.id,
  img: pokemon?.sprites?.front_default,
  name: pokemon.species.name,
  number: pokemon.order,
  height: pokemon.height,
  type: pokemon.types?.[0].type.name,
  stats: pokemon.stats,
});

export const isContained = (pokemonTeam, pokemon) => {
  for (let i = 0; i < pokemonTeam.length; i++) {
    if (pokemon.name === pokemonTeam[i].name) return true;
  }
  return false;
};

export const addPokemon = (dispatch, pokemonTeam, item: IPokemon) => {
  if (pokemonTeam.length <= 5 && !isContained(pokemonTeam, item)) {
    doRequest(`pokemon/${item.name}`).then((pokemon: object) => {
      dispatch({
        type: ACTIONS.UPDATE_STATE,
        data: {
          pokemonTeam: [...pokemonTeam, getNewPokemonProcesedData(pokemon)],
        },
      });
    });
  }
};

export const removePokemon = (dispatch, pokemonTeam, item: IPokemon) => {
  const pokemonIndex = pokemonTeam.findIndex(
    (pokemon) => pokemon.name === item.name
  );
  const newPokemonTeam = pokemonTeam.splice(pokemonIndex, 1);

  dispatch({
    type: ACTIONS.UPDATE_STATE,
    data: newPokemonTeam,
  });
};
