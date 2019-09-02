
function creaMapa(centro,tag){
L.Browser.touch = false; // Para que los handles de edicion no salgan grandes
//------------------------------------------------------------------- Mapa
// Creación objeto map
// 41.69828,1.828686,15 Can Poc OLi
//var center =[42.077658890622935,1.7510635704944097];
var lat = parseFloat(centro[0]);
var lon = parseFloat(centro[1]);
if ((lat+lon) < 1) var center =[41.703782,1.835618];
else var center = centro;
console.log(center+':'+tag);

var map = L.map('map').setView(center, 18);

//var aqui = new L.Marker([42.0781861,1.7530928]).addTo(map);
//aqui.bindPopup('<a href="https://ca.wikipedia.org/wiki/Sant_Mart%C3%AD_de_Capolat" target="_blank">La Rectoría</a>');

var aqui = new L.Marker(center).addTo(map);
aqui.bindPopup(tag);

//------------------------------------------------------------------- Plugin EasyButton
/*
var btnChangeView = L.easyButton({
	 states: [{
				stateName: 'capolat', 
				icon:		'fa-tree',
				title:	  'Capolat',
				onClick: function(btn, map) {  
					 map.setView([42.0998972,1.837496],15);
					 btn.state('berga');
				}
		  }, {
				stateName: 'berga',
				icon:		'fa-university',
				title:	  'Berga',
				onClick: function(btn, map) {
					 map.setView([42.077658890,1.7510635],18);
					 btn.state('capolat');
				}
	 }]
}).addTo(map);
*/

		var crs25831 = new L.Proj.CRS('EPSG:25831','+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
			{resolutions: [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25]}
				  );

		var serveiTopoCache = L.tileLayer.wms("http://mapcache.icc.cat/map/bases/service?", {
			layers: 'topo',
			format: 'image/jpeg',
			crs: crs25831,
			continuousWorld: true,
			attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
		});


		var serveitopoGrisCache = L.tileLayer.wms("http://mapcache.icc.cat/map/bases/service?", {
			layers: 'topogris',
			format: 'image/jpeg',
			crs: crs25831,
			continuousWorld: true,
			attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
		});

		var wmsComarques = L.tileLayer.wms("http://geoserveis.icc.cat/icc_limadmin/wms/service?", {
			layers: '5,1',
			format: 'image/png',
			crs: crs25831,
			transparent: true,
			continuousWorld: true,
			attribution: 'Base Comarcal 1:50.000 -ICGC',
		});


//------------------------------------------------------------------- OpenStreetMap.BlackAndWhite
var osm_ByN = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//------------------------------------------------------------------- Ortofotos ICGC
var ortofotos = L.tileLayer.wms("http://mapcache.icc.cat/map/bases/service?", {
	layers: 'orto',
	format: 'image/jpeg',
	attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
	}).addTo(map);
//------------------------------------------------------------------- Mapa Localización
var orto_mini = L.tileLayer.wms("http://mapcache.icc.cat/map/bases/service?", {
	layers: 'orto',
	format: 'image/jpeg',
	attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
	});
var miniMap2 = new L.Control.MiniMap(orto_mini, { toggleDisplay: true }).addTo(map);

//------------------------------------------------------------------- Overlay ICGC
var icc = L.tileLayer.wms("http://geoserveis.icc.cat/icc_mapesbase/wms/service?", {
	layers: 'mtc25m',
	format: 'image/png',
	transparent: true,
	attribution: "Institut Cartogràfic y Geològic de Catalunya"
});

var catastro = L.tileLayer.wms('http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx', {
	layers: 'Catastro',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: ' <a href="http://www.catastro.meh.es/" target="_blank">Dirección General del Catastro</a>'
});

var sigpac = L.tileLayer.wms('http://wms.mapama.es/wms/wms.aspx', {
	layers: 'SIGPAC',
	format: 'image/png',
	transparent: false,
	continuousWorld : true,
	attribution: ' <a href="http://www.catastro.meh.es/" target="_blank">Dirección General del Catastro</a>'
});

//------------------------------------------------------------------- Cultivos (GeoJSON)

vgk.capaEdicion = new L.FeatureGroup().addTo(map);

vgk.ovFincas = L.geoJson(vgk.fincasGJ, {
	onEachFeature: function(feature, layer){
		var area = Math.round(L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]));
		var fp = feature.properties;
		layer.bindPopup(fp.cod+'<br>Superf: '+area+' m<sup>2</sup>');
		var finca = vgk.finca.getRaiz();
		if (finca) finca.obj.area = area;
		vgk.capaEdicion.addLayer(layer);

	}
}).addTo(map);

vgk.ovZonas = L.geoJson(vgk.zonasGJ, {
	onEachFeature: function(feature, layer){
		var area = Math.round(L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]));
		var fp = feature.properties;
		layer.bindPopup(fp.cod+'<br>Superf: '+area+' m<sup>2</sup>');
		var zona = vgk.finca.getNodoByCod(fp.cod);
		if (zona) zona.obj.area = area;
		vgk.capaEdicion.addLayer(layer);
	}
}).addTo(map);

