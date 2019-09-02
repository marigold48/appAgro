// appalfaAgro.js
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
//var cors = require('cors');

var fs = require('fs');
var util = require('util');

var app = express();

//------------------------------------------------------------------- Directories
app.use("/", express.static("./apps/Agro/html/alfa"));
app.use("/img", express.static("./apps/Agro/img"));
app.use("/lib", express.static("./libs"));
app.use("/geo", express.static("./ejsGeoJSON"));
app.use("/k1", express.static("./kernels/kernel1/alfa"));
app.use("/fonts", express.static("./fonts"));


//------------------------------------------------------------------- C O R S
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://marigold.es');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

//------------------------------------------------------------------- Connection to DB
mongoose.connect('mongodb://localhost/alfaAgro', { useNewUrlParser: true }, function(err, res) {
	if(err) throw err;
	console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(methodOverride());

// Import Models, Controllers and Routes

var models = require('./models/agro_AlfaModel');
var control = require('./controllers/agro_AlfaController');
var router = require('./routes/agro_AlfaRoutes');
router(app); //register the route

//------------------------------------------------------------------- Start server
app.listen(3102, function() {
	console.log("App Agro (alfa) en http://localhost:3102");
});

//------------------------------------------------------------------- Debug log
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug-alfa.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

