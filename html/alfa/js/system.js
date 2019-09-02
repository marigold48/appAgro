function initAppsSystem(){

	if (r$('pagSystem')){
		vgk.appPagSystem = new Vue ({
			el: '#pagSystem',
			data : {
				usuarios:[],
				sesiones:[]
		},
			methods : {
				actualizaUsuarios : function(filas){this.usuarios = filas;},
				actualizaSesiones : function(filas){this.sesiones = filas;},
				editUsuario : function(ix){
					var user = this.items[ix];
					editaItem('USUARIO',user,grabaUser,borraUser);
				},
				nuevoUser : function(){
					var user = new rUsuario('Nuevo');
					crearItem('USUARIO',user,grabaUser);
				},
				borraSesion : function(ix){
					var sess = this.sesiones[ix]; 
					borraSesion(sess);
				}

			}
		})
	}
}

function ecoBorraSesion(xhr){
	console.log('Sesion borrada: '+xhr.responseText);
	getListaSesiones();
}
function borraSesion(sess){
	var sesion_id = sess.sesion_id;
	var stmt = "delete from sesiones where sesion_id="+sesion_id+";";

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : sesion_id,
		path : vgApp.sqlite.pathDB,
		db   : vgApp.sqlite.sessDB,
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoBorraSesion;

	ajaxCmdShell(params,body);

}
function ecoGetListaSesiones(xhr){
	var filas = csv2filas(xhr.responseText);
	vgk.appPagSystem.actualizaSesiones(filas);
}
function getListaSesiones(){
	var sesion_id = vgk.params.idSess;
	var stmt = 'select * from sesiones;';

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : sesion_id,
		path : vgApp.sqlite.pathDB,
		db   : vgApp.sqlite.sessDB,
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoGetListaSesiones;

	ajaxCmdShell(params,body);
}

//------------------------------------------------------------------- Init
function ecoGetListaUsuarios(xhr){
	var filas = csv2filas(xhr.responseText);
	vgk.appPagSystem.actualizaUsuarios(filas);
	getListaSesiones();
}
function getListaUsuarios(){
	var sesion_id = vgk.params.idSess;
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
	params.eco = ecoGetListaUsuarios;

	ajaxCmdShell(params,body);
}



function sesionSystemOK(xhr){
	ajaxGetMenuPag('System');
	ajaxGetTextPag('System');
	ajaxGetClasesPag('Idiomas');
	getListaUsuarios();
}




function initSystem(){
	initAppsGlobal();
	initAppsSystem();
	validaSesion('usrMenu', sesionSystemOK); // libK1_sesion.js
}
