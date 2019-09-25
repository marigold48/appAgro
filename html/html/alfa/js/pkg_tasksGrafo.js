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

}

function editTask(id){
	var task = vgk.grafoTasks.getNodoById(id);
	if (task.obj.fase == 'SEED') editaItem('TASK0',task,grabaTask,borraTask);
	else editaItem('TASK1',task,borraTask,grabaTask);
}

function grabaLink(){
	var link = vgk.appModal.item;
	console.log('Grabar: ' +o2s(link));
	vgk.grafoTasks.updtArcoSelf(link);
	updateTasksGrafo();
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

