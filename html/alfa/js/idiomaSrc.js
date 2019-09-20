import utils  from '/k1/libK1_Utils.js';
import ajax   from '/k1/libK1_Ajax.js'
import clases from '/k1/libK1_Clases.js'
import topol  from '/k1/libK1_Topol.js'
import vapps  from '/k1/libK1_vApps.js'


//------------------------------------------------------------------- Cambio Org
/*
	Se busca el documento previo de la Clase y Org tratadas (getMetasByOrg). 
	Han de coincidir la Clase, la Org y también el meta.tag (normalmente el nombre de la página)
	Si existe, se efectúa PUT. Sino, se hace POST
*/
function ecoCambioOrg(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	console.log('Cambio Org:'+utils.o2s(loTopol.meta));
}

function ecoGetOldDocument(xhr){
	var loTopol = JSON.parse(xhr.responseText);  // array de documentos de la org pedida
	console.log('Docs encontrados: '+loTopol.length);

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCambioOrg; 

	var ok = true;
	var tagPag = ';'
	var visible = utils.vgk.appPagIdiomas.visible;
	switch (visible){
		case 'CLASES' :
			tagPag = utils.vgk.clasesML.meta.tag;
			utils.vgk.clasesML.meta.org = utils.vgk.org4cambio; 
			params.txt = utils.o2s(utils.vgk.clasesML.clase2ObjDB());
			break;
		case 'MENUS' :
			tagPag = utils.vgk.menuML.meta.tag;
			utils.vgk.menuML.meta.org = utils.vgk.org4cambio; 
			params.txt = utils.o2s(utils.vgk.menuML.clase2ObjDB());
			break;
		case 'TEXTOS' : 
			tagPag = utils.vgk.textosML.meta.tag;
			utils.vgk.textosML.meta.org = utils.vgk.org4cambio;
			params.txt = utils.o2s(utils.vgk.textosML.clase2ObjDB());
			break;
		case 'TOPOLS' : 
			tagPag = utils.vgk.topolML.meta.tag;
			utils.vgk.topolML.meta.org = utils.vgk.org4cambio;
			params.txt = utils.o2s(utils.vgk.topolML.clase2ObjDB());
			break;
		default : ok = false;
	}
	if (!ok) return;


	if (!loTopol.length){
		ajaxPostTopol(params);
	}
	else if (loTopol.length == 1)	{
		if (loTopol[0].meta.tag == tagPag){
			params.topolId = loTopol[0]._id;
			ajaxPutTopol(params);
			}
		else ajaxPostTopol(params);
	}
	else {
		var la_id = null;
		ok = loTopol.some(function (topol) { 
			la_id = topol._id;
  			return topol.meta.tag == tagPag;
		});

/*
		loTopol.map(function(topol,ix){
			console.log(utils.o2s(topol));
			if (topol.meta.tag == tagPag){
				params.topolId = loTopol[ix]._id;
				ajaxPutTopol(params);
				ok = false;
			}
		})
*/
		if (ok){

			params.topolId = la_id;
			ajaxPutTopol(params);
		}
		else ajaxPostTopol(params);// si no se ha encontrado
	}

}

function cambiaOrg(){
	var org = prompt('Cod Organización ?');
	if (!org) return;

	var iam = null;
	var visible = utils.vgk.appPagIdiomas.visible;
	switch (visible){
		case 'CLASES' : iam = 'rClasesML'; break;
		case 'MENUS'  : iam = 'rMenuML'; break;
		case 'TEXTOS' : iam = 'rTextosML'; break;

	}
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetOldDocument;
	params.iam = iam;
	params.org = org;
	ajax.ajaxGetMetasByOrg(params);
	utils.vgk.org4cambio = org;
}

//------------------------------------------------------------------- 
function grabaLang(nodo){
	console.log('grabaLang: '+utils.o2s(nodo));
	if (utils.vgk.appModal.editON) utils.vgk.clasesML.updtNodoSelf(nodo);
	else utils.vgk.clasesML.addNodoLang(nodo);
	updateClasesML();
	utils.vgk.appModal.show = false;
}

