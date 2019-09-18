import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'

import src    from '/js/tasksGrafoSrc.js'
import {goPag}    from '/js/agro_VGlob.js'


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