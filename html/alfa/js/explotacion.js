import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'

import src    from '/js/explotacionSrc.js'
import {ItemExplt} from '/js/agro_Clases.js'
import {Reg00,Reg01A,Reg01B,Reg01C,Reg01D,Reg01E} from '/js/agro_CCPAE.js'
import {vgApp,goPag} from '/js/agro_VGlob.js'

window.vgApp = vgApp;
window.goPag = goPag;

window.ItemExplt = ItemExplt;
window.Reg00 = Reg00;
window.Reg01A = Reg01A;
window.Reg01B = Reg01B;
window.Reg01C = Reg01C;
window.Reg01D = Reg01D;
window.Reg01E = Reg01E;

//------------------------------------------------------------------- Init
function sesionExpltOK(sesion){
	idioma.ajaxGetMenuPag('Explotacion');
	idioma.ajaxGetTextPag('Explotacion');
	idioma.ajaxGetClasesPag();
	utils.vgk.postGetLaExplt = src.mostrarExplt;
	src.ajaxGetLaExplt(); // pkg_Explt.js
}

function initExplt(){
	vapps.initAppsGlobal();
	src.initAppsExplt();

	sess.validaSesion('usrMenu',sesionExpltOK);
}

window.onload = initExplt;