
import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'

import {goPag} from '/js/agro_VGlob.js'
//------------------------------------------------------------------- Init

function actualizaH1(){

	var retol = utils.r$('H1EXPL').innerHTML;
	utils.r$('H1EXPL').innerHTML = retol +' '+utils.vgk.user.org;
	alert('OK');
}
function sesionDashboardOK(xhr){
//	setAppMenu(vgk.sesion.keo);
//	setAppPag(vgk.sesion.keo,vgk.sesion.org);
	idioma.ajaxGetMenuPag('Dashboard');
	idioma.ajaxGetTextPag('Dashboard');
	idioma.ajaxGetClasesPag('Dashboard');
	setTimeout(function(){actualizaH1(); },500);
}




function initDashboard(){
//	creaPseudoArbolIdiomas();
	vapps.initAppsGlobal();
//	initAppsDashB();
	sess.validaSesion('usrMenu', sesionDashboardOK); // libK1_sesion.js
}

window.onload = initDashboard; 

window.goPag = goPag;