function borraLang(nodo){
	console.log('borraLang: '+utils.o2s(nodo));
	utils.vgk.clasesML.borraNodo(nodo);
	updateClasesML();
	utils.vgk.appModal.show = false;

}

function grabaNodoClase(){
	alert('grabaNodoClase');
}

function borraNodoClase(){
	alert('borraNodoClase');
}

function grabaTxtML(nodo){
	console.log('grabaTxtML: '+utils.o2s(nodo)+':'+utils.vgk.appModal);
	if (utils.vgk.appModal.editON  && utils.vgk.appPagIdiomas.visible == 'MENUS'){ 
			utils.vgk.menuML.updtNodoSelf(nodo);
			updateMenuML();
		}
	else if (utils.vgk.appModal.editON  && utils.vgk.appPagIdiomas.visible == 'TEXTOS'){
			utils.vgk.textosML.updtNodoSelf(nodo);
			updateTextosML();
		}
	else if (!utils.vgk.appModal.editON  && utils.vgk.appPagIdiomas.visible == 'MENUS'){ 
			utils.vgk.menuML.addNodo(nodo);
			updateMenuML();
		}
	else if (!utils.vgk.appModal.editON  && utils.vgk.appPagIdiomas.visible == 'TEXTOS'){
			utils.vgk.textosML.addNodo(nodo);
			updateTextosML();
		}
	utils.vgk.appModal.show = false;
}

function borraTxtML(nodo){
	console.log('borraTxtML: '+utils.o2s(nodo));
	if (utils.vgk.appPagIdiomas.visible == 'MENUS'){ 
			utils.vgk.menuML.borraNodo(nodo);
			updateMenuML();
		}
	else if (
		utils.vgk.appPagIdiomas.visible == 'TEXTOS'){
			utils.vgk.textosML.borraNodo(nodo);
			updateTextosML();
		}
	utils.vgk.appModal.show = false;

}

//------------------------------------------------------------------- ClasesML (Langs & Clases)
function showClasesML(){
	var codes = [];
	var valid = [];
	var nodos = [];

	var raspa = utils.vgk.clasesML.getRaspa();
	raspa.map(function(nodo){
		     if (nodo.rol === 'LANGS') codes = utils.vgk.clasesML.getHijosNodo(nodo);
		else if (nodo.rol === 'NODOS') nodos = utils.vgk.clasesML.getHijosNodo(nodo);
	})
	utils.vgk.appPagIdiomas.setLangs(codes);
	utils.vgk.appPagIdiomas.setNodos(nodos);
}

function ecoUpdateClasesML(xhr){
	console.log('ClasesML actualizado');
}

