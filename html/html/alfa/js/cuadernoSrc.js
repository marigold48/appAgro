import utils  from '/k1/libK1_Utils.js'
import ajax   from '/k1/libK1_Ajax.js'
import idioma from '/k1/libK1_Idioma.js'
import vapps  from '/k1/libK1_vApps.js'

import ccpae from '/js/agro_CCPAE.js'

import agro  from  '/js/agro_Clases.js'

//=================================================================== CUADERNO
function initAppsQuadern(){
	if (utils.r$('h2Campanya')){
		utils.vgk.appCampanya = new Vue({
			el: '#h2Campanya',
			data: {
				tag: '',
			},
			methods :{
				actualiza : function(tag){this.tag = tag;},
				nuevoQuadern : function(){nuevoQuadern();},
				borraQuadern : function(){borraQuadern();}
			}
		})
	}
// Portada
	if (utils.r$('divReg00')){
		utils.vgk.appReg00 = new Vue({
			el: '#divReg00',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem(nodo.tag.toUpperCase(),nodo,grabaRegQEx,borraRegQEx);
				}
			}
		})
	}
// Personal y Maquinaria
	if (utils.r$('divReg01A')){
		utils.vgk.appReg01A = new Vue({
			el: '#divReg01A',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG01A',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01A('R1A-'+ n); nodo.obj.orden = 'A-'+n;
					vapps.crearItem('REG01A',nodo,grabaRegQEx);
				}
			}
		})
	}

	if (utils.r$('divReg01B')){
		utils.vgk.appReg01B = new Vue({
			el: '#divReg01B',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG01B',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01B('R1B-'+ n); nodo.obj.orden = 'B-'+n;
					vapps.crearItem('REG01B',nodo,grabaRegQEx);
				}

			}
		})
	}

	if (utils.r$('divReg01C')){
		utils.vgk.appReg01C = new Vue({
			el: '#divReg01C',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG01C',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01C('R1C-'+ n); nodo.obj.orden = 'C-'+n;
					vapps.crearItem('REG01C',nodo,grabaRegQEx);
				}
			}
		})
	}

	if (utils.r$('divReg01D')){
		utils.vgk.appReg01D = new Vue({
			el: '#divReg01D',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG01D',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01D('R1D-'+ n); nodo.obj.orden = 'D-'+n;
					vapps.crearItem('REG01D',nodo,grabaRegQEx);
				}
			}
		})
	}
	if (utils.r$('divReg01E')){
		utils.vgk.appReg01E = new Vue({
			el: '#divReg01E',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG01E',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg01E('R1E-'+ n); nodo.obj.orden = 'E-'+n;
					vapps.crearItem('REG01E',nodo,grabaRegQEx);
				}
			}
		})
	}
// Parcelas
	if (utils.r$('divReg02')){
		utils.vgk.appReg02 = new Vue({
			el: '#divReg02',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG02',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg02('R2-'+ n);
					vapps.crearItem('REG02',nodo,grabaRegQEx);
				}
			}
		})
	}

// Trabajos
	if (utils.r$('divReg03')){
		utils.vgk.appReg03 = new Vue({
			el: '#divReg03',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG03',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg03('R3-'+ n);
					vapps.crearItem('REG03',nodo,grabaRegQEx);
				}
			}
		})
	}

// Tratamientos FS
	if (utils.r$('divReg04')){
		utils.vgk.appReg04 = new Vue({
			el: '#divReg04',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG04',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg04('R4-'+ n);
					vapps.crearItem('REG04',nodo,grabaRegQEx);
				}
			}
		})
	}

// Otros Tratamientos FS
// Semillas tratadas
	if (utils.r$('divReg05A')){
		utils.vgk.appReg05A = new Vue({
			el: '#divReg05A',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG05A',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg05A('R5A-'+ n);
					vapps.crearItem('REG05A',nodo,grabaRegQEx);
				}
			}
		})
	}
// Tratamientos post-cosecha
	if (utils.r$('divReg05B')){
		utils.vgk.appReg05B = new Vue({
			el: '#divReg05B',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG05B',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg05B('R5B-'+ n);
					vapps.crearItem('REG05B',nodo,grabaRegQEx);
				}
			}
		})
	}
// Analisis residuos
	if (utils.r$('divReg06')){
		utils.vgk.appReg06 = new Vue({
			el: '#divReg06',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG06',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg06('R6-'+ n);
					vapps.crearItem('REG06',nodo,grabaRegQEx);
				}
			}
		})
	}

