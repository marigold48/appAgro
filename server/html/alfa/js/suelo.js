// http://geojson.io/#map=18/42.07766/1.75020


function initAppsSuelo(){
	if (r$('pagSuelo')){
		vgk.appPagSuelo = new Vue ({
			el: '#pagSuelo',
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
				editBancal : function(id0){editBancal(id0);},
				goApoyos : function(_id){
//					var bancal= vgk.finca.getNodoById(id0);
//					console.log(bancal.tag);
					goApoyos(_id);
				}
			}
		})
	}
	/*
		vgk.appH3Bancales = new Vue ({
			el: '#h3Bancales',
			data : {zona : 'Ninguno'},
			methods : {
				creaNuevoBancal : function(){creaNuevoBancal();},
				limpia : function(){this.zona = 'Ninguno';},
				actualiza : function(zona){this.zona = zona;}
			}
		})
*/
}



//=================================================================== FINCAS
function updateInfoFinca(){
	var info = vgk.appModal.item;
	vgk.finca.updtNodoSelf(info);
	updateFinca();
	vgk.appModal.show = false;
}

function editInfoFinca(info){
	editaItem('INFOFINCA',info,updateInfoFinca,borraFinca);
}

function ecoBorraFinca(xhr){
	console.log('Eco Borra Finca: ' + xhr.responseText);

	ajaxGetFincas();
	vgk.appModal.show = false;
}
function borraUnaFinca(_id){
	console.log('Borrando finca: ' + _id);
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraFinca;
	params.topolId = _id;
	ajaxDeleteTopol(params);
	return false;
}

function borraFinca(){
	var ok = confirm('Borrar finca '+ vgk.finca.meta.tag+ ' ?');
	if (ok) borraUnaFinca(vgk.finca_id);
}
function ecoUpdateFinca(xhr){
	console.log('Eco Updt Finca: ');
}
function updateFinca(){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateFinca;
	params.txt = o2s(vgk.finca.clase2ObjDB());
	params.topolId = vgk.finca_id;
	ajaxPutTopol(params);
	return false;
}

function ecoGetUnaFinca(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.finca_id = vgk.loTopol._id;
	vgk.finca = new Finca("",[]);
	vgk.finca.objDB2Clase(vgk.loTopol);
	var raiz = vgk.finca.getRaiz();
	var zonas = vgk.finca.getRaspa();
	if (vgk.esPagCultivos){
		vgk.appListaZonas.actualiza(zonas);
	}
	else {
		vgk.appPagSuelo.setInfoFinca(raiz);
		vgk.appPagSuelo.setZonas(zonas);
	}
}

function getUnaFinca(_id){
	vgk.finca_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetUnaFinca;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}


//-------------------------------------------------------------------Carga Fincas
// Se tiene en cuenta si vgk.esPagCultivos == TRUE
function ecoGetFincas(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && obj.meta.iam == 'Finca') items.push(obj);
	})
	if (items.length > 0) {
		if (vgk.esPagCultivos) vgk.appListaFincas.actualiza(items);
		else vgk.appPagSuelo.setLista(items);
		getUnaFinca(items[0]._id);
	}
	else {
		alert('No hay Fincas creadas !');
		return;
	}
}

function ajaxGetFincas() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetFincas;
	params.iam = 'Finca';
	params.org = vgk.user.org;
	ajaxGetMetasByOrg(params);
 }


function ecoNuevaFinca(xhr){
	ajaxGetFincas();
}

function grabaDatosFinca(){
	var raiz = vgk.appModal.item;
	if (vgk.appModal.editON){
		vgk.finca.updtNodoSelf(raiz);
		updateFinca();
	}
	else {
		vgk.finca = new Finca(raiz.tag,[raiz]);
		vgk.finca.meta.org = vgk.user.org;
	
		var params = vgApp.paramsXHR;
		params.base = '/alfaAgro/';
		params.eco = ecoNuevaFinca; 
		params.iam = 'Finca';
		params.txt = o2s(vgk.finca.clase2ObjDB());
		ajaxPostTopol(params);
	}
	vgk.appModal.show = false;
}


//------------------------------------------------------------------- Fincas
// On submit, llama a grabaNuevaFinca, en agro_Ajax.js

function creaNuevaFinca(){
	console.log('creaNuevaFinca');
	var info = new InfoFinca('Finca');
	crearItem('INFOFINCA',info,grabaDatosFinca);
}

