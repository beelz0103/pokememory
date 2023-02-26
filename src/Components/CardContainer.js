import React, { useState, useEffect } from "react";
import { shuffleCards, getPokemonList } from "./PokemonApiHelper";
import Card from "./Card";

function CardContainer({
  levelData,
  incrementLevel,
  incrementScore,
  onGameOver,
  showLoader,
}) {
  const [cards, setCards] = useState(null);
  const [showCards, setShowCards] = useState(false);

  const startLevel = async (quantity) => {
    const cardList = await getPokemonList(quantity);
    setCards(cardList);
    setTimeout(() => {
      setShowCards(true);
      showLoader(false);
    }, 1000);
  };

  useEffect(() => {
    startLevel(levelData.cardQty);
  }, [levelData]);

  const cardClickHandler = (e) => {
    const targetDexNo = parseInt(e.target.id);
    const clickedCard = cards.find((poke) => poke.id === targetDexNo);

    const newCardList = cards.map((pokemon) => {
      if (pokemon.id === targetDexNo) return { ...pokemon, clicked: true };
      else return pokemon;
    });

    const levelCleared = newCardList.every((value) => value.clicked === true);

    if (!clickedCard.clicked) {
      incrementScore();
      if (levelCleared) {
        setShowCards(false);
        incrementLevel();
      } else {
        setCards(shuffleCards(newCardList));
      }
    } else {
      setShowCards(false);
      onGameOver();
    }
  };

  const cardSubContainer = showCards && (
    <div className="card-sub-container">
      {cards.map((value) => {
        return (
          <Card
            key={value.id}
            pokemonData={value}
            handleClick={cardClickHandler}
          />
        );
      })}
    </div>
  );

  return (
    cards && (
      <div className="card-container">
        <div className="level-display">Level: {levelData.lvlNumber}</div>
        {cardSubContainer}
      </div>
    )
  );
}

export default CardContainer;
