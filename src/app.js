/* UTILS */
function buscarPokemon() {
  const nombreID = document.getElementById("nombrePokemon");
  const nombreIDValue = nombreID.value;
  const nameToLowerCase = nombreIDValue.toLowerCase();
  const nameToLowerCaseTrimed = nameToLowerCase.trim();

  if (nameToLowerCaseTrimed.length === 0) {
    spanWarning.innerText = "This input is empty.";
  } else {
    pokemonName.innerHTML = ""
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
    offset -= 50;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  } else {
    spanError.innerText = "ACTION NOT VALID";
  }
});

/* PÁGINA SIGUIENTE */
next.addEventListener("click", () => {
  if (offset > 850) {
    spanError.innerText = "ACTION NOT VALID";
  }else{
    offset += 50;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
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
      spanError.innerText = "POKEMON NOT FOUND. TRY AGAIN";
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

function savedPokemon(pokemon) {
  createPokemon(pokemon, favorites, favoritePokemons);
  console.log('guardado');
}

fetchPokemons(offset, limit);
