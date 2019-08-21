function pokeSubmit(){  //v1 of the pokeApi is deprecated, use v2
    var param = document.getElementById("pokeInput").value;
    var pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;

    $.getJSON(pokeURL, function(data){
        var pokeID = data.id;
        var pokeName = data.name;
        var pokeType1 = data.types[0].type.name;
        if (data.types.length == 2) {   //check if the pokemon is considered more than one type
            var pokeType2 = data.types[1].type.name;
        }
        else {
            var pokeType2 = null;
        }
        var FlavorTextURI = "http://pokeapi.co/api/v2/pokemon-species/" + param;
        var pokeDescription = "";

        $.getJSON(FlavorTextURI, function(data2){
            for (i in data2.flavor_text_entries){
                if (data2.flavor_text_entries[i].language.name == "en"){    //check for english description
                    pokeDescription = data2.flavor_text_entries[i].flavor_text;
                }
            }
        });

        $.getJSON(pokeURL, function(data3){

            var imageURI = data3.sprites.front_default;

            console.log("Number: ", pokeID);
            console.log("Name: ", pokeName);
            console.log("Type 1: ", pokeType1);
            console.log("Type 2: ", pokeType2);
            console.log("Description URI: ", FlavorTextURI);
            console.log("Description: ", pokeDescription);
            console.log("Image URI: ", imageURI);

            // append data to HTML
            // empty string to hold HTML
            var li = "";
            li += '<li><img src="' + imageURI + '">';
            li += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
            if (pokeType2 != null){
                li += '<p>Type: ' + pokeType1 + ', ' + pokeType2 + '</p>';
            }
            else {
                li += '<p>Type: ' + pokeType1 + '</p>'; // only display Type 2 if it is not null
            }
            
            li += '<p>' + pokeDescription + '</p>';
            li += '</li>';

            // empty the listview
            $("#pokeDetails").empty();

            // append new li to listview
            $("#pokeDetails").append(li).promise().done(function(){
                    $(this).listview("refresh");
            });

        });

    });
}
