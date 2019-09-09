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
que agruparán a las especies y variedades de cultivo similar

+ EspHorta
+ VarHorta

+ EspFruta
+ VarFruta 

Todas tienen una imagen asociada

Las clases se epecifican en agro_Clases.js
Las appVue se especifican en agro_vApps.js
*/


//------------------------------------------------------------------- Variedades

function borraVardd(){
	var vardd = vgk.appModal.item;
	vgk.plantas.borraNodo(vardd);
	vgk.appModal.showModal = false;
	var raspa = vgk.plantas.getRaspa();
	vgk.appListaGrupo.actualiza(raspa);
	updatePlantas();
}

function grabaVardd(){
	var vardd = vgk.appModal.item;

	if (vgk.appModal.editON) vgk.plantas.updtNodoSelf(vardd);
	else{ 
		var espec = vgk.plantas.getNodoById(vgk.appEspec.idAct);
		vgk.plantas.addNodoHijo(espec,vardd);
		vgk.appVardd.items.push(vardd);
	}

	updatePlantas();
	vgk.appModal.show = false;
}

function crearVardd(){
	var num = vgk.plantas.nodos.length;
	var edit_t = (vgk.appModoPlantas.modo == 'HORTA')? 'VARH':'VARF';
	if (edit_t == 'HORTA') var vardd = new VarHorta('Variedad '+num);
	else if (edit_t == 'FRUTA') var vardd = new VarFruta('Variedad '+num);
	crearItem(edit_t,vardd,grabaVardd); // agro_vApps.js
}

function editaVardd(id0){
	var vardd = vgk.plantas.getNodoById(id0);
	var edit_t = (vgk.appModoPlantas.modo == 'HORTA')? 'VARH':'VARF';
	editaItem(edit_t,vardd,grabaVardd,borraVardd);
}
function showVardd(id0){
		vgk.appEspec.idAct = id0;
		var espec = vgk.plantas.getNodoById(id0);
		vgk.appH3Vardd.actualiza(espec.tag);
		var vardds = [];
		espec.hijos.map(function(idH){
			var vardd = vgk.plantas.getNodoById(idH);
			vardds.push(vardd);
		})
		vgk.appVardd.actualiza(vardds);

}

//------------------------------------------------------------------- EspHs
function borraEspec(){
	var espec = vgk.appModal.item;
	vgk.plantas.borraNodo(espec);
	vgk.appModal.showModal = false;
	var raspa = vgk.plantas.getRaspa();
	vgk.appListaGrupo.actualiza(raspa);
	updatePlantas();

}
function grabaEspec(){
	var idGrupo = vgk.appListaGrupo.idAct;
	var grupo = vgk.plantas.getNodoById(idGrupo);
	var espec = vgk.appModal.item;
	console.log(o2s(espec));
	if (vgk.appModal.editON) vgk.plantas.updtNodoSelf(espec);
	else vgk.plantas.addNodoHijo(grupo,espec);
	var raspa = vgk.plantas.getRaspa();
	vgk.appListaGrupo.actualiza(raspa);
	updatePlantas();
	vgk.appModal.show = false;
}

function crearEspec(){
	var num = vgk.plantas.nodos.length;
	var edit_t = (vgk.appModoPlantas.modo == 'HORTA')? 'ESPH':'ESPF';

	if (edit_t == 'HORTA') var espec = new EspHorta('Espec '+num);
	else if (edit_t == 'FRUTA')  var espec = new EspFruta('Espec '+num);
	else return;

	crearItem(edit_t,espec,grabaEspec); // agro_vApps.js
}

function editEspec(id0){
	var espec = vgk.plantas.getNodoById(id0);
	var edit_t = (vgk.appModoPlantas.modo == 'HORTA')? 'ESPH':'ESPF';
	editaItem(edit_t,espec,grabaEspec,borraEspec);
}

function showEspec(){
	var especs = [];
	var id0 = vgk.appListaGrupo.idAct;
	var grupo = vgk.plantas.getNodoById(id0);
	var hijos = grupo.hijos;
	hijos.map(function(idH){
		var espec = vgk.plantas.getNodoById(idH);
		especs.push(espec);
	})
	vgk.appEspec.actualiza(especs);
	vgk.appH3Espec.actualiza(grupo.tag);
}

//------------------------------------------------------------------- Grupos Horta