function updateClasesML(){
	if (utils.vgk.clasesML.meta.org != utils.vgk.user.org){
		alert('ClasesML sin ORG:' + utils.vgk.clasesML.meta.org +':'+ utils.vgk.user.org);
		utils.vgk.clasesML.meta.org = utils.vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateClasesML;
	params.txt = utils.o2s(utils.vgk.clasesML.clase2ObjDB());
	params.topolId = utils.vgk.clasesML_id;
	ajaxPutTopol(params);
	return false;
}

function ecoGet1ClasesML(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.clasesML_id = utils.vgk.loTopol._id;
	utils.vgk.clasesML = new clases.rClasesML("",[]);
	utils.vgk.clasesML.objDB2Clase(utils.vgk.loTopol);
	utils.vgk.clasesML.syncLangsRaiz();
	showClasesML();
}

function get1ClasesML(_id){
	utils.vgk.clasesML_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1ClasesML;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}


//------------------------------------------------------------------- Arbol ClasesML


function grabaDatosClasesML(){
	var raiz = utils.vgk.appModal.item;
	if (utils.vgk.appModal.editON){
		utils.vgk.clasesML.updtNodoSelf(raiz);
		updateClasesML();
	}
	else {
		utils.vgk.clasesML = new ClasesML(raiz.tag,[raiz]);
		utils.vgk.clasesML.meta.org = utils.vgk.user.org;
	
		var params = vgApp.paramsXHR;
		params.base = '/alfaAgro/';
		params.eco = ecoNuevaClasesML; 
		params.iam = 'rClasesML';
		params.txt = utils.o2s(utils.vgk.clasesML.clase2ObjDB());
		ajaxPostTopol(params);
	}
}

function ecoNuevoClasesML(xhr){
	utils.vgk.clasesML_id = JSON.parse(xhr.responseText)._id;
}

function creaClasesML(otro){
	utils.vgk.clasesML = mkClasesML();
	addClases2Clases();
	
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoClasesML; 
	params.iam = 'rClasesML';
	params.txt = utils.o2s(utils.vgk.clasesML.clase2ObjDB());
	console.log(params.txt);
	if (utils.vgk.clasesML_id){
		params.topolId = utils.vgk.clasesML_id;
		ajaxPutTopol(params);
	}
	else ajaxPostTopol(params);

}

//-------------------------------------------------------------------Carga ClasesML

function ecoGetClasesML(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && obj.meta.iam == 'rClasesML') items.push(obj);
	})
	if (items.length > 0) {
//		utils.vgk.appPagIdiomas.setLista(items);
		get1ClasesML(items[0]._id);
	}
	else {
		var ok = confirm('No existe un arbol de ClasesML. Crearlo ?');
		if (ok) creaClasesML();
		return;
	}
}

function ajaxGetClasesML() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetClasesML;
	params.iam = 'rClasesML';
	params.org = utils.vgk.user.org || 'NOORG';
	ajax.ajaxGetMetasByOrg(params);
 }

//=================================================================== Cambio Items

export function adminClasesML(){
	utils.vgk.appPagIdiomas.visible = 'CLASES';
	utils.vgk.appPagIdiomas.malla = [];
	ajaxGetClasesML();
}

export function adminMenusML(){
	utils.vgk.appPagIdiomas.visible = 'MENUS';
	utils.vgk.appPagIdiomas.malla = [];
	ajaxGetMenusML();
}

export function adminTextosML(){
	utils.vgk.appPagIdiomas.visible = 'TEXTOS';
	utils.vgk.appPagIdiomas.malla = [];
	ajaxGetTextosML();
}

export function adminTopolsML(){
	utils.vgk.appPagIdiomas.visible = 'TOPOLS';
	utils.vgk.appPagIdiomas.malla = [];
	ajaxGetTopolsML();
}

//=================================================================== Menus ML

function ecoNouTextosRepo(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	console.log('Grabado TextosML:' + loTopol.meta.tag);
}
function ecoGetMenusRepo(xhr){
	var filas = csv2filas(xhr.responseText);
	var topol = null;
	var txtML = null;
	filas.map(function(fila){
		if (topol && txtML && fila.pagina == topol.meta.tag && fila.opcion == txtML.tag){
			txtML.lng[fila.idioma]= fila.texto;
			console.log('2: '+utils.o2s(txtML));
		}
		else if (topol && fila.pagina == topol.meta.tag && fila.opcion != txtML.tag){
			txtML = new rTxtML(fila.opcion,fila.codigo);
			txtML.lng[fila.idioma]= fila.texto;
			console.log('1: '+utils.o2s(txtML));
			topol.addNodo(txtML);
		}
		else{
			console.log(fila.pagina);
			if (topol){
				var params = vgApp.paramsXHR;
				params.base = '/alfaAgro';
				params.eco = ecoNouTextosRepo; 
				params.txt = utils.o2s(topol.clase2ObjDB());
				ajaxPostTopol(params);
			}
			txtML = new rTxtML(fila.opcion,fila.codigo);
			txtML.lng[fila.idioma]= fila.texto;
			console.log('0: '+utils.o2s(txtML));
			topol = new rMenuML(fila.pagina,[txtML]);
			topol.meta.org = utils.vgk.user.org;

		}
	})
}

