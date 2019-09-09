
//------------------------------------------------------------------- userMenu/vueApp cascade
function actualizaVueAppsZonas(){
	var zonas = vgk.finca.getRaspa();
	vgk.appH3Zona.actualiza(vgk.loTopol.meta.tag);
	vgk.appZona.actualiza(zonas);
}

function actualizaVueAppsPlantas(){
	if (vgk.user.rol == 'ADMIN'){
		vgk.appPlantas.actualiza(vgk.grupo.getRaspa());
		vgk.appH3Plantas.actualiza(vgk.grupo.meta.tag);
	}
	else alert('No es Admin');
}

//------------------------------------------------------------------- Init
function sesionCultivosOK(sesion){
	vgk.postLoadTextos = initAppsPlantas;
	ajaxGetMenuPag('Cultivos');
	ajaxGetTextPag('Cultivos');
	ajaxGetClasesPag();

	alert('Cargar escenario, temporada,\n o crear uno nuevo');
	vgk.postGetUnaFinca = actualizaVueAppsZonas;
	ajaxGetFincas();

	vgk.postGetUnGrpPlantas = actualizaVueAppsPlantas;
	ajaxGetPlantas();

	ajaxGetEscenarios();
	ajaxGetAgroJars();

}

function initCultivos(){
	vgk.esPagCultivos = true;
	initAppsGlobal();  // libK1_vApps.js
	initAppFincas(); // agro_vApps.js
	initAppZonas(); // agro_vApps.js
	initAppBancales(); // agro_vApps.js
	initAppEscenarios(); // 
//	initAppsPlantas();

	validaSesion('usrMenu',sesionCultivosOK);
}
