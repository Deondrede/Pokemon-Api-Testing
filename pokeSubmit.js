function pokeSubmit(){
    var param = document.getElementById("pokeInput").value;
    var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + param; //version 1 of pokeApi
    var pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + param; //version 2 of pokeApi holds more info, like images

    $.getJSON(pokeURL, function(data){
        var pokeID = data.national_id;
        var pokeName = data.name;
        var pokeType1 = data.types[0].name;
        if (data.types.length == 2) {
            var pokeType2 = data.types[1].name;
        }
        else {
            var pokeType2 = null;
        }

        var descriptionURI = "http://pokeapi/co" + data.description[0].resource_uri;
        var pokeDescription = "";

        $.getJSON(descriptionURI, function(data2){
            pokeDescription = data2.description;
        });

        $,getJSON(pokeURL2, function(data3){
            var imageURI = data3.sprites.front_default;

            console.log("Number: ", pokeID);
            console.log("Name: ", pokeName);
            console.log("Type 1: ", pokeType1);
            console.log("Type 2: ", pokeType2);
            console.log("Description URI: ", descriptionURI);
            console.log("Description: ", pokeDescription);
            console.log("Image URI: ", imageURI); 

            var li = "";
            li += '<li><img src="' + imageURI + '">';
            li += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
            li += '<p>Type 1: ' + pokeType1 + '</p>';

            // only display Type 2 if it is not null
            if (pokeType2 != null){
                li += '<p>Type 2: ' + pokeType2 + '</p>';
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
}