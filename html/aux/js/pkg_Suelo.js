// http://geojson.io/#map=18/42.07766/1.75020
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
	if (vgk.finca.meta.org != vgk.user.org){
		alert('Finca sin ORG:' + vgk.finca.meta.org +':'+ vgk.user.org);
		vgk.finca.meta.org = vgk.user.org;
	};

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
		vgk.appH3Bancales.actualiza(zona.tag);
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