// Compras
	if (utils.r$('divReg07')){
		utils.vgk.appReg07 = new Vue({
			el: '#divReg07',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG07',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg07('R7-'+ n);
					vapps.crearItem('REG07',nodo,grabaRegQEx);
				}
			}
		})
	}

// Ventas
	if (utils.r$('divReg08')){
		utils.vgk.appReg08 = new Vue({
			el: '#divReg08',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG08',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg08('R8-'+ n);
					vapps.crearItem('REG08',nodo,grabaRegQEx);
				}
			}
		})
	}
// Totales y rendimiento
	if (utils.r$('divReg09')){
		utils.vgk.appReg09 = new Vue({
			el: '#divReg09',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG09',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg09('R9-'+ n);
					vapps.crearItem('REG09',nodo,grabaRegQEx);
				}
			}
		})
	}

// Otros datos/incidencias
// Datos ambientales
	if (utils.r$('divReg10A')){
		utils.vgk.appReg10A = new Vue({
			el: '#divReg10A',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG10A',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg10A('R10A-'+ n);
					vapps.crearItem('REG10A',nodo,grabaRegQEx);
				}
			}
		})
	}
// Incidencias
	if (utils.r$('divReg10B')){
		utils.vgk.appReg10B = new Vue({
			el: '#divReg10B',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG10B',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg10B('R10B-'+ n);
					vapps.crearItem('REG10B',nodo,grabaRegQEx);
				}
			}
		})
	}
// Reclamaciones
	if (utils.r$('divReg11')){
		utils.vgk.appReg11 = new Vue({
			el: '#divReg11',
			data: {
				items: [],
				idAct: 0,
			},
			methods :{
				actualiza : function(items){this.items = items;},
				editReg : function(id0){
					var nodo = utils.vgk.quadern.getNodoById(id0);
					vapps.editaItem('REG11',nodo,grabaRegQEx,borraRegQEx);
				},
				addReg : function(){
					var n = this.items.length + 1;
					var nodo = new Reg11('R11-'+ n); nodo.obj.orden = n;
					vapps.crearItem('REG11',nodo,grabaRegQEx);
				}
			}
		})
	}

}



function borraRegQEx(nodo){
	switch(nodo.iam){
		case 'Reg00':
		case 'Reg10A':
			alert('No es pot esborrar aquest registre.');
			return;
			break;
		default : null
	}
	var ok = confirm('Vol esborrar el registre?')
	if (ok){
		utils.vgk.quadern.borraNodo(nodo);
		actualizaAppsQuadern();
		updateQuadern();
	}
	utils.vgk.appModal.show = false;
}

function grabaRegQEx(nodo){
	if (utils.vgk.appModal.editON)	utils.vgk.quadern.updtNodoSelf(nodo);
	else {
		var padre= utils.vgk.quadern.getPadreByIam(nodo.iam);
		utils.vgk.quadern.addNodoHijo(padre,nodo);
		actualizaAppsQuadern();
	}
	updateQuadern();
	utils.vgk.appModal.show = false;
}



//------------------------------------------------------------------- Nuevo Quadern

function ecoUpdateQuadern(xhr){
	console.log('Quadern actualizado');
}
function updateQuadern(){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateQuadern; 
	params.iam = 'Quadern';
	params.txt = utils.o2s(utils.vgk.quadern.clase2ObjDB());
	params.topolId = utils.vgk.quadern_id;
	ajax.ajaxPutTopol(params);

}

function ecoNuevoQuadern(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.quadern_id = loTopol._id;
	utils.vgk.quadern = new Quadern("",[]);
	utils.vgk.quadern.objDB2Clase(loTopol);
	var item = {_id:utils.vgk.quadern_id,meta:utils.vgk.quadern.meta};
	utils.vgk.listaQuaderns.push(item);
	actualizaAppsQuadern();
	var raiz = utils.vgk.quadern.getRaiz();
	cargaAgroJar(raiz.obj.jar2);
}


function ecoDuplicaQuadern(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.quadern_id = loTopol._id;
	utils.vgk.quadern = new Quadern("",[]);
	utils.vgk.quadern.objDB2Clase( loTopol);

	//cambios al original
	var campanya = prompt('Campanya? (ej: 2018-2019','2018-2019');
	var patron=new RegExp('^[2][0-9]{3}[-][2][0-9]{3}$');
 	if (!patron.test(campanya)){
		alert('Formato erróneo')
		borraQuadern();
		return;
	} 

	utils.vgk.quadern.meta.tag = 'Campanya '+campanya;
	var raiz = utils.vgk.quadern.getRaiz();
	raiz.tag = 'Campanya '+campanya;
	raiz.obj.jar1 = campanya.split('-')[0];
	raiz.obj.jar2 = campanya.split('-')[1];


	// actualizar la copia 
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoQuadern; 
	params.iam = 'rGrafo';
	params.txt = utils.o2s(utils.vgk.quadern.clase2ObjDB());
	params.topolId = utils.vgk.loTopol._id;
	ajax.ajaxPutTopol(params);
}


