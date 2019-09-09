
//------------------------------------------------------------------- Teclas
function onKeyBase(cod,pntX,pntY){
	if (cod == 'CTRL'){
		var tag = prompt('Tag?','Nuevo');
		if (!tag) return false;

		var nodo = new Task(tag);
		console.log(vgk.tecla);
		nodo.dim = {x:pntX,y:pntY,w:120,h:60};
		console.log('Antes: '+ o2s(vgk.ganttTasks.index))
		vgk.ganttTasks.addNodo(nodo);
		console.log('Luego: '+ o2s(vgk.ganttTasks.index))
		vgk.trazo.addDivNodo(nodo);
		vgk.tecla = null;
	}
}

function onKeyDivI(cod,id){
	if (cod == 'CTRL'){
		vgk.arcoId0 = id;
	}
}

function ctrlKeyON(id){
if (vgk.arcoId0 == id){
	console.log('Arco sobre mismo Nodo');
	return false;}
else {
	var nodoI = vgk.ganttTasks.getNodoById(vgk.arcoId0);
	var nodoF = vgk.ganttTasks.getNodoById(id);

	var link = vgk.ganttTasks.existArco(nodoI,nodoF);
	if (link) editLink(link);
	else {
		var link = new TaskLnk('x',nodoI,nodoF,0);
		vgk.ganttTasks.addArco(arco)};
}
var dims = vgk.ganttTasks.getDimsArcos();
vgk.trazo.canvas.reset();
// vgk.trazo.canvas.pintaArcos(dims);

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
	console.log('Drop: '+ div.id)
// Actualiza posición del nodo en el grafo
	var divX = parseInt(div.style.left.replace('px',''));
	var divY = parseInt(div.style.top.replace('px',''));
	
	var nodo = vgk.ganttTasks.getNodoById(parseInt(div.id));
	nodo.dim.x = divX;
//	nodo.dim.y = divY;

	var dims = vgk.ganttTasks.getDimsArcos();
	vgk.trazo.canvas.reset(2);
//	vgk.trazo.canvas.pintaArcos(dims);

//	var task = vgk.ganttTasks.getNodoById(div.id);

}

//------------------------------------------------------------------- Init
function sesionGanttTasksOK(sesion){
	var _id = vgk.params._id;
	getEsc4Gantt(_id);
}

function initTasksGantt(){
	initAppsGlobal();
	initAppsAlmanaque();

	validaSesion('usrMenu',sesionGanttTasksOK); // libK1_Sesion.js
}
