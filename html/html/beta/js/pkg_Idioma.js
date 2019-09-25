
//------------------------------------------------------------------- Cambio Org
/*
	Se busca el documento previo de la Clase y Org tratadas (getMetasByOrg). 
	Han de coincidir la Clase, la Org y también el meta.tag (normalmente el nombre de la página)
	Si existe, se efectúa PUT. Sino, se hace POST
*/
function ecoCambioOrg(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	console.log('Cambio Org:'+o2s(loTopol.meta));
}

function ecoGetOldDocument(xhr){
	var loTopol = JSON.parse(xhr.responseText);  // array de documentos de la org pedida
	console.log('Docs encontrados: '+loTopol.length);

	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoCambioOrg; 

	var ok = true;
	var tagPag = ';'
	var visible = vgk.appPagIdiomas.visible;
	switch (visible){
		case 'CLASES' :
			tagPag = vgk.clasesML.meta.tag;
			vgk.clasesML.meta.org = vgk.org4cambio; 
			params.txt = o2s(vgk.clasesML.clase2ObjDB());
			break;
		case 'MENUS' :
			tagPag = vgk.menuML.meta.tag;
			vgk.menuML.meta.org = vgk.org4cambio; 
			params.txt = o2s(vgk.menuML.clase2ObjDB());
			break;
		case 'TEXTOS' : 
			tagPag = vgk.textosML.meta.tag;
			vgk.textosML.meta.org = vgk.org4cambio;
			params.txt = o2s(vgk.textosML.clase2ObjDB());
			break;
		case 'TOPOLS' : 
			tagPag = vgk.topolML.meta.tag;
			vgk.topolML.meta.org = vgk.org4cambio;
			params.txt = o2s(vgk.topolML.clase2ObjDB());
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
			console.log(o2s(topol));
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
	var visible = vgk.appPagIdiomas.visible;
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
	ajaxGetMetasByOrg(params);
	vgk.org4cambio = org;
}

//------------------------------------------------------------------- 
function grabaLang(nodo){
	console.log('grabaLang: '+o2s(nodo));
	if (vgk.appModal.editON) vgk.clasesML.updtNodoSelf(nodo);
	else vgk.clasesML.addNodoLang(nodo);
	updateClasesML();
	vgk.appModal.show = false;
}

function borraLang(nodo){
	console.log('borraLang: '+o2s(nodo));
	vgk.clasesML.borraNodo(nodo);
	updateClasesML();
	vgk.appModal.show = false;

}

function grabaNodoClase(){
	alert('grabaNodoClase');
}

function borraNodoClase(){
	alert('borraNodoClase');
}

function grabaTxtML(nodo){
	console.log('grabaTxtML: '+o2s(nodo)+':'+vgk.appModal);
	if (vgk.appModal.editON  && vgk.appPagIdiomas.visible == 'MENUS'){ 
			vgk.menuML.updtNodoSelf(nodo);
			updateMenuML();
		}
	else if (vgk.appModal.editON  && vgk.appPagIdiomas.visible == 'TEXTOS'){
			vgk.textosML.updtNodoSelf(nodo);
			updateTextosML();
		}
	else if (!vgk.appModal.editON  && vgk.appPagIdiomas.visible == 'MENUS'){ 
			vgk.menuML.addNodo(nodo);
			updateMenuML();
		}
	else if (!vgk.appModal.editON  && vgk.appPagIdiomas.visible == 'TEXTOS'){
			vgk.textosML.addNodo(nodo);
			updateTextosML();
		}
	vgk.appModal.show = false;
}

function borraTxtML(nodo){
	console.log('borraTxtML: '+o2s(nodo));
	if (vgk.appPagIdiomas.visible == 'MENUS'){ 
			vgk.menuML.borraNodo(nodo);
			updateMenuML();
		}
	else if (
		vgk.appPagIdiomas.visible == 'TEXTOS'){
			vgk.textosML.borraNodo(nodo);
			updateTextosML();
		}
	vgk.appModal.show = false;

}

//------------------------------------------------------------------- ClasesML (Langs & Clases)
function showClasesML(){
	var codes = [];
	var valid = [];

	var raspa = vgk.clasesML.getRaspa();
	raspa.map(function(nodo){
		     if (nodo.rol === 'LANGS') codes = vgk.clasesML.getHijosNodo(nodo);
		else if (nodo.rol === 'NODOS') nodos = vgk.clasesML.getHijosNodo(nodo);
	})
	vgk.appPagIdiomas.setLangs(codes);
	vgk.appPagIdiomas.setNodos(nodos);
}

function ecoUpdateClasesML(xhr){
	console.log('ClasesML actualizado');
}

function updateClasesML(){
	if (vgk.clasesML.meta.org != vgk.user.org){
		alert('ClasesML sin ORG:' + vgk.clasesML.meta.org +':'+ vgk.user.org);
		vgk.clasesML.meta.org = vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoUpdateClasesML;
	params.txt = o2s(vgk.clasesML.clase2ObjDB());
	params.topolId = vgk.clasesML_id;
	ajaxPutTopol(params);
	return false;
}

function ecoGet1ClasesML(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.clasesML_id = vgk.loTopol._id;
	vgk.clasesML = new rClasesML("",[]);
	vgk.clasesML.objDB2Clase(vgk.loTopol);
	vgk.clasesML.syncLangsRaiz();
	showClasesML();
}

function get1ClasesML(_id){
	vgk.clasesML_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGet1ClasesML;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}


//------------------------------------------------------------------- Arbol ClasesML


function grabaDatosClasesML(){
	var raiz = vgk.appModal.item;
	if (vgk.appModal.editON){
		vgk.clasesML.updtNodoSelf(raiz);
		updateClasesML();
	}
	else {
		vgk.clasesML = new ClasesML(raiz.tag,[raiz]);
		vgk.clasesML.meta.org = vgk.user.org;
	
		var params = vgApp.paramsXHR;
		params.base = '/betaAgro/';
		params.eco = ecoNuevaClasesML; 
		params.iam = 'rClasesML';
		params.txt = o2s(vgk.clasesML.clase2ObjDB());
		ajaxPostTopol(params);
	}
}

function ecoNuevoClasesML(xhr){
	vgk.clasesML_id = JSON.parse(xhr.responseText)._id;
}

function creaClasesML(otro){
	vgk.clasesML = mkClasesML();
	addClases2Clases();
	
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoNuevoClasesML; 
	params.iam = 'rClasesML';
	params.txt = o2s(vgk.clasesML.clase2ObjDB());
	console.log(params.txt);
	if (vgk.clasesML_id){
		params.topolId = vgk.clasesML_id;
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
		if (obj.meta.org == vgk.user.org && obj.meta.iam == 'rClasesML') items.push(obj);
	})
	if (items.length > 0) {
//		vgk.appPagIdiomas.setLista(items);
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
	params.org = vgk.user.org || 'NOORG';
	ajaxGetMetasByOrg(params);
 }

//=================================================================== Cambio Items


function adminClasesML(){
	vgk.appPagIdiomas.visible = 'CLASES';
	vgk.appPagIdiomas.malla = [];
	ajaxGetClasesML();
}

function adminMenusML(){
	vgk.appPagIdiomas.visible = 'MENUS';
	vgk.appPagIdiomas.malla = [];
	ajaxGetMenusML();
}
function adminTextosML(){
	vgk.appPagIdiomas.visible = 'TEXTOS';
	vgk.appPagIdiomas.malla = [];
	ajaxGetTextosML();
}

function adminTopolsML(){
	vgk.appPagIdiomas.visible = 'TOPOLS';
	vgk.appPagIdiomas.malla = [];
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
			console.log('2: '+o2s(txtML));
		}
		else if (topol && fila.pagina == topol.meta.tag && fila.opcion != txtML.tag){
			txtML = new rTxtML(fila.opcion,fila.codigo);
			txtML.lng[fila.idioma]= fila.texto;
			console.log('1: '+o2s(txtML));
			topol.addNodo(txtML);
		}
		else{
			console.log(fila.pagina);
			if (topol){
				var params = vgApp.paramsXHR;
				params.base = '/betaAgro';
				params.eco = ecoNouTextosRepo; 
				params.txt = o2s(topol.clase2ObjDB());
				ajaxPostTopol(params);
			}
			txtML = new rTxtML(fila.opcion,fila.codigo);
			txtML.lng[fila.idioma]= fila.texto;
			console.log('0: '+o2s(txtML));
			topol = new rMenuML(fila.pagina,[txtML]);
			topol.meta.org = vgk.user.org;

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
	vgk.menu_id = loTopol._id;
	vgk.menuML = new rMenuML("",[]);
	vgk.menuML.objDB2Clase(loTopol);
	alert('Creado menuML: '+vgk.menuML.meta.tag);	
}

function nuevoMenuML(){
	var tag = prompt('Tag Menu ML');
	if (tag){
		vgk.menuML = new rMenuML(tag,[]);
		vgk.menuML.meta.org = vgk.user.org;
		var params = vgApp.paramsXHR;
		params.base = '/betaAgro';
		params.eco = ecoNouMenuML; 
		params.iam = 'rMenuML';
		params.txt = o2s(vgk.menuML.clase2ObjDB());
		ajaxPostTopol(params);

	}
}
function ecoBorraMenuML(xhr){
	var respTxt = xhr.responseText;
	console.log(respTxt);
}

function borraMenuML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoBorraMenuML;
	params.topolId = _id;
	ajaxDeleteTopol(params);
}

function ecoGet1MenuML(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.menuML_id = vgk.loTopol._id;
	vgk.menuML = new rMenuML("",[]);
	vgk.menuML.objDB2Clase(vgk.loTopol);
	vgk.appPagIdiomas.malla = vgk.menuML.getMatriz();
	vgk.appPagIdiomas.menuML = vgk.menuML.meta.tag;

	console.log('eco get1: '+o2s(vgk.menuML.meta));
}

function get1MenuML(_id){
	vgk.menuML = _id;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGet1MenuML;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

function ecoGetMenusML(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && obj.meta.iam == 'rMenuML') items.push(obj);
	})

	vgk.appPagIdiomas.menus = items;

	if (items.length) get1MenuML(items[0]._id);
}

