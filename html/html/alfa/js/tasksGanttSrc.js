
/*
Enunciado SUDOKU:
Dado un conjunto de grafos de tareas, crear una matriz que tenga:
	+ COLs: los 365 dias del año(366 en bisiestos)
	+ ROWs : los bancales definidos en la explotación

El algoritmo del sudoku debe 'colocar' las tareas en la matriz, de forma que 
	+ Cada dia hay un máximo de 8 horas
	+ Si hay tareas que ocupen más ==> split en subtareas (contiguas?)
	+ El mismo payés no está en más de un 'slot' de tiempo
	+ El mismo apero no está en más de un 'slot' de tiempo
	+ Calcular los GAPs definidos entre tareas
	+ etc etc
*/

/*
function initTestSudoku(){
// array de 365 dias. Uno de cada 7 es festivo
	var dias = [];
	var cults = [];

	for (var i=0;i<365;i++){
		if (i%7) dias.push(null)
 		else dias.push('-');
	}

// creamos N pseudo cultivos (bancales) random
// el payés puede ser A,B o C
// el apero puede ser X,Y,Z
// las fechas del cultivo son dos enteros (0-365 cada uno)
// Cada cultivo tiene 3 tareas. La fecha es un entero que  indica el GAP con la tarea anterior;
	var N = 15;
	var rnd = 0;
	var payeses = ['A','B','C'];
	var aperos = ['X','Y','Z'];
	for (var i=0;i<N;i++){
		var cult = {tag:'Cult_'+i};
		rnd = Math.floor(Math.random()*30); cult.fechaI = rnd; 
		rnd = Math.floor(Math.random()*30+60); cult.fechaF = cult.fechaI + rnd; 

		var task1 = {}; cult['task1'] = task1;
		rnd = Math.floor(Math.random()* 3);		cult.task1.p = payeses[rnd];
		rnd = Math.floor(Math.random()* 3);		cult.task1.a = aperos[rnd];
		rnd = Math.floor(Math.random()*30+5);	cult.task1.f = rnd; 

		var task2 = {}; cult['task2'] = task2;
		rnd = Math.floor(Math.random()* 3);		cult.task2.p = payeses[rnd];
		rnd = Math.floor(Math.random()* 3);		cult.task2.a = aperos[rnd];
		rnd = Math.floor(Math.random()*30+5);	cult.task2.f = cult.task1.f + rnd; 

		var task3 = {}; cult['task3'] = task3;
		rnd = Math.floor(Math.random()* 3); 	cult.task3.p = payeses[rnd];
		rnd = Math.floor(Math.random()* 3);		cult.task3.a = aperos[rnd];
		rnd = Math.floor(Math.random()*30+5);	cult.task3.f = cult.task2.f + rnd; 

		cults.push(cult);
	}

	testAgendar(dias,cults);
}

function testAgendar(dias,cults){
	cults.map(function(cult){
		var f1 = cult.fechaI+cult.task1.f;
		while (dias[f1] && f1 < 100){
			console.log('Colision '+cult.tag+' Task1 dia '+f1+ ':'+dias[f1]);
			f1++;
		}
		dias[f1]=cult.tag+'-T1';

		var f2 = cult.fechaI+cult.task2.f;
		while (dias[f2] && f2 < 200){
			console.log('Colision '+cult.tag+' Task2 dia '+f2+ ':'+dias[f2]);
			f2++;
		}
		dias[f2]=cult.tag+'-T1';

		var f3 = cult.fechaI+cult.task3.f;
		while (dias[f3] && f3 < 300){
			console.log('Colision '+cult.tag+' Task3 dia '+f3+ ':'+dias[f3]);
			f3++;
		}
		dias[f3]=cult.tag+'-T1';
	})
	var noNulos = dias.filter(Boolean);
	console.log(utils.o2s(noNulos));
}
*/

import utils  from '/k1/libK1_Utils.js'
import topol  from '/k1/libK1_Topol.js'
import tempo  from '/k1/libK1_Tiempo.js'
import ajax   from '/k1/libK1_Ajax.js'
import trazo   from '/k1/libK1_Trazo.js'

import agro   from '/js/agro_Clases.js'

function ecoNuevaAgenda(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	console.log('Agenda creada: '+loTopol.meta.tag);
}



