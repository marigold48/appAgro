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
				editaItem('ITEM',item,grabaNuevoItem,borraItem);
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

//------------------------------------------------------------------- userMenu/vueApp cascade
function mostrarExplt(){
	vgk.treeData = vgk.explt.reto2vue();
	vgk.appExplt.actualiza(vgk.treeData);
}

//------------------------------------------------------------------- Init
function sesionExpltOK(sesion){
	ajaxGetKernelPag();
	vgk.postGetLaExplt = mostrarExplt;
	ajaxGetLaExplt(); // pkg_Explt.js
}

function initExplt(){
	initAppsGlobal();
	initAppsExplt();

	validaSesion('usrMenu',sesionExpltOK);
}
