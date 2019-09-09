
//------------------------------------------------------------------- Init
function sesionPlantasOK(sesion){
	vgk.postLoadTextos = initAppsPlantas;
	ajaxGetMenuPag('Plantas');
	ajaxGetTextPag('Plantas',);
	ajaxGetClasesPag();
	alert('OK');
	ajaxGetPlantas();
}

function initPlantas(){
	initAppsGlobal();
	validaSesion('usrMenu',sesionPlantasOK); // libK1_sesion.js
}
