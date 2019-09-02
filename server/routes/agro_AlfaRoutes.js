'use strict';

module.exports = function(app) {
	var agroCtrl = require('../controllers/agro_AlfaController');

//------------------------------------------------------------------- Index - Route
	app.route('/')
		.get(agroCtrl.get_Raiz);

//------------------------------------------------------------------- Shell Scripts
	app.route('/shell/oracle/')
		.post(agroCtrl.SQL_Oracle);

	app.route('/shell/sqlite/')
		.post(agroCtrl.SQL_SQLite);

	app.route('/shell/encript/')
		.post(agroCtrl.encriptPWD);

//------------------------------------------------------------------- MongoDB
	app.route('/alfaAgro') 
		.get(agroCtrl.findAll)
		.post(agroCtrl.add);

	app.route('/metas/:iam') 
		.get(agroCtrl.findMetas);

	app.route('/metasByOrg/:iam/:org') 
		.get(agroCtrl.findMetasByOrg);

	app.route('/alfaAgro/:id') 
		.get(agroCtrl.findById)
		.put(agroCtrl.update)
		.delete(agroCtrl.delete);

	app.route('/clone/:id') 
		.delete(agroCtrl.duplica);

};