vgk.ovBancales = L.geoJson(vgk.bancalesGJ, {
	onEachFeature: function(feature, layer){
		var area = Math.round(L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]));
		var fp = feature.properties;
		layer.bindPopup(fp.cod+'<br>Superf: '+area+' m<sup>2</sup>');
		var bancal = vgk.finca.getNodoByCod(fp.cod);
		if (bancal) bancal.obj.area = area;
		vgk.capaEdicion.addLayer(layer);
	}
}).addTo(map);


//------------------------------------------------------------------- Control Scale
L.control.scale({
	position: 'bottomleft',
	imperial: false
}).addTo(map);

//------------------------------------------------------------------- Control Capas
var baseMaps = {
	"Ortofotos": ortofotos,
	"OSM blanco y negro": osm_ByN,
	"Topogràfic": serveiTopoCache,
	"Topogràfic gris": serveitopoGrisCache,
};
//wmsComarques.addTo(map);
var overlays = {
	"Catastro" : catastro,
	"SIGPAC" : sigpac,
	"Fincas": vgk.ovFincas,
	"Zonas": vgk.ovZonas,
	"Bancales": vgk.ovBancales
};

L.control.layers(baseMaps,overlays).addTo(map);

//------------------------------------------------------------------- Control Edición
// Para cambiar handles
L.Edit.Poly = L.Edit.Poly.extend({
	 options : {
		  icon: new L.DivIcon({
				 iconSize: new L.Point(8, 8),  // dimension handles
				 className: 'leaflet-div-icon leaflet-editing-icon'
		  })
	 }
});
// No hace falta hacer add, porque ya existe en realidad...

//------------------------------------------------------------------- Control Dibujo
// cambiamos handles y estilo de lineas

var drawControl = new L.Control.Draw({
	draw: {
		polyline: {
			icon: new L.DivIcon({
				iconSize: new L.Point(6, 6),  // dimension handles
				className: 'leaflet-div-icon leaflet-editing-icon'
			}),
			shapeOptions: { color: '#abc', weight:5}  // estilo lineas
		},
		polygon: {
			icon: new L.DivIcon({
				iconSize: new L.Point(6, 6), // dimension handles
				className: 'leaflet-div-icon leaflet-editing-icon'
			}),
			shapeOptions: { color: '#f00', fillColor:'#00f', weight:1}  // estilo lineas y relleno
		},
		circle: false, // eliminar circulos
		rectangle: false // eliminar rectangulos
	},
	edit: {
		featureGroup: vgk.capaEdicion
	}
});

/*
map.on('draw:created', function (evento) {
  var layer = evento.layer;
  capaEdicion.addLayer(layer);
});
*/

map.addControl(drawControl);
map.on(L.Draw.Event.CREATED, function (e) {
var type = e.layerType, layer = e.layer;
vgk.capaEdicion.addLayer(layer);

	if (type === 'polygon') {
		var k = prompt('Codigo ?');
		if (k){
			var geojs = layer.toGeoJSON();
			geojs.properties = {cod:k};
			switch (k[0]){
				case 'F': vgk.fincasGJ.features.push(geojs); break;
				case 'Z': vgk.zonasGJ.features.push(geojs); break;
				case 'B': vgk.bancalesGJ.features.push(geojs); break;
			}
		}
//		var area = Math.round(L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]));
	}
	else if (type === 'marker') {
		console.log('Posic: ' + o2s(layer.getLatLng()));
		var k = prompt('Codigo ?');
		if (k){
			var geojs = layer.toGeoJSON();
			geojs.properties = {cod:k};
			switch (k[0]){
				case 'F': 
//					vgk.marcasGJ.features.push(geojs); 
					var finca = vgk.finca.getRaiz();
					if (finca){ 
						finca.obj.lat = layer.getLatLng().lat;
						finca.obj.lon = layer.getLatLng().lng;
						console.log(o2s(finca));
						updateGeoFinca();
					}
				break;
			}
		}

	}
});

map.on('draw:edited', function (e) {
	var layers = e.layers;
	layers.eachLayer(function (layer) {
		var geojs = layer.toGeoJSON();
		var k = geojs.properties.cod;
		switch (k[0]){
			case 'F': 
				vgk.fincasGJ.features.map(function(feat,ix){
					console.log('F: '+ feat.properties.cod+':'+k)
					if (feat.properties.cod == k) vgk.fincasGJ.features[ix] = geojs;
				}); 
				break;
			case 'Z': 
				vgk.zonasGJ.features.map(function(feat,ix){
					console.log('Z: '+ feat.properties.cod)
					if (feat.properties.cod == k)  vgk.zonasGJ.features[ix] = geojs;
				}); 
				break;
			case 'B': 
				vgk.bancalesGJ.features.map(function(feat,ix){
					console.log('B: '+ feat.properties.cod)
					if (feat.properties.cod == k)  vgk.bancalesGJ.features[ix] = geojs;
				}); 
				break;
		}
	});
});

