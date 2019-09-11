
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
que agruparán a las especies y variedades de cultivo similautils.utils.r$

+ EspHorta
+ VarHorta

+ EspFruta
+ VarFruta 

Todas tienen una imagen asociada

Las clases se epecifican en agro_Clases.js
Las appVue se especifican en agro_vApps.js
*/


import utils  from '/k1/libK1_Utils.js'
import ajax   from '/k1/libK1_Ajax.js'
import idioma from '/k1/libK1_Idioma.js'
import vapps  from '/k1/libK1_vApps.js'
import topol  from '/k1/libK1_Topol.js'

import local  from '/js/agro_VGlob.js'
import agro   from  '/js/agro_Clases.js'
import cult   from  '/js/cultivosSrc.js'

import {GrpHorta,EspHorta,VarHorta} from '/js/agro_Clases.js'

window.GrpHorta = GrpHorta;
window.EspHorta = EspHorta;
window.VarHorta = VarHorta;

//=================================================================== PLANTAS

function initAppsPlantas(){
	if (utils.r$('modoPlantas')){
		utils.vgk.appModoPlantas = new Vue({
			el: '#modoPlantas',
			data: { 
				modo: 'HORTA'
			},
			methods : {
				toggle : function(modo){
					this.modo = modo;
					utils.vgk.appListaGrupo.modo = this.modo;
					ajaxGetPlantas();
				}
			}
		})
	}

	if (utils.r$('lstGrupo')){
		utils.vgk.appListaGrupo = new Vue({
			el: '#lstGrupo',
			data: {
				modo : 'HORTA',
				items: [],
				idAct: 0,
			},
			methods :{
				limpia : function(){this.items = []},
				crearItem : function(){crearGrupo();},
				editaItem : function(){editaGrupo(this.idAct);},
				showHijos : function(id0){showEspec(id0);}, 
				setIdAct : function(ev){this.idAct = ev.target.value;}, // Select click
				actualiza : function(items){
					this.items = items;
					if (items.length){ 
						this.idAct = items[0].id0;
						this.showHijos();
					}
					else utils.vgk.appEspec.limpia();
				}
			}
		}) 
	}

	if(utils.r$('lstEspec')){
		utils.vgk.appListaEspec = new Vue({
			el: '#lstEspec',
			data: {
				items: [],
				idAct: 0,
			},
			methods : {
				actualiza : function(items){
					this.items = items;
					if (items.length) this.idAct = items[0].id0;
				},
			}
			}) 
	}	
	if (utils.r$('h3Espec')){
		utils.vgk.appH3Espec = new Vue ({
			el: '#h3Espec',
			data : {tag : 'Ninguno'},
			methods : {
				crearItem : function(){crearEspec();},
				limpia : function(){this.tag = 'Ninguno';},
				actualiza : function(tag){this.tag = tag;}
			}
		})
	}

	if (utils.r$('divEspec')){
		utils.vgk.appEspec = new Vue({
			el: '#divEspec',
			data: {
				items: [],
				idAct: 0,
			},
			methods : {
				limpia : function(){
					this.items = [];
					utils.vgk.appVardd.limpia();
				},
				showHijos: function(id0){showVardd(id0); },
				actualiza: function(items){
					this.items= items;
					if (items.length){ 
						this.showHijos(items[0].id0);
						this.idAct = items[0].id0;
					}
					else{
						this.limpia();
					}
				},
				editItem: function(id0){ editEspec(id0);},
			}
		}) 
	}
	if (utils.r$('lstVardd')){
		utils.vgk.appListaVardd = new Vue({
			el: '#lstVardd',
			data: {items: []},
			methods : {
				actualiza : function(items){this.items = items},
			}
			}) 
	}
	if(utils.r$('h3Vardd')){
		utils.vgk.appH3Vardd = new Vue ({
			el: '#h3Vardd',
			data : {tag : 'Ninguno'},
			methods : {
				crearItem : function(){crearVardd();},
				limpia : function(){this.tag = 'Ninguno';},
				actualiza : function(tag){this.tag = tag;}
			}
		})
	}
	
	if(utils.r$('divVardd')){
		utils.vgk.appVardd = new Vue({
			el: '#divVardd',
			data : {
				items : [],
				idAct : 0
			},
			methods :{
				limpia : function(){
					this.items = [];
					utils.vgk.appH3Vardd.limpia();
				},
				actualiza : function(items){
					this.items = items;
					if (items.length) this.idAct = items[0].id0;
				},
				editItem: function(id0){ editaVardd(id0);},
				plantarVardd : function(id0){
					var vardd = utils.vgk.plantas.getNodoById(id0);
					utils.vgk.appEscenarios.vardd = vardd;
					cult.crearCultivo();
				},
			}
		})
	}	
}

