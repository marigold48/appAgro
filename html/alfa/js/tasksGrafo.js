import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'
import {rKeos,rLang,rNodoClase,rTxtML,rDim} from '/k1/libK1_Clases.js'

import src    from '/js/tasksGrafoSrc.js'
import {vgApp,goPag}    from '/js/agro_VGlob.js'

window.vgApp = vgApp;
window.goPag = goPag;

window.rKeos = rKeos;
window.rLang = rLang;
window.rNodoClase = rNodoClase;
window.rTxtML = rTxtML;
window.rDim = rDim;

//------------------------------------------------------------------- Init
function sesionTareasOK(sesion){
	idioma.ajaxGetClasesPag();

	var _id = utils.vgk.params._id;
	src.get1TasksGrafo(_id); // pkg_tasksGrafo.js
}

function initTasksGrafo(){
	vapps.initAppsGlobal();
	sess.validaSesion('usrMenu',sesionTareasOK); // libK1_sesion.js
}

window.onload = initTasksGrafo;
window.updateTasksGrafo = src.updateTasksGrafo;