function agendarTasks(almanak,tasks){
	var nom = prompt('Nombre kairos?');
	if (!nom) return;
	var raiz = new rNodo(nom);
	utils.vgk.kairos = new rKairos(nom,[raiz]);
	tasks.map(function(task){
		var dia = almanak.getDiaByLapso(task.obj.fecha);
		dia.obj.retol='Tasks';
		dia.obj.dF = 'NAC';
		utils.vgk.kairos.upsertDia(dia);
		utils.vgk.kairos.addNodoHijo(dia,task);
	})
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevaAgenda; 
	params.txt = utils.o2s(utils.vgk.kairos.clase2ObjDB());
	ajax.ajaxPostTopol(params);
}

//------------------------------------------------------------------- Crear Gantt
function showGanttTasks(){
	utils.vgk.trazo = new trazo.rTrazo('divBase');
	utils.vgk.trazo.isGantt = true;
	utils.vgk.trazo.lapso = utils.vgk.lapsoTotal;
	utils.vgk.trazo.scale = 16;
	utils.vgk.trazo.fnDrop = onDrop;
	utils.vgk.trazo.fnKeyBase = onKeyBase;
	utils.vgk.trazo.fnKeyDivI = onKeyDivI;
	utils.vgk.trazo.fnKeyDivF = onKeyDivF;
	utils.vgk.trazo.activaCanvas();

//	var dims = utils.vgk.ganttTasks.getDimsArcos();
	utils.vgk.trazo.canvas.lyout = 'VERT';
	utils.vgk.trazo.canvas.marcas = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
	utils.vgk.trazo.canvas.reset();
//	utils.vgk.trazo.canvas.pintaArcos(dims);

	var tasks = utils.vgk.ganttTasks.getTasks();
	tasks.map(function(task){
		utils.vgk.trazo.addDivTask(task);
	})

	var epoks = utils.vgk.ganttTasks.getEpocas();
	epoks.map(function(epok){
		utils.vgk.trazo.addDivTask(epok);
	})

//	alert('Sudoku');
//	initTestSudoku();
	var jar = utils.vgk.lapsoTotal.toDateI().getFullYear();
	console.log('Jar: '+jar);
	var almanak = new rAlmanak('Test',[],jar);

	var tasks = utils.vgk.ganttTasks.getTasks();
//	agendarTasks(almanak,tasks);
}

//------------------------------------------------------------------- Get Tasks Escenario
/*
	Al cargar elescenario, se hace loop sobre los cultivos.
	Por cada cultivo se carga el grafo de Tasks asociado
	Los nodos y arcos de estos grafos se incorporan al gantt Tasks
	Cuando se detecta que es el último (utils.vgk.getsCount == 0),
	se invoca showGanttTasks.
	En algún momento intermedio, se procesa el"sudoku" para eliminar solapes.
	Para ello se necesita el Almanak del año agrícola de la Explotación

	El año agrícola (agroJar) incluye los festivos (además de los domingos)
	En la info de la explotación se incluyen todos los códigos postales de Fincas y Zonas
	En la info de Fincas se incluyen todos los códigos postales de sus Zonas
	En la info de Zona se especifica el código postal.
	Con esta info,se obtienen: la provincia, y la CCAA. (ver js/provincias.txt)
	Y con esto, los festivos oficiales de cada Comunidad. (ver js/festivos.txt)
*/
function ecoGetTasks4Gantt(xhr){
	utils.vgk.getsCount--;

	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.grafoTasks_id = loTopol._id;
	utils.vgk.grafoTasks = new agro.GrafoTasks("",[]);
	utils.vgk.grafoTasks.objDB2Clase(loTopol);
//	utils.vgk.grafoTasks.cambiaIds();

// Obtener los id0 de las task que no tienen arco de entrada
	var ids0 = utils.vgk.grafoTasks.getTaskIni();
	console.log('Ids ini: ' + ids0.length);
	var nodo0 = utils.vgk.grafoTasks.getNodoById(ids0[0]);
	console.log('Nodo ini: ' + utils.o2s(nodo0));

// Inicializar la fecha (lapso) de cada nodo0, según fechas del cultivo
	var lapsoCult = tempo.fechas2Lapso(utils.vgk.cultivo.obj.fechaI,utils.vgk.cultivo.obj.fechaF);

	var epok = new Epoca(utils.vgk.cultivo.tag);
	epok.obj.lapso = lapsoCult;
	epok.obj.nivel = utils.vgk.nivelTasks;
	epok.dim.x = 20; //epok.obj.lapso.uta;
	epok.dim.y = 40+(3*utils.vgk.nivelTasks)+(60*utils.vgk.nivelTasks);
	epok.dim.w = epok.obj.lapso.tau;
	epok.dim.h = 3;
	utils.vgk.ganttTasks.addNodo(epok);

	nodo0.obj.fecha = new tempo.rLapso(lapsoCult.uta,300);
	console.log('Nodo ini: ' + utils.o2s(nodo0));

// Calcular los lapsos de todos los nodos vecinos, sumando los gaps de los arcos
	utils.vgk.grafoTasks.setFechasTasks(nodo0);

// Establecer las dim de los nodos, según uta,tau de las fechas y el nivel
	utils.vgk.grafoTasks.setDimsTasks(utils.vgk.nivelTasks,utils.vgk.lapsoTotal);

// Añadir nodos y arcos al TaskGantt
	var nodos = utils.vgk.grafoTasks.nodos.slice();
	console.log('Nodos: '+nodos.length);
	nodos.map(function(nodo){
		utils.vgk.ganttTasks.addNodo(nodo);
	})

	var arcos = utils.vgk.grafoTasks.arcos.slice();
	arcos.map(function(arco){
		utils.vgk.ganttTasks.addArco(arco);
	})

	console.log('Gantt: ' + utils.o2s(utils.vgk.ganttTasks));

	if (!utils.vgk.getsCount){  // **** cuando están todos los grafosTasks ****
		showGanttTasks();
	}
	else 	utils.vgk.nivelTasks++;


}

