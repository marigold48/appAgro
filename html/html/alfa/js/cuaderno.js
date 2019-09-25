import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'

import src    from '/js/cuadernoSrc.js'
import {showListaQuaderns,creaQuadernOrigen,carga1Quadern}    from '/js/cuadernoSrc.js'
import {vgApp,goPag} from '/js/agro_VGlob.js'
import {rKeos,rLang,rNodoClase,rTxtML,rDim} from '/k1/libK1_Clases.js'
import {ItemExplt} from '/js/agro_Clases.js'
import {Reg00,Reg01A,Reg01B,Reg01C,Reg01D,Reg01E} from '/js/agro_CCPAE.js'
import {Reg02,Reg03,Reg04,Reg05A,Reg05B,Reg06} from '/js/agro_CCPAE.js'
import {Reg07,Reg08,Reg09,Reg10A,Reg10B,Reg11} from '/js/agro_CCPAE.js'
import {Campanya} from '/js/agro_CCPAE.js'

window.vgApp = vgApp;
window.goPag = goPag;

window.rKeos = rKeos;
window.rLang = rLang;
window.rNodoClase = rNodoClase;
window.rTxtML = rTxtML;

window.ItemExplt = ItemExplt;
window.Reg00  = Reg00;
window.Reg01A = Reg01A;
window.Reg01B = Reg01B;
window.Reg01C = Reg01C;
window.Reg01D = Reg01D;
window.Reg01E = Reg01E;
window.Reg02  = Reg02;
window.Reg03  = Reg03;
window.Reg04  = Reg04;
window.Reg05A = Reg05A;
window.Reg05B = Reg05B;
window.Reg06  = Reg06;
window.Reg07  = Reg07;
window.Reg08  = Reg08;
window.Reg09  = Reg09;
window.Reg10A = Reg10A;
window.Reg10B = Reg10B;
window.Reg11  = Reg11;
window.Campanya = Campanya;

window.showListaQuaderns = showListaQuaderns;
window.creaQuadernOrigen = creaQuadernOrigen;
window.carga1Quadern = carga1Quadern;
//------------------------------------------------------------------- Init
function sesionQuadernOK(sesion){
	utils.vgk.postLoadTextos = src.initAppsQuadern;
	idioma.ajaxGetMenuPag('Quadern');
	idioma.ajaxGetTextPag('Quadern');
	idioma.ajaxGetClasesPag();
	src.ajaxGetQuaderns();
}

function initQuadern(){

	vapps.initAppsGlobal();
//	initAppsQuadern();

	sess.validaSesion('usrMenu',sesionQuadernOK); // libK1_sesion.js

}

window.onload = initQuadern;