function creaVarddHorta(seed){
	console.log('Seed VH: '+ o2s(seed));
	var varH = new VarHorta(seed.tag);
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
	console.log('Seed VF: '+ o2s(seed));
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
	console.log('Espec: '+ o2s(espec));
	vgk.filasAgro.map(function(seed){

		if (seed.cod.substr(0,3) == espec.obj.codEspec && seed.cod.length > 3){

			if (vgk.appModoPlantas.modo == 'HORTA') var vardd = creaVarddHorta(seed);
			else var vardd = creaVarddFruta(seed);

			vgk.plantas.addNodoHijo(espec,vardd);
		}
	})
}

function creaEspecHorta(seed){
	var espH = new EspHorta(seed.tag);
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
	console.log('Seleccion: '+o2s(vgk.appModal.items));
	vgk.appModal.lista.map(function(seed){
		if(vgk.appModal.items.indexOf(seed.tag)!=-1){
			console.log('Crea '+seed.tag);
			if (vgk.appModoPlantas.modo == 'HORTA') var espec = creaEspecHorta(seed);
			else var espec = creaEspecFruta(seed);

			vgk.plantas.addNodoHijo(grupo,espec);
			addVardd2Espec(espec);
		}
	})
}


function grabaGrupo(){
	var raiz = vgk.plantas.getRaiz();
	var grupo = vgk.appModal.item;
	if (vgk.appModal.editON){ 
		vgk.plantas.updtNodoSelf(grupo);
		updatePlantas();
	}
	else{ 
		vgk.plantas.addNodoHijo(raiz,grupo);
		if (vgk.appModal.items.length) addEspec2Grupo(grupo);
		var raspa = vgk.plantas.getRaspa();
		vgk.appListaGrupo.actualiza(raspa);
		vgk.appModal.showModal = false;
		updatePlantas();
	}
	vgk.appModal.show = false;
}

function borraGrupo(){
	vgk.appModal.showModal = false;
	var grupo = vgk.appModal.item;

	var ok = confirm('Quiere borrar el grupo '+grupo.tag+'?')
	if (!ok) return;

	vgk.appModal.item = {};
	if (grupo.obj.tasks_id){
		borraTasks(grupo.obj.tasks_id);
	}
	vgk.plantas.borraNodo(grupo);
	var raspa = vgk.plantas.getRaspa();
	vgk.appListaGrupo.actualiza(raspa);
	updatePlantas();
}

//------------------------------------------------------------------- INI Repositorio
function ecoGetRepoAgro(xhr){
	vgk.appModal.seedLst = [];
	vgk.filasAgro = csv2filas(xhr.responseText);
	vgk.filasAgro.map(function(fila){
		if (fila.cod.length == 3) vgk.appModal.lista.push(fila);
	})

	var modo = vgk.appModoPlantas.modo;
	if (modo == 'HORTA'){
		var grupo = new GrpHorta('Nuevo grupo');
		crearItem('HORTA0',grupo,grabaGrupo); // agro_vApps.js
	}
	else {
		var grupo = new GrpFruta('Nuevo grupo');
		crearItem('FRUTA0',grupo,grabaGrupo); // agro_vApps.js
	}
}

function getRepoAgro(modo){
	var stmt = "select * from agro where tipo='"+modo+"' order by tag;";
	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : 'repoBetaAgro.sqlite',
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoGetRepoAgro; 

	ajaxCmdShell(params,body);
}
//------------------------------------------------------------------- FIN Repositorio
function crearGrupo(){
	var modo = vgk.appModoPlantas.modo;
	getRepoAgro(modo)
}

function editaGrupo(id0){
	var grupo = vgk.plantas.getNodoById(id0);
	if (!grupo.obj.tasks_id) editaItem('HORTA1',grupo,grabaGrupo,borraGrupo);
	else editaItem('HORTA2',grupo,grabaGrupo,borraGrupo);
}
//------------------------------------------------------------------- Arbol Horta


function ecoupdatePlantas(xhr){
	console.log('Horta grabada');
}
function updatePlantas(){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoupdatePlantas; 
	params.iam = 'Horta';
	params.txt = o2s(vgk.plantas.clase2ObjDB());
	params.topolId = vgk.plantas_id;
	ajaxPutTopol(params);
	return false;
}



function ecoNuevoHorta(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.plantas_id = vgk.loTopol._id;
	vgk.plantas = new Horta("",[]);
	vgk.plantas.objDB2Clase(vgk.loTopol);
}

function creaNuevoHorta(){
	var raiz = new rNodo('Hortalizas');
	raiz.rol = 'RAIZ';
	var horta = new Horta('Hortalizas',[raiz]);
	horta.meta.org = vgk.user.org;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoNuevoHorta; 
	params.iam = 'Horta';
	params.txt = o2s(horta.clase2ObjDB());
	ajaxPostTopol(params);
}

