import { useState, useEffect } from "react";
import NotFound from "./NotFound";
import axios from "axios";
const PokeInfo = (props) => {
  const pokemonName = props.match.params.pokemon;
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPokemonInfo = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      console.log(res.data);
      setPokemonInfo(res.data);
      setLoading(false);
    } catch {
      setLoading(true);
      setError(true);
    }
  };
  console.log(pokemonInfo);
  useEffect(() => {
    getPokemonInfo();
  }, []);
  return (
    <div className="container-md d-flex justify-content-center">
      {loading ? (
        <div className="spinner-border m-5" role="status"></div>
      ) : (
        <>
          <div className="d-flex flex-column justify-content-center col-xs-6 col-sm-8  my-5 p-4 text-center border border-secondary rounded">
            <h1 className="text-uppercase pokemon-info-name ">
              {pokemonInfo.name}
            </h1>
            <p>#0{pokemonInfo.id}</p>
            <div className="img-box">
              <img
                className="pokemon-info-img img-fluid"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInfo.id}.png`}
                alt={pokemonInfo.name}
              />
            </div>
            <div className="pokemon-types d-flex justify-content-center">
              {pokemonInfo.types.map((type, index) => (
                <div
                  key={index}
                  className={`pokemon-type mx-1 ${type.type.name}`}
                >
                  <span className="pokemon-type-txt">{type.type.name}</span>
                </div>
              ))}
            </div>
            <div className="pokemon-info-dimensions mt-3 d-flex justify-content-around px-5">
              <div className="col-md-4 mx-4">
                <b>Height:</b> {pokemonInfo.height}
              </div>
              <div className="col-md-4 mx-4">
                <b>Weight:</b> {pokemonInfo.weight}
              </div>
            </div>
            <div className="pokemon-info-stats row justify-content-center mt-4">
              {pokemonInfo.stats.map((pokemonStats, index) => (
                <div key={index} className="single-stat col-lg-4">
                  <div className="pokemon-stat">
                    <span className="text-capitalize">
                      <b>{pokemonStats.stat.name}:</b> {pokemonStats.base_stat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokeInfo;
