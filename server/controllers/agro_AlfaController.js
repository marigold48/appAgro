// Para listar los propietarios: (con _id, tag, id0)
// db.topols.aggregate([{$unwind:"$nodos"},{$match:{"nodos.iam":"Propietario"}},{ $project : {"nodos.tag":1,"nodos.id0":1}}]);


var mongoose = require('mongoose');
var AlfaAgro = mongoose.model('topol');
var ObjectID = require('mongodb').ObjectID;


//
exports.get_Raiz = function(req,res){
	return 'App Gestion Eco Agricola'
}

//------------------------------------------------------------------- shell scripts
// Ejecutar sentencia SQL / Oracle
exports.SQL_Oracle = function(req, res){
	var params = req.body;
	var id = params.id;
	var db = params.db;
	var ruta = params.path;
	var stmt = params.stmt;

	var exec = require('child_process').exec;
	function eco(error, stdout, stderr) {res.send(stdout);}
	exec("./cgibin/k1GetQryORCL.cgi "+id+' '+db+' '+ruta+' '+stmt, eco);
}


// Ejecutar sentencia SQL / SQLite
exports.SQL_SQLite = function(req,res){
	var params = req.body;
	var id = params.id;
	var db = params.db;
	var ruta = params.path;
	var stmt = params.stmt;
	var exec = require('child_process').exec;
	function eco(error, stdout, stderr) {res.send(stdout);}
	exec("./cgibin/k1GetQryLite.cgi "+id+' '+db+' '+ruta+' '+stmt, eco);
};

// Obtener md5 de un usuario/password
exports.encriptPWD = function(req,res){
	var params = req.body;
	var id = params.id;
	var usr = params.usr;
	var pwd = params.pwd;
	var ruta = params.ruta;

	var exec = require('child_process').exec;
	function eco(error, stdout, stderr) {res.send(stdout);}
	exec("./cgibin/k1EncriptPWD.cgi "+id+' '+usr+' '+pwd+' '+ruta, eco);
};

//------------------------------------------------------------------- MongoDB

//GET Lista de {meta}'s' de las topologias
exports.findAll = function(req, res) {
	AlfaAgro.find({}, 'meta',function(err, topols) {
		if(err) res.status(500).jsonp(err.message);
		console.log('GET All metas');
		res.status(200).jsonp(topols);
	});
};

//GET Lista de {meta}'s' por {iam} de las topologias
exports.findMetas = function(req, res) {
	AlfaAgro.find({"meta.iam":req.params.iam}, 'meta',function(err, topols) {
		if(err) res.status(500).jsonp(err.message);
		console.log('GET metas by iam: '+req.params.iam)
		res.status(200).jsonp(topols);
	});
};

//GET Lista de {meta}'s' por {iam} && {org} de las topologias
//db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
//Error: 	AlfaAgro.find($and:[{"meta.iam":req.params.iam},{"meta.org":req.params.org}], 'meta',function(err, topols) {
//        	              ^^^^

exports.findMetasByOrg = function(req, res) {
	AlfaAgro.find({$and:[{"meta.iam":req.params.iam},{"meta.org":req.params.org}]}, 'meta',function(err, topols) {
		if(err) res.status(500).jsonp(err.message);
		console.log('GET metas by iam/org: '+req.params.iam+'/'+req.params.org);
		res.status(200).jsonp(topols);
	});
};

//GET - Retorna una topologia con un _id especificado
exports.findById = function(req, res) {
	AlfaAgro.findById(req.params.id, function(err, topol) {
		if(err) return res.status(500).jsonp(err.message);
		console.log('GET by _id :' + req.params.id);
		res.status(200).jsonp(topol);
	});
};

//POST - Inserta una nueva topologia
exports.add = function(req, res) {
	var topol = new AlfaAgro({
		meta: req.body.meta,
	 	nodos: req.body.nodos
	});
	topol.save(function(err, topol) {
		if(err) return res.status(500).send(err.message);
		console.log('POST');
		res.status(200).jsonp(topol);
	});
};

//PUT - Update una topologia ya existente
exports.update = function(req, res) {
	AlfaAgro.findById(req.params.id, function(err, topol) {
		topol.meta = req.body.meta || {};
		topol.nodos = req.body.nodos || [];
		topol.save(function(err) {
			if (err) return res.status(500).jsonp(err.message);
			console.log('PUT: '+req.params.id);
			res.status(200).jsonp(topol);
		});
	});
};

//DELETE - Delete una topologia con un _id especificado
exports.delete = function(req, res) {
	AlfaAgro.findById(req.params.id, function(err, topol) {
		topol.remove(function(err) {
			if(err) return res.status(500).jsonp(err.message);
			console.log('DEL: '+req.params.id);
			res.status(200).json({ message: 'Successfully deleted' });
		});
	 });
};

//DUPLICA - Duplica una topologia con un _id especificado
exports.duplica = function(req, res) {
	AlfaAgro.findById(req.params.id, function(err, topol) {
		console.log('DUP '+topol.meta.tag);
		topol._id = mongoose.Types.ObjectId();
		topol.isNew = true;
		topol.save(function(err) {
			if(err) return res.status(500).jsonp(err.message);
			console.log('DUP: '+req.params.id);
			res.status(200).jsonp(topol);
		});
	 });
};

/*
Model.findById(req.body.myid, function (err, results) {
      var doc = new Model(results);
      doc._id = mongoose.Types.ObjectId();
      doc.serial = req.body.serial;
      doc.remarks = req.body.remarks;
      doc.save(function(err) {
        if(err){
          res.json({ success: false });
        }else {
          res.json({ success: true });
        }
      });
    })
    */