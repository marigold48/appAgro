import utils  from '/k1/libK1_Utils.js'
import ajax   from '/k1/libK1_Ajax.js'
import vapps  from '/k1/libK1_vApps.js'

import agro  from  '/js/agro_Clases.js'
import plant  from '/js/plantasSrc.js'
import suelo  from '/js/sueloSrc.js'


function initAppsSuelo4Cult(){
	if (utils.r$('lstFincas')){
		utils.vgk.appListaFincas = new Vue({
			el: '#lstFincas',
			data: {
				items: [],
				idAct : 0,
			},
			methods :{
				getUnaFinca: function(_id){ getUnaFinca(_id);},
				actualiza : function(items){
					this.items = items;
					if (items.length) this.idAct = items[0]._id;
				},
			}
		}) 
	}
	
	if(utils.r$('lstZonas')){
		utils.vgk.appListaZonas = new Vue({
			el: '#lstZonas',
			data: {
				items: [],
				idAct : 0
			},
			methods : {
				actualiza : function(items){
					this.items = items;
					if (items.length){ this.idAct = items[0].id0;
					suelo.renderBancales(items[0].id0);
					}
				},
				cargaZona: function(_id,id0){ cargaFincaZona(_id,id0);},
				showHijos: function(id0){suelo.renderBancales(id0);}
			}
			}) 
	}	

	if(utils.r$('divBancales')){
		utils.vgk.appBancales = new Vue({
			el: '#divBancales',
			data : {
				items : [],
				idAct : 0,
			},
			methods :{
				limpia : function(){
					this.bancales = [];
					utils.vgk.appRooms.limpia();
				},
				actualiza : function(items){
					this.items = items;
				},
				editBancal: function(id0){
					alert(id0);
					var bancal = utils.vgk.finca.getNodoById(id0);
					utils.vgk.appEdit.bancal = bancal;
					utils.vgk.appEdit.edit_t = 'BANCAL';
					utils.vgk.appEdit.showModal = true;
					utils.vgk.appEdit.editON = true;
				},
				plantaBancal : function(id0){
					if (!utils.vgk.escenario_id){alert('No hay escenario');return;}
					plantaBancal(id0); // en pkg_Cultivos.js
				},
				goApoyos : function(_id){
					goApoyos(_id);
				}
			}
		})
	}	
}

//=================================================================== CULTIVOS

function initAppEscenarios(){

	if (utils.r$('modoCultivo')){
		utils.vgk.appModoCultivo = new Vue({
			el: '#modoCultivo',
			data: { 
				modo: 'HORTA'
			},
			methods : {
				toggle : function(modo){
					this.modo = modo;
					getPlantas4Cult(modo);
				}
			}
		})
	}

	if(utils.r$('divEscenarios')){
		utils.vgk.appEscenarios = new Vue({
			el: '#divEscenarios',
			data : {
				tagEscenario :'Ninguno',
				bancal :'', 
				vardd : '',
				actual : '',
				items : [],
				idAct : 0,
			},
			methods :{
				nuevoEscenario : function(){nuevoEscenario();},
				borraEscenario : function(){borraEscenario();},
				limpia : function(){
					this.bancal = {};
					this.items = [];
				},
				reset : function(){
					this.bancal = {};
				},
				actualiza : function(escenario){
					this.limpia();
					this.tagEscenario = escenario.meta.tag;
					this.items = escenario.getCultivos();
				},
				editCultivo: function(cult){
					editCultivo(cult);
				},
			}
		})

	}	
		utils.vgk.appEscenarios.limpia();
}


// pkg_Cultivos.js
function editTasksCult2(){
	var cult = utils.vgk.appModal.item;
	goTasksGrafo(cult.obj.tasks_id);
}

function getPlantas4Cult(modo){
	ajaxGetPlantas(modo);
}

//------------------------------------------------------------------- Tasks Cultivos
function ecoUpdateTasksCult(xhr){
	console.log('Grafo Tasks cultivo actualizado');
}

function ecoDuplicaTasks(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.grafoTasks = new agro.GrafoTasks('x',[]);
	utils.vgk.grafoTasks.objDB2Clase(loTopol);
	utils.vgk.grafoTasks.cambiaIds();

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateTasksCult; 
	params.txt = utils.o2s(utils.vgk.grafoTasks.clase2ObjDB());
	params.topolId = loTopol._id;
	ajax.ajaxPutTopol(params);

	var cult = utils.vgk.appModal.item;
	cult.obj.tasks_id = loTopol._id;
	updateEscenario();
}