function ajaxGetMenusML() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetMenusML;
	params.iam = 'rMenuML';
	params.org = vgk.user.org || 'NOORG';
	ajaxGetMetasByOrg(params);
 }


function ecoUpdtMenuML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	vgk.menuML = new rMenuML("",[]);
	vgk.menuML.objDB2Clase(loTopol);
	console.log('eco updt: '+o2s(vgk.menuML.meta));
	vgk.appPagIdiomas.malla = vgk.menuML.getMatriz();
	vgk.appPagIdiomas.menuML = vgk.menuML.meta.tag;
}

function updateMenuML(){
		var params = vgApp.paramsXHR;
		params.base = '/betaAgro/';
		params.eco = ecoUpdtMenuML; 
		params.iam = 'rMenuML';
		params.txt = o2s(vgk.menuML.clase2ObjDB());
		params.topolId = vgk.menuML_id;
		ajaxPutTopol(params);
}

function grabaOpcML(){
	var nodo = vgk.appModal.item;
	if (vgk.appModal.editON) vgk.menuML.updtNodoSelf(nodo);
	else vgk.menuML.addNodo(nodo);
	updateMenuML();
}

//=================================================================== Textos ML
function ecoNouTextosRepo(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	console.log('Grabado TextosML:' + loTopol.meta.tag);
}
function ecoGetTextosRepo(xhr){
	var filas = csv2filas(xhr.responseText);
	var topol = null;
	var txtML = null;
	filas.map(function(fila){
		if (topol && txtML && fila.pagina == topol.meta.tag && fila.opcion == txtML.tag){
			txtML.lng[fila.idioma]= fila.texto;
			console.log('2: '+o2s(txtML));
		}
		else if (topol && fila.pagina == topol.meta.tag && fila.opcion != txtML.tag){
			txtML = new rTxtML(fila.opcion,fila.codigo);
			txtML.lng[fila.idioma]= fila.texto;
			console.log('1: '+o2s(txtML));
			topol.addNodo(txtML);
		}
		else{
			console.log(fila.pagina);
			if (topol){
				var params = vgApp.paramsXHR;
				params.base = '/betaAgro';
				params.eco = ecoNouTextosRepo; 
				params.txt = o2s(topol.clase2ObjDB());
				ajaxPostTopol(params);
			}
			txtML = new rTxtML(fila.opcion,fila.codigo);
			txtML.lng[fila.idioma]= fila.texto;
			console.log('0: '+o2s(txtML));
			topol = new rTextosML(fila.pagina,[txtML]);
			topol.meta.org = vgk.user.org;

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
	vgk.textos_id = loTopol._id;
	vgk.textosML = new rTextosML("",[]);
	vgk.textosML.objDB2Clase(loTopol);
	vgk.appPagIdiomas.texts.push({"_id":loTopol._id,"meta":loTopol.meta});
	vgk.appPagIdiomas.textML = loTopol.meta.tag;
	vgk.appPagIdiomas.malla = [];
	console.log('Creado textosML: '+vgk.textosML.meta.tag);	
}

function nuevoTextosML(){
	var tag = prompt('Tag Textos ML');
	if (tag){
		vgk.textosML = new rTextosML(tag,[]);
		vgk.textosML.meta.org = vgk.user.org;
		var params = vgApp.paramsXHR;
		params.base = '/betaAgro';
		params.eco = ecoNouTextosML; 
		params.iam = 'rTextosML';
		params.txt = o2s(vgk.textosML.clase2ObjDB());
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
	params.base = '/betaAgro/';
	params.eco = ecoBorraTextosML;
	params.topolId = _id;
	ajaxDeleteTopol(params);
}

function ecoGet1MenuML(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.menuML_id = vgk.loTopol._id;
	vgk.menuML = new rMenuML("",[]);
	vgk.menuML.objDB2Clase(vgk.loTopol);
	vgk.appPagIdiomas.malla = vgk.menuML.getMatriz();
	vgk.appPagIdiomas.menuML = vgk.menuML.meta.tag;
}

function ecoGet1TextosML(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.textos_id = vgk.loTopol._id;
	vgk.textosML = new rTextosML("",[]);
	vgk.textosML.objDB2Clase(vgk.loTopol);
	vgk.appPagIdiomas.malla = vgk.textosML.getMatriz();
	vgk.appPagIdiomas.textML = vgk.textosML.meta.tag;
}

function get1TextosML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGet1TextosML;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

function ecoGetTextosML(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && obj.meta.iam == 'rTextosML') items.push(obj);
	})

	vgk.appPagIdiomas.texts = items;

	if (items.length) get1TextosML(items[0]._id);
}

function ajaxGetTextosML() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetTextosML;
	params.iam = 'rTextosML';
	params.org = vgk.user.org || 'NOORG';
	ajaxGetMetasByOrg(params);
 }