function duplicaQuadern(_id){
	var params = vgApp.paramsXHR;
	params.base = '/clone/';
	params.eco = ecoDuplicaQuadern;
	params.topolId = _id;

	ajax.ajaxDuplicaTopol(params);
	return false;
}

function nuevoQuadern(){
	if (utils.vgk.appCampanya.tag == 'Quadern Original')	duplicaQuadern(utils.vgk.quadern_id);
	else alert("S'ha de carregar el 'Quadern Original'");
}

//------------------------------------------------------------------- Borra Quadern
function resetAppsQuadern(){
	utils.vgk.appCampanya.actualiza('');
	utils.vgk.appReg00.actualiza([]);
	utils.vgk.appReg01A.actualiza([]);
	utils.vgk.appReg01B.actualiza([]);
	utils.vgk.appReg01C.actualiza([]);
	utils.vgk.appReg01D.actualiza([]);
	utils.vgk.appReg01E.actualiza([]);
	utils.vgk.appReg02.actualiza([]);
	utils.vgk.appReg03.actualiza([]);
	utils.vgk.appReg04.actualiza([]);
	utils.vgk.appReg05A.actualiza([]);
	utils.vgk.appReg05B.actualiza([]);
	utils.vgk.appReg06.actualiza([]);
	utils.vgk.appReg07.actualiza([]);
	utils.vgk.appReg08.actualiza([]);
	utils.vgk.appReg09.actualiza([]);
	utils.vgk.appReg10A.actualiza([]);
	utils.vgk.appReg10B.actualiza([]);
	utils.vgk.appReg11.actualiza([]);
}
function ecoBorraQuadern(xhr){
	utils.vgk.quadern = null;
	utils.vgk.quadern_id = null;
	resetAppsQuadern();
	console.log('Quadern borrado');
	ajaxGetQuaderns();
}

function borraQuadern(){
	if (!utils.vgk.quadern_id){alert('No hay Quadern activo'); return false;}
	var ok = confirm('Borrar Quadern actual ?');
	if (!ok) return;

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraQuadern;
	params.topolId = utils.vgk.quadern_id;

	ajax.ajaxDeleteTopol(params);
	utils.vgk.appModal.show = false;
	return false;
}
//------------------------------------------------------------------- Actualizar vueApps CCPAE
//-------------------------------------------------------------------- Portada
function actAppReg00(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg00.actualiza(items);
}
//------------------------------------------------------------------- Personal y maquinaria
// 
function actAppReg01(nodoP){
	nodoP.hijos.map(function(idH){
		var nodo =utils.vgk.quadern.getNodoById(idH);
		var regNum = nodo.tag.split(': ')[0];
		switch(regNum){
			case '1A' : actAppReg01A(nodo); break;
			case '1B' : actAppReg01B(nodo); break;
			case '1C' : actAppReg01C(nodo); break;
			case '1D' : actAppReg01D(nodo); break;
			case '1E' : actAppReg01E(nodo); break;
		}
	})
}
// Plantilla
function actAppReg01A(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg01A.actualiza(items);
}
// Contratados
function actAppReg01B(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg01B.actualiza(items);
}
// Empresas
function actAppReg01C(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg01C.actualiza(items);
}

// Maq propia
function actAppReg01D(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg01D.actualiza(items);
}
// Maq alquilada
function actAppReg01E(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg01E.actualiza(items);
}
//-------------------------------------------------------------------- Parcelas
function actAppReg02(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg02.actualiza(items);
}
//-------------------------------------------------------------------- Trabajos
function actAppReg03(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg03.actualiza(items);
}

//-------------------------------------------------------------------- Tratamientos FS
function actAppReg04(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg04.actualiza(items);
}

