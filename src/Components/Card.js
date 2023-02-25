import "../assets/card.css";

function Card({ pokemonData, handleClick }) {
  return (
    <div id={pokemonData.id} className="pokemon-card" onClick={handleClick}>
      <img src={pokemonData.src} alt={pokemonData.name} />
      <div>{pokemonData.name}</div>
    </div>
  );
}

export default Card;
