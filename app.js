require('dotenv').config();	
const path = require('path');
const express = require('express');
const os = require('os');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const URL = require('url');
const jsonScanner = require('./server/Resources/json-scanner.js');
const server = require('./server/express_webserver.js');
const wol = require('./server/Modules/wol/wol.js');
const spotify = require('./server/Modules/spotify/spotify.js');
const sensor = require('./server/Modules/arduino_endpoint/endpoint.js');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var querystring = require('querystring');

var app = new server.EXPRESS().listen();
app.use(express.static('client')); 

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});

app.get('/wol', function(req,res){

	const MAC = 'F8:32:E4:8C:91:19'
	var req = req;
	var res = res;

	wol.wake(MAC);

});

app.use(cors())
   .use(cookieParser());

app.get('/spotify/login', function(req, res) {
  // your application requests authorization
  res.redirect(spotify.authLink());
});

app.get('/spotify/callback', function(req, res) {
	// your application requests refresh and access tokens
	// after checking the state parameter
	var code = req.query.code || null;
	spotify.auth(code);
	res.send("ACCOUNT VERIFIED");
	//spotify.macro_1();
});