function duplicaTasksIds(tasks_id){
	console.log('Tasks 1: '+tasks_id)
	var params = vgApp.paramsXHR;
	params.base = '/clone/';
	params.eco = ecoDuplicaTasks;
	params.topolId = tasks_id;

	ajax.ajaxDuplicaTopol(params);
	return false;
}


function editTasksCult(){
	var cult = utils.vgk.appModal.item;

	var tasksId = cult.obj.tasks_id;
	if (!tasksId){
		var ok = confirm('No hay tareas. Crearlas?');
		if (ok) creaTasksCult();
	}
	else goPag('TASKSG',tasksId);
	utils.vgk.appModal.show = false;
}

function editApoyos(){
	var cult = utils.vgk.appModal.item;

	var esq_id = cult.obj.esqma_id;
	if (!esq_id){
		var ok = confirm('No hay Esquema. Crearlo?');
		if (ok) creaApoyos();
	}
	else goApoyos(esq_id);
	utils.vgk.appModal.show = false;
}

//------------------------------------------------------------------- Cultivos

function editCultivo(cult){
	vapps.editaItem('CULTIVO',cult,grabaCultivo,borraCultivo);
}

function borraCultivo(cult){
	utils.vgk.escenario.borraCultivo(cult);
	updateEscenario();
}


// OJO ! asegurarse que no se duplican los nodos de bancal ni variedad
function addCultivo(cultivo){
	var vardd = utils.vgk.appEscenarios.vardd;
	var espec = utils.vgk.plantas.getNodoById(vardd.id1);
	var grupo = utils.vgk.plantas.getNodoById(espec.id1);
	var tasksGrp = grupo.obj.tasks_id;

	var vardd = utils.vgk.appEscenarios.vardd.getNodoRow();
//	console.log('addCultivo: '+utils.o2s(vardd));
	var bancal = utils.vgk.appEscenarios.bancal.getNodoCol();
//	console.log('addCultivo: '+utils.o2s(bancal));


	utils.vgk.escenario.addNodoCol(bancal);
	utils.vgk.escenario.addNodoRow(vardd);
	utils.vgk.escenario.addNudo(cultivo);

	var nodos = utils.vgk.escenario.nodos;
	nodos.map(function(nodo){
//		console.log(utils.o2s(nodo));
	})

	utils.vgk.appEscenarios.actualiza(utils.vgk.escenario);

	if (tasksGrp) duplicaTasksIds(tasksGrp);
	else updateEscenario();
}

function updateCultivo(cultivo){
	utils.vgk.escenario.updtNodoSelf(cultivo);
	updateEscenario();
}

function grabaCultivo(){
	var cultivo = utils.vgk.appModal.item;
//	utils.vgk.appEscenarios.reset();
	utils.vgk.appModal.show = false;
	if (utils.vgk.appModal.editON) updateCultivo(cultivo);
	else { 
		addCultivo(cultivo);
		if (cultivo.obj.tipo == 'FRUTA'){
			var ok = prompt('Crear esquema ?');
			if (ok){
				
			}
		}

	};
}


function ecoGet1Apoyos4Cult(xhr){
		var loTopol = JSON.parse(xhr.responseText);
		utils.vgk.apoyos_id =  loTopol._id;
		utils.vgk.apoyos = new Apoyos("",[]);
		utils.vgk.apoyos.objDB2Clase(utils.vgk.loTopol);
}

function get1Apoyos4Cult(_id){
	utils.vgk.apoyos_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Apoyos4Cult;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}

function plantaBancal(id0){
	var bancal = utils.vgk.finca.getNodoById(id0);

	if (!bancal.obj.area){
		alert('Bancal con area 0 !!'); return;
	}
	var modo = utils.vgk.appModoPlantas.modo;
	console.log('modo: '+modo)
	if (modo =='FRUTA' && ! bancal.obj.apoyos_id) {
		alert('Bancal sin apoyos !!'); return;
	}
	utils.vgk.appEscenarios.bancal = bancal;
//	get1Apoyos4Cult(bancal.obj.apoyos_id);
}

