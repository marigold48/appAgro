import utils  from '/k1/libK1_Utils.js'
import ajax   from '/k1/libK1_Ajax.js'
import topol  from '/k1/libK1_Topol.js'
import vapps  from '/k1/libK1_vApps.js'

import CCPAE from '/js/agro_CCPAE.js'
import agro from '/js/agro_Clases.js'


function initAppsExplotacion(){
	utils.vgk.dataExplotacion = {};

// define the item component
	utils.vgk.item = Vue.component('item', {
		template: '#item-template',
		props: {
			model: Object
		},
		data: function () {
			return {
				open: false
			}
		},
		computed: {
			isFolder: function () {
				return this.model.hijos && this.model.hijos.length;
			}
		},
		methods: {
			toggle: function () {
				if (this.isFolder) this.open = !this.open;
			},
			changeType: function () {
				if (!this.isFolder) {
					Vue.set(this.model, 'hijos', []);
						this.addChild();
						this.open = true;
					}
				},
			addChild: function () {
				addNuevoItem(this.model.id0);
			},
			editItem: function () {
				var item = utils.vgk.explt.getNodoById(this.model.id0);
				switch(item.iam){
					case 'rNodo':
						console.log('Entra por rNodo');
						vapps.editaItem('NODO',item,grabaNuevoItem,borraItem);
						break;
					case 'ItemCCPAE':
						vapps.editaItem('EXPLT',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg00':
						vapps.editaItem('REG00',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01A':
						vapps.editaItem('REG01A',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01B':
						vapps.editaItem('REG01B',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01C':
						vapps.editaItem('REG01C',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01D':
						vapps.editaItem('REG01D',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01E':
						vapps.editaItem('REG01E',item,grabaNuevoItem,borraItem);
						break;
					case 'ItemCCPAE':
						console.log('Entra por ItemCCPAE');
						vapps.editaItem('ItemArbol',item,grabaNuevoItem,borraItem);
						break;
					case 'ItemInvent':
						console.log('Entra por ItemInvent');
						vapps.editaItem('ItemArbol',item,grabaNuevoItem,borraItem);
						break;
					case 'Tractor':
						console.log('Entra por Tractor');
						vapps.editaItem('TRACTOR',item,grabaNuevoItem,borraItem);
						break;
					case 'Operario':
						console.log('Entra por Operario');
						vapps.editaItem('OPERARIO',item,grabaNuevoItem,borraItem);
						break;
				}
			}
		} // methods
	}) // Vue.component

	utils.vgk.appExplotacion = new Vue({
		el: '#explotacion',
			data: {
				treeData: utils.vgk.dataExplotacion
			},
		methods : {
			actualiza : function(arbol){this.treeData = arbol}
		}
	})

	utils.vgk.appMalla = new Vue({
		el: "#appMalla",
		data:{
			tabla : []
		},
		methods : {
			grabaMallaOA(){updateMallaOA()},
			onOff : function(iRow,iCol){
				if (!iRow || !iCol) return;
				utils.vgk.mallaOA.onOff(iRow,iCol);
				utils.vgk.appMalla.tabla = utils.vgk.mallaOA.getMatrizVue(true);
			}
		}
	})

} // function


//===================================================================	Show/Edit CCPAE (Inventario)

function showExplotacion(modo){
	utils.vgk.appExplotacion.actualiza(utils.vgk.explt.reto2vue());
}
//------------------------------------------------------------------- Crear CCPAE / Propietario
function borraItem(){
	alert('borraItem');
}
function addNuevoItem(id0){
	var padre = utils.vgk.explt.getNodoById(id0);
	console.log('addNuevoItem: '+ utils.o2s(padre));
	var item = eval('new '+padre.obj.iamHijos);
	utils.vgk.explt.addNodoHijo(padre,item);
	showExplotacion(utils.vgk.modoExplt);
	updateExplotacion();
}

function grabaNuevoItem(){
	var item = utils.vgk.appModal.item;

	if (utils.vgk.appModal.editON) utils.vgk.explt.updtNodoSelf(item);
	else{ 
		alert('No es Edit??');
	}
	showExplotacion(utils.vgk.modoExplt);
	updateExplotacion();
	utils.vgk.appModal.show = false;

}

function addNuevoHijo(){
	var item = utils.vgk.appModal.item;

	if (utils.vgk.appModal.editON){
		var nuevo = new ItemCCPAE('Nuevo');
		utils.vgk.explt.addNodoHijo(item,nuevo);
	}
	else{ 
		alert('No es Edit??');
	}
	showExplotacion(utils.vgk.modoExplt);
	updateExplotacion();
	utils.vgk.appModal.show = false;

}

function editItem(model){
	var item = utils.vgk.explt.getNodoById(model.id0);
	vapps.editaItem('ITEM',item,grabaNuevoItem,borraItem);
}

//------------------------------------------------------------------- Nueva Explotacion
function ecoGrabaCCPAE(xhr){
	var resp = JSON.parse(xhr.responseText);
	utils.vgk.explt_id = resp._id;
	console.log ('Grabado nuevo CCPAE: ' + resp._id);
	return false;
}

function grabaNuevoCCPAE(){
	utils.vgk.explt = CCPAE.mkExpltCCPAE();
	utils.vgk.modoExplt = 'CCPAE';
	showExplotacion('CCPAE');

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGrabaCCPAE; 
	params.txt = utils.o2s(utils.vgk.explt.clase2ObjDB());
	ajax.ajaxPostTopol(params);

	utils.vgk.appModal.show = false;
}

//------------------------------------------------------------------- Nuevo Inventario
function ecoGrabaInvent(xhr){
	var resp = JSON.parse(xhr.responseText);
	utils.vgk.explt_id = resp._id;
	console.log ('Grabado nuevo inventario: ' + resp._id);
	return false;
}

function grabaNuevoInvent(){
	var raiz = new topol.rNodo('Datos inventario : '+utils.vgk.user.org);
	utils.vgk.invent = new agro.Invent('Invent_'+utils.vgk.user.org,[raiz]);

	var tracts = new ItemInvent('Tractores');
	tracts.obj.iamHijos = 'Tractor';
	utils.vgk.invent.addNodoHijo(raiz,tracts);
	var jdeere = new Tractor('John Deere');utils.vgk.invent.addNodoHijo(tracts,jdeere);
	console.log(utils.o2s(jdeere));
	var kubota = new Tractor('Kubota');utils.vgk.invent.addNodoHijo(tracts,kubota);
	console.log(utils.o2s(kubota));

	var opers = new ItemInvent('Operarios');
	opers.obj.iamHijos = 'Operario';
	utils.vgk.invent.addNodoHijo(raiz,opers);
	var pepe = new Operario('Pepe');
	pepe.obj = {nombre:'Jose Garcia',dni:'12345678X'}
	utils.vgk.invent.addNodoHijo(opers,pepe);
	var juan = new Operario('Juan');
	juan.obj = {nombre:'Juan Sanchez',dni:'56781234K'}
	utils.vgk.invent.addNodoHijo(opers,juan);

	showExplotacion('INVENT');

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGrabaInvent; 
	params.txt = utils.o2s(utils.vgk.invent.clase2ObjDB());
	if (utils.vgk.invent_id){
		params.topolId = utils.vgk.invent_id;
		ajax.ajaxPutTopol(params);
	}
	else ajax.ajaxPostTopol(params);

	utils.vgk.appModal.show = false;
}

function regenera(){
	alert(utils.vgk.modoExplt);
	if (!utils.vgk.modoExplt) return;

	switch (utils.vgk.modoExplt){
		case 'INVENT':
			grabaNuevoInvent();
			break;
	}
}
//------------------------------------------------------------------- Update Explotacion

function ecoUpdateExplotacion(xhr){
	var resp = JSON.parse(xhr.responseText);
	console.log('Actualizado: ' + resp.meta.tag+ ' :: ' +resp._id);
	return false;
}

function updateExplotacion(){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateExplotacion;
	params.txt = utils.o2s(utils.vgk.explt.clase2ObjDB());
	params.topolId = utils.vgk.explt_id;
	ajax.ajaxPutTopol(params);
	return false;
}

//------------------------------------------------------------------- Pick CCPAE
function ecoGetExplotacion(xhr){
	console.log('ecoGetExplotacion: '+utils.vgk.modoExplt);
	utils.vgk.loTopol = JSON.parse(xhr.responseText);
	console.log(utils.o2s(utils.vgk.loTopol.meta));
	utils.vgk.explt_id = utils.vgk.loTopol._id;
	switch (utils.vgk.loTopol.meta.iam){
		case 'Explt':
		case 'CCPAE':
			utils.vgk.explt = new agro.CCPAE("",[]);
			break;
		case 'Invent':
			utils.vgk.explt = new agro.Invent("",[]);
			break;
		}
		
		utils.vgk.explt.objDB2Clase(utils.vgk.loTopol);
		showExplotacion(utils.vgk.modoExplt);
}


//------------------------------------------------------------------- Get CCPAEs
function getUnCCPAE(_id){
	utils.vgk.explt_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetExplotacion;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}
function ecoGetCCPAEs(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && obj.meta.iam == 'CCPAE') items.push(obj);
	})
	if (!items.length){	grabaNuevoCCPAE();}
	else if (items.length== 1){getUnCCPAE(items[0]._id);}  // hay una sola lista
	else {
		alert ('Hay varios !!!');
		getUnCCPAE(items[0]._id);
	}
}


function ajaxGetCCPAEs() {
	var params = vgApp.paramsXHR;
	params.base = '/metas/';
	params.eco = ecoGetCCPAEs;
	params.iam = 'CCPAE';

	ajax.ajaxGetMetas(params);
}
//------------------------------------------------------------------- Get Invents
function getUnInvent(_id){
	utils.vgk.invent_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetExplotacion;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}
function ecoGetInvents(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && obj.meta.iam == 'Invent') items.push(obj);
	})
	if (!items.length){	grabaNuevoInvent();}
	else if (items.length== 1){getUnInvent(items[0]._id);}  // hay una sola lista
	else {
		alert ('Hay varios !!!');
		getUnInvent(items[0]._id);
	}
}

