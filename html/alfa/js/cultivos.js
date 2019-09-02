
function initAppsSuelo4Cult(){
	if (r$('lstFincas')){
		vgk.appListaFincas = new Vue({
			el: '#lstFincas',
			data: {
				items: [],
				idAct : 0,
			},
			methods :{
				getUnaFinca: function(_id){ getUnaFinca(_id);},
				actualiza : function(items){
					this.items = items;
					if (items.length) this.idAct = items[0]._id;
				},
			}
		}) 
	}
	
	if(r$('lstZonas')){
		vgk.appListaZonas = new Vue({
			el: '#lstZonas',
			data: {
				items: [],
				idAct : 0
			},
			methods : {
				actualiza : function(items){
					this.items = items;
					if (items.length){ this.idAct = items[0].id0;
					renderBancales(items[0].id0);
					}
				},
				cargaZona: function(_id,id0){ cargaFincaZona(_id,id0);},
				showHijos: function(id0){renderBancales(id0);}
			}
			}) 
	}	

	if(r$('divBancales')){
		vgk.appBancales = new Vue({
			el: '#divBancales',
			data : {
				items : [],
				idAct : 0,
			},
			methods :{
				limpia : function(){
					this.bancales = [];
					vgk.appRooms.limpia();
				},
				actualiza : function(items){
					this.items = items;
				},
				editBancal: function(id0){
					alert(id0);
					var bancal = vgk.finca.getNodoById(id0);
					vgk.appEdit.bancal = bancal;
					vgk.appEdit.edit_t = 'BANCAL';
					vgk.appEdit.showModal = true;
					vgk.appEdit.editON = true;
				},
				plantaBancal : function(id0){
					if (!vgk.escenario_id){alert('No hay escenario');return;}
					plantaBancal(id0); // en pkg_Cultivos.js
				},
				goApoyos : function(_id){
					goApoyos(_id);
				}
			}
		})
	}	
}

//=================================================================== CULTIVOS

function initAppEscenarios(){

	if (r$('modoCultivo')){
		vgk.appModoCultivo = new Vue({
			el: '#modoCultivo',
			data: { 
				modo: 'HORTA'
			},
			methods : {
				toggle : function(modo){
					this.modo = modo;
					getPlantas4Cult(modo);
				}
			}
		})
	}

	if(r$('divEscenarios')){
		vgk.appEscenarios = new Vue({
			el: '#divEscenarios',
			data : {
				tagEscenario :'Ninguno',
				bancal :'', 
				vardd : '',
				actual : '',
				items : [],
				idAct : 0,
			},
			methods :{
				nuevoEscenario : function(){nuevoEscenario();},
				borraEscenario : function(){borraEscenario();},
				limpia : function(){
					this.bancal = {};
					this.items = [];
				},
				reset : function(){
					this.bancal = {};
				},
				actualiza : function(escenario){
					this.limpia();
					this.tagEscenario = escenario.meta.tag;
					this.items = escenario.getCultivos();
				},
				editCultivo: function(cult){
					editCultivo(cult);
				},
			}
		})

	}	
		vgk.appEscenarios.limpia();
}


