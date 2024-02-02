import PokemonTeamList from "../components/pokemonTeamList/pokemonTeamList";

import "../App.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doRequest } from "../services/ApiBase";
import "./details.styl";
function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    doRequest(`pokemon/${id}`).then((item) => {
      setPokemon({
        id: item?.id,
        img: item?.sprites?.front_default,
        name: item.species.name,
        number: item.order,
        height: item.height,
        type: item.types[0]?.type.name,
        stast: item.stats,
      });
    });
  }, [id]);

  const isContained = () => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
    }
  };
  return (
    <>
      <div className="pokemon-details-container">
        <div className="navbar">
          <Link to="/">volver</Link>
          {true ? (
            <button>agregar a la lista</button>
          ) : (
            <button>eliminar de la lista</button>
          )}
        </div>
        <div className="pokemon-details">
          <img src={pokemon.img} />
          <div>
            <div>Name: {pokemon.name}</div>
            <div>Pokedex #: {pokemon.number}</div>
            <div>Height: {pokemon.height}</div>
            <div>Type: {pokemon.type}</div>
          </div>
        </div>
      </div>
      <PokemonTeamList></PokemonTeamList>
    </>
  );
}

export default Details;
