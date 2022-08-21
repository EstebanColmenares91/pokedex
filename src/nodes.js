/* Container */

const mainContainer = document.querySelector(".pokedex");
const title = document.querySelector(".title")
/* MAIN POKÉDEX CONTAINER */

const pokemonContainer = document.querySelector(".pokemon-container");
const containerPrincipal = document.querySelector(".otro-container");

/* POKEMON SEARCHED */
const pokemonName = document.querySelector("#pokemonName");
const searchedPokemon__container = document.querySelector(".searchedPokemon__container")

/* Message error  and Warning*/

const spanError = document.querySelector(".spanError");
const spanWarning = document.querySelector(".spanWarning");

/* buttons */

const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

/* close window */

const close = document.querySelector(".icon");

/* Inputs */

const nombrePokemon = document.querySelector("#nombrePokemon");
const searchBoton = document.querySelector("#searchBoton");

/* Pokemon Individual Card */
const pokedex2 = document.querySelector(".pokemonSelected__container");
const pokemonMainInfo = document.querySelector(".pokemonMainInfo");
const pokemonCard = document.querySelector(".pokemonCard");

/* Pokemon's Sprites */
const pokemon__figure = document.querySelector(".pokemon__figure");
const pokemon__img = document.querySelector(".pokemon__img");
const spritesContainer = document.querySelector(".spritesContainer");

/* Pokemon Types */
const pokemon__info = document.querySelector(".pokemon__info");
const pokemon__type = document.querySelector(".pokemon__type");

/* Stats Container */
const stats__container = document.querySelector(".stats__container")
const pokemon__stats = document.querySelector(".pokemon__stats");

/* Poke's info */
const pokemon__name = document.querySelector(".pokemon__name");
const pokemon__id = document.querySelector(".pokemon__id");
const height = document.querySelector(".pokemon__height");
const weight = document.querySelector(".pokemon__weight");

/* Favorites */

const favoritePokemons = document.querySelector(".favoritePokemons");
const favorites = document.querySelector(".favorites")

/* like botton */

let likeImg = document.createElement("img")
let likeButton = document.createElement("a");