function getTasks4Gantt(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetTasks4Gantt;
	params.topolId = _id;
	ajax.ajaxGet1Topol(params);
	return false;
}

function creaGanttEsc(){
	utils.vgk.getsCount = 0;
	utils.vgk.nivelTasks = 0;
	var nodosGuia = [];
	utils.vgk.lapsoTotal  = null;  //getLapsoByJar(2018);


	var cultivos = utils.vgk.escenario.getCultivos();
	cultivos.map(function(cult,ix){
		console.log('Fechas: '+cult.obj.fechaI+' ---> '+cult.obj.fechaF)
		var lapsoCult = tempo.fechas2Lapso(cult.obj.fechaI,cult.obj.fechaF);
		console.log('Lapso Cult: ' + utils.o2s(lapsoCult));
		utils.vgk.lapsoTotal = tempo.unionLapsos(utils.vgk.lapsoTotal,lapsoCult); 
		console.log('Lapso total: ' + utils.o2s(utils.vgk.lapsoTotal));
		var nodoGuia = new topol.rDrag(cult.obj.codZ);
		nodoGuia.dim = {x:20,y:50+(3*ix)+(60*ix),w:60,h:30};
		nodosGuia.push(nodoGuia);
		if (cult.obj.tasks_id){
			utils.vgk.cultivo = cult;
			utils.vgk.getsCount++;
			getTasks4Gantt(cult.obj.tasks_id);
		}

	})
	utils.vgk.ganttTasks = new agro.GanttTasks('Pbas',nodosGuia,utils.vgk.lapsoTotal);
	console.log('Gantt: '+utils.o2s(utils.vgk.ganttTasks));
}
//------------------------------------------------------------------- Get Escenario OBSOLETO
/*
function ecoGetEsc4Gantt(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	console.log('Cargado escenario: '+loTopol.meta.tag);
	utils.vgk.escenario_id = loTopol._id;
	utils.vgk.escenario = new agro.Escenario("",[]);
	utils.vgk.escenario.objDB2Clase(loTopol);

	creaGantt();
}

function getEsc4Gantt(_id){
	utils.vgk.escenario_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetEsc4Gantt;
	params.topolId = _id;

	ajaxGet1Topol(params);
	return false;
}
*/



