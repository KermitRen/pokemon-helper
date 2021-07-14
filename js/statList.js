//Global variables
var allPokemon = []; setupAllPokemonList();
var statListBody, searchBar;
var genFilters = [];
var curSortCondition = "no";
var reverseSort = false;

//setting up references
window.onload = function() {
    statListBody = document.getElementById("statListBody");
    searchBar = document.getElementById("searchBar");
    openFilterTab("generationTab");
    setupFilters();
    showPokemonList(allPokemon);
};

function setSort(condition, reverse) {

    if(condition == curSortCondition) {
        reverseSort = !reverseSort;
    } else {
        curSortCondition = condition;
        reverseSort = reverse;
    }

    reloadList();
}

function reloadList() {
    filteredList = filterList(allPokemon)
    sortedList = sortList(filteredList);
    showPokemonList(sortedList);
}

function filterList(list) {

    result1 = list.filter(p => genCheck(p.no));
    result2 = result1.filter(p => typeCheck(p.types));
    result3 = result2.filter(p => classCheck(p.class));
    result4 = result3.filter(p => nameCheck(p.name));

    return result4;
}

function sortList(list) {
    list.sort(function(p1, p2) {
        if(p1[curSortCondition] < p2[curSortCondition]) {
            return -1;
        } else if(p1[curSortCondition] > p2[curSortCondition]) {
            return 1;
        } else {
            return 0;
        }
    });
    if(reverseSort) {
        list.reverse();
    }
    return list;
}

function showPokemonList(pokemonList) {

    while(statListBody.children.length > 0) {
        statListBody.removeChild(statListBody.children[0]);
    }

    for(var i = 0; i < pokemonList.length; i++) {

        var newRow = document.createElement("tr");
        newRow.style.backgroundColor = typeToColor(pokemonList[i].types[0]);

        //Picture
        var pictureFrame = document.createElement("td");
        var picture = document.createElement("img");
        picture.src = "images/pokemon-sprites/" + pokemonList[i].no + ".png"
        pictureFrame.appendChild(picture);
        newRow.appendChild(pictureFrame);

        //Name
        var nameTd = document.createElement("td");
        nameTd.innerHTML = pokemonList[i].name;
        newRow.appendChild(nameTd);

        //Stats
        var totalTd = document.createElement("td");
        totalTd.innerHTML = pokemonList[i].total;
        newRow.appendChild(totalTd);

        var hpTd = document.createElement("td");
        hpTd.innerHTML = pokemonList[i].hp;
        newRow.appendChild(hpTd);

        var attackTd = document.createElement("td");
        attackTd.innerHTML = pokemonList[i].atk;
        newRow.appendChild(attackTd);

        var spAtkTd = document.createElement("td");
        spAtkTd.innerHTML = pokemonList[i].spAtk;
        newRow.appendChild(spAtkTd);

        var defenseTd = document.createElement("td");
        defenseTd.innerHTML = pokemonList[i].def;
        newRow.appendChild(defenseTd);

        var spDefTd = document.createElement("td");
        spDefTd.innerHTML = pokemonList[i].spDef;
        newRow.appendChild(spDefTd);

        var speedTd = document.createElement("td");
        speedTd.innerHTML = pokemonList[i].speed;
        newRow.appendChild(speedTd);

        //Pokedex Number
        var noTd = document.createElement("td");
        noTd.innerHTML = pokemonList[i].no;
        newRow.appendChild(noTd);

        statListBody.appendChild(newRow);
    }

}

function setupFilters() {
    
    //Gen filters
    let genCheckBoxes = document.getElementsByClassName("genFilter");
    for(var i = 0; i < genCheckBoxes.length; i++) {
        genCheckBoxes[i].checked = true;
    }

    //Type filters
    let typeCheckBoxes = document.getElementsByClassName("typeFilter");
    for(var i = 0; i < typeCheckBoxes.length; i++) {
        typeCheckBoxes[i].checked = true;
    }
    document.getElementById("typAll").checked = true;

    //Class filters
    let classCheckBoxes = document.getElementsByClassName("classFilter");
    for(var i = 0; i < classCheckBoxes.length; i++) {
        classCheckBoxes[i].checked = true;
    }
}

function genCheck(no) {
    if(no <= 151) {
        return document.getElementById("gen1").checked;
    } else if(no > 151 && no <= 251) {
        return document.getElementById("gen2").checked;
    } else if(no > 251 && no <= 386) {
        return document.getElementById("gen3").checked;
    } else if(no > 386 && no <= 494) {
        return document.getElementById("gen4").checked;
    }
}