//------------------------------------------------------------------- Geo JSON
function ecoGetGeoFinca(xhr){
	var geojs = JSON.parse(xhr.responseText);
	geojs.nodos.map(function(nodo){
		nodo.properties={};
	})
	vgk.appPagSuelo.tabsGeo.jsonExp = '{"type": "FeatureCollection",  "features":'+o2s(geojs.nodos)+'}';
}

function exportGeoFinca(){
	var raiz = vgk.finca.getRaiz();
	var _id = raiz.obj.geo_id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetGeoFinca;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}
// Si la Finca NO tiene geo_id, se informa y se actualiza la Finca
function ecoGrabaGeoFinca(xhr){
	var raiz = vgk.finca.getRaiz();
	if (raiz.obj.geo_id)return;

	raiz.obj.geo_id = JSON.parse(xhr.responseText)._id;
	updateFinca();
}


function importGeoFinca(){
	var gjTxt = vgk.appPagSuelo.tabsGeo.jsonImp;
	try {var feats = JSON.parse(gjTxt).features;}
	catch (e){alert('Formato inválido');return;}

	var tag = vgk.finca.meta.tag;
	var geojs = new rGeoJS(tag,'rGeoJS',vgk.user.org);
	geojs.nodos = feats;

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGrabaGeoFinca; 
	params.iam = 'rGeoJS';
	params.txt = o2s(geojs);

	var raiz = vgk.finca.getRaiz();
	if (raiz.obj.geo_id){	
		params.topolId = raiz.obj.geo_id;
		ajaxPutTopol(params);
	}
	else ajaxPostTopol(params);
}
//=================================================================== ZONAS

//------------------------------------------------------------------- Geo JSON
function ecoGetGeoZona(xhr){
	var geojs = JSON.parse(xhr.responseText);
	geojs.nodos.map(function(nodo){
		nodo.properties={};
	})
	vgk.appPagSuelo.tabsGeo.jsonExp = '{"type": "FeatureCollection",  "features":'+o2s(geojs.nodos)+'}';
}

function exportGeoZona(id0){
	var zona = vgk.finca.getNodoById(id0);
	if (!zona.obj.geo_id){alert('No hay Geo_ID');return;}
	vgk.appPagSuelo.tabsGeo.idAct = id0;
	var _id = zona.obj.geo_id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetGeoZona;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}
// Si la Zona NO tiene geo_id, se informa y se actualiza la Finca
function ecoGrabaGeoZona(xhr){
	var id0 = vgk.appPagSuelo.tabsGeo.idAct;
	var zona = vgk.finca.getNodoById(id0);
	console.log(o2s(zona));
	zona.obj.geo_id = JSON.parse(xhr.responseText)._id;
	updateFinca();
}


function importGeoZona(id0){
	var gjTxt = vgk.appPagSuelo.tabsGeo.jsonImp;
	try {var feats = JSON.parse(gjTxt).features;}
	catch (e){alert('Formato inválido');return;}
	vgk.appPagSuelo.tabsGeo.idAct = id0;

	var tag = vgk.finca.meta.tag;
	var geojs = new rGeoJS(tag,'rGeoJS',vgk.user.org);
	geojs.nodos = feats;

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGrabaGeoZona; 
	params.iam = 'rGeoJS';
	params.txt = o2s(geojs);

	var zona = vgk.finca.getNodoById(id0);
	if (zona.obj.geo_id){	
		params.topolId = zona.obj.geo_id;
		ajaxPutTopol(params);
	}
	else ajaxPostTopol(params);
}
function grabaZona(){
	var zona = vgk.appModal.item;
	if (vgk.appModal.editON) vgk.finca.updtNodoSelf(zona);
	else {
		var raiz = vgk.finca.getRaiz();
		vgk.finca.addNodoHijo(raiz,zona);
//		console.log(o2s(vgk.finca.clase2ObjDB()));
	}
	var zonas = vgk.finca.getRaspa();
	vgk.appPagSuelo.setZonas(zonas);
	updateFinca();
	vgk.appModal.show = false;
}

function creaZona(){
	console.log('creaZona');
	var item = new Zona('Zona');
	crearItem('ZONA',item,grabaZona);
}

function editZona(id0){
	console.log('editZona');
	var item = vgk.finca.getNodoById(id0);
	editaItem('ZONA',item,grabaZona, borraZona);
}

function borraZona(zona){
	vgk.appModal.show = false;

	var ok = confirm('Borrar '+zona.tag+'?. Se borrarán los bancales!'); 
	if (!ok) return;

	vgk.finca.borraNodo(zona);
	var raspa = vgk.finca.getRaspa();
	vgk.appPagSuelo.setZonas(raspa);
	updateFinca();

}

