const BUTTON_LIST = ["For me", "This please", "Select", "Choose", "My style"];
const ID_TO_TEXT = ["Whole", "Whole", "With hole", "Small with tall legs"];
const ID_TO_TEXT_DIR = ["whole", "whole", "hole", "small"];
const ALL_PRODUCTS = [
    ["Blue-white", "Light blue-purple", "Green-black"],
    ["White-green", "Pink", "Green-blue"],
    ["Green-blue", "Purple-red", "Light blue-yellow"]
];
const ADD_VALUE = 15;
var backgroundColour = [22, 48, 54];
var smallCardContainers = document.getElementsByClassName("small-card-list-container");
var clickedOption = 0;
var selectedProductColour = -1;

for (let container of smallCardContainers) { // WILL BREAK ALPHA
    container.style.backgroundColor = `rgb(${backgroundColour[0]}, ${backgroundColour[1]}, ${backgroundColour[2]})`;
    for (let i = 0; i < backgroundColour.length; i++) {
        if (backgroundColour[i] <= (255 - ADD_VALUE)) {
            backgroundColour[i] += ADD_VALUE;
        }
    }
}

function id_to_text(id) {
    return ID_TO_TEXT[id + 1];
}
function id_to_text_dir(id) {
    return ID_TO_TEXT_DIR[id + 1];
}

function colour_to_text(colour, productType) {
    if (productType == "#wavy") {
        return ALL_PRODUCTS[0][colour];
    } else if (productType == "#military") {
        return ALL_PRODUCTS[1][colour];
    } else if (productType == "#glass") {
        return ALL_PRODUCTS[2][colour];
    }
}

function brightenRGB(colours, value) {
    colours = colours.replace("rgb(", "");
    colours = colours.replace(")", "");
    colours = colours.replace(" ", "");
    var colourArray = colours.split(",")

    for (let i = 0; i < 3; i++) {
        colourArray[i] = parseInt(colourArray[i]);
    }

    for (let i = 0; i < 3; i++) {
        if (colourArray[i] <= (255 - value)) {
            colourArray[i] += value;
        }
    }

    return `rgb(${colourArray[0]}, ${colourArray[1]}, ${colourArray[2]})`;
}

function setButton(item) {
    item.textContent = BUTTON_LIST[Math.floor(Math.random() * BUTTON_LIST.length)];
}

function keepAlpha(productType) {
    var originalbackgroundColour = document.querySelector(`${productType}`).style.backgroundColor;
    // var indexBegin = originalbackgroundColour.lastIndexOf(",");
    // console.log(originalbackgroundColour);
    // var indexEnd = originalbackgroundColour.lastIndexOf(")");
    // var alpha = originalbackgroundColour.slice(indexBegin, indexEnd);
    // console.log(alpha);
    originalbackgroundColour = originalbackgroundColour.replace(")", "");
    originalbackgroundColour = originalbackgroundColour.replace("rgb", "rgba");
    originalbackgroundColour += ", 0.5)";
    // console.log(originalbackgroundColour);

    return originalbackgroundColour;
}

function selectType(productType, productColour) { // Type is the design type, colour is the colour (type) 0, 1, 2
    selectedProductColour = productColour;

    // SET SELECT TYPE MENU BACKGROUND COLOUR
    document.querySelector(`${productType} .select-type-menu`).style.backgroundColor = keepAlpha(productType);
    document.querySelector(`${productType} .select-type-menu .options-menu`).style.backgroundColor = document.querySelector(`${productType}`).style.backgroundColor;

    var backgroundColourDefault = document.querySelector(`${productType}`).style.backgroundColor;

    // SET IMAGE
    var image = document.querySelector(`${productType} .select-type-menu .select-card-container .select-card img`);
    image.src = `products/${productType.replace("#", "")}/${productColour}/${id_to_text_dir(clickedOption)}.png`;

    // SET TEXT
    var cardTitle = document.querySelector(`${productType} .select-type-menu .select-card-container .select-card .card-body h1`);
    var cardColour = document.querySelector(`${productType} .select-type-menu .select-card-container .select-card .card-body .card-product-colour`);
    var cardId = document.querySelector(`${productType} .select-type-menu .select-card-container .select-card .card-body .card-product-id`);

    cardTitle.textContent = productType.replace("#", "");
    cardColour.textContent = colour_to_text(productColour, productType);
    cardId.textContent = id_to_text(clickedOption);

    // RESET COLOURS
    var radioDivs = document.querySelectorAll(`${productType} .select-type-menu .options-menu div`);
    for (let i = 0; i < radioDivs.length; i++) {
        radioDivs[i].style.backgroundColor = brightenRGB(backgroundColourDefault, ADD_VALUE);
        radioDivs[i].children[0].style.background = brightenRGB(backgroundColourDefault, ADD_VALUE*3);

        if (clickedOption != i) {
            radioDivs[i].style.borderColor = "transparent";
            radioDivs[i].children[0].style.borderColor = "transparent";
        } else {
            radioDivs[i].style.borderColor = brightenRGB(backgroundColourDefault, ADD_VALUE*5);
            radioDivs[i].children[0].style.borderColor = brightenRGB(backgroundColourDefault, ADD_VALUE*5);
        }
        
        // div.style.borderColor = brightenRGB(document.querySelector(`${productType}`).style.backgroundColor, ADD_VALUE);
        // div.style.borderColor = brightenRGB(document.querySelector(`${productType}`).style.backgroundColor, -ADD_VALUE);
    }

    var button = document.querySelector(`${productType} .select-type-menu .options-menu button`);
    button.style.backgroundColor = brightenRGB(backgroundColourDefault, ADD_VALUE);

    document.querySelector(`${productType} .select-type-menu`).style.transition = "2s";
    document.querySelector(`${productType} .select-type-menu`).style.right = "0";

    if (window.innerWidth < 600) {
        document.body.style.overflow = "hidden"; // DISABLE SCROLLING
    }
}