//------------------------------------------------------------------- Variedades

function borraVardd(){
	var vardd = utils.vgk.appModal.item;
	utils.vgk.plantas.borraNodo(vardd);
	utils.vgk.appModal.showModal = false;
	var raspa = utils.vgk.plantas.getRaspa();
	utils.vgk.appListaGrupo.actualiza(raspa);
	updatePlantas();
}

function grabaVardd(){
	var vardd = utils.vgk.appModal.item;

	if (utils.vgk.appModal.editON) utils.vgk.plantas.updtNodoSelf(vardd);
	else{ 
		var espec = utils.vgk.plantas.getNodoById(utils.vgk.appEspec.idAct);
		utils.vgk.plantas.addNodoHijo(espec,vardd);
		utils.vgk.appVardd.items.push(vardd);
	}

	updatePlantas();
	utils.vgk.appModal.show = false;
}

function crearVardd(){
	var num = utils.vgk.plantas.nodos.length;
	var edit_t = (utils.vgk.appModoPlantas.modo == 'HORTA')? 'VARH':'VARF';
	if (edit_t == 'HORTA') var vardd = new agro.VarHorta('Variedad '+num);
	else if (edit_t == 'FRUTA') var vardd = new VarFruta('Variedad '+num);
	crearItem(edit_t,vardd,grabaVardd); // agro_vApps.js
}

function editaVardd(id0){
	var vardd = utils.vgk.plantas.getNodoById(id0);
	var edit_t = (utils.vgk.appModoPlantas.modo == 'HORTA')? 'VARH':'VARF';
	vapps.editaItem(edit_t,vardd,grabaVardd,borraVardd);
}
function showVardd(id0){
		utils.vgk.appEspec.idAct = id0;
		var espec = utils.vgk.plantas.getNodoById(id0);
		utils.vgk.appH3Vardd.actualiza(espec.tag);
		var vardds = [];
		espec.hijos.map(function(idH){
			var vardd = utils.vgk.plantas.getNodoById(idH);
			vardds.push(vardd);
		})
		utils.vgk.appVardd.actualiza(vardds);

}

//------------------------------------------------------------------- EspHs
function borraEspec(){
	var espec = utils.vgk.appModal.item;
	utils.vgk.plantas.borraNodo(espec);
	utils.vgk.appModal.showModal = false;
	var raspa = utils.vgk.plantas.getRaspa();
	utils.vgk.appListaGrupo.actualiza(raspa);
	updatePlantas();

}
function grabaEspec(){
	var idGrupo = utils.vgk.appListaGrupo.idAct;
	var grupo = utils.vgk.plantas.getNodoById(idGrupo);
	var espec = utils.vgk.appModal.item;
	console.log(utils.o2s(espec));
	if (utils.vgk.appModal.editON) utils.vgk.plantas.updtNodoSelf(espec);
	else utils.vgk.plantas.addNodoHijo(grupo,espec);
	var raspa = utils.vgk.plantas.getRaspa();
	utils.vgk.appListaGrupo.actualiza(raspa);
	updatePlantas();
	utils.vgk.appModal.show = false;
}

function crearEspec(){
	var num = utils.vgk.plantas.nodos.length;
	var edit_t = (utils.vgk.appModoPlantas.modo == 'HORTA')? 'ESPH':'ESPF';

	if (edit_t == 'HORTA') var espec = new EspHorta('Espec '+num);
	else if (edit_t == 'FRUTA')  var espec = new EspFruta('Espec '+num);
	else return;

	crearItem(edit_t,espec,grabaEspec); // agro_vApps.js
}

function editEspec(id0){
	var espec = utils.vgk.plantas.getNodoById(id0);
	var edit_t = (utils.vgk.appModoPlantas.modo == 'HORTA')? 'ESPH':'ESPF';
	vapps.editaItem(edit_t,espec,grabaEspec,borraEspec);
}

function showEspec(){
	var especs = [];
	var id0 = utils.vgk.appListaGrupo.idAct;
	var grupo = utils.vgk.plantas.getNodoById(id0);
	var hijos = grupo.hijos;
	hijos.map(function(idH){
		var espec = utils.vgk.plantas.getNodoById(idH);
		especs.push(espec);
	})
	utils.vgk.appEspec.actualiza(especs);
	utils.vgk.appH3Espec.actualiza(grupo.tag);
}

