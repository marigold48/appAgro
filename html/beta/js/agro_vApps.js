
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
//=================================================================== PLANTAS

function initAppsPlantas(){
	if (r$('modoPlantas')){
		vgk.appModoPlantas = new Vue({
			el: '#modoPlantas',
			data: { 
				modo: 'HORTA'
			},
			methods : {
				toggle : function(modo){
					this.modo = modo;
					vgk.appListaGrupo.modo = this.modo;
					ajaxGetPlantas();
				}
			}
		})
	}

	if (r$('lstGrupo')){
		vgk.appListaGrupo = new Vue({
			el: '#lstGrupo',
			data: {
				modo : 'HORTA',
				items: [],
				idAct: 0,
			},
			methods :{
				limpia : function(){this.items = []},
				crearItem : function(){crearGrupo();},
				editaItem : function(){editaGrupo(this.idAct);},
				showHijos : function(id0){showEspec(id0);}, 
				setIdAct : function(ev){this.idAct = ev.target.value;}, // Select click
				actualiza : function(items){
					this.items = items;
					if (items.length){ 
						this.idAct = items[0].id0;
						this.showHijos();
					}
					else vgk.appEspec.limpia();
				}
			}
		}) 
	}

	if(r$('lstEspec')){
		vgk.appListaEspec = new Vue({
			el: '#lstEspec',
			data: {
				items: [],
				idAct: 0,
			},
			methods : {
				actualiza : function(items){
					this.items = items;
					if (items.length) this.idAct = items[0].id0;
				},
			}
			}) 
	}	
	if (r$('h3Espec')){
		vgk.appH3Espec = new Vue ({
			el: '#h3Espec',
			data : {tag : 'Ninguno'},
			methods : {
				crearItem : function(){crearEspec();},
				limpia : function(){this.tag = 'Ninguno';},
				actualiza : function(tag){this.tag = tag;}
			}
		})
	}

	if (r$('divEspec')){
		vgk.appEspec = new Vue({
			el: '#divEspec',
			data: {
				items: [],
				idAct: 0,
			},
			methods : {
				limpia : function(){
					this.items = [];
					vgk.appVardd.limpia();
				},
				showHijos: function(id0){showVardd(id0); },
				actualiza: function(items){
					this.items= items;
					if (items.length){ 
						this.showHijos(items[0].id0);
						this.idAct = items[0].id0;
					}
					else{
						this.limpia();
					}
				},
				editItem: function(id0){ editEspec(id0);},
			}
		}) 
	}
	if (r$('lstVardd')){
		vgk.appListaVardd = new Vue({
			el: '#lstVardd',
			data: {items: []},
			methods : {
				actualiza : function(items){this.items = items},
			}
			}) 
	}
	if(r$('h3Vardd')){
		vgk.appH3Vardd = new Vue ({
			el: '#h3Vardd',
			data : {tag : 'Ninguno'},
			methods : {
				crearItem : function(){crearVardd();},
				limpia : function(){this.tag = 'Ninguno';},
				actualiza : function(tag){this.tag = tag;}
			}
		})
	}
	
	if(r$('divVardd')){
		vgk.appVardd = new Vue({
			el: '#divVardd',
			data : {
				items : [],
				idAct : 0
			},
			methods :{
				limpia : function(){
					this.items = [];
					vgk.appH3Vardd.limpia();
				},
				actualiza : function(items){
					this.items = items;
					if (items.length) this.idAct = items[0].id0;
				},
				editItem: function(id0){ editaVardd(id0);},
				plantarVardd : function(id0){
					var vardd = vgk.plantas.getNodoById(id0);
					vgk.appEscenarios.vardd = vardd;
					console.log('plantarVardd: '+o2s(vardd));
					crearCultivo();
				},
			}
		})
	}	
}
//=================================================================== SUELO
//------------------------------------------------------------------- Fincas
function initAppFincas(){
	if (r$('lstFincas')){
		vgk.appListaFincas = new Vue({
			el: '#lstFincas',
			data: {
				items: [],
				idAct : 0,
			},
			methods :{
				nuevaFinca: function(_id){ creaNuevaFinca();},
				borraFinca: function(_id){ borraUnaFinca(_id);},
				getUnaFinca: function(_id){ getUnaFinca(_id);},
				actualiza : function(items){
					this.items = items;
					if (items.length) this.idAct = items[0]._id;
				},
			}
		}) 
	}

	if (r$('infoFinca')){
		vgk.appInfoFinca = new Vue({
			el: '#infoFinca',
			data: {infoFinca: null},
			methods :{
				actualiza : function(infoFinca){this.infoFinca = infoFinca},
				editInfoFinca : function(id0){editInfoFinca(id0)},
				goMapa : function(lat,lng){goMapa(lat,lng);},
			}
		}) 
	}

}

