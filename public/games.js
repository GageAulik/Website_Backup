    // games.js, this is a client side js file that will run requests

    //LOAD PAGE MAIN
$(pageLoadedMain);

    //LOAD GAME NAMES INTO NAV AND EVENT LISTENERS
function pageLoadedMain() {
    loadGameNamesIntoNav();
    // addButtonListeners();
}


      //create a list of Unordered items that will allow us to call data into
      //our inputs, this data will change
function loadGameNamesIntoNav() {
    console.log("Sending request to names");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("Names callback");
        console.log("Response is " + this.response);
        let rows = JSON.parse( this.response);
        var $gameListing = $("<ul>"); // jQuery node for an unordered list
        rows.forEach( function( row) {
            $aNameItem = $("<li>");   // jQuery node for a list item
            $aNameItem.html( row.name);
            $aNameItem.click( onSelect);
            $gameListing.prepend($aNameItem);
        });
        $("nav").append( $gameListing);
    }

    );
    xhr.open( "GET", "http://45.79.221.107:3040/names");
    xhr.send();
    console.log("Done sending request to names");
}     // end loadgameNamesIntoNav


      // Fills in the information in the main section given the selected game.
      // Called from a click on one of the game names in navigation.


function onSelect() {

    let gameName = $(this).html();
    console.log("onSelect(" + gameName + ")" );
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("Select callback");
        console.log("Response is " + this.response);
        let gameInfos = JSON.parse( this.response);
        let gameInfo = gameInfos[0]; // only get the first row
        $("#name").val( gameInfo.name);
        $("#players").val( gameInfo.players);
        $("#studio").val( gameInfo.studio);
        $("#date").val( gameInfo.datetwo);
        $("#genres").val( gameInfo.genretype);
    }

    );
    xhr.open( "GET", "http://45.79.221.107:3040/date?games=" + gameName);
    xhr.send();
    console.log("Done sending request to date?games=" + gameName);
}
