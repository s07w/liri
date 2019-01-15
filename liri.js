require("dotenv").config();


var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
moment().format();

var axios = require("axios");
var fs = require("fs");

var command = process.argv[2];
var value = process.argv.slice(3).join("+");

switch (command) {
    case "concert-this":
    concertThis(value);
    break;

    case "spotify-this-song":
    spotifySong(value);
    break;

    case "movie-this":
    movieThis(value);
    break;

    case "do-what-it-says":
    simon(value);
    break;

    default:
    console.log("Please choose a valid command.");
    return;
};

function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            var datetime = response.data[i].datetime;
            var dateArr = datetime.split('T');

            console.log( "-------------------------" +
            "\nVenue Name: " + response.data[i].venue.name +
            "\nVenue Location: " + response.data[i].venue.city +
            "\nEvent Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n");
            contentAdded();
        }
    });
}

function spotifySong() {
    var nodeArgs = process.argv;
    var songName = "";
  
    if (nodeArgs.length < 4) {
      songName = "ace base the sign"
    }
    else {
      for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
          songName = songName + "+" + nodeArgs[i];
        }
        else {
          songName += nodeArgs[i];
  
        }
      }
    }
  
    spotify.search({ type: 'track', query: songName }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var artistName = data.tracks.items[0].artists[0].name;
  
      // if there are multiple artists on song
      for (i=1; i < data.tracks.items[0].artists.length; i++) {
        if (data.tracks.items[0].artists.length > 1) {
          artistName = artistName + ", " + data.tracks.items[0].artists[i].name;
        }
      }
      console.log("Artist(s): " + artistName + 
      "\nSong Name: " + data.tracks.items[0].name +
      "\nPreview: " + data.tracks.items[0].preview_url +
      "\nAlbum: " + data.tracks.items[0].album.name)
      contentAdded();
      });
  }


function movieThis(value){
    if (!value) {
        value = "mr nobody";
    }

    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response){
        console.log("------------------------" + 
        "\nMovie Title: " + response.data.Title +
        "\nYear of Release: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\nCountry Produced: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nCast: " + response.data.Actors);
        contentAdded();
    });

}

function simon(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            return console.log("An error occurred: " + err);
        }
        var dataArr = data.split(',');
        command = dataArr[0];
        process.argv[3] = dataArr[1];

        switch(command) {
            case "concert-this":
            process.argv[3] = data[1].replace(/['"]+/g, '')
            concertThis();
            break;

            case "spotify-this-song":
            spotifySong();
            break;

            case "movie-this":
            movieThis();
            break;

        }
    });
}

function contentAdded() {
    console.log("");
    console.log("Content Added!");
    console.log("-----------------------------------\n");
    appendFile("-----------------------------------\n");
  }
  //appendFile function
  var logData = process.argv[2] + ": " + process.argv[3] + ", ";
  function appendFile() {
    fs.appendFile("log.txt", logData, function(err) {
      if (err) {
        console.log(err);
      } else {}
    });
  }