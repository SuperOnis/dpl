var largeNavbarItems = document.querySelectorAll("header .large-navbar ul li a");
var smallNavbar = document.querySelector(".small-navbar");
var largeNavbar = document.querySelector(".large-navbar");
var navbarImage = document.querySelector(".hamburger");
var smallNavbarUsed = false;

function showHideSmallNavbar() {
    if (!smallNavbarUsed) {
        smallNavbarUsed = true;


        

        smallNavbar.style.display = "unset";
        setNavbarheight();
        // largeNavbar.style.display = "none";
        // document.body.style.overflow = "hidden"; // DISABLE SCROLLING
    }

    else if (smallNavbarUsed) { // LOOKS VERY SMART RIGHT?
        smallNavbarUsed = false;

        smallNavbar.style.display = "none";
        // largeNavbar.style.display = "unset";
        // document.body.style.overflow = "visible"; // ENABLE SCROLLING
    }
}

function getWindowWidth() {
    if (window.innerWidth < 1200) {
        for (let item of largeNavbarItems) {
            item.style.display = "none";
        }
        navbarImage.style.display = "unset";
    } else {
        for (let item of largeNavbarItems) {
            item.style.display = "unset";
        }
        navbarImage.style.display = "none";
        
        smallNavbar.style.display = "none";
        largeNavbar.style.display = "unset";
        smallNavbarUsed = false;
    }
}

setInterval(getWindowWidth, 100);

function setNavbarheight() {
    var background = document.querySelector(".glow-background");
    if (background != null) {
        smallNavbar.style.height = `${background.offsetHeight - 55}px`; // FOUND NO WAY TO REPLACE PADDING_TOP
    } else {
        background = document.querySelector(".background-image");
        smallNavbar.style.height = `${background.offsetHeight - 55}px`; // FOUND NO WAY TO REPLACE PADDING_TOP
    }
    
}

window.onresize = setNavbarheight;