//------------------------------------------------------------------- Grupos Horta

function creaVarddHorta(seed){
	console.log('Seed VH: '+ utils.o2s(seed));
	var varH = new agro.VarHorta(seed.tag);
	varH.obj.codVard = seed.cod;
	varH.obj.genero = seed.gen;
	varH.obj.especie = seed.esp;
	varH.obj.dPlts = seed.mdp;
	varH.obj.dLins = seed.mdf;
	varH.obj.rendm = seed.rdm;
	varH.obj.img = 'img/horta/Viv1/'+seed.img;
	return varH;
}

function creaVarddFruta(seed){
	console.log('Seed VF: '+ utils.o2s(seed));
	var varF = new VarFruta(seed.tag);
	varF.obj.codVar = seed.cod;
	varF.obj.genero = seed.gen;
	varF.obj.especie = seed.esp;
	varF.obj.marco.ePlts = seed.mdp;
	varF.obj.marco.eLins = seed.mdf;
	varF.obj.rendm = seed.rdm;
	varF.obj.img = 'img/fruta/Viv1/'+seed.img;
	return varF;
}

function addVardd2Espec(espec){
	console.log('Espec: '+ utils.o2s(espec));
	utils.vgk.filasAgro.map(function(seed){

		if (seed.cod.substr(0,3) == espec.obj.codEspec && seed.cod.length > 3){

			if (utils.vgk.appModoPlantas.modo == 'HORTA') var vardd = creaVarddHorta(seed);
			else var vardd = creaVarddFruta(seed);

			utils.vgk.plantas.addNodoHijo(espec,vardd);
		}
	})
}

function creaEspecHorta(seed){
	var espH = new agro.EspHorta(seed.tag);
	espH.obj.codEspec = seed.cod;
	espH.obj.genero = seed.gen;
	espH.obj.especie = seed.esp;
	espH.obj.img = 'img/horta/Viv1/'+seed.img;
	return espH;
}

function creaEspecFruta(seed){
	var espF = new EspFruta(seed.tag);
	espF.obj.codEspec = seed.cod;
	espF.obj.genero = seed.gen;
	espF.obj.especie = seed.esp;
	espF.obj.img = 'img/fruta/Viv1/'+seed.img;
	return espF;
}

function addEspec2Grupo(grupo){
	console.log('Seleccion: '+utils.o2s(utils.vgk.appModal.items));
	utils.vgk.appModal.lista.map(function(seed){
		if(utils.vgk.appModal.items.indexOf(seed.tag)!=-1){
			console.log('Crea '+seed.tag);
			if (utils.vgk.appModoPlantas.modo == 'HORTA') var espec = creaEspecHorta(seed);
			else var espec = creaEspecFruta(seed);

			utils.vgk.plantas.addNodoHijo(grupo,espec);
			addVardd2Espec(espec);
		}
	})
}


function grabaGrupo(){
	var raiz = utils.vgk.plantas.getRaiz();
	var grupo = utils.vgk.appModal.item;
	if (utils.vgk.appModal.editON){ 
		utils.vgk.plantas.updtNodoSelf(grupo);
		updatePlantas();
	}
	else{ 
		utils.vgk.plantas.addNodoHijo(raiz,grupo);
		if (utils.vgk.appModal.items.length) addEspec2Grupo(grupo);
		var raspa = utils.vgk.plantas.getRaspa();
		utils.vgk.appListaGrupo.actualiza(raspa);
		utils.vgk.appModal.showModal = false;
		updatePlantas();
	}
	utils.vgk.appModal.show = false;
}

function borraGrupo(){
	utils.vgk.appModal.showModal = false;
	var grupo = utils.vgk.appModal.item;

	var ok = confirm('Quiere borrar el grupo '+grupo.tag+'?')
	if (!ok) return;

	utils.vgk.appModal.item = {};
	if (grupo.obj.tasks_id){
		borraTasks(grupo.obj.tasks_id);
	}
	utils.vgk.plantas.borraNodo(grupo);
	var raspa = utils.vgk.plantas.getRaspa();
	utils.vgk.appListaGrupo.actualiza(raspa);
	updatePlantas();
}

