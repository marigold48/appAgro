//------------------------------------------------------------------- Init

function actualizaH1(){

	var retol = r$('H1EXPL').innerHTML;
	r$('H1EXPL').innerHTML = retol +' '+vgk.user.org;
}
function sesionDashboardOK(xhr){
//	setAppMenu(vgk.sesion.keo);
//	setAppPag(vgk.sesion.keo,vgk.sesion.org);
	ajaxGetMenuPag('Dashboard');
	ajaxGetTextPag('Dashboard');
	ajaxGetClasesPag('Dashboard');
	setTimeout(function(){actualizaH1(); },500);
}




function initDashboard(){
//	creaPseudoArbolIdiomas();
	initAppsGlobal();
//	initAppsDashB();
	validaSesion('usrMenu', sesionDashboardOK); // libK1_sesion.js
}
