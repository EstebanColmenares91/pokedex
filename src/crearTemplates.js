/* CREATE POKEMON CON MANIPULACIÓN DEL DOM */
function createPokemon(pokemon, childContainer, parentContainer) {
    parentContainer.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
    sprite.alt = pokemon.name;
    sprite.title = pokemon.name.toUpperCase();

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("card__pokemonName");
    name.innerText = pokemon.name.toUpperCase();

    sprite.addEventListener("click", () => {
        location.hash = "#pokemon=" + pokemon.name;
    });

    const likeImg = document.createElement("img");
    likeImg.classList.add("likeImg");

    const likeButton = document.createElement("a");
    likeButton.classList.add("likeButton");
    
    
    if (childContainer.nodeName === 'DIV' && parentContainer.nodeName === 'SECTION') {
        likeImg.setAttribute("alt", "DISLIKE POKEMON");
        likeImg.setAttribute("src", "https://cdn-icons.flaticon.com/png/512/5974/premium/5974771.png?token=exp=1661135422~hmac=63bf28179a5088477aaec0bdc89fbd4d");
        likeImg.setAttribute("title", "DISLIKE POKEMON");
        
        likeButton.addEventListener('click', () => {
            childContainer.removeChild(card)
        });
    }
    
    if(childContainer.nodeName === 'DIV' && parentContainer.nodeName === 'DIV'){
        likeImg.setAttribute("alt", "LIKE POKEMON");
        likeImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/833/833472.png");
        likeImg.setAttribute("title", "LIKE POKEMON");

        likeButton.addEventListener('click', () => {
            savedPokemon(pokemon);
        });
    }

    likeButton.appendChild(likeImg);
    card.append(likeButton, spriteContainer, number, name);
    childContainer.appendChild(card);
    parentContainer.append(childContainer);
}

function createselectedPokemonByClick(pokemon) {
    const pokemonTypes = pokemon.types;
    const pokemonStats = pokemon.stats;
    const sprites = pokemon.sprites;
    /* CONVERTIR EL OBJETO DE SPRITES A UN ARRAY */
    const spritesArray = Object.values(sprites);

    pokemon__name.innerText = pokemon.name.toUpperCase();
    pokemon__id.innerText = `#${pokemon.id.toString().padStart(3, 0)}`;

    height.innerText = `Height: ${pokemon.height / 10} Mts`;
    weight.innerText = `Weight: ${pokemon.weight / 10} KG`;

    pokemon__img.src = pokemon.sprites.other.home.front_default;
    pokemon__img.alt = pokemon.name;
    pokemon__img.title = pokemon.name;
    pokemon__figure.appendChild(pokemon__img);

    const backgroundColorByFirstType = typeColor[pokemonTypes[0].type.name];
    pokemonCard.style.background = `radial-gradient(circle at 50% 0%, ${backgroundColorByFirstType} 36%, #0a162d 36%)`;

    /* POKEMON TYPES */
    pokemon__type.innerHTML = "";
    pokemon.types.forEach((type) => {
        const typeName = type.type.name;

        const typeSpan = document.createElement("span");
        typeSpan.textContent = typeName.toUpperCase();
        typeSpan.classList.add("type");

        typeSpan.style.background = typeColor[`${typeName}`];

        pokemon__type.append(typeSpan);
    });

    /* POKEMON STATS */
    pokemon__stats.innerHTML = "";
    pokemonStats.forEach((pokemonBaseStat) => {
        const pokemonStatName = pokemonBaseStat.stat.name;
        const pokemonStatValue = pokemonBaseStat.base_stat;

        const spanStat = document.createElement("span");
        spanStat.textContent = `${pokemonStatName}: ${pokemonStatValue}`;
        pokemon__stats.append(spanStat);
    });

    /* POKEMON IMAGES */
    spritesContainer.innerHTML = "";
    spritesArray.forEach((sprite) => {
        if (typeof sprite === "string") {
            const sprite__img = document.createElement("img");
            sprite__img.src = sprite;
            spritesContainer.append(sprite__img);
        }
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

