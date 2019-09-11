import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'

import src    from '/js/cultivosSrc.js'
import plant  from '/js/plantasSrc.js'
import suelo  from '/js/sueloSrc.js'
import {goPag} from '/js/agro_VGlob.js'

window.goPag = goPag;

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