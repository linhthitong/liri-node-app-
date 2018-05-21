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

// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

spotify
  .search({ type: 'track', query: 'Moves like Jagger' })
  .then(function(response) {
    console.log("34")
    console.log(response.tracks.items[0].artists[0].name);
    console.log(response.tracks.items[0].name);
    // console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });