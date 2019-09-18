
import utils  from '/k1/libK1_Utils.js'
import ajax   from '/k1/libK1_Ajax.js'
import idioma from '/k1/libK1_Idioma.js'
import vapps  from '/k1/libK1_vApps.js'
import topol  from '/k1/libK1_Topol.js'

import local  from '/js/agro_VGlob.js'
import agro   from  '/js/agro_Clases.js'


function initAppsAlmanak(){
	if(utils.r$('divMes')){
		utils.vgk.appMes = new Vue({
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

	if(utils.r$('divSem')){
		utils.vgk.appSem = new Vue({
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
	var jar = utils.vgk.almanak.jar;
	utils.vgk.almanak = new rAlmanak('x',[],jar+1);
	showAlmanak(0);
}
function atrasJar(){
	var jar = utils.vgk.almanak.jar;
	utils.vgk.almanak = new rAlmanak('x',[],jar-1);
	showAlmanak(11);
}


function showSemana(sem){
	var filas = utils.vgk.almanak.getFilasSem(sem);
	if (filas.length){
		utils.vgk.appSem.sem = sem;
		utils.vgk.appSem.tag = 'Semana '+sem+' - '+utils.vgk.appMes.jar;
		utils.vgk.appSem.actualiza(filas);
		utils.r$('divMes').style.display = 'none';
		utils.r$('divSem').style.display = 'block';
	}

}

function showAlmanak(mes){
	utils.r$('divMes').style.display = 'block';
	utils.r$('divSem').style.display = 'none';
	var filas = utils.vgk.almanak.getFilasMes(mes);
	utils.vgk.appMes.actualiza(filas);
	utils.vgk.appMes.mes = parseInt(mes);
	var tag = utils.vgk.almanak.getTagMes(mes);
	utils.vgk.appMes.actualizaTag(tag)
}
//------------------------------------------------------------------- Kairos
// Cronos se genera cada vez. Los id0s cambian, por tanto
// Kairos se graba en la BDD.Al editar, el item a punta al nodo en Kronos
// Los cambios que hacemos se reflejan inmediatamente en Kronos.
// Pero hay que grabarlos en Kairos.
// Al borrar un dia de Kairos, hay que 'resetear' Kronos, y actualizar Kairos.
function borraDia(){
	var dia = utils.vgk.appModal.item;
	utils.vgk.kairos.removeDia(dia);
	utils.vgk.almanak.resetNodoCron(dia);
	updateKairos();
	utils.vgk.appModal.show = false;
	showAlmanak(utils.vgk.appMes.mes);
}
function grabaDia(){
	var dia = utils.vgk.appModal.item;
	utils.vgk.kairos.upsertDia(dia);
	updateKairos();
	utils.vgk.appModal.show = false;
	showAlmanak(utils.vgk.appMes.mes);
}

function setDia(id0){
	var dia = utils.vgk.almanak.getNodoById(id0);
	if (!utils.vgk.kairos_id){ console.log('No hay Kairos');return;}
	editaItem('DIA',dia,grabaDia,borraDia);
}
//------------------------------------------------------------------- Crear Lista de Kairos
function ecoGet1Kairos(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.kairos_id = loTopol._id;
	utils.vgk.kairos = new rKairos("",[]);
	utils.vgk.kairos.objDB2Clase(loTopol);
	var crons = utils.vgk.kairos.nodos;
	crons.map(function(cron){
		utils.vgk.almanak.addNodoCron(cron);
	})
	showAlmanak(utils.vgk.appMes.mes);
}

function get1Kairos(_id){
	utils.vgk.kairos_id = _id;
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Kairos;
	params.topolId = _id;

	ajaxGet1Topol(params);
	utils.vgk.appModal.show = false;
	return false;
}

function cargaKairos(){
	get1Kairos(utils.vgk.appModal.idAct);
}

function ecoNuevoKairos(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.kairos_id = loTopol._id;
	utils.vgk.listaKairos.push({id:loTopol._id,meta:loTopol.meta});
	utils.vgk.appModal.show = false;
}
function ecoUpdateKairos(xhr){
	console.log('Actualizado Kairos ');
}
function updateKairos(){
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateKairos; 
	params.txt = o2s(utils.vgk.kairos.clase2ObjDB());
	params.topolId = utils.vgk.kairos_id;
	ajaxPutTopol(params);
}


function nuevoKairos(){
	var nom = prompt('Nombre?');
	if (!nom) return;
	utils.vgk.kairos = new rKairos(nom,[]);
	var params = local.vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoKairos; 
	params.txt = o2s(utils.vgk.kairos.clase2ObjDB());
	ajaxPostTopol(params);
}


function ecoGetKairos(xhr){
	var objs = JSON.parse(xhr.responseText);
	utils.vgk.listaKairos = objs;
}

function ajaxGetKairos() {
	var params = local.vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetKairos;
	params.iam = 'rKairos';
	params.org = utils.vgk.user.org;

	ajax.ajaxGetMetasByOrg(params);
 }

function showListaKairos(){
	utils.vgk.appModal.items = utils.vgk.listaKairos;
	if (utils.vgk.listaKairos.length) utils.vgk.appModal.idAct = utils.vgk.listaKairos[0]._id;
	utils.vgk.appModal.conds = {retol : 'Lista Kairos'};
	utils.vgk.appModal.modo = 'modal-container';
	utils.vgk.appModal.edit_t = 'LISTA';
	utils.vgk.appModal.show = true;
}

export default {initAppsAlmanak,ajaxGetKairos,showAlmanak}