function creaMenusRepo(){
	var stmt = "select * from menus order by 1,2;";
	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : 'idiomas.sqlite',
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoGetMenusRepo; 

	ajaxCmdShell(params,body);
}

function ecoNouMenuML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	utils.vgk.menu_id = loTopol._id;
	utils.vgk.menuML = new rMenuML("",[]);
	utils.vgk.menuML.objDB2Clase(loTopol);
	alert('Creado menuML: '+utils.vgk.menuML.meta.tag);	
}

function nuevoMenuML(){
	var tag = prompt('Tag Menu ML');
	if (tag){
		utils.vgk.menuML = new rMenuML(tag,[]);
		utils.vgk.menuML.meta.org = utils.vgk.user.org;
		var params = vgApp.paramsXHR;
		params.base = '/alfaAgro';
		params.eco = ecoNouMenuML; 
		params.iam = 'rMenuML';
		params.txt = utils.o2s(utils.vgk.menuML.clase2ObjDB());
		ajaxPostTopol(params);

	}
}
function ecoBorraMenuML(xhr){
	var respTxt = xhr.responseText;
	console.log(respTxt);
}

function borraMenuML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraMenuML;
	params.topolId = _id;
	ajaxDeleteTopol(params);
}

function ecoGet1MenuML(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.menuML_id = utils.vgk.loTopol._id;
	utils.vgk.menuML = new clases.rMenuML("",[]);
	utils.vgk.menuML.objDB2Clase(utils.vgk.loTopol);
	utils.vgk.appPagIdiomas.malla = utils.vgk.menuML.getMatriz();
	utils.vgk.appPagIdiomas.menuML = utils.vgk.menuML.meta.tag;

	console.log('eco get1: '+utils.o2s(utils.vgk.menuML.meta));
}

function get1MenuML(_id){
	utils.vgk.menuML = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1MenuML;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}

function ecoGetMenusML(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && obj.meta.iam == 'rMenuML') items.push(obj);
	})

	utils.vgk.appPagIdiomas.menus = items;

	if (items.length) get1MenuML(items[0]._id);
}

function ajaxGetMenusML() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetMenusML;
	params.iam = 'rMenuML';
	params.org = utils.vgk.user.org || 'NOORG';
	ajax.ajaxGetMetasByOrg(params);
 }


function ecoUpdtMenuML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	utils.vgk.menuML = new rMenuML("",[]);
	utils.vgk.menuML.objDB2Clase(loTopol);
	console.log('eco updt: '+utils.o2s(utils.vgk.menuML.meta));
	utils.vgk.appPagIdiomas.malla = utils.vgk.menuML.getMatriz();
	utils.vgk.appPagIdiomas.menuML = utils.vgk.menuML.meta.tag;
}

function updateMenuML(){
		var params = vgApp.paramsXHR;
		params.base = '/alfaAgro/';
		params.eco = ecoUpdtMenuML; 
		params.iam = 'rMenuML';
		params.txt = utils.o2s(utils.vgk.menuML.clase2ObjDB());
		params.topolId = utils.vgk.menuML_id;
		ajaxPutTopol(params);
}

function grabaOpcML(){
	var nodo = utils.vgk.appModal.item;
	if (utils.vgk.appModal.editON) utils.vgk.menuML.updtNodoSelf(nodo);
	else utils.vgk.menuML.addNodo(nodo);
	updateMenuML();
}

