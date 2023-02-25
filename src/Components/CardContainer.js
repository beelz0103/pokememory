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

  const startLevel = async (quantity) => {
    const cardList = await getPokemonList(quantity);
    setCards(cardList);
    setTimeout(() => {
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
      setCards(shuffleCards(newCardList));
      if (levelCleared) {
        incrementLevel();
      } else {
      }
    } else {
      onGameOver();
    }
  };

  return (
    cards && (
      <div className="cardContainer">
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
    )
  );
}

export default CardContainer;
