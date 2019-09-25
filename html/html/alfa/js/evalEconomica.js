
import vapps  from '/k1/libK1_vApps.js'
import sess   from '/k1/libK1_Sesion.js'
import utils  from '/k1/libK1_Utils.js'
import {rKeos,rLang,rNodoClase,rTxtML,rDim} from '/k1/libK1_Clases.js'

import src    from '/js/evalEconomicaSrc.js'

import {vgApp,goPag} from '/js/agro_VGlob.js'
import agro from '/js/agro_Clases.js'

window.vgApp = vgApp;
window.goPag = goPag;

window.CultHorta = agro.CultHorta;
window.Task = agro.Task;
window.TaskLnk = agro.TaskLnk;
window.rDim = rDim;
//------------------------------------------------------------------- Init
function sesionCalcsOK(sesion){
	var _id = utils.vgk.params._id;
	src.get1Escenario(_id);
}

function initCalcs(){
	vapps.initAppsGlobal();  // libK1_vApps.js
	src.initAppCalcs();
	sess.validaSesion('usrMenu',sesionCalcsOK); // libK1_Sesion.js
}

window.onload = initCalcs;