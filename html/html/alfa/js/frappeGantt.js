	function viewChange(view){
		switch(view){
			case '06H' : vgk.gantt_chart.options.view_mode ='Quarter Day';break;
			case '12H' : vgk.gantt_chart.options.view_mode = 'Half Day';break;
			case 'DIA' : vgk.gantt_chart.options.view_mode = 'Day';break;
			case 'SEM' : vgk.gantt_chart.options.view_mode = 'Week';break;
			case 'MES' : vgk.gantt_chart.options.view_mode = 'Month';break;
		}
		vgk.gantt_chart.change_view_mode();
	}

	function creaGanttSVG(){
		var tasks = vgk.ganttTasks.getTasksSVG();

		vgk.gantt_chart = new Gantt(".gantt-target", tasks, {
			on_click: function (task) {
				console.log(task);
			},
			on_date_change: function(task, start, end) {
				console.log(task, start, end);
			},
			on_progress_change: function(task, progress) {
				console.log(task, progress);
			},
			on_view_change: function(mode) {
				console.log(mode);
			},
			custom_popup_html: function(task) {
      // the task object will contain the updated
      // dates and progress value
//      const end_date = task._end.format('MMM D');
      return `
        <div class="details-container">
          <h5>${task.name}</h5>
          <p>Finaliza: ${task.end}</p>
          <p>${task.progress}% completado!</p>
        </div>
      `;
    },
			view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],

			view_mode: 'Day',
			language: 'ru'
		});
//		console.log(gantt_chart);
}


//------------------------------------------------------------------- Get Tasks Escenario
/*
	Al cargar elescenario, se hace loop sobre los cultivos.
	Por cada cultivo se carga el grafo de Tasks asociado
	Los nodos y arcos de estos grafos se incorporan al gantt Tasks
	Cuando se detecta que es el último (vgk.getsCount == 0),
	se invoca creaGanttSVG.
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
	vgk.getsCount--;

	var loTopol = JSON.parse(xhr.responseText);
	vgk.grafoTasks_id = loTopol._id;
	vgk.grafoTasks = new GrafoTasks("",[]);
	vgk.grafoTasks.objDB2Clase(loTopol);
//	vgk.grafoTasks.cambiaIds();

// Obtener los id0 de las task que no tienen arco de entrada
	var ids0 = vgk.grafoTasks.getTaskIni();
	var nodo0 = vgk.grafoTasks.getNodoById(ids0[0]);

// Inicializar la fecha (lapso) de cada nodo0, según fechas del cultivo
	var lapsoCult = fechas2Lapso(vgk.cultivo.obj.fechaI,vgk.cultivo.obj.fechaF);

	var epok = new Epoca(vgk.cultivo.tag);
	epok.obj.lapso = lapsoCult;
	epok.obj.nivel = vgk.nivelTasks;
	epok.dim.x = 20; //epok.obj.lapso.uta;
	epok.dim.y = 40+(3*vgk.nivelTasks)+(60*vgk.nivelTasks);
	epok.dim.w = epok.obj.lapso.tau;
	epok.dim.h = 3;
	vgk.ganttTasks.addNodo(epok);

	nodo0.obj.fecha = new rLapso(lapsoCult.uta,300);

// Calcular los lapsos de todos los nodos vecinos, sumando los gaps de los arcos
	vgk.grafoTasks.setFechasTasks(nodo0);

// Establecer las dim de los nodos, según uta,tau de las fechas y el nivel
	vgk.grafoTasks.setDimsTasks(vgk.nivelTasks,vgk.lapsoTotal);

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
		creaGanttSVG();
	}
	else 	vgk.nivelTasks++;


}

function getTasks4Gantt(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetTasks4Gantt;
	params.topolId = _id;
	ajaxGet1Topol(params);
	return false;
}

function creaGanttEsc(){
	vgk.getsCount = 0;
	vgk.nivelTasks = 0;
	var nodosGuia = [];
	vgk.lapsoTotal  = null;  //getLapsoByJar(2018);
	r$('escTag').innerHTML = 'Escenario: '+vgk.escenario.meta.tag;

	var cultivos = vgk.escenario.getCultivos();
	cultivos.map(function(cult,ix){
		var lapsoCult = fechas2Lapso(cult.obj.fechaI,cult.obj.fechaF);
		vgk.lapsoTotal = unionLapsos(vgk.lapsoTotal,lapsoCult); 
		var nodoGuia = new rDrag(cult.obj.codZ);
		nodoGuia.dim = {x:20,y:50+(3*ix)+(60*ix),w:60,h:30};
		nodosGuia.push(nodoGuia);
		if (cult.obj.tasks_id){
			vgk.cultivo = cult;
			vgk.getsCount++;
			getTasks4Gantt(cult.obj.tasks_id);
		}

	})
	vgk.ganttTasks = new GanttTasks('Pbas',nodosGuia,vgk.lapsoTotal);
}

//------------------------------------------------------------------- Init

function ecoGet1Topol4Gantt(xhr){
	var loTopol = JSON.parse(xhr.responseText);

	if (loTopol.meta.iam == 'GrafoTasks') {
		vgk.grafoTasks_id = loTopol._id;
		vgk.grafoTasks = new GrafoTasks('x',[]);
		vgk.grafoTasks.objDB2Clase(loTopol);
		console.log('Entra por GrafoTasks');
	}

	else if (loTopol.meta.iam == 'EscHorta'){
		vgk.escenario_id = loTopol._id;
		vgk.escenario = new Escenario('x',[]);
		vgk.escenario.objDB2Clase(loTopol);
		creaGanttEsc();
	}

	else if (loTopol.meta.iam == 'EscFruta'){
		vgk.escenario_id = loTopol._id;
		vgk.escenario = new Escenario('x',[]);
		vgk.escenario.objDB2Clase(loTopol);
		creaGanttEsc();
	}

	else alert('Topología no esperada');
}

function sesionGanttTasksOK(sesion){
	var _id = vgk.params._id;

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Topol4Gantt;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;

//	getEsc4Gantt(_id);
}

function initTasksGantt(){
	initAppsGlobal();
	validaSesion('usrMenu',sesionGanttTasksOK); // libK1_Sesion.js
}

