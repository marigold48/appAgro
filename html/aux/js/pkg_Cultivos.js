// pkg_Cultivos.js
function editTasksCult(){
	var cult = vgk.appModal.item;
	goTasksGrafo(cult.obj.tasks_id);
}
//------------------------------------------------------------------- Esqma Arbolado
function ecoCreaEsqArbolado(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	var esqma_id = vgk.loTopol._id;
	var cult = vgk.appModal.item;
	cult.obj.esqma_id = esqma_id;
	updateEscenario();

	goEsqArbolado(esqma_id);
}


function creaEsqArbolado(){
	var linsF = prompt('Núm de lineas (1-99)');
	if (!linsF.match('[1-9][0-9]')){
		alert('Núm mal especificado');
		return;
	}
	var n = parseInt(linsF);

	var cult = vgk.appModal.item;
	var raiz = new NodoEsqma(cult.obj.tagZ);
	raiz.obj.codBancal = cult.obj.codZ;
	raiz.obj.vardds[0] = {'A': cult.obj.tagP};
	raiz.obj.lineas = n;

	var esq = new Esqma('Esq_'+cult.obj.codZ,[raiz]);

	for (var i=0;i<n;i++){
		var L = new NodoLinea('L'+(i+1));
		esq.addNodoHijo(raiz,L);
		for (var j=0;j<5;j++){
			var T = new NodoTramo('L'+(i+1)+'T'+(j+1));
			T.obj.descripc = 'AAAAAAAAAA';
			esq.addNodoHijo(L,T);

		}
	}

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCreaEsqArbolado; 
	params.iam = 'EsqArbol';
	params.txt = o2s(esq.clase2ObjDB());
	ajaxPostTopol(params);

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
	console.log('Tasks 2: '+loTopol._id);
	var cult = vgk.appModal.item;
	cult.obj.tasks_id = loTopol._id;
	updateEscenario();
}


function duplicaTasksIds(tasks_id){
	console.log('Tasks 1: '+tasks_id)
	var params = vgApp.paramsXHR;
	params.base = '/clone/';
	params.eco = ecoDuplicaTasks;
	params.topolId = tasks_id;

	ajaxDuplicaTopol(params);
	return false;
}


function editTasksCult(){
	var cult = vgk.appModal.item;

	var tasksId = cult.obj.tasks_id;
	if (!tasksId){
		var ok = confirm('No hay tareas. Crearlas?');
		if (ok) creaTasksCult();
	}
	else goTasksGrafo(tasksId);
	vgk.appModal.show = false;
}

function editEsqArbolado(){
	var cult = vgk.appModal.item;

	var esq_id = cult.obj.esqma_id;
	if (!esq_id){
		var ok = confirm('No hay Esquema. Crearlo?');
		if (ok) creaEsqArbolado();
	}
	else goEsqArbolado(esq_id);
	vgk.appModal.show = false;
}

//------------------------------------------------------------------- Cultivos

function editCultivo(cult){
	editaItem('CULTIVO',cult,grabaCultivo,borraCultivo);
}

function borraCultivo(cult){
	vgk.escenario.borraNodoSelf(cult);
	updateEscenario();
}


// OJO ! asegurarse que no se duplican los nodos de bancal ni variedad
function addCultivo(cultivo){
	var vardd = vgk.appEscenarios.vardd;
	var espec = vgk.plantas.getNodoById(vardd.id1);
	var grupo = vgk.plantas.getNodoById(espec.id1);
	var tasksGrp = grupo.obj.tasks_id;

	var vardd = vgk.appEscenarios.vardd.getNodoRow();
	console.log('addCultivo: '+o2s(vardd));
	var bancal = vgk.appEscenarios.bancal.getNodoCol();
	console.log('addCultivo: '+o2s(bancal));


	vgk.escenario.addNodoCol(bancal);
	vgk.escenario.addNodoRow(vardd);
	vgk.escenario.addNudo(cultivo);

	var nodos = vgk.escenario.nodos;
	nodos.map(function(nodo){
		console.log(o2s(nodo));
	})

	vgk.appEscenarios.actualiza(vgk.escenario);

	if (tasksGrp) duplicaTasksIds(tasksGrp);
	else updateEscenario();
}