function crearCultivo(){
	if (!utils.vgk.escenario_id){alert('No hay escenario'); return;}
	else if (!utils.vgk.appEscenarios.bancal){alert('No hay bancal'); return;}


	var bancal = utils.vgk.appEscenarios.bancal;
	console.log('crearCultivo: '+bancal.tag);
	var vardd = utils.vgk.appEscenarios.vardd;
	console.log('crearCultivo: '+vardd.tag);
	var tagNudo = bancal.obj.codBancal+':'+vardd.obj.codVard;
 	var modo = utils.vgk.appModoPlantas.modo;
	if ( modo == 'HORTA')
		var cult = new agro.CultHorta (tagNudo,vardd,bancal);
	else{
		var raiz = utils.vgk.apoyos.getRaiz();
		console.log(utils.o2s(raiz));
		var cult = new agro.CultFruta (tagNudo,vardd,bancal);
	}
	console.log('crearCultivo: ' + utils.o2s(cult));

	vapps.crearItem('CULTIVO',cult,grabaCultivo);
}
//------------------------------------------------------------------- Nuevo Escenario

function ecoUpdateEscenario(xhr){
	console.log('Escenario actualizado');
	console.log(JSON.parse(xhr.responseText)._id);
}
function updateEscenario(){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateEscenario; 
	params.txt = utils.o2s(utils.vgk.escenario.clase2ObjDB());
	params.topolId = utils.vgk.escenario_id;
	ajax.ajaxPutTopol(params);

}

function ecoNuevoEscenario(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.escenario_id = utils.vgk.loTopol._id;
	utils.vgk.appEscenarios.actualiza(utils.vgk.escenario);
}

function nuevoEscenario(){
	var nom = prompt('Nombre?');
	if (!nom) return;
	var raiz = new agro.RaizEsc(nom);
	var modo = utils.vgk.appModoPlantas.modo;
	if (modo == 'HORTA') utils.vgk.escenario = new agro.EscHorta(nom,[raiz]);
	else if (modo == 'FRUTA') utils.vgk.escenario = new agro.EscFruta(nom,[raiz]);
	else {
		console.log('Modo Plantas no definido');
		return;
	}
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoEscenario; 
	params.iam = 'Escenario';
	params.txt = utils.o2s(utils.vgk.escenario.clase2ObjDB());
	ajax.ajaxPostTopol(params);
}


//------------------------------------------------------------------- Borra Escenario
function ecoBorraEscenario(xhr){
	utils.vgk.appEscenarios.limpia();
	utils.vgk.escenario_id = null;

	console.log('Escenario borrado');
	if (utils.vgk.escenario.meta.iam == 'AgroJar') ajaxGetAgroJars();
	else ajaxGetEscenarios();
}
function borraEscenario(){
	var iam = utils.vgk.escenario.meta.iam;
	if (iam == 'AgroJar') var msg = 'Borrar la temporada ';
	else var msg = 'Borrar la temporada ';
	if (!utils.vgk.escenario_id){alert('No hay escenario activo'); return false;}
	else {
		var ok = confirm(msg+utils.vgk.escenario.meta.tag+'?');
		if (!ok) return;
	}
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraEscenario;
	params.topolId = utils.vgk.escenario_id;

	ajax.ajaxDeleteTopol(params);
	utils.vgk.appModal.show = false;
	return false;
}

//-------------------------------------------------------------------

function ecoGet1Escenario(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.escenario_id = loTopol._id;

	switch(loTopol.meta.iam){
		case 'AgroJar': utils.vgk.escenario = new agro.AgroJar("",[]); break;
		case 'EscHorta': utils.vgk.escenario = new agro.EscHorta("",[]); break;
		case 'EscFruta': utils.vgk.escenario = new agro.EscFruta("",[]); break;
	}
	utils.vgk.escenario.objDB2Clase(loTopol);
	var nodos = utils.vgk.escenario.nodos;

	utils.vgk.appEscenarios.actualiza(utils.vgk.escenario);
}

function get1Escenario(_id){
	utils.vgk.escenario_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Escenario;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);
	utils.vgk.appModal.show = false;
	return false;
}

function cargaEscenario(){
	get1Escenario(utils.vgk.appModal.idAct);
}

//------------------------------------------------------------------- Crear Lista de Escenarios
function ecoGetEscenarios(xhr){
	var objs = JSON.parse(xhr.responseText);
	utils.vgk.listaEscenarios = objs;
}