function ecoUpdtTextosML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	vgk.textosML = new rTextosML("",[]);
	vgk.textosML.objDB2Clase(loTopol);
	console.log('eco updt: '+o2s(vgk.textosML.meta));
	vgk.appPagIdiomas.malla = vgk.textosML.getMatriz();
	vgk.appPagIdiomas.textosML = vgk.textosML.meta.tag;
}

function updateTextosML(){
		var params = vgApp.paramsXHR;
		params.base = '/betaAgro/';
		params.eco = ecoUpdtTextosML; 
		params.iam = 'rTextosML';
		params.txt = o2s(vgk.textosML.clase2ObjDB());
		params.topolId = vgk.textos_id;
		ajaxPutTopol(params);
}

function grabaTextosML(){
	var nodo = vgk.appModal.item;
	if (vgk.appModal.editON) vgk.textosML.updtNodoSelf(nodo);
	else vgk.textosML.addNodo(nodo);
	updateTextosML();
}

function grabaBigTxt(){
	var nodo = vgk.appModal.item;
	vgk.textosML.updtNodoSelf(nodo);
	vgk.appPagIdiomas.malla = vgk.textosML.getMatriz();
	vgk.appModal.show = false;
}

function adminTextosML(){
	vgk.appPagIdiomas.visible = 'TEXTOS';
	vgk.appPagIdiomas.malla = [];
	ajaxGetTextosML();
}

