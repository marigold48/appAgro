
function initAppsAlmanak(){
	if(r$('divMes')){
		vgk.appMes = new Vue({
			el: '#divMes',
			data : {
				tag : '',
				jar : 2019,
				mes : 0,
				heads : ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
				items : [],
				idAct : 0,
			},
		methods :{
			actualiza : function(dias){this.items = dias;},
			actualizaTag: function(tag){this.tag = tag;},
			verSemana: function(sem){showSemana(sem);},
			avant : function(){
				if (this.mes < 11)  showAlmanak(++this.mes);
				else return;
				},
			atras : function(){
				if (this.mes)  showAlmanak(--this.mes);
				else return;
				},
			avantTodo : function(){
				this.mes = 11;
				showAlmanak(this.mes);
				},
			atrasTodo : function(){
				this.mes = 0;
				showAlmanak(this.mes);
				}
		}
		})
	}	

	if(r$('divSem')){
		vgk.appSem = new Vue({
			el: '#divSem',
			data : {
				tag : '',
				sem : 0,
				heads : ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
				items : [],
				idAct : 0,
			},
		methods :{
			actualiza : function(dias){this.items = dias;},
			actualizaTag: function(tag){this.tag = tag;},
			showMes: function(dia){showAlmanak(dia.mes);},
			avant : function(){
				if (this.sem < 52)  showSemana(++this.sem);
				else return;
				},
			atras : function(){
				if (this.sem > 1)  showSemana(--this.sem);
				else return;
				},
		}
		})
	}	

}


//------------------------------------------------------------------- Kronos
function avantJar(){
	var jar = vgk.almanak.jar;
	vgk.almanak = new rAlmanak('x',[],jar+1);
	showAlmanak(0);
}
function atrasJar(){
	var jar = vgk.almanak.jar;
	vgk.almanak = new rAlmanak('x',[],jar-1);
	showAlmanak(11);
}


function showSemana(sem){
	var filas = vgk.almanak.getFilasSem(sem);
	if (filas.length){
		vgk.appSem.sem = sem;
		vgk.appSem.tag = 'Semana '+sem+' - '+vgk.appMes.jar;
		vgk.appSem.actualiza(filas);
		r$('divMes').style.display = 'none';
		r$('divSem').style.display = 'block';
	}

}

function showAlmanak(mes){
	r$('divMes').style.display = 'block';
	r$('divSem').style.display = 'none';
	var filas = vgk.almanak.getFilasMes(mes);
	vgk.appMes.actualiza(filas);
	vgk.appMes.mes = parseInt(mes);
	var tag = vgk.almanak.getTagMes(mes);
	vgk.appMes.actualizaTag(tag)
}
//------------------------------------------------------------------- Kairos
// Cronos se genera cada vez. Los id0s cambian, por tanto
// Kairos se graba en la BDD.Al editar, el item a punta al nodo en Kronos
// Los cambios que hacemos se reflejan inmediatamente en Kronos.
// Pero hay que grabarlos en Kairos.
// Al borrar un dia de Kairos, hay que 'resetear' Kronos, y actualizar Kairos.
function borraDia(){
	var dia = vgk.appModal.item;
	vgk.kairos.removeDia(dia);
	vgk.almanak.resetNodoCron(dia);
	updateKairos();
	vgk.appModal.show = false;
	showAlmanak(vgk.appMes.mes);
}
function grabaDia(){
	var dia = vgk.appModal.item;
	vgk.kairos.upsertDia(dia);
	updateKairos();
	vgk.appModal.show = false;
	showAlmanak(vgk.appMes.mes);
}

function setDia(id0){
	var dia = vgk.almanak.getNodoById(id0);
	if (!vgk.kairos_id){ console.log('No hay Kairos');return;}
	editaItem('DIA',dia,grabaDia,borraDia);
}
//------------------------------------------------------------------- Crear Lista de Kairos
function ecoGet1Kairos(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.kairos_id = loTopol._id;
	vgk.kairos = new rKairos("",[]);
	vgk.kairos.objDB2Clase(loTopol);
	var crons = vgk.kairos.nodos;
	crons.map(function(cron){
		vgk.almanak.addNodoCron(cron);
	})
	showAlmanak(vgk.appMes.mes);
}

function get1Kairos(_id){
	vgk.kairos_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Kairos;
	params.topolId = _id;

	ajaxGet1Topol(params);
	vgk.appModal.show = false;
	return false;
}

function cargaKairos(){
	get1Kairos(vgk.appModal.idAct);
}

function ecoNuevoKairos(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.kairos_id = loTopol._id;
	vgk.listaKairos.push({id:loTopol._id,meta:loTopol.meta});
	vgk.appModal.show = false;
}
function ecoUpdateKairos(xhr){
	console.log('Actualizado Kairos ');
}
function updateKairos(){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateKairos; 
	params.txt = o2s(vgk.kairos.clase2ObjDB());
	params.topolId = vgk.kairos_id;
	ajaxPutTopol(params);
}


function nuevoKairos(){
	var nom = prompt('Nombre?');
	if (!nom) return;
	vgk.kairos = new rKairos(nom,[]);
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoKairos; 
	params.txt = o2s(vgk.kairos.clase2ObjDB());
	ajaxPostTopol(params);
}


function ecoGetKairos(xhr){
	var objs = JSON.parse(xhr.responseText);
	vgk.listaKairos = objs;
}

function ajaxGetKairos() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetKairos;
	params.iam = 'rKairos';
	params.org = vgk.user.org;

	ajaxGetMetasByOrg(params);
 }

function showListaKairos(){
	vgk.appModal.items = vgk.listaKairos;
	if (vgk.listaKairos.length) vgk.appModal.idAct = vgk.listaKairos[0]._id;
	vgk.appModal.conds = {retol : 'Lista Kairos'};
	vgk.appModal.modo = 'modal-container';
	vgk.appModal.edit_t = 'LISTA';
	vgk.appModal.show = true;
}
//------------------------------------------------------------------- Init
function sesionCalendarioOK(sesion){
	ajaxGetClasesPag();
	var hoy = new Date();
	var jar = hoy.getFullYear();
	var mes = hoy.getMonth();
	console.log(mes+'/'+jar);
	vgk.almanak = new rAlmanak('x',[],jar);
	vgk.appMes.jar = jar;
	showAlmanak(mes); 

	ajaxGetKairos()
}

function initCalendario(){
	initAppsGlobal();
	initAppsAlmanak();
//	initAppsKronos();

	validaSesion('usrMenu',sesionCalendarioOK);// libK1_Sesion.js
}