//------------------------------------------------------------------- Zonas
function initAppZonas(){
	
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
			}
			}) 
	}	
	if (r$('h3Zonas')){
		vgk.appH3Zona = new Vue ({
			el: '#h3Zonas',
			data : {finca : 'Ninguna'},
			methods : {
				creaNuevaZona : function(){creaNuevaZona();},
				limpia : function(){this.finca = 'Ninguna';},
				actualiza : function(finca){this.finca = finca;}
			}
		})
	}

	if (r$('divZonas')){
		vgk.appZona = new Vue({
			el: '#divZonas',
			data: {
				items : [],
				idAct : 0,
			},
			methods : {
				limpia : function(){
					this.items = [];
					vgk.appBancales.limpia();
				},
				showHijos: function(id0){renderBancales(id0); },
				actualiza: function(items){
					this.items= items;
					if (items.length){ 
						this.idAct = items[0].id0;
						this.showHijos(items[0].id0);
					}
				},
				editZona: function(id0){
					var zona = vgk.finca.getNodoById(id0);
					vgk.appEdit.zona = zona;
					vgk.appEdit.edit_t = 'ZONA';
					vgk.appEdit.showModal = true;
					vgk.appEdit.editON = true;
				},
				goCroquis : function(id0){
					var raiz = vgk.finca.getRaiz();
					var geo_id = raiz.obj.geo_id;
					goCroquis(geo_id);
				}
			}
		}) 
	}

	if (r$('h3Import')){
		vgk.appH3Import = new Vue ({
			el: '#h3Import',
			data : {finca : 'Ninguno'},
			methods : {
				limpia : function(){this.flat = 'Ninguno';},
				actualiza : function(finca){this.finca = finca;},
				importar : function(){importGeoJSON();},
			}
		})
	}

	if (r$('divImport')){
		vgk.appImport = new Vue({
			el: '#divImport',
			data: {csv : ''},
			methods : {
				actualiza : function(csv){this.csv = csv},
			}
		}) 
	}

	if (r$('h3Export')){
		vgk.appH3Export = new Vue ({
			el: '#h3Export',
			data : {finca : 'Ninguno'},
			methods : {
				limpia : function(){this.flat = 'Ninguno';},
				actualiza : function(finca){this.finca = finca;},
				exportar : function(){alert('Exp');exportGeoJSON();},
			}
		})
	}

	if (r$('divExport')){
		vgk.appExport = new Vue({
			el: '#divExport',
			data: {csv : ''},
			methods : {
				actualiza : function(csv){this.csv = csv},
			}
		}) 
	}



}


function initAppBancales(){

	if (r$('lstBancales')){
		vgk.appListaBancales = new Vue({
			el: '#lstBancales',
			data: {
				items: [],
				idAct : 0,
			},
			methods : {
				actualiza : function(items){this.items = items},
				cargaBancal: function(_id,id0){ cargaFincaBancal(_id,id0);},
			}
			}) 
	}
	if(r$('h3Bancales')){
		vgk.appH3Bancales = new Vue ({
			el: '#h3Bancales',
			data : {zona : 'Ninguno'},
			methods : {
				creaNuevoBancal : function(){creaNuevoBancal();},
				limpia : function(){this.zona = 'Ninguno';},
				actualiza : function(zona){this.zona = zona;}
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
				editEsqma: function(cult){
					vgk.appModal.item = cult;
					goEsqArbolado(cult.obj.esqma_id);
				},
				editCultivo: function(cult){
					editCultivo(cult);
				},
			}
		})

	}	
		vgk.appEscenarios.limpia();
}

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

