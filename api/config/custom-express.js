var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cors = require('cors');

module.exports = function() {
	var app = express();

	app.use(cors());

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	app.use(validator());

	consign()
		.include('controllers')
		.then('connection')
		.then('models')
		.then('services')
		.into(app);

	return app;
}
