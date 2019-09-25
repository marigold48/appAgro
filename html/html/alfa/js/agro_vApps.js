
//------------------------------------------------------------------- Funciones Modo/Solapas

/*
function initApps(){
	initModal();

	if (r$('solapas')){
		vgk.appTabs = new Vue({
			el: "#solapas",
			data:{
		    activeTab: 1
		  }
		})
	}

}

function resetApps(){

}
*/


//=================================================================== SUELO
// Estas vApps estaban en mod_suelo.js

// Aquí se definen para uso de CULTIVOS
//------------------------------------------------------------------- Fincas

//------------------------------------------------------------------- Matrices

function initAppMalla(){

	Vue.component('demo-malla', {
		template: '#malla-template',
		props: {
			datos: Array,
			cols: Array,
			filterKey: String,
		},
		data: function () {
			var sortOrders = {};
			this.cols.forEach(function (key) {
				sortOrders[key] = 1;
			})
			return {sortKey: '',	sortOrders: sortOrders};
		},
		computed: {
			filteredData: function () {
				var sortKey = this.sortKey;
				var filterKey = this.filterKey && this.filterKey.toLowerCase();
				var order = this.sortOrders[sortKey] || 1;
				var datos = this.datos;

				if (filterKey) {
					datos = datos.filter(function (row) {
						return Object.keys(row).some(function (key) {
							return String(row[key].valor).toLowerCase().indexOf(filterKey) > -1;
						})
					})
				}
				if (sortKey) {
					datos = datos.slice().sort(function (a, b) {
						a = a[sortKey].valor;
						b = b[sortKey].valor;

						return (a === b ? 0 : a > b ? 1 : -1) * order;
					})
				}
				return datos
			}
		},
		filters: {
			capitalize: function (str) {
				return str.charAt(0).toUpperCase() + str.slice(1)
			}
		},
		methods: {
			sortBy: function (key) {
				this.sortKey = key;
				this.sortOrders[key] = (this.sortOrders[key]||1) * -1;
			},
			editCell : function(ix){
				if (ix < 0 ) return false;
				
				var nudo = vgk.compras.nudos[ix-1];
				editaItem('OFERTA',nudo,borraOferta,grabaOferta,[],[])
			}
		}
	})
}

//------------------------------------------------------------------- Compras
function initAppCompras(){
// bootstrap the demo
	vgk.appCompras = new Vue({
		el: '#divCompras',
		data: {
			searchQuery: '',
			gridCols: vgk.gridCols,
			gridData: vgk.gridData
		},
		methods :{
			actualiza : function(malla){
//				this.gridCols = malla.getGridCols();
				this.gridData = malla.getGridData();
			},
		}
	})
}

//------------------------------------------------------------------- Calculos
/*
								<td>{{item.planta}}</td>
								<td>{{item.bancal}}</td>
								<td>{{item.sup}}</td>
								<td>{{item.marco}}</td>
								<td>{{item.uds}}</td>
								<td>{{item.coste}}</td>
								<td><b>{{item.gastos}}</b></td>
								<td><b>{{item.labor}}</b></td>
								<td>{{item.rendm}}</td>
								<td>{{item.venta}}</td>
								<td><b>{{item.ventas}}</b></td>
								<td style="color:blue"><b>{{item.benef}}</b></td>

*/
function initAppCalcs(){
	if(r$('divCalcs')){
		vgk.appCalcs = new Vue({
			el: '#divCalcs',
			data : {
				heads : ['Planta','Bancal','Superf.','Marco','Unids.','Coste','Gastos','Labor','Rendmto','Venta','Ventas','Beneficio'],
				items : [],
				idAct : 0,
			},
		methods :{
			actualiza : function(calcs){

				this.items = calcs;
			},
		}
		})
	}	
}

