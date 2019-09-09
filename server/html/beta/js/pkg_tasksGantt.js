function showSemana(sem){
	var filas = vgk.almanaque.getFilasSem(sem);
	console.log(o2s(filas));
	if (filas.length){
		vgk.appSem.actualiza(filas);
		r$('divMes').style.display = 'none';
		r$('divSem').style.display = 'block';
	}

}
function showAlmanaque(mes){
	r$('divBase').style.display = 'none';
	r$('divMes').style.display = 'block';
	r$('divSem').style.display = 'none';
	var filas = vgk.almanaque.getFilasMes(mes||vgk.appMes.mes);
	vgk.appMes.actualiza(filas);
	var tag = vgk.almanaque.getTagMes(mes||vgk.appMes.mes);
	vgk.appMes.actualizaTag(tag)
}

function showGantt(){
	r$('divBase').style.display = 'block';
	r$('divMes').style.display = 'none';
}

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
	console.log(o2s(noNulos));
}
*/
function agendarTasks(zij,tasks){
	var ok = false;
	var maxLoops = 3;
	tasks.map(function(task){
		ok = false;
		maxLoops = 20;  // para evitar loops infinitos en fase de desarrollo

		while (!ok  && maxLoops){
			maxLoops--;
			var dia = zij.getDiaByLapso(task.obj.fecha);
			if (dia.obj.dF){ 
				task.obj.fecha.uta += 288;
				console.log('Festivo '+task.tag);
			}
			else if (dia.hijos.length){
				console.log('Colision '+task.tag);
				 task.obj.fecha.uta += 288;
				}
			else {
				console.log(task.tag +' --> '+dia.obj.dJ);
				task.ajustarDim();
				zij.addNodoHijo(dia,task);
				ok = true;
			}

		}
	})
	var agenda = zij.getAgenda();
	vgk.trazo.showTasksGantt(agenda);
//	vgk.trazo.canvas.lyout = 'VERT';
//	vgk.trazo.canvas.reset(2);
	vgk.almanaque = zij;
}

//------------------------------------------------------------------- Crear Gantt
function showGanttTasks(){
	vgk.trazo = new rTrazo('divBase');
	vgk.trazo.isGantt = true;
	vgk.trazo.lapso = getLapsoByJar(2018);
	vgk.trazo.scale = 36;
	vgk.trazo.fnDrop = onDrop;
	vgk.trazo.fnKeyBase = onKeyBase;
	vgk.trazo.fnKeyDivI = onKeyDivI;
	vgk.trazo.fnKeyDivF = onKeyDivF;
	vgk.trazo.activaCanvas();

//	var dims = vgk.ganttTasks.getDimsArcos();
	vgk.trazo.canvas.lyout = 'VERT';
	vgk.trazo.canvas.marcas = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
	vgk.trazo.canvas.reset();
//	vgk.trazo.canvas.pintaArcos(dims);


//	alert('Sudoku');
//	initTestSudoku();

	var zij = new rAlmanaque('Test',[],2018);

	var tasks = vgk.ganttTasks.getTasks();
	console.log('Tasks: ' + tasks.length);
	agendarTasks(zij,tasks);
}