//------------------------------------------------------------------- INI Repositorio
function ecoGetRepoAgro(xhr){
	utils.vgk.appModal.seedLst = [];
	utils.vgk.filasAgro = utils.csv2filas(xhr.responseText);
	utils.vgk.filasAgro.map(function(fila){
		if (fila.cod.length == 3) utils.vgk.appModal.lista.push(fila);
	})

	var modo = utils.vgk.appModoPlantas.modo;
	if (modo == 'HORTA'){
		var grupo = new agro.GrpHorta('Nuevo grupo');
		vapps.crearItem('HORTA0',grupo,grabaGrupo); // agro_vApps.js
	}
	else {
		var grupo = new GrpFruta('Nuevo grupo');
		vapps.crearItem('FRUTA0',grupo,grabaGrupo); // agro_vApps.js
	}
}

function getRepoAgro(modo){
	var stmt = "select * from agro where tipo='"+modo+"' order by tag;";
	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //local.vgApp.encript.sessId,
		path : local.vgApp.sqlite.pathDB,
		db   : 'repoAlfaAgro.sqlite',
		stmt : stmtB64
	}
	var params = local.vgApp.paramsXHR;
	params.base = local.vgApp.sqlite.base;
	params.eco = ecoGetRepoAgro; 

	ajax.ajaxCmdShell(params,body);
}
//------------------------------------------------------------------- FIN Repositorio
function crearGrupo(){
	var modo = utils.vgk.appModoPlantas.modo;
	getRepoAgro(modo)
}

function editaGrupo(id0){
	var grupo = utils.vgk.plantas.getNodoById(id0);
	if (!grupo.obj.tasks_id) vapps.editaItem('HORTA1',grupo,grabaGrupo,borraGrupo);
	else vapps.editaItem('HORTA2',grupo,grabaGrupo,borraGrupo);
}
//------------------------------------------------------------------- Arbol Horta


function ecoupdatePlantas(xhr){
	console.log('Horta grabada');
}
function updatePlantas(){
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoupdatePlantas; 
	params.iam = 'Horta';
	params.txt = utils.o2s(utils.vgk.plantas.clase2ObjDB());
	params.topolId = utils.vgk.plantas_id;
	ajax.ajaxPutTopol(params);
	return false;
}



function ecoNuevoHorta(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.plantas_id = utils.vgk.loTopol._id;
	utils.vgk.plantas = new agro.Horta("",[]);
	utils.vgk.plantas.objDB2Clase(utils.vgk.loTopol);
}

function creaNuevoHorta(){
	var raiz = new topol.rNodo('Hortalizas');
	raiz.rol = 'RAIZ';
	var horta = new agro.Horta('Hortalizas',[raiz]);
	horta.meta.org = utils.vgk.user.org;
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoHorta; 
	params.iam = 'Horta';
	params.txt = utils.o2s(horta.clase2ObjDB());
	ajax.ajaxPostTopol(params);
}

function ecoCargaHorta(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.plantas_id = utils.vgk.loTopol._id;
	utils.vgk.plantas = new agro.Horta("",[]);
	utils.vgk.plantas.objDB2Clase(utils.vgk.loTopol);

	var raspa = utils.vgk.plantas.getRaspa();
	utils.vgk.appListaGrupo.actualiza(raspa);
}

function cargaHorta(_id){
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCargaHorta;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}

//------------------------------------------------------------------- Arbol Fruta


function ecoUpdateFruta(xhr){
	console.log('Fruta grabada');
}
function updateFruta(){
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateFruta; 
	params.iam = 'Fruta';
	params.txt = utils.o2s(utils.vgk.plantas.clase2ObjDB());
	params.topolId = utils.vgk.plantas_id;
	ajax.ajaxPutTopol(params);
	return false;
}



function ecoNuevoFruta(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.plantas_id = utils.vgk.loTopol._id;
	utils.vgk.plantas = new Fruta("",[]);
	utils.vgk.plantas.objDB2Clase(utils.vgk.loTopol);
}

function creaNuevoFruta(){
	alert('creaNuevoFruta');
	var raiz = new topol.rNodo('Frutales');
	raiz.rol = 'RAIZ';
	var fruta = new Fruta('Frutales',[raiz]);
	fruta.meta.org = utils.vgk.user.org;
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoFruta; 
	params.iam = 'Fruta';
	params.txt = utils.o2s(fruta.clase2ObjDB());
	ajax.ajaxPostTopol(params);
}

function ecoCargaFruta(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.plantas_id = utils.vgk.loTopol._id;
	utils.vgk.plantas = new Fruta("",[]);
	utils.vgk.plantas.objDB2Clase(utils.vgk.loTopol);

	var raspa = utils.vgk.plantas.getRaspa();
	utils.vgk.appListaGrupo.actualiza(raspa);
}

