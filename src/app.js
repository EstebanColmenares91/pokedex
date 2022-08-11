const API_URL_FETCH_POKEMON = (id) =>
  `https://pokeapi.co/api/v2/pokemon/${id}/`;
const API_URL_FETCH_POKEMON_NAME = (name) =>
  `https://pokeapi.co/api/v2/pokemon/${name}/`;

let offset = 1;
const limit = 75;
const spritesArray = [];
const typesArray = [];

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

/* UTILS */

function buscarPokemon() {
  const nombreID = document.getElementById("nombrePokemon");
  const nombreIDValue = nombreID.value;
  const nameToLowerCase = nombreIDValue.toLowerCase();
  const nameToLowerCaseTrimed = nameToLowerCase.trim();
  
  if (nameToLowerCaseTrimed.length === 0) {
    spanWarning.innerText = "Este campo se encuentra vacío";
  } else {
    spanError.innerText = "";
    spanWarning.innerText = "";
    fetchPokemonName(nameToLowerCaseTrimed);
  }
}

async function fetchPokemons(offset, limit) {
  for (let index = offset; index < offset + limit; index++) {
    await fetchPokemon(index);
  }
}

/* PÁGINA ANTERIOR */
previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 75;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  } else {
    spanError.innerText = "NO PUEDES SEGUIR RETROCEDIENDO";
  }
});

/* PÁGINA SIGUIENTE */
next.addEventListener("click", () => {
  offset += 75;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

/* REMOVER NODOS DE LA PÁGINA ANTERIOR */
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/* UTILS CREATE POKEMON CON MANIPULACIÓN DEL DOM */
function createPokemon(pokemon, childContainer, parentContainer) {
  parentContainer.innerHTML = "";

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("card__pokemonName");
  name.innerText = pokemon.name.toUpperCase();

  card.addEventListener("click", () => {
    location.hash = "#pokemon=" + pokemon.name;
    location.reload();
  });

  card.append(spriteContainer, number, name);
  childContainer.appendChild(card);
  parentContainer.append(childContainer);
}

function createselectedPokemonByClick(pokemon) {
  pokedex2.innerHTML = "";

  pokemon__name.innerText = pokemon.name.toUpperCase();
  pokemon__id.innerText = `#${pokemon.id.toString().padStart(3, 0)}`;
  height.innerText = `Height: ${pokemon.height / 10} Mts`;
  weight.innerText = `Weight: ${pokemon.weight / 10} KG`;

  pokemon__img.src = pokemon.sprites.other.home.front_default;
  pokemon__figure.appendChild(pokemon__img);

  hp.innerText = `${pokemon.stats[0].stat.name}: ${pokemon.stats[0].base_stat}`;
  attack.innerText = `${pokemon.stats[1].stat.name}: ${pokemon.stats[1].base_stat}`;
  defense.innerText = `${pokemon.stats[2].stat.name}: ${pokemon.stats[2].base_stat}`;
  spAttack.innerText = `${pokemon.stats[3].stat.name}: ${pokemon.stats[3].base_stat}`;
  spDefense.innerText = `${pokemon.stats[4].stat.name}: ${pokemon.stats[4].base_stat}`;
  speed.innerText = `${pokemon.stats[5].stat.name}: ${pokemon.stats[5].base_stat}`;

  pokemon__stats.append(hp, attack, defense, spAttack, spDefense, speed);

  const themeColor = typeColor[pokemon.types[0].type.name];
  pokemonCard.style.background = `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #0a162d 36%)`;

  const pokemonTypes = pokemon.types;
  pokemonTypes.forEach((type) => {
    typesArray.push(type.type.name);
  });

  pokemon__type.innerHTML = "";
  typesArray.map((pokemonType) => {
    const type123 = document.createElement("span");
    type123.innerText = pokemonType.toUpperCase() + " ";
    pokemon__type.append(type123);
  });

  spritesContainer.innerHTML = "";
  const sprites = pokemon.sprites;
  for (const key in sprites) {
    if (typeof sprites[key] === "string") {
      spritesArray.push(sprites[key]);
    }
  }

  spritesArray.map((sprite) => {
    const sprite__img = document.createElement("img");
    sprite__img.src = sprite;

    spritesContainer.append(sprite__img);
  });

  pokemonMainInfo.append(pokemon__name, pokemon__id, height, weight);
  pokemonCard.append(
    pokemonMainInfo,
    pokemon__figure,
    pokemon__type,
    pokemon__stats,
    spritesContainer
  );
  pokedex2.appendChild(pokemonCard);
}

/* LLAMADAS A LA API */
async function fetchPokemonName(nombre) {
  try {
    const res = await fetch(API_URL_FETCH_POKEMON_NAME(nombre));

    if (res.status === 404) {
      spanError.innerText = "POKEMON NO ENCONTRADO INTENTE DE NUEVO";
    } else {
      const data = await res.json();
      
      createPokemon(data, pokemonName, searchedPokemon__container);
      console.log('llamando funcion');
    }
  } catch (error) {
    console.error(error);
  }
}


async function fetchPokemon(id) {
  try {
    const res = await fetch(API_URL_FETCH_POKEMON(id));

    if (res.status !== 200) {
      console.log("nossirbe");
    } else {
      const data = await res.json();
      const pokemon = data
      createPokemon(pokemon, pokemonContainer, containerPrincipal);
    }
  } catch (error) {
    console.error(error);
  }
}

async function selectedPokemonByClick(pokemonSelected) {
  const res = await fetch(API_URL_FETCH_POKEMON_NAME(pokemonSelected));
  const data = await res.json();

  const pokemon = data;

  createselectedPokemonByClick(pokemon);
}

fetchPokemons(offset, limit);