function ajaxGetInvents() {
	var params = vgApp.paramsXHR;
	params.base = '/metas/';
	params.eco = ecoGetInvents;
	params.iam = 'Invent';

	ajax.ajaxGetMetas(params);
 }



//------------------------------------------------------------------- Mostrar
function mostrarCCPAE(){
	utils.vgk.modoExplt = 'CCPAE';
	ajaxGetCCPAEs();
	console.log('Modo Explt. '+ utils.vgk.modoExplt)
//	utils.vgk.treeData = utils.vgk.explt.reto2vue();
//	utils.vgk.appCCPAE.actualiza(utils.vgk.treeData);
}

function mostrarInvent(){
	utils.vgk.modoExplt = 'INVENT';
	ajaxGetInvents();
	console.log('Modo Explt. '+ utils.vgk.modoExplt)
//	utils.vgk.treeData = utils.vgk.invent.reto2vue();
//	utils.vgk.appExplotacion.actualiza(utils.vgk.treeData);
}

//------------------------------------------------------------------- Malla Operarios/Aperos
function demo_malla_OxA(){
	if (utils.vgk.modoExplt == 'INVENT'){
		var raiz = new topol.rNodo('Op/Aperos');
		var mallaOA = new agro.MallaOA('MallaOA_'+utils.vgk.user.org,[raiz]);
		var row1 = new topol.rNodo('Row 1'); mallaOA.addNodoRow(row1);
		var row2 = new topol.rNodo('Row 2'); mallaOA.addNodoRow(row2);
		var row3 = new topol.rNodo('Row 3'); mallaOA.addNodoRow(row3);

		var col1 = new topol.rNodo('Col 1'); mallaOA.addNodoCol(col1);
		var col2 = new topol.rNodo('Col 2'); mallaOA.addNodoCol(col2);
		var col3 = new topol.rNodo('Col 3'); mallaOA.addNodoCol(col3);

		var nudo11 = new topol.rNudo('Nudo 1-1',row1,col1,0);	mallaOA.addNudo(nudo11);
		var nudo22 = new topol.rNudo('Nudo 2-2',row2,col2,0);	mallaOA.addNudo(nudo22);
		var nudo33 = new topol.rNudo('Nudo 3-3',row3,col3,0);	mallaOA.addNudo(nudo33);
		
		utils.vgk.appMalla.tabla = mallaOA.getMatrizVue(true);  // true : presenta los simbolos de check/no-check
		utils.vgk.mallaOA = mallaOA;
	}
}


