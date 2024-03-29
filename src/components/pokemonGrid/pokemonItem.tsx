import { POKE_API_SPRITES } from "../../constants/pokemon";
import { doRequest } from "../../services/ApiBase";
import { IPokemon } from "../../types/types";
import { useAppContext } from "../../context/appContext";
import ACTIONS from "../../context/appActions";
import { FaCirclePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getPokemonId } from "../../utils/pokemonUtils";
const PokemonItem = ({ item, isList }) => {
  const {
    dispatch,
    store: { pokemonTeam },
  } = useAppContext();

  const isContained = (pokemon) => {
    for (let i = 0; i < pokemonTeam.length; i++) {
      if (pokemon.name === pokemonTeam[i].name) return true;
    }
    return false;
  };
  const addPokemon = (item: IPokemon) => {
    const isPokemonContained = isContained(item);
    if (pokemonTeam.length <= 5 && !isPokemonContained) {
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
                statS: pokemon.stats,
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
    <div className="pokemon-item">
      {isList ? (
        <div>
          <img src={item.img} />
        </div>
      ) : (
        <img src={`${POKE_API_SPRITES}${getPokemonId(item.url)}.png`} />
      )}
      {isList ? (
        <h2>{item.name}</h2>
      ) : (
        <Link to={`/${getPokemonId(item.url)}`}>{item.name}</Link>
      )}
      {isList ? (
        <button className="delete-button" onClick={() => removePokemon(item)}>
          <RiDeleteBin6Line />
        </button>
      ) : (
        <button onClick={() => addPokemon(item)}>
          <FaCirclePlus />
        </button>
      )}
    </div>
  );
};

export default PokemonItem;
