require("dotenv").config();

var axios = require("axios");
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const moment = require('moment');
var input = process.argv;
var fs = require("fs");
const inquirer = require('inquirer');

//global vars 
var track = '';
var movie = '';
var artist = '';


switch (input[2]) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    
}

function concert() {
    // console.log(input[3])
    if (input[3]) {

        artist = input.slice(3).join(" ");

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(artist);
            console.log('\x1b[33m', moment(response.data[0].datetime).format('MM/DD/YYYY, h:mm a'));
            console.log('\x1b[36m','Venue: ' + response.data[0].venue.name);
            console.log('\x1b[35m','City: ' + response.data[0].venue.city);
            console.log('\x1b[0m','Region: ' + response.data[0].venue.region);
            console.log('\x1b[32m','Country: ' + response.data[0].venue.country);
            console.log('\x1b[0m','------------------------------');
            console.log('\x1b[33m', moment(response.data[1].datetime).format('MM/DD/YYYY, h:mm a'));
            console.log('\x1b[36m','Venue: ' + response.data[1].venue.name);
            console.log('\x1b[35m','City: ' + response.data[1].venue.city);
            console.log('\x1b[0m','Region: ' + response.data[1].venue.region);
            console.log('\x1b[32m','Country: ' + response.data[1].venue.country);
            console.log('\x1b[0m','------------------------------');
            console.log('\x1b[33m', moment(response.data[2].datetime).format('MM/DD/YYYY, h:mm a'));
            console.log('\x1b[36m','Venue: ' + response.data[2].venue.name);
            console.log('\x1b[35m','City: ' + response.data[2].venue.city);
            console.log('\x1b[0m','Region: ' + response.data[2].venue.region);
            console.log('\x1b[32m','Country: ' + response.data[2].venue.country);
            console.log('\x1b[0m','------------------------------');
           
        })
    
        .catch(function (error) {
            console.log(error);
        });
    }
}

function spotifyThis() {

    if (input[3]) {

        track = input.slice(3).join(" ");

    spotify.search({ type: "track", query: track }) 
        .then(function(response) {
        console.log('\x1b[36m','Track: ' + response.tracks.items[0].name);
        console.log('\x1b[35m','Artist: ' + response.tracks.items[0].artists[0].name);
        console.log('\x1b[0m','Spotify Link: ' + response.tracks.items[0].external_urls.spotify);
        console.log('\x1b[32m','Album: ' + response.tracks.items[0].album.name);
        })
   
        .catch(function (error) {
            console.log(error);
        });

    }
}

        
    
    
function movieThis() {
     
    if (input[3]) {

    movie = input.slice(3).join(" ");
    
    axios.get("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log('\x1b[36m','Title: ' + response.data.Title);
            console.log('\x1b[35m','Year: ' + response.data.Year);
            console.log('\x1b[0m','IMDB Rating: ' + response.data.Ratings[0].Value);
            console.log('\x1b[32m','Tomato Meter: ' + response.data.Ratings[1].Value);
            console.log('\x1b[36m','Country: ' + response.data.Country);
            console.log('\x1b[35m','Language: ' + response.data.Language);
            console.log('\x1b[32m','Actors: ' + response.data.Actors);
            console.log('\x1b[0m','Plot: ' + response.data.Plot);
        })
        .catch(function (error) {
            console.log(error);
        });
}
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
       
        
    });

}