//------------------------------------------------------------------- Otros tratamientos FS
// 
function actAppReg05(nodoP){
	nodoP.hijos.map(function(idH){
		var nodo =utils.vgk.quadern.getNodoById(idH);
		var regNum = nodo.tag.split(': ')[0];
		switch(regNum){
			case '5A' : actAppReg05A(nodo); break;
			case '5B' : actAppReg05B(nodo); break;
		}
	})
}
// Semilla tratada
function actAppReg05A(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg05A.actualiza(items);
}
// Trat post-cosecha
function actAppReg05B(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg05B.actualiza(items);
}
//-------------------------------------------------------------------- Analisis residuos
function actAppReg06(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg06.actualiza(items);
}

//-------------------------------------------------------------------- Compras
function actAppReg07(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg07.actualiza(items);
}

//-------------------------------------------------------------------- Ventas
function actAppReg08(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg08.actualiza(items);
}

//-------------------------------------------------------------------- Totales y redimiento
function actAppReg09(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg09.actualiza(items);
}
//------------------------------------------------------------------- Otros datos/incid
// 
function actAppReg10(nodoP){
	nodoP.hijos.map(function(idH){
		var nodo =utils.vgk.quadern.getNodoById(idH);
		var regNum = nodo.tag.split(': ')[0];
		switch(regNum){
			case '10A' : actAppReg10A(nodo); break;
			case '10B' : actAppReg10B(nodo); break;
		}
	})
}
// Datos ambientales
function actAppReg10A(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg10A.actualiza(items);
}
// Incidencias
function actAppReg10B(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg10B.actualiza(items);
}
//-------------------------------------------------------------------- Reclamaciones
function actAppReg11(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = utils.vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	utils.vgk.appReg11.actualiza(items);
}
//-------------------------------------------------------------------
function actualizaAppsQuadern(){
	var tag = utils.vgk.quadern.meta.tag;
	utils.vgk.appCampanya.actualiza(tag);

	var raspa = utils.vgk.quadern.getRaspa();
	raspa.map(function(nodo){
		var regNum = nodo.tag.split(': ')[0];
		switch(regNum){
			case '0' : actAppReg00(nodo); break;
			case '1' : actAppReg01(nodo); break;
			case '2' : actAppReg02(nodo); break;
			case '3' : actAppReg03(nodo); break;
			case '4' : actAppReg04(nodo); break;
			case '5' : actAppReg05(nodo); break;
			case '6' : actAppReg06(nodo); break;
			case '7' : actAppReg07(nodo); break;
			case '8' : actAppReg08(nodo); break;
			case '9' : actAppReg09(nodo); break;
			case '10': actAppReg10(nodo); break;
			case '11': actAppReg11(nodo); break;
		}
	})
}

function ecoGet1Quadern(xhr){
	var respTxt = xhr.responseText;
	utils.vgk.loTopol = JSON.parse(respTxt);
	utils.vgk.quadern_id = utils.vgk.loTopol._id;
	utils.vgk.quadern = new ccpae.Quadern("",[]);
	utils.vgk.quadern.objDB2Clase(utils.vgk.loTopol);
	actualizaAppsQuadern();
}

function get1Quadern(_id){
	utils.vgk.quadern_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Quadern;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);
	utils.vgk.appModal.show = false;
	return false;
}

export function carga1Quadern(){
	get1Quadern(utils.vgk.appModal.idAct);
}

//------------------------------------------------------------------- Crear Lista de Quaderns
function ecoGetQuaderns(xhr){
	var objs = JSON.parse(xhr.responseText);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == utils.vgk.user.org && obj.meta.iam == 'Quadern') items.push(obj);
	})

	if (items.length){
		utils.vgk.listaQuaderns = items;
//		get1Quadern(items[0]._id);
	
	}
	else{ 
		utils.vgk.listaQuaderns = [];
		creaQuadernOrigen();
	}
}

function ajaxGetQuaderns() {

	var params = vgApp.paramsXHR;
	params.base = '/metas/';
	params.eco = ecoGetQuaderns;
	params.iam = 'Quadern';

	ajax.ajaxGetMetas(params);
 }

export function showListaQuaderns(){
	utils.vgk.appModal.items = utils.vgk.listaQuaderns;
	if (utils.vgk.listaQuaderns.length) utils.vgk.appModal.idAct = utils.vgk.listaQuaderns[0]._id;
	utils.vgk.appModal.conds = {retol : 'Lista Cuadernos'};
	utils.vgk.appModal.modo = 'modal-container';
	utils.vgk.appModal.edit_t = 'LISTA';
	utils.vgk.appModal.show = true;

}



//------------------------------------------------------------------- Mod