//=================================================================== KRONOS
function initAppsKronos(){
	if(r$('divMes')){
		vgk.appMes = new Vue({
			el: '#divMes',
			data : {
				tag : '',
				mes : 0,
				heads : ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
				items : [],
				idAct : 0,
			},
		methods :{
			actualiza : function(dias){this.items = dias;},
			actualizaTag: function(tag){this.tag = tag;},
			avant : function(){
				if (this.mes < 11)  showKronos(++this.mes); //mod_calendario.js
				else avantJar(); //mod_calendario.js
				},
			atras : function(){
				if (this.mes)  showKronos(--this.mes); //mod_calendario.js
				else atrasJar(); //mod_calendario.js
				},
			avantTodo : function(){
				this.mes = 11;
				showKronos(this.mes); //mod_calendario.js
				},
			atrasTodo : function(){
				this.mes = 0;
				showKronos(this.mes); //mod_calendario.js
				},
			setDia : function(id0){
				setDia(id0); //mod_calendario.js
			}
		}
		})
	}	
}

function initAppsAlmanaque(){
	if(r$('divMes')){
		vgk.appMes = new Vue({
			el: '#divMes',
			data : {
				tag : '',
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
				if (this.mes < 11)  showAlmanaque(++this.mes);
				else return;
				},
			atras : function(){
				if (this.mes)  showAlmanaque(--this.mes);
				else return;
				},
			avantTodo : function(){
				this.mes = 11;
				showAlmanaque(this.mes);
				},
			atrasTodo : function(){
				this.mes = 0;
				showAlmanaque(this.mes);
				}
		}
		})
	}	

	if(r$('divSem')){
		vgk.appSem = new Vue({
			el: '#divSem',
			data : {
				tag : '',
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
				if (this.mes < 11)  showAlmanaque(++this.mes);
				else return;
				},
			atras : function(){
				if (this.mes)  showAlmanaque(--this.mes);
				else return;
				},
			avantTodo : function(){
				this.mes = 11;
				showAlmanaque(this.mes);
				},
			atrasTodo : function(){
				this.mes = 0;
				showAlmanaque(this.mes);
				}
		}
		})
	}	

}

//=================================================================== CUADERNO
function initAppsQuadern(){
	if (r$('h2Campanya')){
		vgk.appCampanya = new Vue({
			el: '#h2Campanya',
			data: {
				tag: '',
			},
			methods :{
				actualiza : function(tag){this.tag = tag;},
				nuevoQuadern : function(){nuevoQuadern();}
			}
		})
	}
// Portada
	if (r$('divReg00')){
		vgk.appReg00 = new Vue({
			el: '#divReg00',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem(nodo.tag.toUpperCase(),nodo,borraRegQEx,grabaRegQEx);
				}
			}
		})
	}
// Personal y Maquinaria
	if (r$('divReg01A')){
		vgk.appReg01A = new Vue({
			el: '#divReg01A',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG01A',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01A('R1A-'+ n); nodo.obj.orden = 'A-'+n;
					crearItem('REG01A',nodo,grabaRegQEx);
				}
			}
		})
	}

	if (r$('divReg01B')){
		vgk.appReg01B = new Vue({
			el: '#divReg01B',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG01B',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01B('R1B-'+ n); nodo.obj.orden = 'B-'+n;
					crearItem('REG01B',nodo,grabaRegQEx);
				}

			}
		})
	}

	if (r$('divReg01C')){
		vgk.appReg01C = new Vue({
			el: '#divReg01C',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG01C',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01C('R1C-'+ n); nodo.obj.orden = 'C-'+n;
					crearItem('REG01C',nodo,grabaRegQEx);
				}
			}
		})
	}

	if (r$('divReg01D')){
		vgk.appReg01D = new Vue({
			el: '#divReg01D',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG01D',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01D('R1D-'+ n); nodo.obj.orden = 'D-'+n;
					crearItem('REG01D',nodo,grabaRegQEx);
				}
			}
		})
	}
	if (r$('divReg01E')){
		vgk.appReg01E = new Vue({
			el: '#divReg01E',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG01E',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01E('R1E-'+ n); nodo.obj.orden = 'E-'+n;
					crearItem('REG01E',nodo,grabaRegQEx);
				}
			}
		})
	}
