
require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var textFile = require('fs');


var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


function grabNext(flag) {
  var index = process.argv.indexOf(flag);
  return (index === -1) ? null : process.argv[index + 1];
}

function grab(flag) {
  var index = process.argv.indexOf(flag);
  return (index === -1) ? null : process.argv[index];
}

function consoleSpotifyData(songName) {

  if (songName != null) {

    spotify
      .search({ type: 'track', query: songName })
      .then(function (response) {
        //console.log(response)
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].preview_url);
        console.log(response.tracks.items[0].album.name);
      })

      .catch(function (err) {
        console.log(err);

      });
  } else {
    spotify
      .search({ type: 'track', query: 'The Sign by Ace of Base' })
      .then(function (response) {
        //console.log(response)
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].preview_url);
        console.log(response.tracks.items[0].album.name);
      })

      .catch(function (err) {
        console.log(err);

      });


  }
}
  //=============================================================== do what it says


  textFile.readFile("./random.txt", "utf8", function (err, data) {
    console.log(data);

    consoleSpotifyData(data.split(',')[1])


  });
  var chosen = grab('do-what-it-says');

  //=============================================================== Spotify
  var spotifySong = grabNext('spotify-this-song');

  if (spotifySong != null) {

    spotify
      .search({ type: 'track', query: spotifySong })
      .then(function (response) {
        //console.log(response)
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].preview_url);
        console.log(response.tracks.items[0].album.name);
      })

      .catch(function (err) {
        console.log(err);

      });
  } else {
    spotify
      .search({ type: 'track', query: 'The Sign by Ace of Base' })
      .then(function (response) {
        //console.log(response)
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].preview_url);
        console.log(response.tracks.items[0].album.name);
      })

      .catch(function (err) {
        console.log(err);

      });

  }


  //=============================================================== Twitter
  var screenName = grabNext('my-tweets');

  if (screenName != null) {
    var params = { screen_name: screenName };

    client
      .get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

          for (var i = 0; i < 20; i++) {

            console.log("****************************");
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
            console.log(tweets[i].user.name);
            console.log("******************************");
          }
        }


      });
  }



  //=============================================================== OMDB
  var movieName = grabNext('movie-this');

  if (movieName != null) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    request(queryUrl, function (error, response, body) {

      // If the request is successful
      if (!error && response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        console.log(bodyObj.Title);
        console.log(bodyObj.Year);
        console.log(bodyObj.imdbRating);
        console.log(bodyObj.Ratings[1]);
        console.log(bodyObj.Country);
        console.log(bodyObj.Language);
        console.log(bodyObj.Plot);
        console.log(bodyObj.Actors);
      }
    });

  } else {
    var queryUrl = "http://www.omdbapi.com/?t=" + 'Mr.Nobody' + "&y=&plot=short&apikey=trilogy";


    request(queryUrl, function (error, response, body) {

      // If the request is successful
      if (!error && response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        console.log(bodyObj.Title);
        console.log(bodyObj.Year);
        console.log(bodyObj.imdbRating);
        console.log(bodyObj.Ratings[1]);
        console.log(bodyObj.Country);
        console.log(bodyObj.Language);
        console.log(bodyObj.Plot);
        console.log(bodyObj.Actors);
      }
    });
  }




