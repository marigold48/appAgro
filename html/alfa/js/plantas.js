
//------------------------------------------------------------------- userMenu/vueApp cascade

//pkg_Plantas.js

/*
Las especies y variedades a cultivar se dividen en dos grandes grupos:
+ Hortalizas (HORTA)
+ Frutales (FRUTA)

Para designar indistintamente Horta|Fruta pondremos Planta

Para cada horta se implementa un Arbol :
+ Class Horta extends rArbol
+ Class Fruta extends rArbol

En la 'raspa' de cada arbol, se enlazan los nodos InfoH ó InfoF,
que agruparán a las especies y variedades de cultivo similar

+ EspHorta
+ VarHorta

+ EspFruta
+ VarFruta 

Todas tienen una imagen asociada

Las clases se epecifican en agro_Clases.js
Las appVue se especifican en agro_vApps.js
*/

//=================================================================== PLANTAS

import utils  from '/k1/libK1_Utils.js'
import sess   from '/k1/libK1_Sesion.js'
import vapps  from '/k1/libK1_vApps.js'
import idioma from '/k1/libK1_Idioma.js'
import {rKeos,rLang,rNodoClase,rTxtML,rDim} from '/k1/libK1_Clases.js'

import src    from '/js/plantasSrc.js'
import {vgApp,goPag} from '/js/agro_VGlob.js'

window.vgApp = vgApp;
window.goPag = goPag;
window.editTasksSeed = src.editTasksSeed;

window.rKeos = rKeos;
window.rLang = rLang;
window.rNodoClase = rNodoClase;
window.rTxtML = rTxtML;

//------------------------------------------------------------------- Init
function sesionPlantasOK(sesion){
	utils.vgk.postLoadTextos = src.initAppsPlantas;
	idioma.ajaxGetMenuPag('Plantas');
	idioma.ajaxGetTextPag('Plantas',);
	idioma.ajaxGetClasesPag();
	alert('OK');
	src.ajaxGetPlantas();
}

function initPlantas(){
	vapps.initAppsGlobal();
	sess.validaSesion('usrMenu',sesionPlantasOK); // libK1_sesion.js
}

window.onload = initPlantas;