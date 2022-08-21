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

    let likeImg = document.createElement("img")
    likeImg.setAttribute("src", "../css/img/heart.png");
    likeImg.classList.add("likeImg")

    let likeButton = document.createElement("a");
    likeButton.classList.add("likeButton");

    likeButton.appendChild(likeImg);

    likeButton.addEventListener('click', () => {
        savedPokemon(pokemon)
    });

    card.append(likeButton, spriteContainer, number, name);
    childContainer.appendChild(card);
    parentContainer.append(childContainer);
}

function createselectedPokemonByClick(pokemon) {
    const pokemonTypes = pokemon.types;
    const pokemonStats = pokemon.stats;
    console.log(pokemonTypes);
    console.log(pokemon);

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
    pokemon__type.innerHTML = ""
    pokemon.types.forEach((type) => {
        const typeName = type.type.name;

        const typeSpan = document.createElement("span");
        typeSpan.textContent = typeName.toUpperCase()
        typeSpan.classList.add("type");

        typeSpan.style.background = typeColor[`${typeName}`]

        pokemon__type.append(typeSpan)
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
    const sprites = pokemon.sprites;
    for (const key in sprites) {
        if (typeof sprites[key] === "string") {
            spritesArray.push(sprites[key]);
        }
    }

    spritesContainer.innerHTML = "";
    spritesArray.forEach((sprite) => {
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