map.on('draw:deleted', function (e) {
	var layers = e.layers;
	layers.eachLayer(function (layer) {
		var geojs = layer.toGeoJSON();
		var k = geojs.properties.cod;
		switch (k[0]){
			case 'F': 
				vgk.fincasGJ.features.map(function(feat,ix){
					console.log('F: '+ feat.properties.cod+':'+k)
					if (feat.properties.cod == k) vgk.fincasGJ.features.splice(ix,1);
				}); 
				break;
			case 'Z': 
				vgk.zonasGJ.features.map(function(feat,ix){
					console.log('Z: '+ feat.properties.cod)
					if (feat.properties.cod == k)  vgk.zonasGJ.features.splice(ix,1);
				}); 
				break;
			case 'B': 
				vgk.bancalesGJ.features.map(function(feat,ix){
					console.log('B: '+ feat.properties.cod)
					if (feat.properties.cod == k)  vgk.bancalesGJ.features.splice(ix,1);
				}); 
				break;
		}
	});
});
updateGeoFinca();
}
//=================================================================== Carga GeoJSON
function ecoUpdateGeoFinca(xhr){
	console.log('Finca actualizada');
}
function updateGeoFinca(){
	if (vgk.finca.meta.org != vgk.user.org){
		vgk.finca.meta.org = vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateGeoFinca;
	params.txt = o2s(vgk.finca.clase2ObjDB());
	params.topolId = vgk.finca_id;
	ajaxPutTopol(params);
	return false;
}


function ecoGrabaGeoFinca(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	var raiz = vgk.finca.getRaiz();
	if (!raiz.obj.geo_id) raiz.obj.geo_id = loTopol._id;
	updateGeoFinca()
}
function grabaGeoFinca(){
	var tag = vgk.finca.meta.tag;
	var geojs = new rGeoJS(tag,'rGeoJS',vgk.user.org);
	var feats = [];
	feats = feats.concat(vgk.fincasGJ.features);
	feats = feats.concat(vgk.zonasGJ.features);
	feats = feats.concat(vgk.bancalesGJ.features);
	console.log('Feats: '+feats.length);
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

function ecoGetFeatures(xhr){

	var loTopol = JSON.parse(xhr.responseText);
	loTopol.nodos.map(function(nodo,ix){
		if (nodo && nodo.properties){
			switch (nodo.properties.cod[0]){
				case 'F': vgk.fincasGJ.features.push(nodo); break;
				case 'Z': vgk.zonasGJ.features.push(nodo); break;
				case 'B': vgk.bancalesGJ.features.push(nodo); break;
			} 
		}
	})
	var raiz = vgk.finca.getRaiz();
	var centro = [raiz.obj.lat,raiz.obj.lon];
	creaMapa(centro,raiz.tag);

}

function cargaGeoFinca(xhr){
	vgk.fincasGJ = {"type": "FeatureCollection",  "features":[]};
	vgk.zonasGJ = {"type": "FeatureCollection",  "features":[]};
	vgk.bancalesGJ = {"type": "FeatureCollection",  "features":[]};

	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.finca_id = vgk.loTopol._id;
	vgk.finca = new Finca("",[]);
	vgk.finca.objDB2Clase(vgk.loTopol);
	var raiz = vgk.finca.getRaiz();
	r$('titulo').innerHTML = vgk.user.org;
	r$('subtit').innerHTML = '('+raiz.tag+')';

	if (raiz.obj.geo_id) {
		var _id = raiz.obj.geo_id;
		var params = vgApp.paramsXHR;
		params.base = '/alfaAgro/';
		params.eco = ecoGetFeatures;
		params.topolId = _id;

		ajaxGet1Topol(params);

		return false;
	}
	else {
		var raiz = vgk.finca.getRaiz();
		var centro = [raiz.obj.lat,raiz.obj.lon];
		creaMapa(centro,raiz.tag);
	}
}


/*
var drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
			position: 'topright',
			draw: {
				polygon: {
					shapeOptions: {
						color: 'purple'
					},
					allowIntersection: false,
					drawError: {
						color: 'orange',
						timeout: 1000
					},
					showArea: true,
					metric: false,
					repeatMode: true
				},
				polyline: {
					shapeOptions: {
						color: 'red'
					},
				},
				rect: {
					shapeOptions: {
						color: 'green'
					},
				},
				circle: {
					shapeOptions: {
						color: 'steelblue'
					},
				},
				marker: {
					icon: greenIcon
				},
			},
			edit: {
				featureGroup: drawnItems
			}
		});
		map.addControl(drawControl);

		map.on('draw:created', function (e) {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {
				layer.bindPopup('A popup!');
			}

			drawnItems.addLayer(layer);
		});

*/

//------------------------------------------------------------------- Init
function sesionMapaOK(){
	var _id = vgk.params._id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = cargaGeoFinca;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

function initMapa(){
	initAppsGlobal();
	validaSesion('usrMenu',sesionMapaOK);// libK1_Sesion.js
}
