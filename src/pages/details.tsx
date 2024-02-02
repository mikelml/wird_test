import PokemonTeamList from "../components/pokemonTeamList/pokemonTeamList";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doRequest } from "../services/ApiBase";
import { useAppContext } from "../context/appContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./details.styl";
import "../App.css";
import {
  addPokemon,
  getNewPokemonProcesedData,
  removePokemon,
  isContained,
} from "../utils/pokemonUtils";
import { IPokemon } from "../types/types";
function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const {
    dispatch,
    store: { pokemonTeam },
  } = useAppContext();

  useEffect(() => {
    doRequest(`pokemon/${id}`).then((item) => {
      setPokemon(() => getNewPokemonProcesedData(item));
    });
  }, [id]);

  const onAddPokemon = (pokemon: IPokemon) =>
    addPokemon((e) => dispatch(e), pokemonTeam, pokemon);
  const onRemovePokemon = (pokemon: IPokemon) =>
    removePokemon((e) => dispatch(e), pokemonTeam, pokemon);
  return (
    <>
      <div className="pokemon-details-container">
        <div className="navbar">
          <Link to="/">
            <FaArrowLeftLong />
            <h2>volver</h2>
          </Link>
          {isContained(pokemonTeam, pokemon) ? (
            <button onClick={() => onRemovePokemon(pokemon)}>
              Eliminar de la lista
            </button>
          ) : (
            <button onClick={() => onAddPokemon(pokemon)}>
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