//=================================================================== Textos ML
/*
function ecoNouTextosRepo(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	console.log('Grabado TextosML:' + loTopol.meta.tag);
}
*/
function ecoGetTextosRepo(xhr){
	var filas = csv2filas(xhr.responseText);
	var topol = null;
	var txtML = null;
	filas.map(function(fila){
		if (topol && txtML && fila.pagina == topol.meta.tag && fila.opcion == txtML.tag){
			txtML.lng[fila.idioma]= fila.texto;
			console.log('2: '+utils.o2s(txtML));
		}
		else if (topol && fila.pagina == topol.meta.tag && fila.opcion != txtML.tag){
			txtML = new rTxtML(fila.opcion,fila.codigo);
			txtML.lng[fila.idioma]= fila.texto;
			console.log('1: '+utils.o2s(txtML));
			topol.addNodo(txtML);
		}
		else{
			console.log(fila.pagina);
			if (topol){
				var params = vgApp.paramsXHR;
				params.base = '/alfaAgro';
				params.eco = ecoNouTextosRepo; 
				params.txt = utils.o2s(topol.clase2ObjDB());
				ajaxPostTopol(params);
			}
			txtML = new rTxtML(fila.opcion,fila.codigo);
			txtML.lng[fila.idioma]= fila.texto;
			console.log('0: '+utils.o2s(txtML));
			topol = new rTextosML(fila.pagina,[txtML]);
			topol.meta.org = utils.vgk.user.org;

		}
	})
}

function creaTextosRepo(){
	var stmt = "select * from textos order by 1,2;";
	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : 'idiomas.sqlite',
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoGetTextosRepo; 

	ajaxCmdShell(params,body);
}
function ecoNouTextosML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	utils.vgk.textos_id = loTopol._id;
	utils.vgk.textosML = new rTextosML("",[]);
	utils.vgk.textosML.objDB2Clase(loTopol);
	utils.vgk.appPagIdiomas.texts.push({"_id":loTopol._id,"meta":loTopol.meta});
	utils.vgk.appPagIdiomas.textML = loTopol.meta.tag;
	utils.vgk.appPagIdiomas.malla = [];
	console.log('Creado textosML: '+utils.vgk.textosML.meta.tag);	
}

function nuevoTextosML(){
	var tag = prompt('Tag Textos ML');
	if (tag){
		utils.vgk.textosML = new rTextosML(tag,[]);
		utils.vgk.textosML.meta.org = utils.vgk.user.org;
		var params = vgApp.paramsXHR;
		params.base = '/alfaAgro';
		params.eco = ecoNouTextosML; 
		params.iam = 'rTextosML';
		params.txt = utils.o2s(utils.vgk.textosML.clase2ObjDB());
		ajaxPostTopol(params);

	}
}

function ecoBorraTextosML(xhr){
	var respTxt = xhr.responseText;
	ajaxGetTextosML();
	console.log(respTxt);
}

function borraTextosML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraTextosML;
	params.topolId = _id;
	ajaxDeleteTopol(params);
}
/*
function ecoGet1MenuML(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.menuML_id = utils.vgk.loTopol._id;
	utils.vgk.menuML = new rMenuML("",[]);
	utils.vgk.menuML.objDB2Clase(utils.vgk.loTopol);
	utils.vgk.appPagIdiomas.malla = utils.vgk.menuML.getMatriz();
	utils.vgk.appPagIdiomas.menuML = utils.vgk.menuML.meta.tag;
}
*/
function ecoGet1TextosML(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.textos_id = utils.vgk.loTopol._id;
	utils.vgk.textosML = new clases.rTextosML("",[]);
	utils.vgk.textosML.objDB2Clase(utils.vgk.loTopol);
	utils.vgk.appPagIdiomas.malla = utils.vgk.textosML.getMatriz();
	utils.vgk.appPagIdiomas.textML = utils.vgk.textosML.meta.tag;
}

function get1TextosML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1TextosML;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}

function ecoGetTextosML(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && obj.meta.iam == 'rTextosML') items.push(obj);
	})

	utils.vgk.appPagIdiomas.texts = items;

	if (items.length) get1TextosML(items[0]._id);
}

