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
		console.log('nodoI: ' + o2s(nodoI))
		console.log('nodoF: ' + o2s(nodoF))
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
