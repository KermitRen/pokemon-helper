//Global variables
var curNature, curNatureSelected, posStat, negStat, natureSection;

//setting up references
window.onload = function() {
    natureSection = document.getElementById("natureFocus");
    curNature = document.getElementById("selectedNature");
    posStat = document.getElementById("posStat");
    negStat = document.getElementById("negStat");
};

function setNature(nat, pos, neg) {

    if(curNatureSelected != null) {
        curNatureSelected.style.filter = "brightness(100%)";
    }
    curNatureSelected = nat;
    resetNeutral();

    if(curNature.innerHTML == nat.innerHTML) {
        curNature.innerHTML = "noNatureSelected";
        natureSection.style.display = "none";
    } else {
        curNatureSelected.style.filter = "brightness(80%)";
        natureSection.style.display = "block";
        curNature.innerHTML = nat.innerHTML;

        //Check for neutral nature
        if(pos == neg) {
            showNeutral();
        } else {
            posStat.innerHTML = "+ " + pos;
            negStat.innerHTML = "- " + neg;
        }
    }
}

function showNeutral() {
    posStat.innerHTML = "Neutral";
    posStat.style.color = "gray";
    negStat.style.display = "none";
}

function resetNeutral() {
    posStat.style.color = "#51f582";
    negStat.style.display = "block";
}