function ajaxGetTextosML() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetTextosML;
	params.iam = 'rTextosML';
	params.org = utils.vgk.user.org || 'NOORG';
	ajax.ajaxGetMetasByOrg(params);
 }


function ecoUpdtTextosML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	utils.vgk.textosML = new rTextosML("",[]);
	utils.vgk.textosML.objDB2Clase(loTopol);
	console.log('eco updt: '+utils.o2s(utils.vgk.textosML.meta));
	utils.vgk.appPagIdiomas.malla = utils.vgk.textosML.getMatriz();
	utils.vgk.appPagIdiomas.textosML = utils.vgk.textosML.meta.tag;
}

function updateTextosML(){
		var params = vgApp.paramsXHR;
		params.base = '/alfaAgro/';
		params.eco = ecoUpdtTextosML; 
		params.iam = 'rTextosML';
		params.txt = utils.o2s(utils.vgk.textosML.clase2ObjDB());
		params.topolId = utils.vgk.textos_id;
		ajaxPutTopol(params);
}

function grabaTextosML(){
	var nodo = utils.vgk.appModal.item;
	if (utils.vgk.appModal.editON) utils.vgk.textosML.updtNodoSelf(nodo);
	else utils.vgk.textosML.addNodo(nodo);
	updateTextosML();
}

function grabaBigTxt(){
	var nodo = utils.vgk.appModal.item;
	utils.vgk.textosML.updtNodoSelf(nodo);
	utils.vgk.appPagIdiomas.malla = utils.vgk.textosML.getMatriz();
	utils.vgk.appModal.show = false;
}

//=================================================================== Topols ML


function ecoBorraTopolML(xhr){
	var respTxt = xhr.responseText;
	ajaxGetTopolsML();
	console.log(respTxt);
}

function borraTopolML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraTopolML;
	params.topolId = _id;
	ajaxDeleteTopol(params);
}
/*
function ecoGet1MenuML(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.menuML_id = utils.vgk.loTopol._id;
	utils.vgk.menuML = new rMenuML("",[]);
	utils.vgk.menuML.objDB2Clase(utils.vgk.loTopol);
	utils.vgk.appPagIdiomas.malla = utils.vgk.menuML.getMatriz();
	utils.vgk.appPagIdiomas.menuML = utils.vgk.menuML.meta.tag;
}
*/
function ecoGet1TopolsML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	utils.vgk.topolML = new topol.rTopol('',[]);
	utils.vgk.topolML.objDB2Clase(loTopol);
	var tag = loTopol.meta.tag +' | '+loTopol.meta.iam+' | '+loTopol.meta.org;
	utils.vgk.appPagIdiomas.metaML = tag;
	utils.r$('topolJSON').value = respTxt;
}

function get1TopolsML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1TopolsML;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}

function ecoGetTopolsML(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		items.push(obj);
	})

	utils.vgk.appPagIdiomas.metas = items;

//	if (items.length) get1TopolsML(items[0]._id);
}

function ajaxGetTopolsML() {
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro';
	params.eco = ecoGetTopolsML;
//	params.iam = 'rTextosML';
//	params.org = utils.vgk.user.org || 'NOORG';
	ajax.ajaxGetAll(params);
 }


function ecoUpdtTopolsML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	utils.vgk.topolsML = new rTopolsML("",[]);
	utils.vgk.topolsML.objDB2Clase(loTopol);
	console.log('eco updt: '+utils.o2s(utils.vgk.topolsML.meta));
	utils.vgk.appPagIdiomas.malla = utils.vgk.topolsML.getMatriz();
	utils.vgk.appPagIdiomas.textosML = utils.vgk.topolsML.meta.tag;
}

function updateTopolsML(){
		var params = vgApp.paramsXHR;
		params.base = '/alfaAgro/';
		params.eco = ecoUpdtTopolsML; 
		params.txt = utils.o2s(utils.vgk.topolsML.clase2ObjDB());
		params.topolId = utils.vgk.textos_id;
		ajaxPutTopol(params);
}

