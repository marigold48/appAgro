function initAppsExplt(){
	vgk.dataExplt = {};

// define the item component
	vgk.itemExplt = Vue.component('item', {
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
				var item = vgk.explt.getNodoById(this.model.id0);
				switch(item.iam){
					case 'rNodo':
						editaItem('NODO',item,grabaNuevoItem,borraItem);
						break;
					case 'ItemExplt':
						editaItem('EXPLT',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg00':
						editaItem('REG00',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01A':
						editaItem('REG01A',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01B':
						editaItem('REG01B',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01C':
						editaItem('REG01C',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01D':
						editaItem('REG01D',item,grabaNuevoItem,borraItem);
						break;
					case 'Reg01E':
						editaItem('REG01E',item,grabaNuevoItem,borraItem);
						break;
				}
			}
		} // methods
	}) // Vue.component

// boot up the demo
vgk.appExplt = new Vue({
	el: '#explt',
		data: {
			treeData: vgk.dataExplt
		},
	methods : {
		actualiza : function(explt){this.treeData = explt}
	}
})

} // function


//===================================================================	Show/Edit Explt (Inventario)

function showExpltVue(){
	var vueExplt = vgk.explt.reto2vue();
	vgk.appExplt.actualiza(vueExplt);
}
//------------------------------------------------------------------- Crear Explt / Propietario
function borraItem(){
	alert('borraItem');
}
function addNuevoItem(id0){
	var item = new ItemExplt('Nuevo');
	var padre = vgk.explt.getNodoById(id0);
	vgk.explt.addNodoHijo(padre,item);
	showExpltVue(vgk.explt);
	updateExplt();
}

function grabaNuevoItem(){
	var item = vgk.appModal.item;

	if (vgk.appModal.editON) vgk.explt.updtNodoSelf(item);
	else{ 
		alert('No es Edit??');
	}
	showExpltVue(vgk.explt);
	updateExplt();
	vgk.appModal.show = false;

}

function addNuevoHijo(){
	var item = vgk.appModal.item;

	if (vgk.appModal.editON){
		var nuevo = new ItemExplt('Nuevo');
		vgk.explt.addNodoHijo(item,nuevo);
	}
	else{ 
		alert('No es Edit??');
	}
	showExpltVue(vgk.explt);
	updateExplt();
	vgk.appModal.show = false;

}

function editItem(model){
	var item = vgk.explt.getNodoById(model.id0);
	vgk.appModal.item = item;
	vgk.appModal.edit_t = "ITEM";
	vgk.appModal.editON = true;
	vgk.appModal.show = true;
}

//------------------------------------------------------------------- Nueva Explotacion
function ecoGrabaExplt(xhr){
	var resp = JSON.parse(xhr.responseText);
	vgk.explt_id = resp._id;
	console.log ('Grabado nuevo explt: ' + resp._id);
	return false;
}

function grabaNuevaExplt(){
	var raiz = new ItemExplt('Datos '+vgk.user.org);
	vgk.explt = new Explt('Explt_'+vgk.user.org,[raiz]);

	var portada = new rNodo('Portada'); vgk.explt.addNodoHijo(raiz,portada);
	var prop = new Reg00('Propiet');vgk.explt.addNodoHijo(portada,prop);
	var tecn = new Reg00('Tecnico');vgk.explt.addNodoHijo(portada,tecn);

	var personal = new rNodo('Personal');vgk.explt.addNodoHijo(raiz,personal);
	var pers1 = new Reg01A('Pers 1');vgk.explt.addNodoHijo(personal,pers1);
	var pers2 = new Reg01A('Pers 1');vgk.explt.addNodoHijo(personal,pers2);
	var pers3 = new Reg01A('Pers 1');vgk.explt.addNodoHijo(personal,pers3);

	var contrat = new rNodo('Contratados');vgk.explt.addNodoHijo(raiz,contrat);
	var contr1 = new Reg01B('Contr 1');vgk.explt.addNodoHijo(contrat,contr1);
	var contr2 = new Reg01B('Contr 2');vgk.explt.addNodoHijo(contrat,contr2);
	var contr3 = new Reg01B('Contr 3');vgk.explt.addNodoHijo(contrat,contr3);

	var empresas = new rNodo('Empresas');vgk.explt.addNodoHijo(raiz,empresas);
	var empr1 = new Reg01C('Empr 1');vgk.explt.addNodoHijo(empresas,empr1);
	var empr2 = new Reg01C('Empr 2');vgk.explt.addNodoHijo(empresas,empr2);
	var empr3 = new Reg01C('Empr 3');vgk.explt.addNodoHijo(empresas,empr3);

	var maquinas = new rNodo('Maquinas');vgk.explt.addNodoHijo(raiz,maquinas);
	var maqn1 = new Reg01D('Máqn 1');vgk.explt.addNodoHijo(maquinas,maqn1);
	var maqn2 = new Reg01D('Máqn 2');vgk.explt.addNodoHijo(maquinas,maqn2);
	var maqn3 = new Reg01D('Máqn 3');vgk.explt.addNodoHijo(maquinas,maqn3);

	var mlloguer = new rNodo('Maq. lloguer');vgk.explt.addNodoHijo(raiz,mlloguer);
	var llog1 = new Reg01E('Lloguer 1');vgk.explt.addNodoHijo(mlloguer,llog1);
	var llog2 = new Reg01E('Lloguer 2');vgk.explt.addNodoHijo(mlloguer,llog2);
	var llog3 = new Reg01E('Lloguer 3');vgk.explt.addNodoHijo(mlloguer,llog3);

	showExpltVue();

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGrabaExplt; 
	params.txt = o2s(vgk.explt.clase2ObjDB());
	if (vgk.explt_id){
		params.topolId = vgk.explt_id;
		ajaxPutTopol(params);
	}
	else ajaxPostTopol(params);

	vgk.appModal.show = false;
}

//------------------------------------------------------------------- Update Explotacion

function ecoUpdateExplt(xhr){
	var resp = JSON.parse(xhr.responseText);
	console.log('Actualizado explt: ' + resp._id);
	return false;
}

function updateExplt(){
	if (vgk.explt.meta.org != vgk.user.org){
		alert('Explt sin ORG:' + vgk.explt.meta.org +':'+ vgk.user.org);
		vgk.explt.meta.org = vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateExplt;
	params.txt = o2s(vgk.explt.clase2ObjDB());
	params.topolId = vgk.explt_id;
	ajaxPutTopol(params);
	return false;
}

//------------------------------------------------------------------- Pick Explt
function ecoGetUnExplt(xhr){
		var respTxt = xhr.responseText;
		vgk.loTopol = JSON.parse(respTxt);
		vgk.explt_id = vgk.loTopol._id;
		vgk.explt = new Explt("",[]);
		vgk.explt.objDB2Clase(vgk.loTopol);

		vgk.postGetLaExplt();
}

function getUnaExplt(_id){
	vgk.explt_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetUnExplt;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

function ecoGetLaExplt(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && obj.meta.iam == 'Explt') items.push(obj);
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

	ajaxGetMetas(params);
 }



//------------------------------------------------------------------- userMenu/vueApp cascade
function mostrarExplt(){
	vgk.treeData = vgk.explt.reto2vue();
	vgk.appExplt.actualiza(vgk.treeData);
}

//------------------------------------------------------------------- Init
function sesionExpltOK(sesion){
	ajaxGetMenuPag('Explotacion');
	ajaxGetTextPag('Explotacion');
	ajaxGetClasesPag();
	vgk.postGetLaExplt = mostrarExplt;
	ajaxGetLaExplt(); // pkg_Explt.js
}

function initExplt(){
	initAppsGlobal();
	initAppsExplt();

	validaSesion('usrMenu',sesionExpltOK);
}
