import vapps  from '/k1/libK1_vApps.js'
import sess   from '/k1/libK1_Sesion.js'
import src    from '/js/idiomaSrc.js'

import {adminClasesML,adminMenusML,adminTextosML,adminTopolsML} from '/js/idiomaSrc.js'

import {vgApp,goPag}  from '/js/agro_VGlob.js'
window.vgApp = vgApp;
window.goPag = goPag;

window.adminClasesML = adminClasesML;
window.adminMenusML  = adminMenusML;
window.adminTextosML = adminTextosML;
window.adminTopolsML = adminTopolsML;

function sesionIdiomaOK(xhr){
	vapps.initAppsGlobal();
//	vgk.user.keo='CAT';
	src.ajaxGetMenuPag('Idiomas');
	src.ajaxGetTextPag('Idiomas');
}




function initIdioma(){
	sess.validaSesion('usrMenu', sesionIdiomaOK); // libK1_sesion.js
}

window.onload = initIdioma;