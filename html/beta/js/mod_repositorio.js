
function setWeb4info(web){
	vgApp.web = web;
		switch (web){
			case 'WIKI_ES':
				r$('fuente').innerHTML = 'Buscar en: Wikipedia (es)';
				break;
			case 'WIKI_EN':
				r$('fuente').innerHTML = 'Buscar en: Wikipedia (en)';
				break;
			case 'WIKISPP':
				r$('fuente').innerHTML = 'Buscar en: Wikispecies (en)';
				break;
			case 'JBOTUMA':
				r$('fuente').innerHTML = 'Buscar en: Jardín Botánico UMA (es)';
				break;
			case 'FLOVASC':
				r$('fuente').innerHTML = 'Buscar en: Flora vascular (es)';
				break;
			case 'FLOSILV':
				r$('fuente').innerHTML = 'Buscar en: Flora silvestre (es)';
				break;
			case 'EOFLIFE':
				r$('fuente').innerHTML = 'Buscar en: Encyclopedia of Life (en)';
				break;
			case 'JSTORGP':
				r$('fuente').innerHTML = 'Buscar en: JSTOR Global Plants (en)';
				break;
			case 'IOPI_GP':
				r$('fuente').innerHTML = 'Buscar en: IOPI (en)';
				break;
			case 'GBIF_GP':
				r$('fuente').innerHTML = 'Buscar en: GBIF (en)';
				break;
			case 'GBIF_ES':
				r$('fuente').innerHTML = 'Buscar en: GBIF (es)';
				break;
			case 'HARVARD':
				r$('fuente').innerHTML = 'Buscar en: Univ. de Harvard (en)';
				break;
			case 'CATALOG':
				r$('fuente').innerHTML = 'Buscar en: Catalogue of Life (es|en|...)';
				break;
			case 'R_TORMO':
				r$('fuente').innerHTML = 'Buscar en: Plantas y Hongos (es)';
				break;
			case 'PYRENEA':
				r$('fuente').innerHTML = 'Buscar en: Atlas Flora Pirineos (es)';
				break;
			case 'TROPICO':
				r$('fuente').innerHTML = 'Buscar en: Tropicos (en) (Missouri Botanical Garden)';
				break;
			case 'MEDLIST':
				r$('fuente').innerHTML = 'Buscar en: MED Checklist';
				break;
			case 'NCBINLM':
				r$('fuente').innerHTML = 'Buscar en: NCBI (National Center for Biotechnology Information)';
				break;
			case 'FCATALA':
				r$('fuente').innerHTML = 'Buscar en: Flora Catalana';
				break;
			case 'ASTUNAT':
				r$('fuente').innerHTML = 'Buscar en: Astur Natura';
				break;
			case 'NAVARRA':
				r$('fuente').innerHTML = 'Buscar en: Vegetación Navarra';
				break;
		}
}
//------------------------------------------------------------------- Arbol
function showInfoEspecie(gen,esp){
		var nombre = gen+'_'+esp;
		console.log(nombre+':'+vgApp.web);
		switch (vgApp.web){
			case 'WIKI_ES':
				window.open('https://es.wikipedia.org/wiki/'+nombre);
				break;
			case 'WIKI_EN':
				window.open('https://en.wikipedia.org/wiki/'+nombre);
				break;
			case 'WIKISPP':
				window.open('https://species.wikipedia.org/wiki/'+nombre);
				break;
			case 'JBOTUMA':
				window.open('http://www.jardinbotanico.uma.es/bbdd/?s='+nombre);
				break;
			case 'FLOVASC':
				window.open('http://www.floravascular.com/index.php?spp='+nombre);
				break;
			case 'FLOSILV':
				window.open('http://www.florasilvestre.es/mediterranea/Umbelliferae/'+nombre+'.htm');
				break;
			case 'EOFLIFE':
				nombre = nombre.replace('_','+');
				window.open('http://www.eol.org/search?q='+nombre+'&search=Go');
				break;
			case 'JSTORGP':
				nombre = nombre.replace('_','+');
				window.open('http://plants.jstor.org/search?filter=name&so=ps_group_by_genus_species+asc&Query='+nombre);
				break;
			case 'IOPI_GP':
				nombre = nombre.replace('_','%20');
				window.open('http://www.bgbm.fu-berlin.de/IOPI/GPC/PTaxonDetail.asp?NameCache='+nombre+'&PTRefFk=');
				break;
			case 'GBIF_GP':
				nombre = nombre.replace('_','+');
				window.open('http://www.gbif.org/species/search?q='+nombre+'&dataset_key=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c');
				break;
			case 'GBIF_ES':
				nombre = nombre.replace('_','+');
				window.open('http://datos.gbif.es/generic-hub/occurrences/search?q='+nombre+'#tab_mapView');
				break;
			case 'HARVARD':
				nombre = nombre.replace('_','+');
				window.open('http://kiki.huh.harvard.edu/databases/specimen_search.php?start=1&quick='+nombre);
				break;
			case 'CATALOG':
				nombre = nombre.replace('_','+');
				window.open('http://www.catalogueoflife.org/col/search/all/key/'+nombre);
				break;
			case 'R_TORMO':
				window.open('http://www.plantasyhongos.es/herbarium/htm/'+nombre+'.htm');
				break;
			case 'PYRENEA':
				nombre = nombre.replace('_','%20');
				window.open('http://atlasflorapyrenaea.org/florapyrenaea/Citation?action=info&codi_e_poc='+nombre);
				break;
			case 'TROPICO':
				nombre = nombre.replace('_','+');
				window.open('http://www.tropicos.org/NameSearch.aspx?name='+nombre);
				break;
			case 'MEDLIST':
				nombre = nombre.replace('_','+');
				window.open('http://ww2.bgbm.org/mcl/results.asp?name='+nombre+'&Submit=Query');
				break;
			case 'NCBINLM':
				nombre = nombre.replace('_','+');
				window.open('https://www.ncbi.nlm.nih.gov/gquery/?term='+nombre);
				break;
			case 'FCATALA':
				var grupo = nombre[0];
				nombre = nombre.replace('_','%20');
				nombre = nombre.toLowerCase();
				window.open('http://www.floracatalana.es/'+grupo+'/'+nombre+'.html');
				break;

			case 'ASTUNAT':
				nombre = nombre.replace('_','-');
				nombre = nombre.toLowerCase();
				window.open('http://www.asturnatura.com/especie/'+nombre+'.html');
				break;
			case 'NAVARRA':
				nombre = nombre.toLowerCase();
				window.open('http://www.cfnavarra.es/agricultura/informacion_agraria/MapaCultivos/htm/sp_'+nombre+'.htm');
				break;
		}

}


