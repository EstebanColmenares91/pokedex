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


/* LLAMADAS A LA API */
async function fetchPokemonName(nombre) {
  try {
    const res = await fetch(API_URL_FETCH_POKEMON(nombre));

    if (res.status === 404) {
      spanError.innerText = "POKEMON NO ENCONTRADO INTENTE DE NUEVO";
    } else {
      const data = await res.json();

      createPokemon(data, pokemonName, searchedPokemon__container);
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

  createselectedPokemonByClick(data);
}

async function savedPokemon(pokemon) {
  createPokemon(pokemon, favorites, favoritePokemons);
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
