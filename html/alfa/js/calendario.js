
import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'

import src    from '/js/calendarioSrc.js'
import agro   from  '/js/agro_Clases.js'

//------------------------------------------------------------------- Init
function sesionCalendarioOK(sesion){
	idioma.ajaxGetClasesPag();
	var hoy = new Date();
	var jar = hoy.getFullYear();
	var mes = hoy.getMonth();
	console.log(mes+'/'+jar);
	utils.vgk.almanak = new agro.rAlmanak('x',[],jar);
	utils.vgk.appMes.jar = jar;
	src.showAlmanak(mes); 

	src.ajaxGetKairos()
}

function initCalendario(){
	vapps.initAppsGlobal();
	src.initAppsAlmanak();
//	initAppsKronos();

	sess.validaSesion('usrMenu',sesionCalendarioOK);// libK1_Sesion.js
}

window.onload = initCalendario;