function ecoUpdateMallaOA(xhr){
	var resp = JSON.parse(xhr.responseText);
	utils.vgk.mallaOA_id = resp._id;
	console.log('Actualizado: ' + resp.meta.tag+ ' :: ' +resp._id);
	return false;
}

function updateMallaOA(){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateMallaOA;
	params.txt = utils.o2s(utils.vgk.mallaOA.clase2ObjDB());
	if (utils.vgk.mallaOA_id){
		params.topolId = utils.vgk.mallaOA_id;
		ajax.ajaxPutTopol(params);
	}
	else ajax.ajaxPostTopol(params);
	return false;
}

function ecoGetMallaOA(xhr){
	utils.vgk.loTopol = JSON.parse(xhr.responseText);
	console.log(utils.o2s(utils.vgk.loTopol.meta));
	utils.vgk.mallaOA_id = utils.vgk.loTopol._id;
	utils.vgk.mallaOA = new agro.MallaOA("",[]);

	utils.vgk.mallaOA.objDB2Clase(utils.vgk.loTopol);
	
	var nudos= utils.vgk.mallaOA.getNudos();
	nudos.map(function(nudo){
		console.log(utils.o2s(nudo));
	})

	utils.vgk.appMalla.tabla = utils.vgk.mallaOA.getMatrizVue(true);
}