//------------------------------------------------------------------- Gantt Tasks (pdte)
/*
function ecoUpdateGanttTasks(xhr){
	console.log('Eco Updt GanttTasks: ');
}
function updateGanttTasks(){
	if (utils.vgk.ganttTasks.meta.org != utils.vgk.user.org){
//		alert('GanttTasks sin ORG:' + utils.vgk.ganttTasks.meta.org +':'+ utils.vgk.user.org);
		utils.vgk.ganttTasks.meta.org = utils.vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateGanttTasks;
	params.txt = utils.o2s(utils.vgk.ganttTasks.clase2ObjDB());
	console.log(utils.o2s(params.txt));
	params.topolId = utils.vgk.ganttTasks_id;
	ajaxPutTopol(params);
	return false;
}

function ecoGet1GanttTasks(xhr){
		var respTxt = xhr.responseText;
		utils.vgk.loTopol = JSON.parse(respTxt);
		utils.vgk.ganttTasks_id = utils.vgk.loTopol._id;
		utils.vgk.ganttTasks = new agro.GanttTasks("",[]);
		utils.vgk.ganttTasks.objDB2Clase(utils.vgk.loTopol);
		console.log(utils.o2s(utils.vgk.ganttTasks.clase2ObjDB()));
		initMover();
}

function get1GanttTasks(_id){
	utils.vgk.ganttTasks_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1GanttTasks;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

*/



//------------------------------------------------------------------- Init

function ecoGet1Topol4Gantt(xhr){
	var loTopol = JSON.parse(xhr.responseText);

	if (loTopol.meta.iam == 'agro.GrafoTasks') {
		utils.vgk.grafoTasks_id = loTopol._id;
		utils.vgk.grafoTasks = new agro.GrafoTasks('x',[]);
		utils.vgk.grafoTasks.objDB2Clase(loTopol);
		console.log('Entra por agro.GrafoTasks');
	}

	else if (loTopol.meta.iam == 'EscHorta'){
		utils.vgk.escenario_id = loTopol._id;
		utils.vgk.escenario = new agro.Escenario('x',[]);
		utils.vgk.escenario.objDB2Clase(loTopol);
		creaGanttEsc();
	}

	else if (loTopol.meta.iam == 'EscFruta'){
		utils.vgk.escenario_id = loTopol._id;
		utils.vgk.escenario = new agro.Escenario('x',[]);
		utils.vgk.escenario.objDB2Clase(loTopol);
		creaGanttEsc();
	}

	else alert('Topología no esperada');
}


//=================================================================== TECLAS
//------------------------------------------------------------------- Teclas
function onKeyBase(cod,pntX,pntY){
	if (cod == 'CTRL'){
		var tag = prompt('Tag?','Nuevo');
		if (!tag) return false;

		var nodo = new agro.Task(tag);
		console.log(utils.vgk.tecla);
		nodo.dim = {x:pntX,y:pntY,w:120,h:60};
		console.log('Antes: '+ utils.o2s(utils.vgk.ganttTasks.index))
		utils.vgk.ganttTasks.addNodo(nodo);
		console.log('Luego: '+ utils.o2s(utils.vgk.ganttTasks.index))
		utils.vgk.trazo.addDivNodo(nodo);
		utils.vgk.tecla = null;
	}
}

function onKeyDivI(cod,id){
	if (cod == 'CTRL'){
		utils.vgk.arcoId0 = id;
	}
}

function ctrlKeyON(id){
if (utils.vgk.arcoId0 == id){
	console.log('Arco sobre mismo Nodo');
	return false;}
else {
	var nodoI = utils.vgk.ganttTasks.getNodoById(utils.vgk.arcoId0);
	var nodoF = utils.vgk.ganttTasks.getNodoById(id);

	var link = utils.vgk.ganttTasks.existArco(nodoI,nodoF);
	if (link) editLink(link);
	else {
		var link = new agro.TaskLnk('x',nodoI,nodoF,0);
		utils.vgk.ganttTasks.addArco(arco)};
}
var dims = utils.vgk.ganttTasks.getDimsArcos();
utils.vgk.trazo.canvas.reset();
// utils.vgk.trazo.canvas.pintaArcos(dims);

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
	
	var nodo = utils.vgk.ganttTasks.getNodoById(parseInt(div.id));
	nodo.dim.x = divX;
//	nodo.dim.y = divY;

	var dims = utils.vgk.ganttTasks.getDimsArcos();
	utils.vgk.trazo.canvas.reset(2);
//	utils.vgk.trazo.canvas.pintaArcos(dims);

//	var task = utils.vgk.ganttTasks.getNodoById(div.id);

}

export default {ecoGet1Topol4Gantt}