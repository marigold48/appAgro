import utils  from '/k1/libK1_Utils.js'
import ajax   from '/k1/libK1_Ajax.js'
import idioma from '/k1/libK1_Idioma.js'
import vapps  from '/k1/libK1_vApps.js'
import trazo  from '/k1/libK1_Trazo.js'

import local  from '/js/agro_VGlob.js'
import agro  from  '/js/agro_Clases.js'

import {Task,TaskLnk} from '/js/agro_Clases.js'

window.Task = Task;
window.TaskLnk = TaskLnk;

function borraTask(){
	var task = utils.vgk.appModal.item;
	utils.vgk.grafoTasks.borraNodo(task);
	updateTasksGrafo();
	utils.vgk.appModal.show = false;
	showTasks();
}

function grabaTask(){
	var task = utils.vgk.appModal.item;
	console.log('Grabar: ' + task.tag);
	utils.vgk.grafoTasks.updtNodoSelf(task);
	updateTasksGrafo();
	utils.vgk.appModal.show = false;
}

function editTask(id){
	var task = utils.vgk.grafoTasks.getNodoById(id);
	if (task.obj.fase == 'SEED') editaItem('TASK0',task,grabaTask,borraTask);
	else editaItem('TASK1',task,grabaTask,borraTask);
}

function grabaLink(){
	var link = utils.vgk.appModal.item;
	console.log('Grabar: ' +utils.o2s(link));
	utils.vgk.grafoTasks.updtArcoSelf(link);
	updateTasksGrafo();
	utils.vgk.appModal.show = false;
}

function borraLink(){
	var arco = utils.vgk.appModal.item;
	utils.vgk.grafoTasks.borraArco(arco);
	updateTasksGrafo();
	utils.vgk.appModal.show = false;
	showTasks();
}

function editLink(link){
	console.log('Link: '+ utils.o2s(link));
	editaItem('LINK',link,grabaLink,borraLink);
}

function showTasks(){
	utils.vgk.trazo.clearDivsNodo();
	utils.vgk.trazo.showNodosGrafo(utils.vgk.grafoTasks.nodos);
	
	var dims = utils.vgk.grafoTasks.getDimsArcos();
	utils.vgk.trazo.canvas.reset();
	utils.vgk.trazo.canvas.pintaArcos(dims);

}

function initMover(){
	utils.vgk.trazo = new trazo.rTrazo('divBase');
	utils.vgk.trazo.fnDrop = onDrop;
	utils.vgk.trazo.fnKeyBase = onKeyBase;
	utils.vgk.trazo.fnKeyDivI = onKeyDivI;
	utils.vgk.trazo.fnKeyDivF = onKeyDivF;
	utils.vgk.trazo.grid = 10;
	utils.vgk.trazo.activaCanvas();
	showTasks();
}



//------------------------------------------------------------------- TasksGrafos
function ecoUpdateTasksGrafo(xhr){
	console.log('Eco Updt TasksGrafo: ');
}
function updateTasksGrafo(){
	if (utils.vgk.grafoTasks.meta.org != utils.vgk.user.org){
//		alert('TasksGrafo sin ORG:' + utils.vgk.grafoTasks.meta.org +':'+ utils.vgk.user.org);
		utils.vgk.grafoTasks.meta.org = utils.vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateTasksGrafo;
	params.txt = utils.o2s(utils.vgk.grafoTasks.clase2ObjDB());
	params.topolId = utils.vgk.grafoTasks_id;
	ajax.ajaxPutTopol(params);
	return false;
}

function ecoGet1TasksGrafo(xhr){
	utils.vgk.loTopol = JSON.parse(xhr.responseText);
	utils.vgk.grafoTasks_id = utils.vgk.loTopol._id;
	utils.vgk.grafoTasks = new agro.GrafoTasks("",[]);
	utils.vgk.grafoTasks.objDB2Clase(utils.vgk.loTopol);
	initMover();
}

function get1TasksGrafo(_id){
	utils.vgk.grafoTasks_id = _id;
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1TasksGrafo;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}


//===================================================================
//------------------------------------------------------------------- Teclas
function onKeyBase(cod,pntX,pntY){
	if (cod == 'CTRL'){
		var tag = prompt('Tag?','Nuevo');
		if (!tag) return false;

		var nodo = new agro.Task(tag);
		console.log(utils.vgk.tecla);
		nodo.dim = {x:pntX,y:pntY,w:120,h:60};
		console.log('Antes: '+ utils.o2s(utils.vgk.grafoTasks.index))
		utils.vgk.grafoTasks.addNodo(nodo);
		console.log('Luego: '+ utils.o2s(utils.vgk.grafoTasks.index))
		utils.vgk.trazo.addDivNodo(nodo);
		utils.vgk.tecla = null;
	}
}

function onKeyDivI(cod,id){
	if (cod == 'CTRL'){
		console.log(cod+':'+id);
		utils.vgk.arcoId0 = id;
	}
}

function ctrlKeyON(id){
	if (utils.vgk.arcoId0 == id){
		console.log('Arco sobre mismo Nodo');
		return false;}
	else {
		var nodoI = utils.vgk.grafoTasks.getNodoById(utils.vgk.arcoId0);
		var nodoF = utils.vgk.grafoTasks.getNodoById(id);
//		console.log('nodoI: ' + utils.o2s(nodoI))
//		console.log('nodoF: ' + utils.o2s(nodoF))
		var link = new TaskLnk('x',nodoI,nodoF,0);
		var yaEsta = utils.vgk.grafoTasks.existArco(link);
		if (yaEsta){
			link = utils.vgk.grafoTasks.getArcoById(link.id0);
			editLink(link);}
		else {
			utils.vgk.grafoTasks.addArco(link)};
			updateTasksGrafo();
		}
	showTasks();
}


function shiftKeyON(id){
	editTask(id);
}

function onKeyDivF(cod,id){
//	console.log('onKeyDivF: '+cod);
	if (cod == 'CTRL')	ctrlKeyON(id);
	else if (cod == 'SHIFT') shiftKeyON(id);
}

function onDrop(div){
//	console.log('Drop: '+ div.id)
// Actualiza posición del nodo en el grafo
	var divX = parseInt(div.style.left.replace('px',''));
	var divY = parseInt(div.style.top.replace('px',''));
	
	var nodo = utils.vgk.grafoTasks.getNodoById(parseInt(div.id));
	nodo.dim.x = divX;
	nodo.dim.y = divY;

	var dims = utils.vgk.grafoTasks.getDimsArcos();
	utils.vgk.trazo.canvas.reset();
	utils.vgk.trazo.canvas.pintaArcos(dims);

	var task = utils.vgk.grafoTasks.getNodoById(div.id);

}


//------------------------------------------------------------------- Init
function sesionTareasOK(sesion){
	ajaxGetClasesPag();

	var _id = utils.vgk.params._id;
	get1TasksGrafo(_id); // pkg_tasksGrafo.js
}

function initTasksGrafo(){
	initAppsGlobal();
	validaSesion('usrMenu',sesionTareasOK); // libK1_sesion.js
}

export default {get1TasksGrafo,initTasksGrafo}