function typeCheck(types) {

    for(var i = 0; i < types.length; i++) {
        let curType = types[i];
        if(document.getElementById("typ" + curType).checked) {
            return true;
        }
    }
    return false;
}

function classCheck(c) {
    if(c == null) {
        return document.getElementById("classStandard").checked;
    } else if(c == "mythical") {
        return document.getElementById("classMythical").checked;
    } else if(c == "legendary") {
        return document.getElementById("classLegendary").checked;
    }
}

function nameCheck(name) {
    return name.toLowerCase().includes(searchBar.value.toLowerCase());
}

function allTypeCheckbox() {
    //Type filters
    let typeCheckBoxes = document.getElementsByClassName("typeFilter");
    for(var i = 0; i < typeCheckBoxes.length; i++) {
        typeCheckBoxes[i].checked = document.getElementById("typAll").checked;
    }
}

function fixAllTypeCheckbox(checkbox) {
    if(!checkbox.checked) {
        document.getElementById("typAll").checked = false;
    } else {
        let trueBoxes = 0;
        let typeCheckBoxes = document.getElementsByClassName("typeFilter");
        for(var i = 0; i < typeCheckBoxes.length; i++) {
            if(typeCheckBoxes[i].checked) {
                trueBoxes++;
            }
        }
        if(trueBoxes == typeCheckBoxes.length) {
            document.getElementById("typAll").checked = true;
        }
    }
}

function openFilterTab(tab) {

    filterContent = document.getElementsByClassName("filterContent");
    for(var i = 0; i < filterContent.length; i++) {
        filterContent[i].style.display = "none";
    }

    document.getElementById(tab).style.display = "block";
}

