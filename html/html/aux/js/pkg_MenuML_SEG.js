

function initAppsMenuML(){
	vgk.dataMenuML = {};

// define the item component
	vgk.itemMenuML = Vue.component('item', {
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
vgk.appMenuML = new Vue({
	el: '#arbol',
		data: {
			treeData: vgk.dataMenuML
		},
	methods : {
		actualiza : function(arbolML){this.treeData = arbolML}
	}
})

} // function

//===================================================================	Show/Edit MenuML (Inventario)

function showMenuMLVue(){
	var vueMenuML = vgk.arbolML.reto2vue();
	vgk.appMenuML.actualiza(vueMenuML);
}
