import { useEffect, useState } from "react";
import { doRequest } from "../../services/ApiBase";
import SearchBar from "../searchBar/searchBar";
import "./styles.styl";
import PokemonItem from "./pokemonItem";
function PokemonGrid() {
  const [pokemonApiList, setPokemonApiList] = useState<Array<object>>([]);

  useEffect(() => {
    doRequest("pokemon?limit=151&offset=0").then((pokemon: object) => {
      setPokemonApiList(pokemon.results);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.name.value;
    doRequest(`pokemon/${value}`).then((pokemon: object) => {
      setPokemonApiList([{ ...pokemon, url: pokemon.species.url }]);
    });
  };
  const onChangeValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "")
      doRequest("pokemon?limit=151&offset=0").then((pokemon: object) => {
        setPokemonApiList(pokemon.results);
      });
  };

  return (
    <>
      <div className="pokemon-grid-container">
        <SearchBar
          onHandleSubmit={(e) => handleSubmit(e)}
          onChangeValue={(e) => onChangeValue(e)}
        />
        <div className="pokemon-grid">
          {pokemonApiList.map((item) => (
            <PokemonItem item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonGrid;