//------------------------------------------------------------------- Get Tasks Escenario
/*
	Al cargar elescenario, se hace loop sobre los cultivos.
	Por cada cultivo se carga el grafo de Tasks asociado
	Los nodos y arcos de estos grafos se incorporan al gantt Tasks
	Cuando se detecta que es el último (vgk.getsCount == 0),
	se invoca showGanttTasks.
	En algún momento intermedio, se procesa el"sudoku" para eliminar solapes.
	Para ello se necesita el Almanaque del año agrícola de la Explotación

	El año agrícola (agroJar) incluye los festivos (además de los domingos)
	En la info de la explotación se incluyen todos los códigos postales de Fincas y Zonas
	En la info de Fincas se incluyen todos los códigos postales de sus Zonas
	En la info de Zona se especifica el código postal.
	Con esta info,se obtienen: la provincia, y la CCAA. (ver js/provincias.txt)
	Y con esto, los festivos oficiales de cada Comunidad. (ver js/festivos.txt)
*/
function ecoGetTasks4Gantt(xhr){
	vgk.getsCount--;

	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.grafoTasks_id = vgk.loTopol._id;
	var agroJar = getLapsoByJar(2018);
	vgk.grafoTasks = new GrafoTasks("",[],agroJar);
	vgk.grafoTasks.objDB2Clase(vgk.loTopol);
//	vgk.grafoTasks.cambiaIds();

// Obtener los id0 de las task que no tienen arco de entrada
	var ids0 = vgk.grafoTasks.getTaskIni();
	var nodo0 = vgk.grafoTasks.getNodoById(ids0[0]);

// Inicializar la fecha (lapso) de cada nodo0, según fechas del cultivo
	var lapsoCult = fechas2Lapso(vgk.cultivo.obj.fechaI,vgk.cultivo.obj.fechaF);
	nodo0.obj.fecha = new rLapso(lapsoCult.tau,30);

// Calcular los lapsos de todos los nodos vecinos, sumando los gaps de los arcos
	vgk.grafoTasks.setFechasTasks(nodo0);

// Establecer las dim de los nodos, según uta,tau de las fechas
	vgk.grafoTasks.setDimsTasks(vgk.nivelTasks);

// Añadir nodos y arcos al TaskGantt
	var nodos = vgk.grafoTasks.nodos.slice();
	nodos.map(function(nodo){
		vgk.ganttTasks.addNodo(nodo);
	})

	var arcos = vgk.grafoTasks.arcos.slice();
	arcos.map(function(arco){
		vgk.ganttTasks.addArco(arco);
	})

	if (!vgk.getsCount){  // **** cuando están todos los grafosTasks ****

		 showGanttTasks();
		 }
	else 	vgk.nivelTasks++;


}

function getTasks4Gantt(cult){
	vgk.cultivo = cult;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGetTasks4Gantt;
	params.topolId = cult.obj.tasks_id;
	ajaxGet1Topol(params);
	return false;
}

function creaGantt(){
	vgk.getsCount = 0;
	vgk.nivelTasks = 0;
	var agroJar = getLapsoByJar(2018);

	vgk.ganttTasks = new GanttTasks('Pbas',[],agroJar);

	var cultivos = vgk.escenario.getCultivos();
	cultivos.map(function(cult,ix){
		vgk.getsCount++;
		var nodoGuia = new rDrag(cult.obj.codZ);
		nodoGuia.dim = {x:20,y:50+(3*ix)+(60*ix),w:60,h:30};
		vgk.ganttTasks.addNodo(nodoGuia);
		getTasks4Gantt(cult);
	})

}
//------------------------------------------------------------------- Get Escenario

function ecoGetEsc4Gantt(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.escenario_id = vgk.loTopol._id;
	vgk.escenario = new Escenario("",[]);
	vgk.escenario.objDB2Clase(vgk.loTopol);

	creaGantt();
}

function getEsc4Gantt(_id){
	vgk.escenario_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGetEsc4Gantt;
	params.topolId = _id;

	ajaxGet1Topol(params);
	return false;
}




//------------------------------------------------------------------- Gantt Tasks (pdte)
/*
function ecoUpdateGanttTasks(xhr){
	console.log('Eco Updt GanttTasks: ');
}
function updateGanttTasks(){
	if (vgk.ganttTasks.meta.org != vgk.user.org){
//		alert('GanttTasks sin ORG:' + vgk.ganttTasks.meta.org +':'+ vgk.user.org);
		vgk.ganttTasks.meta.org = vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoUpdateGanttTasks;
	params.txt = o2s(vgk.ganttTasks.clase2ObjDB());
	console.log(o2s(params.txt));
	params.topolId = vgk.ganttTasks_id;
	ajaxPutTopol(params);
	return false;
}

function ecoGet1GanttTasks(xhr){
		var respTxt = xhr.responseText;
		vgk.loTopol = JSON.parse(respTxt);
		vgk.ganttTasks_id = vgk.loTopol._id;
		vgk.ganttTasks = new GanttTasks("",[]);
		vgk.ganttTasks.objDB2Clase(vgk.loTopol);
		console.log(o2s(vgk.ganttTasks.clase2ObjDB()));
		initMover();
}

function get1GanttTasks(_id){
	vgk.ganttTasks_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGet1GanttTasks;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

*/
