const ADD_VALUE = 15;
var backgroundColour = [22, 48, 54];
var contactTypes = document.querySelectorAll(".contact-table  .coloured-container");

for (let contactType of contactTypes) { // WILL BREAK ALPHA
    contactType.style.backgroundColor = `rgb(${backgroundColour[0]}, ${backgroundColour[1]}, ${backgroundColour[2]})`;
    for (let i = 0; i < backgroundColour.length; i++) {
        if (backgroundColour[i] <= (255 - ADD_VALUE)) {
            backgroundColour[i] += ADD_VALUE;
        }
    }
}

$.ajax({
    type: "POST",
    url: "send.py",
    data: { param: text}
  }).done(function( o ) {
     // do something
  });