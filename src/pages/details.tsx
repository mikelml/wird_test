import PokemonTeamList from "../components/pokemonTeamList/pokemonTeamList";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doRequest } from "../services/ApiBase";
import { useAppContext } from "../context/appContext";
import ACTIONS from "../context/appActions";
import { IPokemon } from "../types/types";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./details.styl";
import "../App.css";
function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const {
    dispatch,
    store: { pokemonTeam },
  } = useAppContext();
  useEffect(() => {
    doRequest(`pokemon/${id}`).then((item) => {
      setPokemon({
        id: item?.id,
        img: item?.sprites?.front_default,
        name: item.species.name,
        number: item.order,
        height: item.height,
        type: item.types[0]?.type.name,
        stats: item.stats,
      });
    });
  }, [id]);

  const isContained = () => {
    for (let i = 0; i < pokemonTeam.length; i++) {
      if (pokemon.id === pokemonTeam[i].id) return true;
    }
    return false;
  };

  const addPokemon = (item: IPokemon) => {
    if (pokemonTeam.length <= 5 && !isContained()) {
      doRequest(`pokemon/${item.name}`).then((pokemon: object) => {
        dispatch({
          type: ACTIONS.UPDATE_STATE,
          data: {
            pokemonTeam: [
              ...pokemonTeam,
              {
                id: pokemon?.id,
                img: pokemon?.sprites?.front_default,
                name: pokemon.species.name,
                number: pokemon.order,
                height: pokemon.height,
                type: item.types?.[0].type.name,
                stats: pokemon.stats,
              },
            ],
          },
        });
      });
    }
  };

  const removePokemon = (item: IPokemon) => {
    const pokemonIndex = pokemonTeam.findIndex(
      (pokemon) => pokemon.id === item.id
    );
    const newPokemonTeam = pokemonTeam.splice(pokemonIndex, 1);

    dispatch({
      type: ACTIONS.UPDATE_STATE,
      data: newPokemonTeam,
    });
  };
  return (
    <>
      <div className="pokemon-details-container">
        <div className="navbar">
          <Link to="/">
            <FaArrowLeftLong />
            <h2>volver</h2>
          </Link>
          {isContained() ? (
            <button onClick={() => removePokemon(pokemon)}>
              Eliminar de la lista
            </button>
          ) : (
            <button onClick={() => addPokemon(pokemon)}>
              Agregar a la lista
            </button>
          )}
        </div>
        <div className="pokemon-details">
          <img src={pokemon.img} />
          <div className="pokemon-details-description">
            <div className="description-grl">
              <div>Name: {pokemon.name}</div>
              <div>Pokedex #: {pokemon.number}</div>
              <div>Height: {pokemon.height}</div>
              <div>Type: {pokemon.type}</div>
            </div>
            <div className="description-stats">
              <div className="stat-item">
                <div className="stat-tittle">HP:</div>
                {pokemon.stats?.[0]?.base_stat}
              </div>
              <div className="stat-item">
                <div className="stat-tittle">ATK:</div>
                {pokemon.stats?.[1]?.base_stat}
              </div>
              <div className="stat-item">
                <div className="stat-tittle">DEF:</div>
                {pokemon.stats?.[2]?.base_stat}
              </div>
              <div className="stat-item">
                <div className="stat-tittle">S ATK:</div>
                {pokemon.stats?.[3]?.base_stat}
              </div>
              <div className="stat-item">
                <div className="stat-tittle">S DEF:</div>
                {pokemon.stats?.[4]?.base_stat}
              </div>
              <div className="stat-item">
                <div className="stat-tittle">SPD:</div>
                {pokemon.stats?.[5]?.base_stat}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PokemonTeamList></PokemonTeamList>
    </>
  );
}

export default Details;
