

//------------------------------------------------------------------- Init
function sesionMapaOK(){
	var _id = vgk.params._id;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = cargaGeoFinca;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

function initMapa(){
	
	initAppsGlobal();

	validaSesion('usrMenu',sesionMapaOK);// libK1_Sesion.js
}
