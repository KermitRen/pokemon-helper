//Global variables
const types = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]
let typeTable = new Map(); setupMap();
var selectedTypes = [];
var type1, type2;
var weaknesses, resistances, immunities;

//setting up references
window.onload = function() {
    type1 = document.getElementById("selectedType1");
    type2 = document.getElementById("selectedType2");
    weaknesses = document.getElementById("weaknessesGrid");
    resistances = document.getElementById("resistancesGrid");
    immunities = document.getElementById("immunitiesGrid");
};


function clickType(type) {

    if(selectedTypes.length < 2 && !selectedTypes.includes(type)) {
        selectedTypes.push(type);
        reloadTypeDisplay();
        reloadResults();
        let typeTag = document.getElementById("select_" + type);
        typeTag.style.filter = "brightness(40%)";
    } else if (selectedTypes.includes(type)) {
        selectedTypes = selectedTypes.filter(function(t) {return type != t;})
        reloadTypeDisplay();
        reloadResults();
        let typeTag = document.getElementById("select_" + type);
        typeTag.style.filter = "brightness(100%)";
    }

}

function clickSelectedType(pos) {
    clickType(selectedTypes[pos]);
}

function reloadTypeDisplay() {

    //Hide types
    type1.style.visibility = "hidden";
    type2.style.visibility = "hidden";

    //Load type 1
    if(selectedTypes.length >= 1) {
        let t1 = selectedTypes[0].slice(0,1).toUpperCase() + selectedTypes[0].substr(1);
        type1.src = "images/Pokemon_Type_Icon_" + t1 + ".svg"
        type1.style.visibility = "visible";
    }

    //Load type 2
    if(selectedTypes.length == 2) {
        let t2 = selectedTypes[1].slice(0,1).toUpperCase() + selectedTypes[1].substr(1);
        type2.src = "images/Pokemon_Type_Icon_" + t2 + ".svg"
        type2.style.visibility = "visible";
    }
}

function reloadResults() {

    //Hide all results
    for(var i = 0; i < weaknesses.children.length; i++) {
        var typeContainer = weaknesses.children[i];
        typeContainer.style.visibility = "hidden";
        if(typeContainer.children.length > 1) {
            typeContainer.removeChild(typeContainer.children[1]);
        }
    }
    for(var i = 0; i < resistances.children.length; i++) {
        var typeContainer = resistances.children[i];
        typeContainer.style.visibility = "hidden";
        if(typeContainer.children.length > 1) {
            typeContainer.removeChild(typeContainer.children[1]);
        }
    }
    for(var i = 0; i < immunities.children.length; i++) {
        immunities.children[i].style.visibility = "hidden";
    }

    //Calculate strengths and weaknesses
    if(selectedTypes.length > 0) {
        let pokemonTypeTable = typeTable.get(selectedTypes[0]).slice();
        if(selectedTypes.length == 2) {
            for(var i = 0; i < pokemonTypeTable.length; i++) {
                pokemonTypeTable[i] *= typeTable.get(selectedTypes[1])[i];
            }
        }

        //Reload results
        let weaknessCounter = 0, resistanceCounter = 0, immunityCounter = 0;
        for(var i = 0; i < pokemonTypeTable.length; i++) {
            if(pokemonTypeTable[i] > 1) {
                weaknesses.children[weaknessCounter].children[0].src = "images/Pokemon_Type_Icon_" + types[i] + ".svg"
                if(pokemonTypeTable[i] == 4) {
                    var modifierImg = document.createElement("img");
                    modifierImg.src = "images/weaknessModifier.svg";
                    modifierImg.className += "modifierImg";
                    weaknesses.children[weaknessCounter].appendChild(modifierImg);
                }
                weaknesses.children[weaknessCounter].style.visibility = "visible";
                weaknessCounter++;
            } else if (pokemonTypeTable[i] < 1 && pokemonTypeTable[i] != 0) {
                resistances.children[resistanceCounter].children[0].src = "images/Pokemon_Type_Icon_" + types[i] + ".svg"
                if(pokemonTypeTable[i] == 0.25) {
                    var modifierImg = document.createElement("img");
                    modifierImg.src = "images/resistanceModifier.svg";
                    modifierImg.className += "modifierImg";
                    resistances.children[resistanceCounter].appendChild(modifierImg);
                }
                resistances.children[resistanceCounter].style.visibility = "visible";
                resistanceCounter++;
            } else if (pokemonTypeTable[i] == 0) {
                immunities.children[immunityCounter].children[0].src = "images/Pokemon_Type_Icon_" + types[i] + ".svg"
                immunities.children[immunityCounter].style.visibility = "visible";
                immunityCounter++;
            }
        }

        //Resize menus (Due to electric + Steel being too strong)
        if(resistanceCounter > 10) {
            document.getElementById("resistancesContainer").style.height = "285px";
            document.getElementById("immunitiesContainer").style.height = "145px";
        } else {
            document.getElementById("resistancesContainer").style.height = "215px";
            document.getElementById("immunitiesContainer").style.height = "215px";
        }

    }


}

function setupMap() {
    typeTable.set("normal",   [ 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1])
    typeTable.set("fire",     [ 1,.5, 2, 1,.5,.5, 1, 1, 2, 1, 1,.5, 2, 1, 1, 1,.5,.5])
    typeTable.set("water",    [ 1,.5,.5, 2, 2,.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,.5, 1])
    typeTable.set("electric", [ 1, 1, 1,.5, 1, 1, 1, 1, 2,.5, 1, 1, 1, 1, 1, 1,.5, 1])
    typeTable.set("grass",    [ 1, 2,.5,.5,.5, 2, 1, 2,.5, 2, 1, 2, 1, 1, 1, 1, 1, 1])
    typeTable.set("ice",      [ 1, 2, 1, 1, 1,.5, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1])
    typeTable.set("fighting", [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2,.5,.5, 1, 1,.5, 1, 2])
    typeTable.set("poison",   [ 1, 1, 1, 1,.5, 1,.5,.5, 2, 1, 2,.5, 1, 1, 1, 1, 1,.5])
    typeTable.set("ground",   [ 1, 1, 2, 0, 2, 2, 1,.5, 1, 1, 1, 1,.5, 1, 1, 1, 1, 1])
    typeTable.set("flying",   [ 1, 1, 1, 2,.5, 2,.5, 1, 0, 1, 1,.5, 2, 1, 1, 1, 1, 1])
    typeTable.set("psychic",  [ 1, 1, 1, 1, 1, 1,.5, 1, 1, 1,.5, 2, 1, 2, 1, 2, 1, 1])
    typeTable.set("bug",      [ 1, 2, 1, 1,.5, 1,.5, 1,.5, 2, 1, 1, 2, 1, 1, 1, 1, 1])
    typeTable.set("rock",     [.5,.5, 2, 1, 2, 1, 2,.5, 2,.5, 1, 1, 1, 1, 1, 1, 2, 1])
    typeTable.set("ghost",    [ 0, 1, 1, 1, 1, 1, 0,.5, 1, 1, 1,.5, 1, 2, 1, 2, 1, 1])
    typeTable.set("dragon",   [ 1,.5,.5,.5,.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2])
    typeTable.set("dark",     [ 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 2, 1,.5, 1,.5, 1, 2])
    typeTable.set("steel",    [.5, 2, 1, 1,.5,.5, 2, 0, 2,.5,.5,.5,.5, 1,.5, 1,.5,.5])
    typeTable.set("fairy",    [ 1, 1, 1, 1, 1, 1,.5, 2, 1, 1, 1,.5, 1, 1, 0,.5, 2, 1])
}
