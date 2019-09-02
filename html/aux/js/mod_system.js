//------------------------------------------------------------------- Init
function ecoGetListaUsers(xhr){
	var filas = csv2filas(xhr.responseText);
	alert(filas.length+' Usuarios');
}
function getListaUsers(){
	var sesion_id = vgk.idsSess.getId(); // Se genera un nuevo id de Sesión
	var stmt = 'select * from users;';

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : sesion_id,
		path : vgApp.sqlite.pathDB,
		db   : vgApp.sqlite.userDB,
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoGetListaUsers;

	ajaxCmdShell(params,body);
}



function sesionSystemOK(xhr){
	ajaxGetMenuPag('System');
	ajaxGetTextPag('System');
	ajaxGetClasesPag('Idiomas');
	getListaUsers();
}




function initSystem(){
	initAppsGlobal();
	validaSesion('usrMenu', sesionSystemOK); // libK1_sesion.js
}