function updateCultivo(cultivo){
	vgk.escenario.updtNodoSelf(cultivo);
	updateEscenario();
}

function grabaCultivo(){
	var cultivo = vgk.appModal.item;
//	vgk.appEscenarios.reset();
	vgk.appModal.show = false;
	if (vgk.appModal.editON) updateCultivo(cultivo);
	else addCultivo(cultivo);
}

function plantaBancal(id0){
	var bancal = vgk.finca.getNodoById(id0);
	vgk.appEscenarios.bancal = bancal;
}

function crearCultivo(){
	if (!vgk.escenario_id){alert('No hay escenario'); return;}
	else if (!vgk.appEscenarios.bancal){alert('No hay bancal'); return;}


	var bancal = vgk.appEscenarios.bancal;
	console.log('crearCultivo: '+o2s(bancal));
	var vardd = vgk.appEscenarios.vardd;
	var tagNudo = bancal.obj.codBancal+':'+vardd.obj.codVard;

 	var modo = vgk.appModoPlantas.modo;
	if ( modo == 'HORTA')
		var cult = new CultHorta (tagNudo,vardd,bancal);
	else
		var cult = new CultFruta (tagNudo,vardd,bancal);

	console.log('crearCultivo: ' + o2s(cult));

	crearItem('CULTIVO',cult,grabaCultivo);
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
	params.txt = o2s(vgk.escenario.clase2ObjDB());
	params.topolId = vgk.escenario_id;
	ajaxPutTopol(params);

}

function ecoNuevoEscenario(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.escenario_id = vgk.loTopol._id;
	vgk.appEscenarios.actualiza(vgk.escenario);
}

function nuevoEscenario(){
	var nom = prompt('Nombre?');
	if (!nom) return;
	var raiz = new RaizEsc(nom);
	var modo = vgk.appModoPlantas.modo;
	if (modo == 'HORTA') vgk.escenario = new EscHorta(nom,[raiz]);
	else if (modo == 'FRUTA') vgk.escenario = new EscFruta(nom,[raiz]);
	else {
		console.log('Modo Plantas no definido');
		return;
	}
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoEscenario; 
	params.iam = 'Escenario';
	params.txt = o2s(vgk.escenario.clase2ObjDB());
	ajaxPostTopol(params);
}


//------------------------------------------------------------------- Borra Escenario
function ecoBorraEscenario(xhr){
	vgk.appEscenarios.limpia();
	vgk.escenario_id = null;

	console.log('Escenario borrado');
	var loTopol = JSON.parse(xhr.responseText);
	if (loTopol.meta.iam == 'AgroJar') ajaxGetAgroJars();
	else ajaxGetEscenarios();
}
function borraEscenario(){
	var iam = vgk.escenario.meta.iam;
	if (iam == 'AgroJar') var msg = 'Borrar la temporada ';
	else var msg = 'Borrar la temporada ';
	if (!vgk.escenario_id){alert('No hay escenario activo'); return false;}
	else {
		var ok = confirm(msg+vgk.escenario.meta.tag+'?');
		if (!ok) return;
	}
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraEscenario;
	params.topolId = vgk.escenario_id;

	ajaxDeleteTopol(params);
	vgk.appModal.show = false;
	return false;
}

//-------------------------------------------------------------------

function ecoGet1Escenario(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.escenario_id = loTopol._id;

	switch(loTopol.meta.iam){
		case 'AgroJar': vgk.escenario = new AgroJar("",[]); break;
		case 'EscHorta': vgk.escenario = new EscHorta("",[]); break;
		case 'EscFruta': vgk.escenario = new EscFruta("",[]); break;
	}
	vgk.escenario.objDB2Clase(loTopol);
	var nodos = vgk.escenario.nodos;

	vgk.appEscenarios.actualiza(vgk.escenario);
}

