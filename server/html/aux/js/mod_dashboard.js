//------------------------------------------------------------------- Init


function sesionDashboardOK(xhr){
//	setAppMenu(vgk.sesion.keo);
//	setAppPag(vgk.sesion.keo,vgk.sesion.org);
	ajaxGetMenuPag('Dashboard');
	ajaxGetTextPag('Dashboard');
	ajaxGetClasesPag('Dashboard');

}




function initDashboard(){
//	creaPseudoArbolIdiomas();
	initAppsGlobal();
//	initAppsDashB();
	validaSesion('usrMenu', sesionDashboardOK); // libK1_sesion.js
}
