//------------------------------------------------------------------- Prepegado
// Se invoca al "paste" del clipboard(ctrl-V, etc)

function prePegado(e){
	var clipboardData, pastedData;

	// Stop data actually being pasted into div
	e.stopPropagation();
	e.preventDefault();

	// Get pasted data via clipboard API
	clipboardData = e.clipboardData || window.clipboardData;
	pastedData = clipboardData.getData('Text');

	vgk.appImport.actualiza(pastedData);

}

//------------------------------------------------------------------- SET Menu

function initAppsSuelo(){
	if (r$('pagSuelo')){
		vgk.appPagSuelo = new Vue ({
			el: '#estaPag',
			data : {
				fincas :{tag:'Fincas',idAct:'',items:[],infoFinca:null},
				zonas  :{tag:'Zonas de ',idAct:'',items:[],noHay:'No hay Zonas de esta Finca'},
				feixes :{tag:'Bancales de ',tagZona:'No Zona',idAct:'',items:[],noHay:'No hay Bancales de esta Zona'},
				tabsGeo: {tabAct : 1,jsonImp:'Importar',jsonExp:'Exportar',idAct:null},
				keo : null
			},
			methods : {
				setRotulos : function (keo,rotulos){
					this.fincas.tag = rotulos.fincas.tag;
					this.zonas.tag = rotulos.zonas.tag;
					this.feixes.tag = rotulos.feixes.tag;
					this.zonas.noHay = rotulos.zonas.noHay;
					this.feixes.noHay = rotulos.feixes.noHay;
					this.keo = keo;
				},
				setInfoFinca : function (info){this.fincas.infoFinca = info;},
				editInfoFinca : function(){editInfoFinca(this.fincas.infoFinca);},
				setLista : function(items){
					this.fincas.items = items;
					if (items.length) this.fincas.idAct = items[0]._id;
				},
				getUnaFinca : function(_id){getUnaFinca(_id)},
				setZonas : function (items){
					this.zonas.items = items;
					if (items.length){ 
						this.zonas.idAct = items[0].id0;
						this.showBancales(items[0].id0)
					}
				},
				nuevaFinca(){creaNuevaFinca();},
				impGeoFinca : function(){importGeoFinca();},
				expGeoFinca :function(){exportGeoFinca();},
				impGeoZona : function(id0){importGeoZona(id0);},
				expGeoZona :function(id0){exportGeoZona(id0);},
				tabClick : function(n){this.tabsGeo.tabAct = n;},
				goMapaFinca : function(){goMapaFinca();},
				creaZona : function(){creaZona();},
				editZona : function(id0){editZona(id0);},
				goCroquis: function(id0){
					var zona = vgk.finca.getNodoById(id0);
					if (zona.obj.geo_id) goCroquis(zona.obj.geo_id);
					else alert('Zona sin GeoJSON');
				},
				showBancales : function(id0){
					this.zonas.idAct = id0;
					var zona = vgk.finca.getNodoById(id0);
					this.feixes.tagZona = zona.tag;
					var items = [];
					zona.hijos.map(function(idH){
						var item = vgk.finca.getNodoById(idH);
						items.push(item);
					})
					this.feixes.items = items;
					if (items.length) this.feixes.idAct = items[0].id0;
				},
				creaBancal : function(){creaBancal();},
				editBancal : function(id0){editBancal(id0);}
			}
		})
	}
}

//------------------------------------------------------------------- Init
function sesionSueloOK(sesion){
	ajaxGetMenuPag('Suelo');
	ajaxGetTextPag('Suelo');
	ajaxGetClasesPag();
	vgk.postGetUnaFinca = null; //setAppPag;
	ajaxGetFincas();

	var csvTA = r$('csvTA_Imp'); // textarea para import  gastos/pagos
//	csvTA.addEventListener('paste', prePegado);
}

function initSuelo(){
	initAppsGlobal();  // libK1_vApps.js
	initAppsSuelo();
	validaSesion('usrMenu',sesionSueloOK);
}
