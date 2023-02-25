import { Pokedex } from "pokeapi-js-wrapper";

const pokedex = new Pokedex();

const MIN = 1;
const MAX = 1008;

// get random start between [1 - 1008] (inclusive)
const getRandomizedStart = (quantity) => {
  return Math.floor(Math.random() * (MAX - MIN - quantity + 2)) + MIN;
};

const getRandomizedInterval = (quantity, start) => [start, quantity + start];

const getIDSFromInterval = (start, end) => {
  let ids = [];

  for (let i = start; i < end; i++) {
    ids.push(i);
  }

  return ids;
};

const getCardsFromIds = (ids) => {
  return Promise.all(ids.map((id) => pokedex.getPokemonByName(id)));
};

function generatePokemonArray(quantity) {
  const [start, end] = getRandomizedInterval(
    quantity,
    getRandomizedStart(quantity)
  );
  const ids = getIDSFromInterval(start, end);
  const cards = getCardsFromIds(ids);

  return cards;
}

const fetchCardsImgs = async (cards) => {
  return Promise.all(
    cards.map(
      ({ src }) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;

          img.onload = () => resolve(src);
        })
    )
  );
};

// get random number from 0 to max not included
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleCards = (prevCards) => {
  let cards = [...prevCards];
  const length = cards.length;
  let shuffled = [];
  let r;

  for (let i = 0; i < length; i += 1) {
    r = getRandomIndex(cards.length);
    shuffled = [...shuffled, ...cards.splice(r, 1)];
  }

  return shuffled;
};

async function getPokemonList(quantity) {
  const cards = await generatePokemonArray(quantity);

  const brief = cards.map((card) => ({
    id: card.id,
    name: card.name,
    src: card.sprites.other["official-artwork"].front_default,
    clicked: false,
  }));

  await fetchCardsImgs(brief);

  const shuffled = shuffleCards(brief);

  return shuffled;
}

export { shuffleCards, getPokemonList };