function grabaTopolsML(){
	var nodo = utils.vgk.appModal.item;
	if (utils.vgk.appModal.editON) utils.vgk.topolsML.updtNodoSelf(nodo);
	else utils.vgk.topolsML.addNodo(nodo);
	updateTopolsML();
}

//------------------------------------------------------------------- userMenu/vueApp cascade
function initAppsIdioma(){

	if (utils.r$('pagIdioma')){
		utils.vgk.appPagIdiomas = new Vue ({
			el: '#pagIdioma',
			data : {
				keo : 'ES',
				langs : [],
				nodos : [],
				malla : [],
				nodoC : null,
				visible : '',
				menuML: 'Ninguno',
				menus : [],
				textML: 'Ninguno',
				texts : [],
				metaML:'Ninguno',
				metas :[],
				keoBig : ''
			},
			methods : {
//------------------------------------------------------------------- ClasesML
				setLangs : function(langs){this.langs = langs;},
				setNodos : function(nodos){this.nodos = nodos;},
				editLang : function(id0){
					var lang = utils.vgk.clasesML.getNodoById(id0);
					vapps.editaItem('LANG',lang,grabaLang,borraLang);
				},
				nuevoLang : function(){
					var lang = new rLang('Nuevo');
					crearItem('LANG',lang,grabaLang);
				},
				editNodo : function(id0){
					var nodo = utils.vgk.clasesML.getNodoById(id0);
					this.malla = utils.vgk.clasesML.getTextosEdit(nodo.obj.clase);
					this.nodoC = nodo;
				},
				editCelda : function(ix){
					var text = this.malla[ix].text;
					var resp = prompt('Editar texto',text);
					if (resp) this.malla[ix].text = resp;
				},
				grabaNodoC : function(){
					this.nodoC.setMatriz(this.malla);
					console.log(utils.o2s(this.nodoC));
					utils.vgk.clasesML.updtNodoSelf(this.nodoC);
					updateClasesML();
				},
//------------------------------------------------------------------- Menu & Textos
				editTxtML : function(id0){
					var nodo = null;
					if (this.visible == 'MENUS') nodo = utils.vgk.menuML.getNodoById(id0);
					else if (this.visible == 'TEXTOS') nodo = utils.vgk.textosML.getNodoById(id0);
					vapps.editaItem('TXTML',nodo,grabaTxtML,borraTxtML);
					console.log('editTxtML' + id0);
				},
//------------------------------------------------------------------- MenusML
				nuevoMenuML : function(){nuevoMenuML();},
				borraMenuML : function(ix){
					var _id = this.menus[ix]._id;
					borraMenuML(_id);
				},

				setMenuML : function(ix){
					console.log('selecc: '+ utils.o2s(this.menus[ix].meta));
					get1MenuML(this.menus[ix]._id);
				},
				editMenuML : function(){
					var tag = prompt('Nuevo Tag ?',utils.vgk.menuML.meta.tag);
					if (tag){
						utils.vgk.menuML.meta.tag = tag;
						updateMenuML();
					}

				},

				addOpcML : function(){
					var txtML = new rTxtML('Nuevo');
					crearItem('TXTML',txtML,grabaTxtML);
				},
				editCeldaOpc : function(ix){
					var txt = this.malla[ix].txt;
					var resp = prompt('Editar texto',txt);
					if (resp) this.malla[ix].txt = resp;
				},
				grabaMenuML : function(){
					utils.vgk.menuML.setMatriz(this.malla);
					updateMenuML();
				},
//------------------------------------------------------------------- TextosML
				nuevoTextosML : function(){ nuevoTextosML()},
				borraTextosML : function(ix){
					var _id = this.texts[ix]._id;
					borraTextosML(_id);
				},
				setTextosML : function(ix){
					console.log('selecc: '+ utils.o2s(this.texts[ix].meta));
					get1TextosML(this.texts[ix]._id);
				},
				editTextosML : function(){
					var tag = prompt('Nuevo Tag ?',utils.vgk.textosML.meta.tag);
					if (tag){
						utils.vgk.textosML.meta.tag = tag;
						updateTextosML();
					}

				},
				addTxtML : function(){
					var txtML = new rTxtML('Nuevo');
					crearItem('TXTML',txtML,grabaTxtML);
				},
				editCeldaTxt : function(ix){
					utils.vgk.appModal.keoML = this.malla[ix].keo;
					var id0 = this.malla[ix].id0;
					var nodo = utils.vgk.textosML.getNodoById(id0);
					vapps.editaItem('BIGML',nodo,grabaBigTxt);
//					var resp = prompt('Editar texto',txt);
//					if (resp) this.malla[ix].txt = resp;
				},
				grabaTextosML : function(){
					utils.vgk.textosML.setMatriz(this.malla);
					updateTextosML();
				},
//------------------------------------------------------------------- TopolsML				
				setTopolsML : function(ix){
					console.log('selecc: '+ utils.o2s(this.metas[ix].meta));
					get1TopolsML(this.metas[ix]._id);
				},
				borraTopolML : function(ix){
					var msg = this.metas[ix].meta.tag +' | ';
					msg += this.metas[ix].meta.iam +' | ';
					msg += this.metas[ix].meta.org;

					var ok = confirm('Seguro que lo quieres borrar? \n'+msg);
					if (!ok) return;
					var _id = this.metas[ix]._id;
					borraTopolML(_id);
				},

			}
		})
	}
}