function ajaxGetEscenarios() {
	var modo = utils.vgk.appModoPlantas.modo;
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetEscenarios;
	if (modo == 'HORTA') params.iam = 'EscHorta';
	else  params.iam = 'EscFruta';
	params.org = utils.vgk.user.org;

	ajax.ajaxGetMetasByOrg(params);
 }

function showListaEscenarios(){
	utils.vgk.appModal.items = utils.vgk.listaEscenarios;
	if (utils.vgk.listaEscenarios.length) utils.vgk.appModal.idAct = utils.vgk.listaEscenarios[0]._id;
	utils.vgk.appModal.conds = {retol : 'Lista Escenarios'};
	utils.vgk.appModal.modo = 'modal-container';
	utils.vgk.appModal.edit_t = 'LISTA';
	utils.vgk.appModal.show = true;
}

//------------------------------------------------------------------- Crear Lista de AgroJars
function ecoGet1Esc4Add(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	var agrojar = new AgroJar('x',[]);
	agrojar.objDB2Clase(loTopol);

	var rows = utils.vgk.escenario.getNodosRows();
	rows.map(function(row){
		console.log('row4add: '+utils.o2s(row));
		agrojar.addNodoRow(row);
	})

	var cols = utils.vgk.escenario.getNodosCols();
	cols.map(function(col){
		console.log('col4add: '+utils.o2s(col));
		agrojar.addNodoCol(col);
	})

	var nudos = utils.vgk.escenario.getNudos();
	nudos.map(function(nudo){
		console.log('nudo4add: '+utils.o2s(nudo));
		agrojar.addNudo(nudo);
	})

	utils.vgk.escenario_id = loTopol._id;
	utils.vgk.escenario = agrojar;
	utils.vgk.appEscenarios.actualiza(utils.vgk.escenario);
	updateEscenario();
}

function addEsc2AgroJar(){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Esc4Add;
	params.topolId = utils.vgk.appModal.idAct;

	ajax.ajaxGet1Topol(params);
	utils.vgk.appModal.show = false;
	return false;

}

function ecoNuevoAgroJar(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.escenario_id = loTopol._id;
	ajaxGetAgroJars();
}
function nuevoAgroJar(){
	utils.vgk.appModal.show = false;
	var jar = prompt('Temporada? ');
	if (!jar) return;
	var raiz = new RaizEsc('Temp '+jar);
	var agrojar = new AgroJar('Temporada '+jar,[raiz]);

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoAgroJar; 
	params.txt = utils.o2s(agrojar.clase2ObjDB());
	utils.vgk.escenario = agrojar;
	utils.vgk.appEscenarios.actualiza(agrojar);
	ajax.ajaxPostTopol(params);

}

function ecoGetAgroJars(xhr){
	var objs = JSON.parse(xhr.responseText);
	utils.vgk.listaAgroJars = objs;
}

function ajaxGetAgroJars() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetAgroJars;
	params.iam = 'AgroJar';
	params.org = utils.vgk.user.org;

	ajax.ajaxGetMetasByOrg(params);
 }

function showListaAgroJars(){
	utils.vgk.appModal.items = utils.vgk.listaAgroJars;
	if (utils.vgk.listaAgroJars.length) utils.vgk.appModal.idAct = utils.vgk.listaAgroJars[0]._id;
	utils.vgk.appModal.conds = {retol : 'Lista Temporadas'};
	utils.vgk.appModal.modo = 'modal-container';
	utils.vgk.appModal.edit_t = 'LISTA_AJ';
	utils.vgk.appModal.show = true;
}



//------------------------------------------------------------------- userMenu/vueApp cascade
function actualizaVueAppsZonas(){
	var zonas = utils.vgk.finca.getRaspa();
	utils.vgk.appH3Zona.actualiza(utils.vgk.loTopol.meta.tag);
	utils.vgk.appZona.actualiza(zonas);
}

function actualizaVueAppsPlantas(){
	if (utils.vgk.user.rol == 'ADMIN'){
		utils.vgk.appPlantas.actualiza(utils.vgk.grupo.getRaspa());
		utils.vgk.appH3Plantas.actualiza(utils.vgk.grupo.meta.tag);
	}
	else alert('No es Admin');
}

export default {
	initAppsSuelo4Cult,initAppEscenarios,
	ajaxGetEscenarios,ajaxGetAgroJars,
	crearCultivo,
	showListaEscenarios,cargaEscenario,
	editTasksCult
}