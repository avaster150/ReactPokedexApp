import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const PokeList = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [loading, setLoading] = useState(true);
  const [searchBar, setSearchBar] = useState("");

  const getAllPokemons = async () => {
    try {
      const res = await axios.get(loadMore);

      setLoadMore(res.data.next);

      function createPokemonObject(result) {
        result.forEach(async (pokemon) => {
          const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          setPokemons((currentList) => [...currentList, res.data]);
        });
      }
      createPokemonObject(res.data.results);
      setLoading(false);
    } catch {
      setLoading(true);
    }
  };
  const handleInput = (value) => {
    const serachValue = value.toLowerCase();
    setSearchBar(serachValue);
  };
  pokemons.sort((a, b) => a.id - b.id);
  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="pokemons-container container-xl text-center mt-5">
      {loading ? (
        <div className="spinner-border m-5" role="status"></div>
      ) : (
        <>
          <form className="form-inline">
            <input
              onChange={(e) => handleInput(e.target.value)}
              value={searchBar}
              className="search-pokemon form-control p-1 mb-3"
              type="text"
              placeholder="Search pokemon, number"
            />
            <button
              className="btn btn-secondary"
              onClick={() => props.history.push(`/pokemon/${searchBar}`)}
            >
              Search
            </button>
          </form>
          <div className="all-pokemons row justify-content-center p-4">
            {pokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="single-pokemon p-4 border col-xs-4 col-sm-4 col-md-3 my-4 mx-4"
              >
                <h5 className="pokemon-name">{pokemon.name}</h5>
                <p className="pokemon-id">#0{pokemon.id}</p>
                <div className="pokemon-img-container">
                  <Link
                    className="pokemon-img-action"
                    to={`/pokemon/${pokemon.name}`}
                  >
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="pokemon-img img-fluid"
                    />
                  </Link>
                </div>
                <div className="pokemon-types d-flex justify-content-center">
                  {pokemon.types.map((type, index) => (
                    <div
                      key={index}
                      className={`pokemon-type mx-1 ${type.type.name}`}
                    >
                      <span className="pokemon-type-txt">{type.type.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            className="btn btn-secondary load-more mb-5"
            onClick={() => getAllPokemons()}
          >
            Load More
          </button>
        </>
      )}
    </div>
  );
};
export default PokeList;