function get1mallaOA(_id){
	utils.vgk.invent_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetMallaOA;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}
function ecoGetMallasOA(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && obj.meta.iam == 'MallaOA') items.push(obj);
	})
	if (!items.length){
		var ok = confirm('No existe Malla Op/Aperos. Crearla?');
		if (ok)	nuevaMallaOA();
	}
	else if (items.length== 1){get1mallaOA(items[0]._id);}  // hay una sola lista
	else {
		alert ('Hay varios !!!');
		get1mallaOA(items[0]._id);
	}
}

function ajaxGetMallasOA() {
	var params = vgApp.paramsXHR;
	params.base = '/metas/';
	params.eco = ecoGetMallasOA;
	params.iam = 'MallaOA';

	ajax.ajaxGetMetas(params);
 }

function malla_OxA(){
	ajaxGetMallasOA();
}
function nuevaMallaOA(){
	var rows = [];
	var cols = [];
	var raspa = utils.vgk.explt.getRaspa();
	raspa.map(function(nodo){
		     if (nodo.obj.iamHijos == 'Tractor') rows = utils.vgk.explt.getHijosNodo(nodo);
		else if (nodo.obj.iamHijos == 'Operario') cols = utils.vgk.explt.getHijosNodo(nodo);
	})
	var raiz = new topol.rNodo('Op/Aperos');
	var mallaOA = new agro.MallaOA('MallaOA_'+utils.vgk.user.org,[raiz]);

	rows.map(function(row){
		mallaOA.addNodoRow(row);
	})

	console.log(utils.o2s(cols));
	cols.map(function(col){
		mallaOA.addNodoCol(col);
	})

	utils.vgk.appMalla.tabla = mallaOA.getMatrizVue(true);
	utils.vgk.mallaOA = mallaOA;

	updateMallaOA();
}
//------------------------------------------------------------------- Export default
export default {
	initAppsExplotacion,
	ajaxGetCCPAEs,ajaxGetInvents,
	mostrarCCPAE,mostrarInvent,regenera,malla_OxA
}

