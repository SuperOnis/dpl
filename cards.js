var cards = document.getElementsByClassName("card");
var glowBackground = document.querySelector(".glow-background");
var cardContainer = document.querySelector(".card-container");
var initWidth = window.innerWidth;
var initHeight = window.innerHeight;

function setSize() {
    for (let card of cards) {
        // card.style.width = 0.16 * initWidth;
        // card.style.maxWidth = 0.16 * initWidth;
        // card.style.minWidth = 0.16 * initWidth;

        // card.style.height = 0.02 * initHeight;
        // card.style.maxHeight = 0.02 * initHeight;
        // card.style.minHeight = 0.02 * initHeight;
    }

    glowBackground.height = cardContainer.offsetHeight;
    // console.log(cardContainer.offsetHeight);
}

setInterval(setSize, 100);
