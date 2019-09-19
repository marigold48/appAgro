import utils  from '/k1/libK1_Utils.js'
import ajax   from '/k1/libK1_Ajax.js'
import vapps  from '/k1/libK1_vApps.js'

import agro from '/js/agro_Clases.js'


function initAppsExplt(){
	utils.vgk.dataExplt = {};

// define the item component
	utils.vgk.itemExplt = Vue.component('item', {
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
						vapps.editaItem('NODO',item,grabaNuevoItem,borraItem);
						break;
					case 'ItemExplt':
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
				}
			}
		} // methods
	}) // Vue.component

// boot up the demo
utils.vgk.appExplt = new Vue({
	el: '#explt',
		data: {
			treeData: utils.vgk.dataExplt
		},
	methods : {
		actualiza : function(explt){this.treeData = explt}
	}
})

} // function


//===================================================================	Show/Edit Explt (Inventario)

function showExpltVue(){
	var vueExplt = utils.vgk.explt.reto2vue();
	utils.vgk.appExplt.actualiza(vueExplt);
}
//------------------------------------------------------------------- Crear Explt / Propietario
function borraItem(){
	alert('borraItem');
}
function addNuevoItem(id0){
	var item = new ItemExplt('Nuevo');
	var padre = utils.vgk.explt.getNodoById(id0);
	utils.vgk.explt.addNodoHijo(padre,item);
	showExpltVue(utils.vgk.explt);
	updateExplt();
}

function grabaNuevoItem(){
	var item = utils.vgk.appModal.item;

	if (utils.vgk.appModal.editON) utils.vgk.explt.updtNodoSelf(item);
	else{ 
		alert('No es Edit??');
	}
	showExpltVue(utils.vgk.explt);
	updateExplt();
	utils.vgk.appModal.show = false;

}

function addNuevoHijo(){
	var item = utils.vgk.appModal.item;

	if (utils.vgk.appModal.editON){
		var nuevo = new ItemExplt('Nuevo');
		utils.vgk.explt.addNodoHijo(item,nuevo);
	}
	else{ 
		alert('No es Edit??');
	}
	showExpltVue(utils.vgk.explt);
	updateExplt();
	utils.vgk.appModal.show = false;

}

function editItem(model){
	var item = utils.vgk.explt.getNodoById(model.id0);
	utils.vgk.appModal.item = item;
	utils.vgk.appModal.edit_t = "ITEM";
	utils.vgk.appModal.editON = true;
	utils.vgk.appModal.show = true;
}

//------------------------------------------------------------------- Nueva Explotacion
function ecoGrabaExplt(xhr){
	var resp = JSON.parse(xhr.responseText);
	utils.vgk.explt_id = resp._id;
	console.log ('Grabado nuevo explt: ' + resp._id);
	return false;
}