// pkg_Cultivos.js
function editTasksCult(){
	var cult = vgk.appModal.item;
	goTasksGrafo(cult.obj.tasks_id);
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
	vgk.grafoTasks = new GrafoTasks('x',[]);
	vgk.grafoTasks.objDB2Clase(loTopol);
	vgk.grafoTasks.cambiaIds();

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateTasksCult; 
	params.txt = o2s(vgk.grafoTasks.clase2ObjDB());
	params.topolId = loTopol._id;
	ajaxPutTopol(params);

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

function editApoyos(){
	var cult = vgk.appModal.item;

	var esq_id = cult.obj.esqma_id;
	if (!esq_id){
		var ok = confirm('No hay Esquema. Crearlo?');
		if (ok) creaApoyos();
	}
	else goApoyos(esq_id);
	vgk.appModal.show = false;
}

//------------------------------------------------------------------- Cultivos

function editCultivo(cult){
	editaItem('CULTIVO',cult,grabaCultivo,borraCultivo);
}

function borraCultivo(cult){
	vgk.escenario.borraCultivo(cult);
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
	else { 
		addCultivo(cultivo);
		if (cultivo.obj.tipo == 'FRUTA'){
			var ok = prompt('Crear esquema ?');
			if (ok){
				
			}
		}

	};
}


function ecoGet1Apoyos4Cult(xhr){
		var loTopol = JSON.parse(xhr.responseText);
		vgk.apoyos_id =  loTopol._id;
		vgk.apoyos = new Apoyos("",[]);
		vgk.apoyos.objDB2Clase(vgk.loTopol);
}

function get1Apoyos4Cult(_id){
	vgk.apoyos_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Apoyos4Cult;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

function plantaBancal(id0){
	var bancal = vgk.finca.getNodoById(id0);

	if (!bancal.obj.area){
		alert('Bancal con area 0 !!'); return;
	}

	var modo = vgk.appModoPlantas.modo;
	if (modo =='FRUTA' && ! bancal.obj.apoyos_id) {
		alert('Bancal sin apoyos !!'); return;
	}
	vgk.appEscenarios.bancal = bancal;
	get1Apoyos4Cult(bancal.obj.apoyos_id);
}

function crearCultivo(){
	if (!vgk.escenario_id){alert('No hay escenario'); return;}
	else if (!vgk.appEscenarios.bancal){alert('No hay bancal'); return;}


	var bancal = vgk.appEscenarios.bancal;
	console.log('crearCultivo: '+bancal.tag);
	var vardd = vgk.appEscenarios.vardd;
	console.log('crearCultivo: '+vardd.tag);
	var tagNudo = bancal.obj.codBancal+':'+vardd.obj.codVard;
 	var modo = vgk.appModoPlantas.modo;
	if ( modo == 'HORTA')
		var cult = new CultHorta (tagNudo,vardd,bancal);
	else{
		var raiz = vgk.apoyos.getRaiz();
		console.log(o2s(raiz));
		var cult = new CultFruta (tagNudo,vardd,bancal);
	}
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
	if (vgk.escenario.meta.iam == 'AgroJar') ajaxGetAgroJars();
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



//------------------------------------------------------------------- userMenu/vueApp cascade
function actualizaVueAppsZonas(){
	var zonas = vgk.finca.getRaspa();
	vgk.appH3Zona.actualiza(vgk.loTopol.meta.tag);
	vgk.appZona.actualiza(zonas);
}

function actualizaVueAppsPlantas(){
	if (vgk.user.rol == 'ADMIN'){
		vgk.appPlantas.actualiza(vgk.grupo.getRaspa());
		vgk.appH3Plantas.actualiza(vgk.grupo.meta.tag);
	}
	else alert('No es Admin');
}

//------------------------------------------------------------------- Init
function sesionCultivosOK(sesion){
	vgk.postLoadTextos = initAppsPlantas;
	ajaxGetMenuPag('Cultivos');
	ajaxGetTextPag('Cultivos');
	ajaxGetClasesPag();

	alert('Cargar escenario, temporada,\n o crear uno nuevo');
	vgk.postGetUnaFinca = actualizaVueAppsZonas;
	ajaxGetFincas();

	vgk.postGetUnGrpPlantas = actualizaVueAppsPlantas;
	ajaxGetPlantas();

	ajaxGetEscenarios();
	ajaxGetAgroJars();

}

function initCultivos(){
	vgk.esPagCultivos = true;
	initAppsGlobal();  // libK1_vApps.js
	initAppsSuelo4Cult(); // agro_vApps.js
	initAppEscenarios(); // 
//	initAppsPlantas();

	validaSesion('usrMenu',sesionCultivosOK);
}
