
/*
*/
//=================================================================== Esquema Arbolado
function initAppsApoyos(){
	vgk.dataApoyos = {};

// define the item component
	vgk.itemApoyos = Vue.component('item', {
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
				editItem(this.model);
			}
		} // methods
	}) // Vue.component

	// boot up the demo
	vgk.appApoyos = new Vue({
		el: '#apoyos',
			data: {
				treeData: vgk.dataApoyos
			},
		methods : {
			actualiza : function(apoyos){this.treeData = apoyos}
		}
	})

	vgk.appTramo = new Vue({
		el: '#tramo',
			data: {
				items: []
			},
		methods : {
			actualiza : function(items){this.items = items}
		}
	})
} // function


//===================================================================	Show/Edit Apoyos (Inventario)

function showApoyosVue(){
	var vueApoyos = vgk.apoyos.reto2vue();
	vgk.appApoyos.actualiza(vueApoyos);
}
//------------------------------------------------------------------- Crear Apoyos / Propietario

function addNuevoItem(id0){
	var padre = vgk.apoyos.getNodoById(id0);
	var item = new NodoTramo(padre.tag+'T'+(padre.hijos.length+1));
	vgk.apoyos.addNodoHijo(padre,item);
	showApoyosVue(vgk.apoyos);
	updateApoyos();
}

function grabaNuevoItem(){
	var item = vgk.appEdit.item;

	if (vgk.appEdit.editON) vgk.apoyos.updtNodoSelf(item);
	else{ 
		alert('No es Edit??');
	}
	showApoyosVue(vgk.apoyos);
	updateApoyos();
	vgk.appEdit.showModal = false;

}

function borraItem(){
	var item = vgk.appEdit.item;

	vgk.apoyos.borraNodoSelf(item);

	showApoyosVue(vgk.apoyos);
	updateApoyos();
	vgk.appEdit.showModal = false;

}

function addNuevoHijo(){
	var item = vgk.appEdit.item;

	if (vgk.appEdit.editON){
		var nuevo = new Item('Nuevo');
		vgk.apoyos.addNodoHijo(item,nuevo);
	}
	else{ 
		alert('No es Edit??');
	}
	showApoyosVue(vgk.apoyos);
	updateApoyos();
	vgk.appEdit.showModal = false;

}

function showTramo(tramo){
	var items = [];
	var raiz = vgk.apoyos.getRaiz();
	var vardds = raiz.obj.vardds;
	if (!vardds.length){
		alert('No hay variedades');
		return;
	}
	console.log(o2s(vardds));
	console.log(o2s(tramo.obj.descripc));
	tramo.obj.lista.map(function(x){
		var cod = vardds[x].cod;
		var item = new rNodo(cod);
		item.img = 'img/fruta/'+vardds[x].img;
		items.push(item);
	})
	vgk.appTramo.actualiza(items);
}
function editItem(model){
	var item = vgk.apoyos.getNodoById(model.id0);
	switch(item.iam){
		case 'NodoApoyos' : 
			editaItem('APOYOS',item,grabaNuevoItem,borraItem);
			break;
		case 'NodoLinea' : 
			editaItem('LINEA',item,grabaNuevoItem,borraItem);
			break;
		case 'NodoTramo' :
			showTramo(item); 
			break;
	}
	
}


//------------------------------------------------------------------- Update Esq. Arbolado

function ecoUpdateApoyos(xhr){
	var resp = JSON.parse(xhr.responseText);
	console.log('Actualizado apoyos: ' + resp._id);
	return false;
}

function updateApoyos(){

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateApoyos;
	params.txt = o2s(vgk.apoyos.clase2ObjDB());
	params.topolId = vgk.apoyos_id;
	ajaxPutTopol(params);
	return false;
}

//------------------------------------------------------------------- Pick Apoyos
function ecoGet1Apoyos(xhr){
		var loTopol = JSON.parse(xhr.responseText);
		vgk.apoyos_id = vgk.loTopol._id;
		vgk.apoyos = new Apoyos("",[]);
		vgk.apoyos.objDB2Clase(loTopol);

		vgk.postGet1Apoyos();
}

function get1Apoyos(_id){
	vgk.apoyos_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Apoyos;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}


//------------------------------------------------------------------- userMenu/vueApp cascade
function mostrarApoyos(){
	vgk.treeData = vgk.apoyos.reto2vue();
	vgk.appApoyos.actualiza(vgk.treeData);
}

//------------------------------------------------------------------- Init
function sesionApoyosOK(sesion){
	ajaxGetClasesPag();

	if (vgk.params._id){
		vgk.postGet1Apoyos = mostrarApoyos;
		get1Apoyos(vgk.params._id); // pkg_Apoyos.js
	}
	else {
		alert('No se especifican Apoyos');
		cierraSesion();
	}
}

function initApoyos(){
	initAppsGlobal();
	initAppsApoyos();

	validaSesion('usrMenu', sesionApoyosOK);
}