function ecoCargaHorta(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.plantas_id = vgk.loTopol._id;
	vgk.plantas = new Horta("",[]);
	vgk.plantas.objDB2Clase(vgk.loTopol);

	var raspa = vgk.plantas.getRaspa();
	vgk.appListaGrupo.actualiza(raspa);
}

function cargaHorta(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoCargaHorta;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

//------------------------------------------------------------------- Arbol Fruta


function ecoUpdateFruta(xhr){
	console.log('Fruta grabada');
}
function updateFruta(){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoUpdateFruta; 
	params.iam = 'Fruta';
	params.txt = o2s(vgk.plantas.clase2ObjDB());
	params.topolId = vgk.plantas_id;
	ajaxPutTopol(params);
	return false;
}



function ecoNuevoFruta(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.plantas_id = vgk.loTopol._id;
	vgk.plantas = new Fruta("",[]);
	vgk.plantas.objDB2Clase(vgk.loTopol);
}

function creaNuevoFruta(){
	alert('creaNuevoFruta');
	var raiz = new rNodo('Frutales');
	raiz.rol = 'RAIZ';
	var fruta = new Fruta('Frutales',[raiz]);
	fruta.meta.org = vgk.user.org;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoNuevoFruta; 
	params.iam = 'Fruta';
	params.txt = o2s(fruta.clase2ObjDB());
	ajaxPostTopol(params);
}

function ecoCargaFruta(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.plantas_id = vgk.loTopol._id;
	vgk.plantas = new Fruta("",[]);
	vgk.plantas.objDB2Clase(vgk.loTopol);

	var raspa = vgk.plantas.getRaspa();
	vgk.appListaGrupo.actualiza(raspa);
}

function cargaFruta(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoCargaFruta;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

//------------------------------------------------------------------- Plantas [HORTA|FRUTA]
function ecoGetPlantas(xhr){
	var modo = vgk.appModoPlantas.modo;
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		var org = obj.meta.org;
		var iam = obj.meta.iam;

		var ok0 = true && (org == vgk.user.org);
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
	var modo = vgk.appModoPlantas.modo;
	var params = vgApp.paramsXHR;
//	params.base = '/metas/';
	params.base = '/metasByOrg/';
	params.eco = ecoGetPlantas;
	if (modo == 'HORTA') params.iam = 'Horta';
	else  params.iam = 'Fruta';
	params.org = vgk.user.org;

//	ajaxGetMetas(params);
	ajaxGetMetasByOrg(params);
}


//------------------------------------------------------------------- Tasks semilla
function ecoBorraTasks(xhr){
	console.log('Tareas borradas');
}
function borraTasks(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoBorraTasks; 
	params.iam = 'GrafoTasks';
	params.topolId = _id;
	ajaxDeleteTopol(params);

}

function ecoGrabaTasksSeed(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	var tasksId = vgk.loTopol._id;
	var grupo = vgk.appModal.item;
	grupo.obj.tasks_id = tasksId;
	vgk.plantas.updtNodoSelf(grupo);
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

	var id0 = vgk.appListaGrupo.idAct;
	var grupo = vgk.plantas.getNodoById(id0);
	
	vgk.grafoTasks = new GrafoTasks('Tasks_'+grupo.tag,todos);

	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGrabaTasksSeed; 
	params.iam = 'GrafoTasks';
	params.txt = o2s(vgk.grafoTasks.clase2ObjDB());
	console.log(params.txt);
	if (tasksId){
		params.topolId = tasksId;
		ajaxPutTopol(params);
	}
	else ajaxPostTopol(params);
	return false;


}


function editTasksSeed(){
	var grupo = vgk.appModal.item;
	var tasksId = grupo.obj.tasks_id;
	if (!tasksId){
		var ok = confirm('No hay tareas. Crearlas?');
		if (ok) creaTasksSeed();
	}
	else goTasksGrafo(tasksId);
	vgk.appModal.showModal = false;
}

function resetTasksSeed(){
	var grupo = vgk.appModal.item;
	var tasksId = grupo.obj.tasks_id;
	if (!tasksId){
		var ok = confirm('No hay tareas. Crearlas?');
		if (ok) creaTasksSeed();
	}
	else {
		var ok = confirm('Regenerar tasks?');
		if (ok) creaTasksSeed(tasksId);
	}
	vgk.appModal.showModal = false;
}