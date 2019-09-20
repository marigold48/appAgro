import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'
import {rKeos,rLang,rNodoClase,rTxtML,rDim} from '/k1/libK1_Clases.js'
import {InfoFinca,Zona,Bancal} from '/js/agro_Clases.js'

import src    from '/js/cultivosSrc.js'
import plant  from '/js/plantasSrc.js'
import suelo  from '/js/sueloSrc.js'
import agro   from '/js/agro_Clases.js'
import {vgApp,goPag} from '/js/agro_VGlob.js'

window.vgApp = vgApp;
window.goPag = goPag;
window.rKeos = rKeos;
window.rLang = rLang;
window.rNodoClase = rNodoClase;
window.rTxtML = rTxtML;


window.InfoFinca = InfoFinca;
window.Zona = Zona;
window.Bancal = Bancal;

window.showListaEscenarios = src.showListaEscenarios;
window.cargaEscenario = src.cargaEscenario;
window.RaizEsc = agro.RaizEsc;

window.Task =agro.Task;
window.TaskLnk = agro.TaskLnk;
window.CultHorta = agro.CultHorta;
window.editTasksCult = src.editTasksCult;
//------------------------------------------------------------------- Init
function sesionCultivosOK(sesion){
	utils.vgk.postLoadTextos = plant.initAppsPlantas;
	idioma.ajaxGetMenuPag('Cultivos');
	idioma.ajaxGetTextPag('Cultivos');
	idioma.ajaxGetClasesPag();

	alert('Cargar escenario, temporada,\n o crear uno nuevo');
	utils.vgk.postGetUnaFinca = src.actualizaVueAppsZonas;
	suelo.ajaxGetFincas();

	utils.vgk.postGetUnGrpPlantas = src.actualizaVueAppsPlantas;
	plant.ajaxGetPlantas();

	src.ajaxGetEscenarios();
	src.ajaxGetAgroJars();

}

function initCultivos(){
	utils.vgk.esPagCultivos = true;
	vapps.initAppsGlobal();  // libK1_vApps.js
	src.initAppsSuelo4Cult(); // agro_vApps.js
	src.initAppEscenarios(); // 
//	initAppsPlantas();

	sess.validaSesion('usrMenu',sesionCultivosOK);
}

window.onload = initCultivos;