//=================================================================== BANCALES
function borraBancal(bancal){
	vgk.appModal.show = false;

	var ok = confirm('Borrar '+bancal.tag+'?'); 
	if (!ok) return;

	vgk.finca.borraNodo(bancal);
	var raspa = vgk.finca.getRaspa();
	vgk.appPagSuelo.setZonas(raspa);
	updateFinca();
}

function editBancal(id0){
	var bancal = vgk.finca.getNodoById(id0);
	editaItem('BANCAL',bancal,grabaBancal,borraBancal);
}

function grabaBancal(){
	var bancal = vgk.appModal.item;

	if (vgk.appModal.editON) vgk.finca.updtNodoSelf(bancal);
	else{ 
		var zona = vgk.finca.getNodoById(vgk.appPagSuelo.zonas.idAct);
		vgk.finca.addNodoHijo(zona,bancal);
		vgk.appPagSuelo.showBancales(zona.id0);
	}

	updateFinca();
	vgk.appModal.show = false;
}

function creaBancal(){
	var bancal = new Bancal();
	crearItem('BANCAL',bancal,grabaBancal);
}

function renderBancales(id){
		var zona = vgk.finca.getNodoById(id);
		try {vgk.appH3Bancales.actualiza(zona.tag);} catch(e){}
		var losBancales = [];
		zona.hijos.map(function(idH){
			var bancal = vgk.finca.getNodoById(idH);
			losBancales.push(bancal);
		})
		if (vgk.appBancales){vgk.appBancales.actualiza(losBancales)}
		else{
			alert('appBancales no inicializada');
		}
}

//------------------------------------------------------------------- Apoyos Arbolado
function ecoBorraApoyos(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	console.log('Apoyos borrados: '+loTopol._id);
}

function borraApoyos(){
	var bancal = vgk.appModal.item;

	var ok = confirm('Borrar apoyos de '+ bancal.tag+ ' ?');
	if (!ok) return;

	console.log('Borrando apoyos: ' + bancal.tag);
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraApoyos;
	params.topolId = bancal.obj.apoyos_id;
	ajaxDeleteTopol(params);
	bancal.obj.apoyos_id = null;
	updateFinca();
	return false;
}



function ecoCreaApoyos(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	var apoyos_id = loTopol._id;
	var bancal = vgk.appModal.item;
	bancal.obj.apoyos_id = apoyos_id;
	updateFinca();

	goApoyos(apoyos_id);
}


function creaApoyos(id0){
	var lins = prompt('Núm de lineas (1-99)');
	try {
		var n = parseInt(lins);
	} catch(e){alert('Formato mal'); return;}
	
	if (n > 99){
		alert('Demasiadas lineas');
		return;
	}

	var bancal = vgk.appModal.item;
	var raiz = new NodoApoyos('Apoyos '+bancal.obj.codBancal);
	raiz.obj.codBancal = bancal.obj.codBancal;
	raiz.obj.vardds = [{cod:'X',img:'fruta0.png'}];
	raiz.obj.lineas = n;

	var apoyos = new Apoyos('Apoyos '+bancal.obj.codBancal,[raiz]);

	for (var i=0;i<n;i++){
		var L = new NodoLinea('L'+(i+1));
		apoyos.addNodoHijo(raiz,L);
		for (var j=0;j<5;j++){
			var T = new NodoTramo('L'+(i+1)+'T'+(j+1));
			for (var k=0;k<10;k++){
				T.obj.lista.push(0);
			}
			T.obj.plantas = 10;
			apoyos.addNodoHijo(L,T);
		}
	}

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCreaApoyos; 
	params.txt = o2s(apoyos.clase2ObjDB());
	ajaxPostTopol(params);

}

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

//------------------------------------------------------------------- Init
function sesionSueloOK(sesion){
	ajaxGetMenuPag('Suelo');
	ajaxGetTextPag('Suelo');
	ajaxGetClasesPag();
	vgk.postGetUnaFinca = null; //setAppPag;
	ajaxGetFincas();

	var csvTA = r$('csvTA_Imp'); // textarea para import/export
//	csvTA.addEventListener('paste', prePegado);
}

function initSuelo(){
	initAppsGlobal();  // libK1_vApps.js
	initAppsSuelo();
	validaSesion('usrMenu',sesionSueloOK);
}
