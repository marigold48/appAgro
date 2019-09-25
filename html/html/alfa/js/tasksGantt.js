import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'
import ajax   from '/k1/libK1_Ajax.js'
import {rDim} from '/k1/libK1_Clases.js'

import src    from '/js/tasksGanttSrc.js'

import {vgApp,goPag}    from '/js/agro_VGlob.js'
import {CultHorta,Task,TaskLnk,Epoca,rAlmanak}    from '/js/agro_Clases.js'
window.vgApp = vgApp;
window.goPag = goPag;

window.CultHorta = CultHorta;
window.Task = Task;
window.TaskLnk = TaskLnk;
window.Epoca= Epoca;
window.rDim = rDim;
window.rAlmanak = rAlmanak;
//-------------------------------------------------------------------
function sesionGanttTasksOK(sesion){
	var _id = utils.vgk.params._id;

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = src.ecoGet1Topol4Gantt;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;

//	getEsc4Gantt(_id);
}

function initTasksGantt(){
	vapps.initAppsGlobal();
	sess.validaSesion('usrMenu',sesionGanttTasksOK); // libK1_Sesion.js
}

window.onload = initTasksGantt