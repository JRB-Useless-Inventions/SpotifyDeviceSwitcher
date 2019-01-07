var request = require('request'); // "Request" library
var SpotifyWebApi = require('spotify-web-api-node');
const jsonScanner = require('../../Resources/json-scanner.js');
 
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT
});

var scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state'];
var state = 'some-state-of-my-choice';

const link = function (){
	return authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
}

const auth = function(code){

	// Create the authorization URL
	spotifyApi.authorizationCodeGrant(code).then(
	  function(data) {
	    console.log('The token expires in ' + data.body['expires_in']);
	    console.log('The access token is ' + data.body['access_token']);
	    console.log('The refresh token is ' + data.body['refresh_token']);

	    // Set the access token on the API object to use it in later calls
	    spotifyApi.setAccessToken(data.body['access_token']);
	    spotifyApi.setRefreshToken(data.body['refresh_token']);
	  },
	  function(err) {
	    console.log('Something went wrong!', err);
	  }
	);
}
function refresh(){
	spotifyApi.refreshAccessToken().then(
		function(data) {
			console.log("The access token has been refreshed!");

			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body["access_token"]);
		},
		function(err) {
			console.log("Could not refresh access token", err);
		}
	);
}

const validate = function(token){
	spotifyApi.setAccessToken(token);
	spotifyApi.getMe()
	.then(function(data){
		console.log();
		if (data.body.email != String(process.env.SPOTIFY_EMAIL)) {
			return false;
		}
	}, function(err){
		console.log(err);
	})
}

function tokenValidate(res){
	if (res.statusCode == 401) {
		//Access token expired
		refresh();
	}
	else{
		//API Command Error
	}
}

const macro_1 = function (){
	//Read avliable devices
	//If Computer is avlable, move music to that device
	spotifyApi.getMyDevices()
	.then(function(data) {
		var deviceList = data.body;
		var computer = jsonScanner.getObjects(deviceList,'name','JAKAMOLE')[0];
		//If the computer is already playing, ignore call
		if (computer.is_active == true) {
			return;
		}
		else{
			spotifyApi.transferMyPlayback({
				deviceIds: [String(computer.id)],
				play : true
			})
			.then(function(data){
				console.log("Moved music to computer");

			}, function(err){
				console.log(err);
			});
		}
	}, function(err) {
		tokenValidate(err);
	});
}

module.exports.auth = auth;
module.exports.authLink = link;
module.exports.macro_1 = macro_1;