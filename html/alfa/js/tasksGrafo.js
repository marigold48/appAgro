function borraTask(){
	var task = vgk.appModal.item;
	vgk.grafoTasks.borraNodo(task);
	updateTasksGrafo();
	vgk.appModal.show = false;
	showTasks();
}

function grabaTask(){
	var task = vgk.appModal.item;
	console.log('Grabar: ' + task.tag);
	vgk.grafoTasks.updtNodoSelf(task);
	updateTasksGrafo();
	vgk.appModal.show = false;
}

function editTask(id){
	var task = vgk.grafoTasks.getNodoById(id);
	if (task.obj.fase == 'SEED') editaItem('TASK0',task,grabaTask,borraTask);
	else editaItem('TASK1',task,grabaTask,borraTask);
}

function grabaLink(){
	var link = vgk.appModal.item;
	console.log('Grabar: ' +o2s(link));
	vgk.grafoTasks.updtArcoSelf(link);
	updateTasksGrafo();
	vgk.appModal.show = false;
}

function borraLink(){
	var arco = vgk.appModal.item;
	vgk.grafoTasks.borraArco(arco);
	updateTasksGrafo();
	vgk.appModal.show = false;
	showTasks();
}

function editLink(link){
	console.log('Link: '+ o2s(link));
	editaItem('LINK',link,grabaLink,borraLink);
}

function showTasks(){
	vgk.trazo.clearDivsNodo();
	vgk.trazo.showNodosGrafo(vgk.grafoTasks.nodos);
	
	var dims = vgk.grafoTasks.getDimsArcos();
	vgk.trazo.canvas.reset();
	vgk.trazo.canvas.pintaArcos(dims);

}

function initMover(){
	vgk.trazo = new rTrazo('divBase');
	vgk.trazo.fnDrop = onDrop;
	vgk.trazo.fnKeyBase = onKeyBase;
	vgk.trazo.fnKeyDivI = onKeyDivI;
	vgk.trazo.fnKeyDivF = onKeyDivF;
	vgk.trazo.grid = 10;
	vgk.trazo.activaCanvas();
	showTasks();
}



//------------------------------------------------------------------- TasksGrafos
function ecoUpdateTasksGrafo(xhr){
	console.log('Eco Updt TasksGrafo: ');
}
function updateTasksGrafo(){
	if (vgk.grafoTasks.meta.org != vgk.user.org){
//		alert('TasksGrafo sin ORG:' + vgk.grafoTasks.meta.org +':'+ vgk.user.org);
		vgk.grafoTasks.meta.org = vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateTasksGrafo;
	params.txt = o2s(vgk.grafoTasks.clase2ObjDB());
	params.topolId = vgk.grafoTasks_id;
	ajaxPutTopol(params);
	return false;
}

function ecoGet1TasksGrafo(xhr){
	vgk.loTopol = JSON.parse(xhr.responseText);
	vgk.grafoTasks_id = vgk.loTopol._id;
	vgk.grafoTasks = new GrafoTasks("",[]);
	vgk.grafoTasks.objDB2Clase(vgk.loTopol);
	initMover();
}

function get1TasksGrafo(_id){
	vgk.grafoTasks_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1TasksGrafo;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}


//===================================================================
//------------------------------------------------------------------- Teclas
function onKeyBase(cod,pntX,pntY){
	if (cod == 'CTRL'){
		var tag = prompt('Tag?','Nuevo');
		if (!tag) return false;

		var nodo = new Task(tag);
		console.log(vgk.tecla);
		nodo.dim = {x:pntX,y:pntY,w:120,h:60};
		console.log('Antes: '+ o2s(vgk.grafoTasks.index))
		vgk.grafoTasks.addNodo(nodo);
		console.log('Luego: '+ o2s(vgk.grafoTasks.index))
		vgk.trazo.addDivNodo(nodo);
		vgk.tecla = null;
	}
}

function onKeyDivI(cod,id){
	if (cod == 'CTRL'){
		console.log(cod+':'+id);
		vgk.arcoId0 = id;
	}
}

function ctrlKeyON(id){
	if (vgk.arcoId0 == id){
		console.log('Arco sobre mismo Nodo');
		return false;}
	else {
		var nodoI = vgk.grafoTasks.getNodoById(vgk.arcoId0);
		var nodoF = vgk.grafoTasks.getNodoById(id);
//		console.log('nodoI: ' + o2s(nodoI))
//		console.log('nodoF: ' + o2s(nodoF))
		var link = new TaskLnk('x',nodoI,nodoF,0);
		var yaEsta = vgk.grafoTasks.existArco(link);
		if (yaEsta){
			link = vgk.grafoTasks.getArcoById(link.id0);
			editLink(link);}
		else {
			vgk.grafoTasks.addArco(link)};
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
	
	var nodo = vgk.grafoTasks.getNodoById(parseInt(div.id));
	nodo.dim.x = divX;
	nodo.dim.y = divY;

	var dims = vgk.grafoTasks.getDimsArcos();
	vgk.trazo.canvas.reset();
	vgk.trazo.canvas.pintaArcos(dims);

	var task = vgk.grafoTasks.getNodoById(div.id);

}


//------------------------------------------------------------------- Init
function sesionTareasOK(sesion){
	ajaxGetClasesPag();

	var _id = vgk.params._id;
	get1TasksGrafo(_id); // pkg_tasksGrafo.js
}

function initTasksGrafo(){
	initAppsGlobal();
	validaSesion('usrMenu',sesionTareasOK); // libK1_sesion.js
}
