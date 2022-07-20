const API_URL_FETCH_POKEMON = (id) => `https://pokeapi.co/api/v2/pokemon/${id}/`;

let paginacion = 1;
let cantidadPokemon = 21;
let botonAnteriorId = document.getElementById('botonAnterior');
let botonSiguienteId = document.getElementById('botonSiguiente');

const pokemonContainer = document.querySelector('.pokemon-container')

/* function botonAnterior() {
    if (paginacion <= 45) {
        paginacion+=1
        fetchPokemons(20)
    } else {
        console.log('error');
    }
}

function botonSiguiente() {
    if (paginacion <= 0) {
        console.log('error');
    } else {
        paginacion-=1
        fetchPokemons(20)
    }
}
 */
botonSiguienteId.addEventListener('click', () => {
    if (paginacion <= 45) {
        paginacion++
        pokemonContainer.innerHTML = "";
        console.log(paginacion);
        fetchPokemons(cantidadPokemon = cantidadPokemon + 21)
    } else {
        console.error('error');
    }
})

botonAnteriorId.addEventListener('click', () => {
    if (paginacion > 1) {
        paginacion--
        pokemonContainer.innerHTML = "";
        console.log(paginacion);
        fetchPokemons(cantidadPokemon = cantidadPokemon  - 21)
    } else {
        console.error('error');
    }
})


console.log('https://pokeapi.co/api/v2/pokemon/');

async function fetchPokemon(id){
    try {
        const res = await fetch(API_URL_FETCH_POKEMON(id))
        
        if (res.status !== 200) {
            console.log('nossirbe');
        }else{
            const data = await res.json();
            createPokemon(data)
        }
        
    } catch (error) {
        console.error(error)
    }
}

function fetchPokemons(number){
    for (let index = 1; index < number; index++) {
        fetchPokemon(index);
    }
}


/* https://pokeapi.co/api/v2/pokemon/?limit=25 */

function createPokemon(pokemon){
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container')

    const sprite = document.createElement('img')
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    const name = document.createElement('p');
    name.innerText = pokemon.name.toUpperCase();


    card.append(spriteContainer, number, name)
    pokemonContainer.appendChild(card)
}

fetchPokemons(cantidadPokemon)
