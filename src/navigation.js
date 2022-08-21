close.addEventListener('click', () => {
  if (window.domain !== 'localhost') {
    location.hash = '#home';
  } else {
      history.back()
  }
})

window.addEventListener("DOMContentLoaded", navigator, false); //carga el contenido de la página
window.addEventListener("hashchange", navigator, false); //escucha la petición

function navigator() {
  if (location.hash.startsWith("#pokemon=")) {
    pokemonPage();
  }else {
    homePage();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function pokemonPage() {
  title.classList.add("inactive")
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
  title.classList.remove("inactive")
  pokedex2.classList.add("inactive");
  containerPrincipal.classList.remove("inactive");
  spritesContainer.classList.add("inactive");

  mainContainer.classList.remove("inactive");
  nombrePokemon.classList.remove("inactive");
  searchBoton.classList.remove("inactive");
}