function deselectType(productType) {
    document.querySelector(`${productType} .select-type-menu`).style.right = "-100vw";
    selectedProductColour = -1;
    clickedOption = 0;

    if (document.body.style.overflow == "hidden") {
        document.body.style.overflow = "visible"; // ENABLE SCROLLING
    }
}

function hoverOption(option, id) {
    var productType = `#${option.parentElement.parentElement.parentElement.id}`; // BE CAREFUL

    if (clickedOption != id) {
        // option.style.borderColor = brightenRGB(document.querySelector(`${productType}`).style.backgroundColor, ADD_VALUE*2);
        option.style.backgroundColor = brightenRGB(document.querySelector(`${productType}`).style.backgroundColor, ADD_VALUE*2);
    }
}

function unhoverOption(option, id) {
    var productType = `#${option.parentElement.parentElement.parentElement.id}`; // BE CAREFUL
    
    if (clickedOption != id) {
        // option.style.borderColor = "transparent";
        option.style.backgroundColor = brightenRGB(document.querySelector(`${productType}`).style.backgroundColor, ADD_VALUE);
    }
}

function clickOption(option, id, productType) {
    var backgroundColourDefault = document.querySelector(`${productType}`).style.backgroundColor;

    option.style.borderColor = brightenRGB(backgroundColourDefault, ADD_VALUE*5);
    option.children[0].style.borderColor = brightenRGB(backgroundColourDefault, ADD_VALUE*5);

    clickedOption = id;

    // SET ID ON CARD TOO
    var cardId = document.querySelector(`${productType} .select-type-menu .select-card-container .select-card .card-body .card-product-id`);
    cardId.textContent = id_to_text(clickedOption);

    // CHANGE IMAGE
    var image = document.querySelector(`${productType} .select-type-menu .select-card-container .select-card img`);
    image.src = `products/${productType.replace("#", "")}/${selectedProductColour}/${id_to_text_dir(clickedOption)}.png`; //FIX

    var radioDivs = document.querySelectorAll(`${productType} .select-type-menu .options-menu div`);
    for (let i = 0; i < radioDivs.length; i++) {
        if (i != clickedOption) {
            radioDivs[i].style.borderColor = "transparent";
            radioDivs[i].children[0].style.borderColor = "transparent";
            radioDivs[i].style.backgroundColor = brightenRGB(backgroundColourDefault, ADD_VALUE);
        }
    }
}

function purchase(type) {
    alert(`Not making that... Oh, by the way, for your information, this is the product you attempted to purchase: ${type}, COLOUR: ${selectedProductColour}, ID: ${clickedOption}`);
}

function closeMenu(productType) {
    document.querySelector(`${productType} .select-type-menu`).style.right = "-100vw";
}


setInterval(function(){ // FIXES WEIRD PROBLEM WHERE WHEN RESIZING THE SCREEN, THE SELECT-TYPE-MENU BECOMES VISIBLE FOR A SECOND
    for (let menu of document.querySelectorAll(".select-type-menu")) {
        if (menu.style.right == "-100vw") {
            menu.style.transition = "0s";
        }
    }
}, 100)

// var wavyStyle = document.getElementById("wavy-style");
// var militaryStyle = document.getElementById("military-style");
// var glassStyle = document.getElementById("glass-style");

// wavyStyle.textContent = BUTTON_LIST[Math.floor(Math.random() * BUTTON_LIST.length)];
// militaryStyle.textContent = BUTTON_LIST[Math.floor(Math.random() * BUTTON_LIST.length)];
// glassStyle.textContent = BUTTON_LIST[Math.floor(Math.random() * BUTTON_LIST.length)];