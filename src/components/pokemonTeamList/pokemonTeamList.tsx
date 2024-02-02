import { useAppContext } from "../../context/appContext";
import { IPokemon } from "../../types/types";
import "./styles.styl";
import PokemonItem from "../pokemonGrid/pokemonItem";

function PokemonTeamList() {
  const {
    store: { pokemonTeam },
  } = useAppContext();

  return (
    <>
      <div className="pokemon-list-container">
        <div className="pokemon-list-tittle">Listos para el combate</div>
        <div className="pokemon-list-grid">
          {pokemonTeam.length > 0 ? (
            pokemonTeam.map((item: IPokemon) => (
              <PokemonItem item={item} isList />
            ))
          ) : (
            <div className="empty-list-message">
              Lista vacia, no hay ningun pokemon listo
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PokemonTeamList;
