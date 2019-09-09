
//------------------------------------------------------------------- userMenu/vueApp cascade

//------------------------------------------------------------------- Init
function sesionPlantasOK(sesion){
vgk.user.keo = 'CAT'; //---------------------- Borrar
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