function cargaFruta(_id){
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCargaFruta;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

//------------------------------------------------------------------- Plantas [HORTA|FRUTA]
function ecoGetPlantas(xhr){
	var modo = utils.vgk.appModoPlantas.modo;
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		var org = obj.meta.org;
		var iam = obj.meta.iam;

		var ok0 = true && (org == utils.vgk.user.org);
		var ok1 = ok0 && (modo == 'HORTA' && iam == 'Horta');
		var ok2 = ok0 && (modo == 'FRUTA' && iam == 'Fruta');

		if (ok1 || ok2) items.push(obj);
	})
	if (!items.length){
		if (modo == 'HORTA') creaNuevoHorta();
		else creaNuevoFruta();
	}
	else{
		if (modo == 'HORTA') cargaHorta(items[0]._id);
		else cargaFruta(items[0]._id);		
	}
}

function ajaxGetPlantas() {
	var modo = utils.vgk.appModoPlantas.modo;
	var params = local.vgApp.paramsXHR;
//	params.base = '/metas/';
	params.base = '/metasByOrg/';
	params.eco = ecoGetPlantas;
	if (modo == 'HORTA') params.iam = 'Horta';
	else  params.iam = 'Fruta';
	params.org = utils.vgk.user.org;

//	ajaxGetMetas(params);
	ajax.ajaxGetMetasByOrg(params);
}


//------------------------------------------------------------------- Tasks semilla
function ecoBorraTasks(xhr){
	console.log('Tareas borradas');
}
function borraTasks(_id){
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraTasks; 
	params.iam = 'GrafoTasks';
	params.topolId = _id;
	ajaxDeleteTopol(params);

}

function ecoGrabaTasksSeed(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	var tasksId = utils.vgk.loTopol._id;
	var grupo = utils.vgk.appModal.item;
	grupo.obj.tasks_id = tasksId;
	utils.vgk.plantas.updtNodoSelf(grupo);
	updatePlantas();
	goTasksGrafo(tasksId);
}

// Se ejecuta tanto para crear un Tasks Seed, como para regenerarlo
// si hay TasksId, se hace PUT, y si no, POST
// en los dos casos, el eco invoka la página tasks_Grafo.html (por ahora, 25/9/2018)

function creaTasksSeed(tasksId){
	var nodos = [];
	var arcos = [];
			
	var nodo1 = new Task('Preparar');
	nodo1.dim = {x:100,y:140,w:120,h:60};
	nodos.push(nodo1);

	var nodo2 = new Task('Plantar');
	nodo2.dim = {x:320,y:140,w:120,h:60};
	nodos.push(nodo2);

	var nodo3 = new Task('Cosechar');
	nodo3.dim = {x:540,y:140,w:120,h:60};
	nodos.push(nodo3);


	var arco12 = new TaskLnk('Arco 12',nodo1,nodo2,0);
	arco12.obj.gap = 288* 3; // 3 dias
	arcos.push(arco12);
	
	var arco23 = new TaskLnk('Arco 23',nodo2,nodo3,0);
	arco23.obj.gap = 288 * 5; // 5 dias
	arcos.push(arco23);

	var todos = nodos.concat(arcos);

	var id0 = utils.vgk.appListaGrupo.idAct;
	var grupo = utils.vgk.plantas.getNodoById(id0);
	
	utils.vgk.grafoTasks = new GrafoTasks('Tasks_'+grupo.tag,todos);

	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGrabaTasksSeed; 
	params.iam = 'GrafoTasks';
	params.txt = utils.o2s(utils.vgk.grafoTasks.clase2ObjDB());
	console.log(params.txt);
	if (tasksId){
		params.topolId = tasksId;
		ajax.ajaxPutTopol(params);
	}
	else ajax.ajaxPostTopol(params);
	return false;


}


function editTasksSeed(){
	var grupo = utils.vgk.appModal.item;
	var tasksId = grupo.obj.tasks_id;
	if (!tasksId){
		var ok = confirm('No hay tareas. Crearlas?');
		if (ok) creaTasksSeed();
	}
	else goTasksGrafo(tasksId);
	utils.vgk.appModal.showModal = false;
}

function resetTasksSeed(){
	var grupo = utils.vgk.appModal.item;
	var tasksId = grupo.obj.tasks_id;
	if (!tasksId){
		var ok = confirm('No hay tareas. Crearlas?');
		if (ok) creaTasksSeed();
	}
	else {
		var ok = confirm('Regenerar tasks?');
		if (ok) creaTasksSeed(tasksId);
	}
	utils.vgk.appModal.showModal = false;
}

export default {initAppsPlantas,ajaxGetPlantas}