// Parcelas
	if (r$('divReg02')){
		vgk.appReg02 = new Vue({
			el: '#divReg02',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG02',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg02('R2-'+ n);
					crearItem('REG02',nodo,grabaRegQEx);
				}
			}
		})
	}

// Trabajos
	if (r$('divReg03')){
		vgk.appReg03 = new Vue({
			el: '#divReg03',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG03',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg03('R3-'+ n);
					crearItem('REG03',nodo,grabaRegQEx);
				}
			}
		})
	}

// Tratamientos FS
	if (r$('divReg04')){
		vgk.appReg04 = new Vue({
			el: '#divReg04',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG04',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg04('R4-'+ n);
					crearItem('REG04',nodo,grabaRegQEx);
				}
			}
		})
	}

// Otros Tratamientos FS
// Semillas tratadas
	if (r$('divReg05A')){
		vgk.appReg05A = new Vue({
			el: '#divReg05A',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG05A',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg05A('R5A-'+ n);
					crearItem('REG05A',nodo,grabaRegQEx);
				}
			}
		})
	}
// Tratamientos post-cosecha
	if (r$('divReg05B')){
		vgk.appReg05B = new Vue({
			el: '#divReg05B',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG05B',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg05B('R5B-'+ n);
					crearItem('REG05B',nodo,grabaRegQEx);
				}
			}
		})
	}
// Analisis residuos
	if (r$('divReg06')){
		vgk.appReg06 = new Vue({
			el: '#divReg06',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG06',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg06('R6-'+ n);
					crearItem('REG06',nodo,grabaRegQEx);
				}
			}
		})
	}

// Compras
	if (r$('divReg07')){
		vgk.appReg07 = new Vue({
			el: '#divReg07',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG07',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg07('R7-'+ n);
					crearItem('REG07',nodo,grabaRegQEx);
				}
			}
		})
	}

// Ventas
	if (r$('divReg08')){
		vgk.appReg08 = new Vue({
			el: '#divReg08',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG08',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg08('R8-'+ n);
					crearItem('REG08',nodo,grabaRegQEx);
				}
			}
		})
	}
// Totales y rendimiento
	if (r$('divReg09')){
		vgk.appReg09 = new Vue({
			el: '#divReg09',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG09',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg09('R9-'+ n);
					crearItem('REG09',nodo,grabaRegQEx);
				}
			}
		})
	}

// Otros datos/incidencias
// Datos ambientales
	if (r$('divReg10A')){
		vgk.appReg10A = new Vue({
			el: '#divReg10A',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG10A',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg10A('R10A-'+ n);
					crearItem('REG10A',nodo,grabaRegQEx);
				}
			}
		})
	}
// Incidencias
	if (r$('divReg10B')){
		vgk.appReg10B = new Vue({
			el: '#divReg10B',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG10B',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg10B('R10B-'+ n);
					crearItem('REG10B',nodo,grabaRegQEx);
				}
			}
		})
	}
// Reclamaciones
	if (r$('divReg11')){
		vgk.appReg11 = new Vue({
			el: '#divReg11',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = vgk.quadern.getNodoById(id0);
					editaItem('REG11',nodo,borraRegQEx,grabaRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg11('R11-'+ n); nodo.obj.orden = n;
					crearItem('REG11',nodo,grabaRegQEx);
				}
			}
		})
	}

}

//=================================================================== Esquema Arbolado
function initAppsEsqma(){
	vgk.dataEsqma = {};

// define the item component
	vgk.itemEsqma = Vue.component('item', {
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
	vgk.appEsqma = new Vue({
		el: '#esquema',
			data: {
				treeData: vgk.dataEsqma
			},
		methods : {
			actualiza : function(esquema){this.treeData = esquema}
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
