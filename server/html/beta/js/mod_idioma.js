
//------------------------------------------------------------------- userMenu/vueApp cascade
function initAppsIdioma(){

	if (r$('pagIdioma')){
		vgk.appPagIdiomas = new Vue ({
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
					var lang = vgk.clasesML.getNodoById(id0);
					editaItem('LANG',lang,grabaLang,borraLang);
				},
				nuevoLang : function(){
					var lang = new rLang('Nuevo');
					crearItem('LANG',lang,grabaLang);
				},
				editNodo : function(id0){
					var nodo = vgk.clasesML.getNodoById(id0);
					this.malla = vgk.clasesML.getTextosEdit(nodo.obj.clase);
					this.nodoC = nodo;
				},
				editCelda : function(ix){
					var text = this.malla[ix].text;
					var resp = prompt('Editar texto',text);
					if (resp) this.malla[ix].text = resp;
				},
				grabaNodoC : function(){
					this.nodoC.setMatriz(this.malla);
					console.log(o2s(this.nodoC));
					vgk.clasesML.updtNodoSelf(this.nodoC);
					updateClasesML();
				},
//------------------------------------------------------------------- Menu & Textos
				editTxtML : function(id0){
					var nodo = null;
					if (this.visible == 'MENUS') nodo = vgk.menuML.getNodoById(id0);
					else if (this.visible == 'TEXTOS') nodo = vgk.textosML.getNodoById(id0);
					editaItem('TXTML',nodo,grabaTxtML,borraTxtML);
					console.log('editTxtML' + id0);
				},
//------------------------------------------------------------------- MenusML
				nuevoMenuML : function(){nuevoMenuML();},
				borraMenuML : function(ix){
					var _id = this.menus[ix]._id;
					borraMenuML(_id);
				},

				setMenuML : function(ix){
					console.log('selecc: '+ o2s(this.menus[ix].meta));
					get1MenuML(this.menus[ix]._id);
				},
				editMenuML : function(){
					var tag = prompt('Nuevo Tag ?',vgk.menuML.meta.tag);
					if (tag){
						vgk.menuML.meta.tag = tag;
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
					vgk.menuML.setMatriz(this.malla);
					updateMenuML();
				},
//------------------------------------------------------------------- TextosML
				nuevoTextosML : function(){ nuevoTextosML()},
				borraTextosML : function(ix){
					var _id = this.texts[ix]._id;
					borraTextosML(_id);
				},
				setTextosML : function(ix){
					console.log('selecc: '+ o2s(this.texts[ix].meta));
					get1TextosML(this.texts[ix]._id);
				},
				editTextosML : function(){
					var tag = prompt('Nuevo Tag ?',vgk.textosML.meta.tag);
					if (tag){
						vgk.textosML.meta.tag = tag;
						updateTextosML();
					}

				},
				addTxtML : function(){
					var txtML = new rTxtML('Nuevo');
					crearItem('TXTML',txtML,grabaTxtML);
				},
				editCeldaTxt : function(ix){
					vgk.appModal.keoML = this.malla[ix].keo;
					var id0 = this.malla[ix].id0;
					var nodo = vgk.textosML.getNodoById(id0);
					editaItem('BIGML',nodo,grabaBigTxt);
//					var resp = prompt('Editar texto',txt);
//					if (resp) this.malla[ix].txt = resp;
				},
				grabaTextosML : function(){
					vgk.textosML.setMatriz(this.malla);
					updateTextosML();
				},
//------------------------------------------------------------------- TopolsML				
				setTopolsML : function(ix){
					console.log('selecc: '+ o2s(this.metas[ix].meta));
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
	var menuPag = new rMenuML("",[]);
	menuPag.objDB2Clase(loTopol);
	menuPag.nodos.map(function(nodo){
		try {
			r$(nodo.cod).innerHTML = nodo.getTag(vgk.user.keo);
		} catch (e){console.log('Error '+e.message+' en elemento con id: '+nodo.cod);}
	})
}

function get1MenuPag(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGet1MenuPag;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}


function ecoGetMenuPag(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && 
			obj.meta.iam == 'rMenuML' &&
			obj.meta.tag == vgk.menuPag) items.push(obj);
	})

	if (items.length) get1MenuPag(items[0]._id);
	else console.log('No Hay Menús');


}


function ajaxGetMenuPag(tag) {
	vgk.menuPag = tag;
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetMenuPag;
	params.iam = 'rMenuML';
	params.org = vgk.user.org || 'NOORG';
	ajaxGetMetasByOrg(params);
}

//------------------------------------------------------------------- Textos Pag
// Definir appPagIdiomas DESPUES de aplicar traducciones !!!!!
// O después de verificar que no hay página de Textos
function ecoGet1TextPag(xhr){
	var respTxt = xhr.responseText;
	var loTopol = JSON.parse(respTxt);
	var textPag = new rTextosML("",[]);
	textPag.objDB2Clase(loTopol);
	textPag.nodos.map(function(nodo){
		try {
			r$(nodo.cod).innerHTML = nodo.getTag(vgk.user.keo);
		} catch (e){console.log('Error en elemento con id: '+nodo.cod);}
	})
	initAppsIdioma(); //---------------------- AQUI !!!
	adminClasesML();
}

function get1TextPag(_id){
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGet1TextPag;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}


function ecoGetTextPag(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && 
			obj.meta.iam == 'rTextosML' &&
			obj.meta.tag == vgk.textPag) items.push(obj);
	})

	if (items.length) get1TextPag(items[0]._id);
	else{
		console.log('No Hay Textos');
		initAppsIdioma();
		adminClasesML();
	}
}


function ajaxGetTextPag(tag) {
	vgk.textPag = tag;
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetTextPag;
	params.iam = 'rTextosML';
	params.org = vgk.user.org || 'NOORG';
	ajaxGetMetasByOrg(params);
}


function sesionIdiomaOK(xhr){
	initAppsGlobal();
//	vgk.user.keo='CAT';
	ajaxGetMenuPag('Idiomas');
	ajaxGetTextPag('Idiomas');
}




function initIdioma(){
	validaSesion('usrMenu', sesionIdiomaOK); // libK1_sesion.js
}
