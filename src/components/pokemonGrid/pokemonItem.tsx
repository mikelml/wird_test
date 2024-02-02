import { POKE_API_SPRITES } from "../../constants/pokemon";
import { useAppContext } from "../../context/appContext";
import { FaCirclePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  getPokemonId,
  addPokemon,
  removePokemon,
} from "../../utils/pokemonUtils";
import { IPokemon } from "../../types/types";

const PokemonItem = ({ item, isList }) => {
  const {
    dispatch,
    store: { pokemonTeam },
  } = useAppContext();

  const onAddPokemon = (pokemon: IPokemon) =>
    addPokemon((e) => dispatch(e), pokemonTeam, pokemon);
  const onRemovePokemon = (pokemon: IPokemon) =>
    removePokemon((e) => dispatch(e), pokemonTeam, pokemon);

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
        <button className="delete-button" onClick={() => onRemovePokemon(item)}>
          <RiDeleteBin6Line />
        </button>
      ) : (
        <button onClick={() => onAddPokemon(item)}>
          <FaCirclePlus />
        </button>
      )}
    </div>
  );
};

export default PokemonItem;