//=================================================================== Fusion Quadern/Temporada
function ecoCargaTasks4Q(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.tasks_id = loTopol._id;
	utils.vgk.grafoTasks = new GrafoTasks("",[]);
	utils.vgk.grafoTasks.objDB2Clase(loTopol);
	var nodos = utils.vgk.grafoTasks.nodos;
	nodos.map(function(nodo){
		console.log('Tasks: '+utils.vgk.grafoTasks.meta.tag+':'+ nodo.tag);
//		var ccpae = nodo.getCCPAE();
//		utils.vgk.quadern.fusionaNodo(ccpae);
	})
	updateQuadern();
}

function cargaTasks4Q(_id){
	utils.vgk.tasks_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCargaTasks4Q;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);
	return false;
}
//------------------------------------------------------------------- Carga Temporada

function ecoCarga1AgroJar(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.escenario_id = loTopol._id;
	utils.vgk.escenario = new AgroJar("",[]);
	utils.vgk.escenario.objDB2Clase(loTopol);
	var nudos = utils.vgk.escenario.getNudos();
	nudos.map(function(nudo){
		var tasks_id = nudo.obj.tasks_id;
		if (tasks_id) cargaTasks4Q(tasks_id);
		var ccpae = nudo.getCCPAE();
		utils.vgk.quadern.fusionaNodo(ccpae);
	})
	updateQuadern();
}

function carga1AgroJar(_id){
	utils.vgk.escenario_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCarga1AgroJar;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);
	utils.vgk.appModal.show = false;
	return false;
}

function ecoCargaAgroJars(xhr){
	var objs = JSON.parse(xhr.responseText);
	objs.map(function(obj){
		var jar = obj.meta.tag.split(' ')[1];
		console.log('['+jar+']:['+utils.vgk.jarAgro+']');
		var j1 = parseInt(jar);
		var j2 = parseInt(utils.vgk.jarAgro);
		if (j1 == j2)	{
			carga1AgroJar(obj._id); 
			return;
		}
	})
}

function cargaAgroJar(jar){
	utils.vgk.jarAgro = jar;
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoCargaAgroJars;
	params.iam = 'AgroJar';
	params.org = utils.vgk.user.org;

	ajax.ajaxGetMetasByOrg(params);
 }

//------------------------------------------------------------------- Carga Explotacion
function fusionQuadern0(){
	var ok = confirm("Fusionar con datos explotacion?");
	if (!ok) return;

	console.log('---------------------------- fusionQuadern0');
	var nodos = utils.vgk.explt.nodos;
	nodos.map(function(nodo){
		if (/Reg/.test(nodo.iam))	utils.vgk.quadern.fusionaNodo(nodo);
	})
	//updateQuadern();
}

function ecoCreaQuadern0(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.quadern_id = loTopol._id;
	utils.vgk.quadern = new ccpae.Quadern("",[]);
	utils.vgk.quadern.objDB2Clase(loTopol);
	var item = {_id:utils.vgk.quadern_id,meta:utils.vgk.quadern.meta};

	utils.vgk.listaQuaderns.push(item);
	actualizaAppsQuadern();
}


function creaArbolQuadern0(){
	utils.vgk.quadern = ccpae.mkQuadern0();
	if (utils.vgk.explt_id) fusionQuadern0();

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCreaQuadern0; 
	params.txt = utils.o2s(utils.vgk.quadern.clase2ObjDB());
	ajax.ajaxPostTopol(params);
}

function ecoGet1Explt4Q(xhr){
		var loTopol = JSON.parse(xhr.responseText);
		utils.vgk.explt_id = loTopol._id;
		utils.vgk.explt = new agro.Explt("",[]);
		utils.vgk.explt.objDB2Clase(loTopol);

		creaArbolQuadern0();
}

function get1Explt4Q(_id){
	utils.vgk.explt_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Explt4Q;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);

	return false;
}

function ecoGetExplt4Q(xhr){
	var objs = JSON.parse(xhr.responseText);
	if (objs.length > 0){
		get1Explt4Q(objs[0]._id); // hay una sola lista
	}
	else {
		alert('No hay Explotación');
		creaArbolQuadern0(false);

	}
}

function cargaExplt4Q() {

	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetExplt4Q;
	params.iam = 'Explt';
	params.org = utils.vgk.user.org;

	ajax.ajaxGetMetasByOrg(params);
 }


export function creaQuadernOrigen(){
	var ok = confirm('Crear Cuaderno Original ?');
	if (!ok) return;
	cargaExplt4Q();
}

export default {ajaxGetQuaderns,initAppsQuadern}