//=================================================================== Topols ML


function ecoBorraTopolML(xhr){
	var respTxt = xhr.responseText;
	ajaxGetTopolsML();
	console.log(respTxt);
}

function borraTopolML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoBorraTopolML;
	params.topolId = _id;
	ajaxDeleteTopol(params);
}

function ecoGet1MenuML(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.menuML_id = vgk.loTopol._id;
	vgk.menuML = new rMenuML("",[]);
	vgk.menuML.objDB2Clase(vgk.loTopol);
	vgk.appPagIdiomas.malla = vgk.menuML.getMatriz();
	vgk.appPagIdiomas.menuML = vgk.menuML.meta.tag;
}

function ecoGet1TopolsML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	vgk.topolML = new rTopol('',[]);
	vgk.topolML.objDB2Clase(loTopol);
	var tag = loTopol.meta.tag +' | '+loTopol.meta.iam+' | '+loTopol.meta.org;
	vgk.appPagIdiomas.metaML = tag;
	r$('topolJSON').value = respTxt;
}

function get1TopolsML(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGet1TopolsML;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

function ecoGetTopolsML(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		items.push(obj);
	})

	vgk.appPagIdiomas.metas = items;

//	if (items.length) get1TopolsML(items[0]._id);
}

function ajaxGetTopolsML() {
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro';
	params.eco = ecoGetTopolsML;
//	params.iam = 'rTextosML';
//	params.org = vgk.user.org || 'NOORG';
	ajaxGetAll(params);
 }


function ecoUpdtTopolsML(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	vgk.topolsML = new rTopolsML("",[]);
	vgk.topolsML.objDB2Clase(loTopol);
	console.log('eco updt: '+o2s(vgk.topolsML.meta));
	vgk.appPagIdiomas.malla = vgk.topolsML.getMatriz();
	vgk.appPagIdiomas.textosML = vgk.topolsML.meta.tag;
}

function updateTopolsML(){
		var params = vgApp.paramsXHR;
		params.base = '/betaAgro/';
		params.eco = ecoUpdtTopolsML; 
		params.txt = o2s(vgk.topolsML.clase2ObjDB());
		params.topolId = vgk.textos_id;
		ajaxPutTopol(params);
}

function grabaTopolsML(){
	var nodo = vgk.appModal.item;
	if (vgk.appModal.editON) vgk.topolsML.updtNodoSelf(nodo);
	else vgk.topolsML.addNodo(nodo);
	updateTopolsML();
}