//------------------------------------------------------------------- Init

function ecoGet1MenuPag(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	var menuPag = new clases.rMenuML("",[]);
	menuPag.objDB2Clase(loTopol);
	menuPag.nodos.map(function(nodo){
		try {
			utils.r$(nodo.cod).innerHTML = nodo.getTag(utils.vgk.user.keo);
		} catch (e){console.log('Error '+e.message+' en elemento con id: '+nodo.cod);}
	})
}

function get1MenuPag(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1MenuPag;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}


function ecoGetMenuPag(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && 
			obj.meta.iam == 'rMenuML' &&
			obj.meta.tag == utils.vgk.menuPag) items.push(obj);
	})

	if (items.length) get1MenuPag(items[0]._id);
	else console.log('No Hay Menús');


}


function ajaxGetMenuPag(tag) {
	utils.vgk.menuPag = tag;
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetMenuPag;
	params.iam = 'rMenuML';
	params.org = utils.vgk.user.org || 'NOORG';
	ajax.ajaxGetMetasByOrg(params);
}

//------------------------------------------------------------------- Textos Pag
// Definir appPagIdiomas DESPUES de aplicar traducciones !!!!!
// O después de verificar que no hay página de Textos
function ecoGet1TextPag(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	var textPag = new clases.rTextosML("",[]);
	textPag.objDB2Clase(loTopol);
	textPag.nodos.map(function(nodo){
		try {
			utils.r$(nodo.cod).innerHTML = nodo.getTag(utils.vgk.user.keo);
		} catch (e){console.log('Error en elemento con id: '+nodo.cod);}
	})
	initAppsIdioma(); //---------------------- AQUI !!!
	adminClasesML();
}

function get1TextPag(_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1TextPag;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}


function ecoGetTextPag(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && 
			obj.meta.iam == 'rTextosML' &&
			obj.meta.tag == utils.vgk.textPag) items.push(obj);
	})

	if (items.length) get1TextPag(items[0]._id);
	else{
		console.log('No Hay Textos');
		initAppsIdioma();
		adminClasesML();
	}
}


function ajaxGetTextPag(tag) {
	utils.vgk.textPag = tag;
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetTextPag;
	params.iam = 'rTextosML';
	params.org = utils.vgk.user.org || 'NOORG';
	ajax.ajaxGetMetasByOrg(params);
}

export default {ajaxGetMenuPag,ajaxGetTextPag}