function get1Escenario(_id){
	vgk.escenario_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Escenario;
	params.topolId = _id;

	ajaxGet1Topol(params);
	vgk.appModal.show = false;
	return false;
}

function cargaEscenario(){
	get1Escenario(vgk.appModal.idAct);
}

//------------------------------------------------------------------- Crear Lista de Escenarios
function ecoGetEscenarios(xhr){
	var objs = JSON.parse(xhr.responseText);
	vgk.listaEscenarios = objs;
}

function ajaxGetEscenarios() {
	var modo = vgk.appModoPlantas.modo;
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetEscenarios;
	if (modo == 'HORTA') params.iam = 'EscHorta';
	else  params.iam = 'EscFruta';
	params.org = vgk.user.org;

	ajaxGetMetasByOrg(params);
 }

function showListaEscenarios(){
	vgk.appModal.items = vgk.listaEscenarios;
	if (vgk.listaEscenarios.length) vgk.appModal.idAct = vgk.listaEscenarios[0]._id;
	vgk.appModal.conds = {retol : 'Lista Escenarios'};
	vgk.appModal.modo = 'modal-container';
	vgk.appModal.edit_t = 'LISTA';
	vgk.appModal.show = true;
}

//------------------------------------------------------------------- Crear Lista de AgroJars
function ecoGet1Esc4Add(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	var agrojar = new AgroJar('x',[]);
	agrojar.objDB2Clase(loTopol);

	var rows = vgk.escenario.getNodosRows();
	rows.map(function(row){
		console.log('row4add: '+o2s(row));
		agrojar.addNodoRow(row);
	})

	var cols = vgk.escenario.getNodosCols();
	cols.map(function(col){
		console.log('col4add: '+o2s(col));
		agrojar.addNodoCol(col);
	})

	var nudos = vgk.escenario.getNudos();
	nudos.map(function(nudo){
		console.log('nudo4add: '+o2s(nudo));
		agrojar.addNudo(nudo);
	})

	vgk.escenario_id = loTopol._id;
	vgk.escenario = agrojar;
	vgk.appEscenarios.actualiza(vgk.escenario);
	updateEscenario();
}

function addEsc2AgroJar(){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Esc4Add;
	params.topolId = vgk.appModal.idAct;

	ajaxGet1Topol(params);
	vgk.appModal.show = false;
	return false;

}

function ecoNuevoAgroJar(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.escenario_id = loTopol._id;
	ajaxGetAgroJars();
}
function nuevoAgroJar(){
	vgk.appModal.show = false;
	var jar = prompt('Temporada? ');
	if (!jar) return;
	var raiz = new RaizEsc('Temp '+jar);
	var agrojar = new AgroJar('Temporada '+jar,[raiz]);

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoAgroJar; 
	params.txt = o2s(agrojar.clase2ObjDB());
	vgk.escenario = agrojar;
	vgk.appEscenarios.actualiza(agrojar);
	ajaxPostTopol(params);

}

function ecoGetAgroJars(xhr){
	var objs = JSON.parse(xhr.responseText);
	vgk.listaAgroJars = objs;
}

function ajaxGetAgroJars() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetAgroJars;
	params.iam = 'AgroJar';
	params.org = vgk.user.org;

	ajaxGetMetasByOrg(params);
 }

function showListaAgroJars(){
	vgk.appModal.items = vgk.listaAgroJars;
	if (vgk.listaAgroJars.length) vgk.appModal.idAct = vgk.listaAgroJars[0]._id;
	vgk.appModal.conds = {retol : 'Lista Temporadas'};
	vgk.appModal.modo = 'modal-container';
	vgk.appModal.edit_t = 'LISTA_AJ';
	vgk.appModal.show = true;
}


