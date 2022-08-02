window.addEventListener("DOMContentLoaded", navigator, false); //carga el contenido de la página
window.addEventListener("hashchange", navigator, false); //escucha la petición

function navigator() {
  if (location.hash.startsWith("#pokemon=")) {
    pokemonPage();
  } else {
    homePage();
  }
}

function pokemonPage() {
  pokedex2.classList.remove("inactive");
  containerPrincipal.classList.add("inactive");
  spritesContainer.classList.remove("inactive");

  nombrePokemon.classList.add("inactive");
  searchBoton.classList.add("inactive");
  mainContainer.classList.add("inactive");

  const [_, pokemonInfo] = location.hash.split("=");
  selectedPokemonByClick(pokemonInfo);
}

function homePage() {
  pokedex2.classList.add("inactive");
  containerPrincipal.classList.remove("inactive");
  spritesContainer.classList.add("inactive");

  mainContainer.classList.remove("inactive");
  nombrePokemon.classList.remove("inactive");
  searchBoton.classList.remove("inactive");
}