function grabaNuevaExplt(){
	var raiz = new ItemExplt('Datos '+utils.vgk.user.org);
	utils.vgk.explt = new Explt('Explt_'+utils.vgk.user.org,[raiz]);

	var portada = new rNodo('Portada'); utils.vgk.explt.addNodoHijo(raiz,portada);
	var prop = new Reg00('Propiet');utils.vgk.explt.addNodoHijo(portada,prop);
	var tecn = new Reg00('Tecnico');utils.vgk.explt.addNodoHijo(portada,tecn);

	var personal = new rNodo('Personal');utils.vgk.explt.addNodoHijo(raiz,personal);
	var pers1 = new Reg01A('Pers 1');utils.vgk.explt.addNodoHijo(personal,pers1);
	var pers2 = new Reg01A('Pers 1');utils.vgk.explt.addNodoHijo(personal,pers2);
	var pers3 = new Reg01A('Pers 1');utils.vgk.explt.addNodoHijo(personal,pers3);

	var contrat = new rNodo('Contratados');utils.vgk.explt.addNodoHijo(raiz,contrat);
	var contr1 = new Reg01B('Contr 1');utils.vgk.explt.addNodoHijo(contrat,contr1);
	var contr2 = new Reg01B('Contr 2');utils.vgk.explt.addNodoHijo(contrat,contr2);
	var contr3 = new Reg01B('Contr 3');utils.vgk.explt.addNodoHijo(contrat,contr3);

	var empresas = new rNodo('Empresas');utils.vgk.explt.addNodoHijo(raiz,empresas);
	var empr1 = new Reg01C('Empr 1');utils.vgk.explt.addNodoHijo(empresas,empr1);
	var empr2 = new Reg01C('Empr 2');utils.vgk.explt.addNodoHijo(empresas,empr2);
	var empr3 = new Reg01C('Empr 3');utils.vgk.explt.addNodoHijo(empresas,empr3);

	var maquinas = new rNodo('Maquinas');utils.vgk.explt.addNodoHijo(raiz,maquinas);
	var maqn1 = new Reg01D('Máqn 1');utils.vgk.explt.addNodoHijo(maquinas,maqn1);
	var maqn2 = new Reg01D('Máqn 2');utils.vgk.explt.addNodoHijo(maquinas,maqn2);
	var maqn3 = new Reg01D('Máqn 3');utils.vgk.explt.addNodoHijo(maquinas,maqn3);

	var mlloguer = new rNodo('Maq. lloguer');utils.vgk.explt.addNodoHijo(raiz,mlloguer);
	var llog1 = new Reg01E('Lloguer 1');utils.vgk.explt.addNodoHijo(mlloguer,llog1);
	var llog2 = new Reg01E('Lloguer 2');utils.vgk.explt.addNodoHijo(mlloguer,llog2);
	var llog3 = new Reg01E('Lloguer 3');utils.vgk.explt.addNodoHijo(mlloguer,llog3);

	showExpltVue();

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGrabaExplt; 
	params.txt = utils.o2s(utils.vgk.explt.clase2ObjDB());
	if (utils.vgk.explt_id){
		params.topolId = utils.vgk.explt_id;
		ajax.ajaxPutTopol(params);
	}
	else ajax.ajaxPostTopol(params);

	utils.vgk.appModal.show = false;
}

//------------------------------------------------------------------- Update Explotacion

function ecoUpdateExplt(xhr){
	var resp = JSON.parse(xhr.responseText);
	console.log('Actualizado explt: ' + resp._id);
	return false;
}

function updateExplt(){
	if (utils.vgk.explt.meta.org != utils.vgk.user.org){
		alert('Explt sin ORG:' + utils.vgk.explt.meta.org +':'+ utils.vgk.user.org);
		utils.vgk.explt.meta.org = utils.vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateExplt;
	params.txt = utils.o2s(utils.vgk.explt.clase2ObjDB());
	params.topolId = utils.vgk.explt_id;
	ajax.ajaxPutTopol(params);
	return false;
}

//------------------------------------------------------------------- Pick Explt
function ecoGetUnExplt(xhr){
		var respTxt = xhr.responseText;
		utils.vgk.loTopol = JSON.parse(respTxt);
		utils.vgk.explt_id = utils.vgk.loTopol._id;
		utils.vgk.explt = new agro.Explt("",[]);
		utils.vgk.explt.objDB2Clase(utils.vgk.loTopol);

		utils.vgk.postGetLaExplt();
}

function getUnaExplt(_id){
	utils.vgk.explt_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetUnExplt;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}

function ecoGetLaExplt(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && obj.meta.iam == 'Explt') items.push(obj);
	})
	if (items.length > 0){
		getUnaExplt(items[0]._id); // hay una sola lista
	}
	else {
		grabaNuevaExplt();
	}
}

function ajaxGetLaExplt() {

	var params = vgApp.paramsXHR;
	params.base = '/metas/';
	params.eco = ecoGetLaExplt;
	params.iam = 'Explt';

	ajax.ajaxGetMetas(params);
 }



//------------------------------------------------------------------- userMenu/vueApp cascade
function mostrarExplt(){
	utils.vgk.treeData = utils.vgk.explt.reto2vue();
	utils.vgk.appExplt.actualiza(utils.vgk.treeData);
}

export default {initAppsExplt,ajaxGetLaExplt,mostrarExplt}

