function pokeSubmit(){  //v1 of the pokeApi is deprecated, use v2
    var param = document.getElementById("pokeInput").value;
    var pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;

    $.ajax({
        url: "http://pokeapi.co/api/v2/pokemon/" + param,
        dataType: "json",
        error: function(){
            alert("ERROR: Not a valid Pokémon");
        }
    }) .done(function(){
        console.log("GET Successful")
    });

    $.getJSON(pokeURL, function(data){
        var imageURI = data.sprites.front_default;
        var pokeID = data.id;
        
        var pokeName = data.name;
        pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);

        var pokeType1 = data.types[0].type.name;
        pokeType1 = pokeType1.charAt(0).toUpperCase() + pokeType1.slice(1);

        if (data.types.length == 2) {   //check if the pokemon is considered more than one type
            var pokeType2 = data.types[1].type.name;
            pokeType2 = pokeType2.charAt(0).toUpperCase() + pokeType2.slice(1);
        }
        else {
            var pokeType2 = null;
        }


        var FlavorTextURI = "https://pokeapi.co/api/v2/pokemon-species/" + param;
        var pokeDescription = "";
        var pokeGenus = "";

        $.getJSON(FlavorTextURI, function(data2){
            for (i in data2.flavor_text_entries){
                if (data2.flavor_text_entries[i].language.name == "en"){    //check for english description
                    pokeDescription = data2.flavor_text_entries[i].flavor_text;
                    break;
                }
            }
            for (i in data2.genera){
                if (data2.genera[i].language.name == "en"){
                    pokeGenus = data2.genera[i].genus;
                }
            }
             // append data to HTML
            // empty string to hold HTML
            var li = "";
            li += '<li><img src="' + imageURI + '">';
            li += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
            li += '<h3>' + pokeGenus + '</h3>';
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
