console.log("this has started");
require("dotenv").config();


var Spotify = require('node-spotify-api');
var Twit = require('twitter');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twit(keys.twitter);


function grab(flag) {
    var index = process.argv.indexOf(flag);
    return (index === -1) ? null: process.argv[index+1];
}

console.log(process.argv);
var spotifySong = grab('spotify-this-song'); 
// if this run spotify function


spotify
  .search({ type: 'track', query: 'Hello by Adele' })
  .then(function(response) {
    console.log("34")
    console.log(response.tracks.items[0].artists[0].name);
    console.log(response.tracks.items[0].name);
    console.log(response.tracks.items[0].preview_url);
    console.log(response.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log(err);
  });