function setupAllPokemonList() {

    //Gen 1
    allPokemon.push({name:"Bulbasaur", types:["grass", "poison"], total: 318, hp: 45, atk: 49, def: 49, spAtk: 65, spDef: 65, speed: 45, no: 1}); 
    allPokemon.push({name:"Ivysaur", types:["grass", "poison"], total: 405, hp: 60, atk: 62, def: 63, spAtk: 80, spDef: 80, speed: 60, no: 2});
    allPokemon.push({name:"Venusaur", types:["grass", "poison"], total: 525, hp: 80, atk: 82, def: 83, spAtk: 100, spDef: 100, speed: 80, no: 3});
    allPokemon.push({name:"Charmander", types:["fire"], total: 309, hp: 39, atk: 52, def: 43, spAtk: 60, spDef: 50, speed: 65, no: 4});
    allPokemon.push({name:"Charmeleon", types:["fire"], total: 405, hp: 58, atk: 64, def: 58, spAtk: 80, spDef: 65, speed: 80, no: 5});
    allPokemon.push({name:"Charizard", types:["fire", "flying"], total: 534, hp: 78, atk: 84, def: 78, spAtk: 109, spDef: 85, speed: 100, no: 6});
    allPokemon.push({name:"Squirtle", types:["water"], total: 314, hp: 44, atk: 48, def: 65, spAtk: 50, spDef: 64, speed: 43, no: 7});
    allPokemon.push({name:"Wartortle", types:["water"], total: 405, hp: 59, atk: 63, def: 80, spAtk: 65, spDef: 80, speed: 58, no: 8});
    allPokemon.push({name:"Blastoise", types:["water"], total: 530, hp: 79, atk: 83, def: 100, spAtk: 85, spDef: 105, speed: 78, no: 9});
    allPokemon.push({name:"Caterpie", types:["bug"], total: 195, hp: 45, atk: 30, def: 35, spAtk: 20, spDef: 20, speed: 45, no: 10});
    allPokemon.push({name:"Metapod", types:["bug"], total: 205, hp: 50, atk: 20, def: 55, spAtk: 25, spDef: 25, speed: 30, no: 11});
    allPokemon.push({name:"Butterfree", types:["bug", "flying"], total: 395, hp: 60, atk: 45, def: 50, spAtk: 90, spDef: 80, speed: 70, no: 12});
    allPokemon.push({name:"Weedle", types:["bug", "poison"], total: 195, hp: 40, atk: 35, def: 30, spAtk: 20, spDef: 20, speed: 50, no: 13});
    allPokemon.push({name:"Kakuna", types:["bug", "poison"], total: 205, hp: 45, atk: 25, def: 50, spAtk: 25, spDef: 25, speed: 35, no: 14});
    allPokemon.push({name:"Beedrill", types:["bug", "poison"], total: 395, hp: 65, atk: 90, def: 40, spAtk: 45, spDef: 80, speed: 75, no: 15});
    allPokemon.push({name:"Pidgey", types:["normal", "flying"], total: 251, hp: 40, atk: 45, def: 40, spAtk: 35, spDef: 35, speed: 56, no: 16});
    allPokemon.push({name:"Pidgeotto", types:["normal", "flying"], total: 349, hp: 63, atk: 60, def: 55, spAtk: 50, spDef: 50, speed: 71, no: 17});
    allPokemon.push({name:"Pidgeot", types:["normal", "flying"], total: 479, hp: 83, atk: 80, def: 75, spAtk: 70, spDef: 70, speed: 101, no: 18});
    allPokemon.push({name:"Rattata", types:["normal"], total: 253, hp: 30, atk: 56, def: 35, spAtk: 25, spDef: 35, speed: 72, no: 19});
    allPokemon.push({name:"Raticate", types:["normal"], total: 413, hp: 55, atk: 81, def: 60, spAtk: 50, spDef: 70, speed: 97, no: 20});
    allPokemon.push({name:"Spearow", types:["normal", "flying"], total: 262, hp: 40, atk: 60, def: 30, spAtk: 31, spDef: 31, speed: 70, no: 21});
    allPokemon.push({name:"Fearow", types:["normal", "flying"], total: 442, hp: 65, atk: 90, def: 65, spAtk: 61, spDef: 61, speed: 100, no: 22});
    allPokemon.push({name:"Ekans", types:["poison"], total: 288, hp: 35, atk: 60, def: 44, spAtk: 40, spDef: 54, speed: 55, no: 23});
    allPokemon.push({name:"Arbok", types:["poison"], total: 448, hp: 60, atk: 95, def: 69, spAtk: 65, spDef: 79, speed: 80, no: 24});
    allPokemon.push({name:"Pikachu", types:["electric"], total: 320, hp: 35, atk: 55, def: 40, spAtk: 50, spDef: 50, speed: 90, no: 25});
    allPokemon.push({name:"Raichu", types:["electric"], total: 485, hp: 60, atk: 90, def: 55, spAtk: 90, spDef: 80, speed: 110, no: 26});
    allPokemon.push({name:"Sandshrew", types:["ground"], total: 300, hp: 50, atk: 75, def: 85, spAtk: 20, spDef: 30, speed: 40, no: 27});
    allPokemon.push({name:"Sandslash", types:["ground"], total: 450, hp: 75, atk: 100, def: 110, spAtk: 45, spDef: 55, speed: 65, no: 28});
    allPokemon.push({name:"Nidoran F", types:["poison"], total: 275, hp: 55, atk: 47, def: 52, spAtk: 40, spDef: 40, speed: 41, no: 29});
    allPokemon.push({name:"Nidorina", types:["poison"], total: 365, hp: 70, atk: 62, def: 67, spAtk: 55, spDef: 55, speed: 56, no: 30});
    allPokemon.push({name:"Nidoqueen", types:["poison", "ground"], total: 505, hp: 90, atk: 92, def: 87, spAtk: 75, spDef: 85, speed: 76, no: 31});
    allPokemon.push({name:"Nidoran M", types:["poison"], total: 273, hp: 46, atk: 57, def: 40, spAtk: 40, spDef: 40, speed: 50, no: 32});
    allPokemon.push({name:"Nidorino", types:["poison"], total: 365, hp: 61, atk: 72, def: 57, spAtk: 55, spDef: 55, speed: 65, no: 33});
    allPokemon.push({name:"Nidoking", types:["poison", "ground"], total: 505, hp: 81, atk: 102, def: 77, spAtk: 85, spDef: 75, speed: 85, no: 34});
    allPokemon.push({name:"Clefairy", types:["fairy"], total: 323, hp: 70, atk: 45, def: 48, spAtk: 60, spDef: 65, speed: 35, no: 35});
    allPokemon.push({name:"Clefable", types:["fairy"], total: 483, hp: 95, atk: 70, def: 73, spAtk: 95, spDef: 90, speed: 60, no: 36});
    allPokemon.push({name:"Vulpix", types:["fire"], total: 299, hp: 38, atk: 41, def: 40, spAtk: 50, spDef: 65, speed: 65, no: 37});
    allPokemon.push({name:"Ninetales", types:["fire"], total: 505, hp: 73, atk: 76, def: 75, spAtk: 81, spDef: 100, speed: 100, no: 38});
    allPokemon.push({name:"Jigglypuff", types:["normal", "fairy"], total: 270, hp: 115, atk: 45, def: 20, spAtk: 45, spDef: 25, speed: 20, no: 39});
    allPokemon.push({name:"Wigglytuff", types:["normal", "fairy"], total: 435, hp: 140, atk: 70, def: 45, spAtk: 85, spDef: 50, speed: 45, no: 40});
    allPokemon.push({name:"Zubat", types:["poison", "flying"], total: 245, hp: 40, atk: 45, def: 35, spAtk: 30, spDef: 40, speed: 55, no: 41});
    allPokemon.push({name:"Golbat", types:["poison", "flying"], total: 455, hp: 75, atk: 80, def: 70, spAtk: 65, spDef: 75, speed: 90, no: 42});
    allPokemon.push({name:"Oddish", types:["grass", "poison"], total: 320, hp: 45, atk: 50, def: 55, spAtk: 75, spDef: 65, speed: 30, no: 43});
    allPokemon.push({name:"Gloom", types:["grass", "poison"], total:395 , hp: 60, atk: 65, def: 70, spAtk: 85, spDef: 75, speed: 40, no: 44});
    allPokemon.push({name:"Vileplume", types:["grass", "poison"], total: 490, hp: 75, atk: 80, def: 85, spAtk: 110, spDef: 90, speed: 50, no: 45});
    allPokemon.push({name:"Paras", types:["bug", "grass"], total: 285, hp: 35, atk: 70, def: 55, spAtk: 45, spDef: 55, speed: 25, no: 46});
    allPokemon.push({name:"Parasect", types:["bug", "grass"], total: 405 , hp: 60 , atk: 95, def: 80, spAtk: 60, spDef: 80, speed: 30, no: 47});
    allPokemon.push({name:"Venonat", types:["bug", "poison"], total: 305, hp: 60, atk: 55, def: 50, spAtk: 40, spDef: 55, speed: 45, no: 48});
    allPokemon.push({name:"Venomoth", types:["bug", "poison"], total: 450, hp: 70, atk: 65, def: 60, spAtk: 90, spDef: 75, speed: 90, no: 49});
    allPokemon.push({name:"Diglett", types:["ground"], total: 265, hp: 10, atk: 55, def: 25, spAtk: 35, spDef: 45, speed: 95, no: 50});
    allPokemon.push({name:"Dugtrio", types:["ground"], total: 425, hp: 35, atk: 100, def: 50, spAtk: 50, spDef: 70, speed: 120, no: 51});
    allPokemon.push({name:"Meowth", types:["normal"], total: 290, hp: 40, atk: 45, def: 35, spAtk: 40, spDef: 40, speed: 90, no: 52});
    allPokemon.push({name:"Persian", types:["normal"], total: 440, hp: 65, atk: 70, def: 60, spAtk: 65, spDef: 65, speed: 115, no: 53});
    allPokemon.push({name:"Psyduck", types:["water"], total: 320, hp: 50, atk: 52, def: 48, spAtk: 65, spDef: 50, speed: 55, no: 54});
    allPokemon.push({name:"Golduck", types:["water"], total: 500, hp: 80, atk: 82, def: 78, spAtk: 95, spDef: 80, speed: 85, no: 55});
    allPokemon.push({name:"Mankey", types:["fighting"], total: 305, hp: 40, atk: 80, def: 35, spAtk: 35, spDef: 45, speed: 70, no: 56});
    allPokemon.push({name:"Primeape", types:["fighting"], total: 455, hp: 65, atk: 105, def: 60, spAtk: 60, spDef: 70, speed: 95, no: 57});
    allPokemon.push({name:"Growlithe", types:["fire"], total: 350, hp: 55, atk: 70, def: 45, spAtk: 70, spDef: 50, speed: 60, no: 58});
    allPokemon.push({name:"Arcanine", types:["fire"], total: 555, hp: 90, atk: 110, def: 80, spAtk: 100, spDef: 80, speed: 95, no: 59});
    allPokemon.push({name:"Poliwag", types:["water"], total: 300, hp: 40, atk: 50, def: 40, spAtk: 40, spDef: 40, speed: 90, no: 60});
    allPokemon.push({name:"Poliwhirl", types:["water"], total: 385, hp: 65, atk: 65, def: 65, spAtk: 50, spDef: 50, speed: 90, no: 61});
    allPokemon.push({name:"Poliwrath", types:["water", "fighting"], total: 510, hp: 90, atk: 95, def: 95, spAtk: 70, spDef: 90, speed: 70, no: 62});
    allPokemon.push({name:"Abra", types:["psychic"], total: 310, hp: 25, atk: 20, def: 15, spAtk: 105, spDef: 55, speed: 90, no: 63});
    allPokemon.push({name:"Kadabra", types:["psychic"], total: 400, hp: 40, atk: 35, def: 30, spAtk: 120, spDef: 70, speed: 105, no: 64});
    allPokemon.push({name:"Alakazam", types:["psychic"], total: 500, hp: 55, atk: 50, def: 45, spAtk: 135, spDef: 95, speed: 120, no: 65});
    allPokemon.push({name:"Machop", types:["fighting"], total: 305, hp: 70, atk: 80, def: 50, spAtk: 35, spDef: 35, speed: 35, no: 66});
    allPokemon.push({name:"Machoke", types:["fighting"], total: 405, hp: 80, atk: 100, def: 70, spAtk: 50, spDef: 60, speed: 45, no: 67});
    allPokemon.push({name:"Machamp", types:["fighting"], total: 505, hp: 90, atk: 130, def: 80, spAtk: 65, spDef: 85, speed: 55, no: 68});
    allPokemon.push({name:"Bellsprout", types:["grass", "poison"], total: 300, hp: 50, atk: 75, def: 35, spAtk: 70, spDef: 30, speed: 40, no: 69});
    allPokemon.push({name:"Weepinbell", types:["grass", "poison"], total: 390, hp: 65, atk: 90, def: 50, spAtk: 85, spDef: 45, speed: 55, no: 70});
    allPokemon.push({name:"Victreebel", types:["grass", "poison"], total: 490, hp: 80, atk: 105, def: 65, spAtk: 100, spDef: 70, speed: 70, no: 71});
    allPokemon.push({name:"Tentacool", types:["water", "poison"], total: 335, hp: 40, atk: 40, def: 35, spAtk: 50, spDef: 100, speed: 70, no: 72});
    allPokemon.push({name:"Tentacruel", types:["water", "poison"], total: 515, hp: 80, atk: 70, def: 65, spAtk: 80, spDef: 120, speed: 100, no: 73});
    allPokemon.push({name:"Geodude", types:["rock", "ground"], total: 300, hp: 40, atk: 80, def: 100, spAtk: 30, spDef: 30, speed: 20, no: 74});
    allPokemon.push({name:"Graveler", types:["rock", "ground"], total: 390, hp: 55, atk: 95, def: 115, spAtk: 45, spDef: 45, speed: 35, no: 75});
    allPokemon.push({name:"Golem", types:["rock", "ground"], total: 495, hp: 80, atk: 120, def: 130, spAtk: 55, spDef: 65, speed: 45, no: 76});
    allPokemon.push({name:"Ponyta", types:["fire"], total: 410, hp: 50, atk: 85, def: 55, spAtk: 65, spDef: 65, speed: 90, no: 77});
    allPokemon.push({name:"Rapidash", types:["fire"], total: 500, hp: 65, atk: 100, def: 70, spAtk: 80, spDef: 80, speed: 105, no: 78});
    allPokemon.push({name:"Slowpoke", types:["water", "psychic"], total: 315, hp: 90, atk: 65, def: 65, spAtk: 40, spDef: 40, speed: 15, no: 79});
    allPokemon.push({name:"Slowbro", types:["water", "psychic"], total: 490, hp: 95, atk: 75, def: 110, spAtk: 100, spDef: 80, speed: 30, no: 80});
    allPokemon.push({name:"Magnemite", types:["electric", "steel"], total: 325, hp: 25, atk: 35, def: 70, spAtk: 95, spDef: 55, speed: 45, no: 81});
    allPokemon.push({name:"Magneton", types:["electric", "steel"], total: 465, hp: 50, atk: 60, def: 95, spAtk: 120, spDef: 70, speed: 70, no: 82});
    allPokemon.push({name:"Farfetch'd", types:["normal", "flying"], total: 377, hp: 52, atk: 90, def: 55, spAtk: 58, spDef: 62, speed: 60, no: 83});
    allPokemon.push({name:"Doduo", types:["normal", "flying"], total: 310, hp: 35, atk: 85, def: 45, spAtk: 35, spDef: 35, speed: 75, no: 84});
    allPokemon.push({name:"Dodrio", types:["normal", "flying"], total: 470, hp: 60, atk: 110, def: 70, spAtk: 60, spDef: 60, speed: 110, no: 85});
    allPokemon.push({name:"Seel", types:["water"], total: 325, hp: 65, atk: 45, def: 55, spAtk: 45, spDef: 70, speed: 45, no: 86});
    allPokemon.push({name:"Dewgong", types:["water", "ice"], total: 475, hp: 90, atk: 70, def: 80, spAtk: 70, spDef: 95, speed: 70, no: 87});
    allPokemon.push({name:"Grimer", types:["poison"], total: 325, hp: 80, atk: 80, def: 50, spAtk: 40, spDef: 50, speed: 25, no: 88});
    allPokemon.push({name:"Muk", types:["poison"], total: 500, hp: 105, atk: 105, def: 75, spAtk: 65, spDef: 100, speed: 50, no: 89});
    allPokemon.push({name:"Shellder", types:["water"], total: 305, hp: 30, atk: 65, def: 100, spAtk: 45, spDef: 25, speed: 40, no: 90});
    allPokemon.push({name:"Cloyster", types:["water", "ice"], total: 525, hp: 50, atk: 95, def: 180, spAtk: 85, spDef: 45, speed: 70, no: 91});
    allPokemon.push({name:"Gastly", types:["ghost", "poison"], total: 310, hp: 30, atk: 35, def: 30, spAtk: 100, spDef: 35, speed: 80, no: 92});
    allPokemon.push({name:"Haunter", types:["ghost", "poison"], total: 405, hp: 45, atk: 50, def: 45, spAtk: 115, spDef: 55, speed: 95, no: 93});
    allPokemon.push({name:"Gengar", types:["ghost", "poison"], total: 500, hp: 60, atk: 65, def: 60, spAtk: 130, spDef: 75, speed: 110, no: 94});
    allPokemon.push({name:"Onix", types:["rock", "ground"], total: 385, hp: 35, atk: 45, def: 160, spAtk: 30, spDef: 45, speed: 70, no: 95});
    allPokemon.push({name:"Drowzee", types:["psychic"], total: 328, hp: 60, atk: 48, def: 45, spAtk: 43, spDef: 90, speed: 42, no: 96});
    allPokemon.push({name:"Hypno", types:["psychic"], total: 483, hp: 85, atk: 73, def: 70, spAtk: 73, spDef: 115, speed: 67, no: 97});
    allPokemon.push({name:"Krabby", types:["water"], total: 325, hp: 30, atk: 105, def: 90, spAtk: 25, spDef: 25, speed: 50, no: 98});
    allPokemon.push({name:"Kingler", types:["water"], total: 475, hp: 55, atk: 130, def: 115, spAtk: 50, spDef: 50, speed: 75, no: 99});
    allPokemon.push({name:"Voltorb", types:["electric"], total: 330, hp: 40, atk: 30, def: 50, spAtk: 55, spDef: 55, speed: 100, no: 100});
    allPokemon.push({name:"Electrode", types:["electric"], total: 490, hp: 60, atk: 50, def: 70, spAtk: 80, spDef: 80, speed: 150, no: 101});
    allPokemon.push({name:"Exeggcute", types:["grass", "psychic"], total: 325, hp: 60, atk: 40, def: 80, spAtk: 60, spDef: 45, speed: 40, no: 102});
    allPokemon.push({name:"Exeggutor", types:["grass", "psychic"], total: 530, hp: 95, atk: 95, def: 85, spAtk: 125, spDef: 75, speed: 55, no: 103});
    allPokemon.push({name:"Cubone", types:["ground"], total: 320, hp: 50, atk: 50, def: 95, spAtk: 40, spDef: 50, speed: 35, no: 104});
    allPokemon.push({name:"Marowak", types:["ground"], total: 425, hp: 60, atk: 80, def: 110, spAtk: 50, spDef: 80, speed: 45, no: 105});
    allPokemon.push({name:"Hitmonlee", types:["fighting"], total: 455, hp: 50, atk: 120, def: 53, spAtk: 35, spDef: 110, speed: 87, no: 106});
    allPokemon.push({name:"Hitmonchan", types:["fighting"], total: 455, hp: 50, atk: 105, def: 79, spAtk: 35, spDef: 110, speed: 76, no: 107});
    allPokemon.push({name:"Lickitung", types:["normal"], total: 385, hp: 90, atk: 55, def: 75, spAtk: 60, spDef: 75, speed: 30, no: 108});
    allPokemon.push({name:"Koffing", types:["poison"], total: 340, hp: 40, atk: 65, def: 95, spAtk: 60, spDef: 45, speed: 35, no: 109});
    allPokemon.push({name:"Weezing", types:["poison"], total: 490, hp: 65, atk: 90, def: 120, spAtk: 85, spDef: 70, speed: 60, no: 110});
    allPokemon.push({name:"Rhyhorn", types:["ground", "rock"], total: 345, hp: 80, atk: 85, def: 95, spAtk: 30, spDef: 30, speed: 25, no: 111});
    allPokemon.push({name:"Rhydon", types:["ground", "rock"], total: 485, hp: 105, atk: 130, def: 120, spAtk: 45, spDef: 45, speed: 40, no: 112});
    allPokemon.push({name:"Chansey", types:["normal"], total: 450, hp: 250, atk: 5, def: 5, spAtk: 35, spDef: 105, speed: 50, no: 113});
    allPokemon.push({name:"Tangela", types:["grass"], total: 435, hp: 65, atk: 55, def: 115, spAtk: 100, spDef: 40, speed: 60, no: 114});
    allPokemon.push({name:"Kangaskhan", types:["normal"], total: 490, hp: 105, atk: 95, def: 80, spAtk: 40, spDef: 80, speed: 90, no: 115});
    allPokemon.push({name:"Horsea", types:["water"], total: 295, hp: 30, atk: 40, def: 70, spAtk: 70, spDef: 25, speed: 60, no: 116});
    allPokemon.push({name:"Seadra", types:["water"], total: 440, hp: 55, atk: 65, def: 95, spAtk: 95, spDef: 45, speed: 85, no: 117});
    allPokemon.push({name:"Goldeen", types:["water"], total: 320, hp: 45, atk: 67, def: 60, spAtk: 35, spDef: 50, speed: 63, no: 118});
    allPokemon.push({name:"Seaking", types:["water"], total: 450, hp: 80, atk: 92, def: 65, spAtk: 65, spDef: 80, speed: 68, no: 119});
    allPokemon.push({name:"Staryu", types:["water"], total: 340, hp: 30, atk: 45, def: 55, spAtk: 70, spDef: 55, speed: 85, no: 120});
    allPokemon.push({name:"Starmie", types:["water", "psychic"], total: 520, hp: 60, atk: 75, def: 85, spAtk: 100, spDef: 85, speed: 115, no: 121});
    allPokemon.push({name:"Mr. Mime", types:["psychic", "fairy"], total: 460, hp: 40, atk: 45, def: 65, spAtk: 100, spDef: 120, speed: 90, no: 122});
    allPokemon.push({name:"Scyther", types:["bug", "flying"], total: 500, hp: 70, atk: 110, def: 80, spAtk: 55, spDef: 80, speed: 105, no: 123});
    allPokemon.push({name:"Jynx", types:["ice", "psychic"], total: 455, hp: 65, atk: 50, def: 35, spAtk: 115, spDef: 95, speed: 95, no: 124});
    allPokemon.push({name:"Electabuzz", types:["electric"], total: 490, hp: 65, atk: 83, def: 57, spAtk: 95, spDef: 85, speed: 105, no: 125});
    allPokemon.push({name:"Magmar", types:["fire"], total: 495, hp: 65, atk: 95, def: 57, spAtk: 100, spDef: 85, speed: 93, no: 126});
    allPokemon.push({name:"Pinsir", types:["bug"], total: 500, hp: 65, atk: 125, def: 100, spAtk: 55, spDef: 70, speed: 85, no: 127});
    allPokemon.push({name:"Tauros", types:["normal"], total: 490, hp: 75, atk: 100, def: 95, spAtk: 40, spDef: 70, speed: 110, no: 128});
    allPokemon.push({name:"Magikarp", types:["water"], total: 200, hp: 20, atk: 10, def: 55, spAtk: 15, spDef: 20, speed: 80, no: 129});
    allPokemon.push({name:"Gyarados", types:["water", "flying"], total: 540, hp: 95, atk: 125, def: 79, spAtk: 60, spDef: 100, speed: 81, no: 130});
    allPokemon.push({name:"Lapras", types:["water", "ice"], total: 535, hp: 130, atk: 85, def: 80, spAtk: 85, spDef: 95, speed: 60, no: 131});
    allPokemon.push({name:"Ditto", types:["normal"], total: 288, hp: 48, atk: 48, def: 48, spAtk: 48, spDef: 48, speed: 48, no: 132});
    allPokemon.push({name:"Eevee", types:["normal"], total: 325, hp: 55, atk: 55, def: 50, spAtk: 45, spDef: 65, speed: 55, no: 133});
    allPokemon.push({name:"Vaporeon", types:["water"], total: 525, hp: 130, atk: 65, def: 60, spAtk: 110, spDef: 95, speed: 65, no: 134});
    allPokemon.push({name:"Jolteon", types:["electric"], total: 525, hp: 65, atk: 65, def: 60, spAtk: 110, spDef: 95, speed: 130, no: 135});
    allPokemon.push({name:"Flareon", types:["fire"], total: 525, hp: 65, atk: 130, def: 60, spAtk: 95, spDef: 110, speed: 65, no: 136});
    allPokemon.push({name:"Porygon", types:["normal"], total: 395, hp: 65, atk: 60, def: 70, spAtk: 85, spDef: 75, speed: 40, no: 137});
    allPokemon.push({name:"Omanyte", types:["rock", "water"], total: 355, hp: 35, atk: 40, def: 100, spAtk: 90, spDef: 55, speed: 35, no: 138});
    allPokemon.push({name:"Omastar", types:["rock", "water"], total: 495, hp: 70, atk: 60, def: 125, spAtk: 115, spDef: 70, speed: 55, no: 139});
    allPokemon.push({name:"Kabuto", types:["rock", "water"], total: 355, hp: 30, atk: 80, def: 90, spAtk: 55, spDef: 45, speed: 55, no: 140});
    allPokemon.push({name:"Kabutops", types:["rock", "water"], total: 495, hp: 60, atk: 115, def: 105, spAtk: 65, spDef: 70, speed: 80, no: 141});
    allPokemon.push({name:"Aerodactyl", types:["rock", "flying"], total: 515, hp: 80, atk: 105, def: 65, spAtk: 60, spDef: 75, speed: 130, no: 142});
    allPokemon.push({name:"Snorlax", types:["normal"], total: 540, hp: 160, atk: 110, def: 65, spAtk: 65, spDef: 110, speed: 30, no: 143});
    allPokemon.push({name:"Articuno", types:["ice", "flying"], total: 580, hp: 90, atk: 85, def: 100, spAtk: 95, spDef: 125, speed: 85, no: 144, class:"legendary"});
    allPokemon.push({name:"Zapdos", types:["electric", "flying"], total: 580, hp: 90, atk: 90, def: 85, spAtk: 125, spDef: 90, speed: 100, no: 145, class:"legendary"});
    allPokemon.push({name:"Moltres", types:["fire", "flying"], total: 580, hp: 90, atk: 100, def: 90, spAtk: 125, spDef: 85, speed: 90, no: 146, class:"legendary"});
    allPokemon.push({name:"Dratini", types:["dragon"], total: 300, hp: 41, atk: 64, def: 45, spAtk: 50, spDef: 50, speed: 50, no: 147});
    allPokemon.push({name:"Dragonair", types:["dragon"], total: 420, hp: 61, atk: 84, def: 65, spAtk: 70, spDef: 70, speed: 70, no: 148});
    allPokemon.push({name:"Dragonite", types:["dragon", "flying"], total: 600, hp: 91, atk: 134, def: 95, spAtk: 100, spDef: 100, speed: 80, no: 149});
    allPokemon.push({name:"Mewtwo", types:["psychic"], total: 680, hp: 106, atk: 110, def: 90, spAtk: 154, spDef: 90, speed: 130, no: 150, class:"legendary"});
    allPokemon.push({name:"Mew", types:["psychic"], total: 600, hp: 100, atk: 100, def: 100, spAtk: 100, spDef: 100, speed: 100, no: 151, class:"mythical"});

    //Gen 2

    //allPokemon.push({name:"", types:[""], total: , hp: , atk: , def: , spAtk: , spDef: , speed: , no: });
}

function typeToColor(type) {
    switch(type) {
        case "normal": return "#9099a1ff";
        case "fighting": return "#ce4069ff";
        case "flying": return "#92aadeff";
        case "poison": return "#ab6ac8ff";
        case "ground": return "#d97746ff";
        case "rock": return "#c7b78bff";
        case "bug": return "#90c12cff";
        case "ghost": return "#5269acff";
        case "steel": return "#5a8ea1ff";
        case "fire": return "#ed4a4aff";
        case "water": return "#4d90d5ff";
        case "grass": return "#63bb5bff";
        case "electric": return "#f3d23bff";
        case "psychic": return "#cf66deff";
        case "ice": return "#76e3d2ff";
        case "dragon": return "#096dc4ff";
        case "dark": return "#5a5366ff";
        case "fairy": return "#ec8fe6ff";
        default: throw "Error: type _" + type + "_ not recognized!";
    }
}