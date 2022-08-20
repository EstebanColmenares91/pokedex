const API_URL_FETCH_POKEMON = (id) =>  `https://pokeapi.co/api/v2/pokemon/${id}/`;


let offset = 1;
const limit = 75;
const spritesArray = [];
const typesArray = [];
const pokemonArray = [];

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

/* CREATE POKEMON CON MANIPULACIÓN DEL DOM */
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

  sprite.addEventListener("click", () => {
    location.hash = "#pokemon=" + pokemon.name;
  });

  const likeImg = document.createElement("img")
  likeImg.setAttribute("src", "../css/img/heart.png");

  likeImg.classList.add("likeImg")
  const likeButton = document.createElement("a");
  likeButton.classList.add("likeButton");
  
  likeButton.addEventListener('click', () => {
    console.log(sisirve);
  })

  likeButton.appendChild(likeImg)

  card.append(likeButton, spriteContainer, number, name);
  childContainer.appendChild(card);
  parentContainer.append(childContainer);
}

function createselectedPokemonByClick(pokemon) {
  pokemon__info.innerHTML = "";
  const pokemonTypes = pokemon.types;
  const pokemonStats = pokemon.stats;

  pokemon__name.innerText = pokemon.name.toUpperCase();
  pokemon__id.innerText = `#${pokemon.id.toString().padStart(3, 0)}`;

  height.innerText = `Height: ${pokemon.height / 10} Mts`;
  weight.innerText = `Weight: ${pokemon.weight / 10} KG`;

  pokemon__img.src = pokemon.sprites.other.home.front_default;
  pokemon__img.alt = pokemon.name
  pokemon__img.title = pokemon.name
  pokemon__figure.appendChild(pokemon__img);

  /* POKEMON STATS */
  pokemonStats.forEach((pokemonBaseStat) => {
    pokemonStatName = pokemonBaseStat.stat.name;
    pokemonStatValue = pokemonBaseStat.base_stat;

    spanStat = document.createElement("span");
    spanStat.innerText = `${pokemonStatName}: ${pokemonStatValue}`;
    pokemon__stats.append(spanStat);
  });

  const backgroundColorByFirstType = typeColor[pokemonTypes[0].type.name];
  pokemonCard.style.background = `radial-gradient(circle at 50% 0%, ${backgroundColorByFirstType} 36%, #0a162d 36%)`;

  /* POKEMON TYPES */
  pokemonTypes.forEach((type) => {
    typesArray.push(type.type.name);
  });

  typesArray.map((pokemonType) => {
    const type = document.createElement("span");
    type.classList.add("type");
    
    const typeText = document.createTextNode(pokemonType.toUpperCase());
    type.appendChild(typeText);

    type.style.background = typeColor[`${pokemonType}`]

    pokemon__type.append(type);
  });

  /* POKEMON IMAGES */
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
  stats__container.append(pokemon__stats)
  pokemon__info.append(pokemon__type, stats__container, spritesContainer)

  /* ADDING THE INFO TO THE CARD */
  pokemonCard.append(
    pokemonMainInfo,
    pokemon__figure,
    pokemon__info
  );

  pokedex2.appendChild(pokemonCard);
}

/* LLAMADAS A LA API */
async function fetchPokemonName(nombre) {
  try {
    const res = await fetch(API_URL_FETCH_POKEMON(nombre));

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
  const res = await fetch(API_URL_FETCH_POKEMON(pokemonSelected));
  const data = await res.json();

  const pokemon = data;

  createselectedPokemonByClick(pokemon);
}

async function savedPokemon(id) {
  const res = await fetch(API_URL_FETCH_POKEMON(id));
  const data = await res.json()

  console.log('guardadno');

}

async function deletePokemon(id) {
  /* const res = await fetch(API_URL_FETCH_POKEMON(id));
  const data = await res.json()

  
  const likeImg = document.createElement("img")
  likeImg.setAttribute("src", "../css/img/heart.png");

  likeImg.classList.add("likeImg")

  const likeButton = document.createElement("a");

  likeButton.classList.add("likeButton");
  
  likeButton.addEventListener('click', () => {
    favoritePokemons.append(card);
  })

  likeButton.appendChild(likeImg) */

}

fetchPokemons(offset, limit);
