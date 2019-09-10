import utils  from '/k1/libK1_Utils.mjs'
import sess   from '/k1/libK1_Sesion.mjs'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'

import src    from '/js/sueloSrc.js'

//------------------------------------------------------------------- Init
function sesionSueloOK(sesion){
	idioma.ajaxGetMenuPag('Suelo');
	idioma.ajaxGetTextPag('Suelo');
	idioma.ajaxGetClasesPag();
	utils.vgk.postGetUnaFinca = null; //setAppPag;
	src.ajaxGetFincas();

	var csvTA = utils.r$('csvTA_Imp'); // textarea para import/export
//	csvTA.addEventListener('paste', prePegado);
}

function initSuelo(){
	vapps.initAppsGlobal();  // libK1_vApps.js
	src.initAppsSuelo();
	sess.validaSesion('usrMenu',sesionSueloOK);
}

window.onload = initSuelo;