function floraList(){
	vgApp.tabla = 'FLORA';

	getEspeciesList('FLORA');
}
function hortaList(){
	vgApp.tabla = 'HORTA';
	getEspeciesList('HORTA');
}
function frutaList(){
	vgApp.tabla = 'FRUTA';
	getEspeciesList('FRUTA');
}


function ecoEspeciesSQL(xhr){
   var filas = csv2filas(xhr.responseText);
	vgApp.lista = new Array();
	filas.map(function(fila){
		vgApp.lista.push(fila);
	})
	console.log('Tabla: '+vgApp.tabla);
	vgApp.appLstEsp.actualiza(filas);
}

function getEspeciesList(tabla){
	vgApp.tabla= tabla;
	var stmt = '';
	if (tabla == 'FLORA')  stmt = "select tag,genero,especie from flora;";
	else stmt = "select tipo,tag,cod,gen as genero,esp as especie,img from agro where tipo='" + tabla +"';";
	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : vgApp.sqlite.repoDB,
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoEspeciesSQL; 

	ajaxCmdShell(params,body);
}

//------------------------------------------------------------------- DML SQLite Agro
function ecoUpdateFila(xhr){
	alert(xhr.responseText);
}
function updateFila(fila){
	var stmt = "update agro set img='"+fila.img+"' where cod='" + fila.cod+"';";
	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : vgApp.sqlite.repoDB,
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoUpdateFila; 

	ajaxCmdShell(params,body);
}

function hookInitPag(){
	vgApp.appLstEsp = new Vue({
		el: '#lstEsp',
			data: {
				items: [],
				activ: null,
				foto: null,
			},
		methods : {
			update : function(item){
				updateFila(item);
			},
			actualiza : function(items){
				this.items = items;
				if (items.length) this.idAct = items[0].id0;
			},
			showInfo : function(item){
				if (vgApp.tabla == 'HORTA'){ 
					this.activ = item;
					this.foto = 'img/horta/Viv1-H/'+item.img;
				}
				else if (vgApp.tabla == 'FRUTA'){
					this.activ = item;
					this.foto = 'img/fruta/Viv1-F/'+item.img;
				}
				else{ 
					this.activ = null;
					showInfoEspecie(item.genero,item.especie);
				}
			}
		}
	})
	setWeb4info('WIKI_ES');
	getEspeciesList('FLORA');
}

//  lista links : http://worldplants.webarchiv.kit.edu
//http://ww2.bgbm.org/mcl/results.asp?name=Acanthus+mollis&area1=&bool1=&mclStatus1=&order=name&count=4&advanced=&family=&Submit=Query
//https://www.ncbi.nlm.nih.gov/gquery/?term=Acanthus+mollis