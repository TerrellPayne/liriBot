require("dotenv").config();

var axios = require("axios");
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var input = process.argv;
var fs = require("fs");

if (input[2] === "concert-this") {
    // console.log(input[3])

    axios.get("https://rest.bandsintown.com/artists/" + input[3] + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

if (input[2] === "spotify-this-song") {
    spotify.search({ type: "track", query: input[3] }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log(data.tracks.items);
        return;
    });
}

if (input[2] === "movie-this") {
    axios.get("https://www.omdbapi.com/?t=" + input[3] + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

if (input[2] === "do-what-it-says") {

   // read data from text file
    fs.readFile('./random.txt', "utf8", function(err, data) {
        if (err) {
            throw err;
        }
        console.log(data);

        var dataArray = data.split(",");
        console.log(dataArray);

        spotify.search({ type: "track", query: dataArray[1] }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
    
            console.log(data.tracks.items);
            return;
        });
        // seperate data into command and argument
            // var command
            // var arguement



        // if command is concert
            // do the concert search thing
        
    });

}




