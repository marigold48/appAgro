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
				nuevoQuadern : function(){nuevoQuadern();},
				borraQuadern : function(){borraQuadern();}
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
		vgk.quadern.borraNodo(nodo);
		actualizaAppsQuadern();
		updateQuadern();
	}
}

function grabaRegQEx(nodo){
	if (vgk.appModal.editON)	vgk.quadern.updtNodoSelf(nodo);
	else {
		var padre= vgk.quadern.getPadreByIam(nodo.iam);
		vgk.quadern.addNodoHijo(padre,nodo);
		actualizaAppsQuadern();
	}
	updateQuadern();
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
	params.txt = o2s(vgk.quadern.clase2ObjDB());
	params.topolId = vgk.quadern_id;
	ajaxPutTopol(params);

}

function ecoNuevoQuadern(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.quadern_id = loTopol._id;
	vgk.quadern = new Quadern("",[]);
	vgk.quadern.objDB2Clase(loTopol);
	var item = {_id:vgk.quadern_id,meta:vgk.quadern.meta};
	vgk.listaQuaderns.push(item);
	actualizaAppsQuadern();
	var raiz = vgk.quadern.getRaiz();
	cargaAgroJar(raiz.obj.jar2);
}


function ecoDuplicaQuadern(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.quadern_id = loTopol._id;
	vgk.quadern = new Quadern("",[]);
	vgk.quadern.objDB2Clase( loTopol);

	//cambios al original
	var campanya = prompt('Campanya? (ej: 2018-2019','2018-2019');
	var patron=new RegExp('^[2][0-9]{3}[-][2][0-9]{3}$');
 	if (!patron.test(campanya)){
		alert('Formato erróneo')
		borraQuadern();
		return;
	} 

	vgk.quadern.meta.tag = 'Campanya '+campanya;
	var raiz = vgk.quadern.getRaiz();
	raiz.tag = 'Campanya '+campanya;
	raiz.obj.jar1 = campanya.split('-')[0];
	raiz.obj.jar2 = campanya.split('-')[1];


	// actualizar la copia 
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoNuevoQuadern; 
	params.iam = 'rGrafo';
	params.txt = o2s(vgk.quadern.clase2ObjDB());
	params.topolId = vgk.loTopol._id;
	ajaxPutTopol(params);
}


function duplicaQuadern(_id){
	var params = vgApp.paramsXHR;
	params.base = '/clone/';
	params.eco = ecoDuplicaQuadern;
	params.topolId = _id;

	ajaxDuplicaTopol(params);
	return false;
}

function nuevoQuadern(){
	if (vgk.appCampanya.tag == 'Quadern Original')	duplicaQuadern(vgk.quadern_id);
	else alert("S'ha de carregar el 'Quadern Original'");
}

//------------------------------------------------------------------- Borra Quadern
function resetAppsQuadern(){
	vgk.appCampanya.actualiza('');
	vgk.appReg00.actualiza([]);
	vgk.appReg01A.actualiza([]);
	vgk.appReg01B.actualiza([]);
	vgk.appReg01C.actualiza([]);
	vgk.appReg01D.actualiza([]);
	vgk.appReg01E.actualiza([]);
	vgk.appReg02.actualiza([]);
	vgk.appReg03.actualiza([]);
	vgk.appReg04.actualiza([]);
	vgk.appReg05A.actualiza([]);
	vgk.appReg05B.actualiza([]);
	vgk.appReg06.actualiza([]);
	vgk.appReg07.actualiza([]);
	vgk.appReg08.actualiza([]);
	vgk.appReg09.actualiza([]);
	vgk.appReg10A.actualiza([]);
	vgk.appReg10B.actualiza([]);
	vgk.appReg11.actualiza([]);
}
function ecoBorraQuadern(xhr){
	vgk.quadern = null;
	vgk.quadern_id = null;
	resetAppsQuadern();
	console.log('Quadern borrado');
	ajaxGetQuaderns();
}

function borraQuadern(){
	if (!vgk.quadern_id){alert('No hay Quadern activo'); return false;}
	var ok = confirm('Borrar Quadern actual ?');
	if (!ok) return;

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraQuadern;
	params.topolId = vgk.quadern_id;

	ajaxDeleteTopol(params);
	vgk.appModal.show = false;
	return false;
}
//------------------------------------------------------------------- Actualizar vueApps CCPAE
//-------------------------------------------------------------------- Portada
function actAppReg00(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg00.actualiza(items);
}
//------------------------------------------------------------------- Personal y maquinaria
// 
function actAppReg01(nodoP){
	nodoP.hijos.map(function(idH){
		var nodo =vgk.quadern.getNodoById(idH);
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
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg01A.actualiza(items);
}
// Contratados
function actAppReg01B(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg01B.actualiza(items);
}
// Empresas
function actAppReg01C(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg01C.actualiza(items);
}

// Maq propia
function actAppReg01D(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg01D.actualiza(items);
}
// Maq alquilada
function actAppReg01E(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg01E.actualiza(items);
}
//-------------------------------------------------------------------- Parcelas
function actAppReg02(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg02.actualiza(items);
}
//-------------------------------------------------------------------- Trabajos
function actAppReg03(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg03.actualiza(items);
}

//-------------------------------------------------------------------- Tratamientos FS
function actAppReg04(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg04.actualiza(items);
}

//------------------------------------------------------------------- Otros tratamientos FS
// 
function actAppReg05(nodoP){
	nodoP.hijos.map(function(idH){
		var nodo =vgk.quadern.getNodoById(idH);
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
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg05A.actualiza(items);
}
// Trat post-cosecha
function actAppReg05B(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg05B.actualiza(items);
}
//-------------------------------------------------------------------- Analisis residuos
function actAppReg06(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg06.actualiza(items);
}

//-------------------------------------------------------------------- Compras
function actAppReg07(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg07.actualiza(items);
}

//-------------------------------------------------------------------- Ventas
function actAppReg08(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg08.actualiza(items);
}

//-------------------------------------------------------------------- Totales y redimiento
function actAppReg09(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg09.actualiza(items);
}
//------------------------------------------------------------------- Otros datos/incid
// 
function actAppReg10(nodoP){
	nodoP.hijos.map(function(idH){
		var nodo =vgk.quadern.getNodoById(idH);
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
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg10A.actualiza(items);
}
// Incidencias
function actAppReg10B(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg10B.actualiza(items);
}
//-------------------------------------------------------------------- Reclamaciones
function actAppReg11(nodoP){
	var items = [];
	nodoP.hijos.map(function(idH){
		var nodoH = vgk.quadern.getNodoById(idH);
		items.push(nodoH);
	})
	vgk.appReg11.actualiza(items);
}
//-------------------------------------------------------------------
function actualizaAppsQuadern(){
	var tag = vgk.quadern.meta.tag;
	vgk.appCampanya.actualiza(tag);

	var raspa = vgk.quadern.getRaspa();
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
	vgk.loTopol = JSON.parse(respTxt);
	vgk.quadern_id = vgk.loTopol._id;
	vgk.quadern = new Quadern("",[]);
	vgk.quadern.objDB2Clase(vgk.loTopol);
	actualizaAppsQuadern();
}

function get1Quadern(_id){
	vgk.quadern_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Quadern;
	params.topolId = _id;

	ajaxGet1Topol(params);
	vgk.appModal.show = false;
	return false;
}

function carga1Quadern(){
	get1Quadern(vgk.appModal.idAct);
}

//------------------------------------------------------------------- Crear Lista de Quaderns
function ecoGetQuaderns(xhr){
	var objs = JSON.parse(xhr.responseText);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && obj.meta.iam == 'Quadern') items.push(obj);
	})

	if (items.length){
		vgk.listaQuaderns = items;
//		get1Quadern(items[0]._id);
	
	}
	else{ 
		vgk.listaQuaderns = [];
		creaQuadernOrigen();
	}
}

function ajaxGetQuaderns() {

	var params = vgApp.paramsXHR;
	params.base = '/metas/';
	params.eco = ecoGetQuaderns;
	params.iam = 'Quadern';

	ajaxGetMetas(params);
 }

function showListaQuaderns(){
	vgk.appModal.items = vgk.listaQuaderns;
	if (vgk.listaQuaderns.length) vgk.appModal.idAct = vgk.listaQuaderns[0]._id;
	vgk.appModal.conds = {retol : 'Lista Cuadernos'};
	vgk.appModal.modo = 'modal-container';
	vgk.appModal.edit_t = 'LISTA';
	vgk.appModal.show = true;

}



//------------------------------------------------------------------- Mod

//=================================================================== Fusion Quadern/Temporada
function ecoCargaTasks4Q(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.tasks_id = loTopol._id;
	vgk.grafoTasks = new GrafoTasks("",[]);
	vgk.grafoTasks.objDB2Clase(loTopol);
	var nodos = vgk.grafoTasks.nodos;
	nodos.map(function(nodo){
		console.log('Tasks: '+vgk.grafoTasks.meta.tag+':'+ nodo.tag);
//		var ccpae = nodo.getCCPAE();
//		vgk.quadern.fusionaNodo(ccpae);
	})
	updateQuadern();
}

function cargaTasks4Q(_id){
	vgk.tasks_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCargaTasks4Q;
	params.topolId = _id;

	ajaxGet1Topol(params);
	return false;
}
//------------------------------------------------------------------- Carga Temporada

function ecoCarga1AgroJar(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.escenario_id = loTopol._id;
	vgk.escenario = new AgroJar("",[]);
	vgk.escenario.objDB2Clase(loTopol);
	var nudos = vgk.escenario.getNudos();
	nudos.map(function(nudo){
		var tasks_id = nudo.obj.tasks_id;
		if (tasks_id) cargaTasks4Q(tasks_id);
		var ccpae = nudo.getCCPAE();
		vgk.quadern.fusionaNodo(ccpae);
	})
	updateQuadern();
}

function carga1AgroJar(_id){
	vgk.escenario_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCarga1AgroJar;
	params.topolId = _id;

	ajaxGet1Topol(params);
	vgk.appModal.show = false;
	return false;
}

function ecoCargaAgroJars(xhr){
	var objs = JSON.parse(xhr.responseText);
	objs.map(function(obj){
		var jar = obj.meta.tag.split(' ')[1];
		console.log('['+jar+']:['+vgk.jarAgro+']');
		var j1 = parseInt(jar);
		var j2 = parseInt(vgk.jarAgro);
		if (j1 == j2)	{
			carga1AgroJar(obj._id); 
			return;
		}
	})
}

function cargaAgroJar(jar){
	vgk.jarAgro = jar;
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoCargaAgroJars;
	params.iam = 'AgroJar';
	params.org = vgk.user.org;

	ajaxGetMetasByOrg(params);
 }

//------------------------------------------------------------------- Carga Explotacion
function fusionQuadern0(){
	console.log('---------------------------- fusionQuadern0');
	var nodos = vgk.explt.nodos;
	nodos.map(function(nodo){
		if (/Reg/.test(nodo.iam))	vgk.quadern.fusionaNodo(nodo);
	})
//	updateQuadern();
}

function ecoCreaQuadern0(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.quadern_id = loTopol._id;
	vgk.quadern = new Quadern("",[]);
	vgk.quadern.objDB2Clase(loTopol);
	var item = {_id:vgk.quadern_id,meta:vgk.quadern.meta};

	vgk.listaQuaderns.push(item);
	actualizaAppsQuadern();
}


function creaArbolQuadern0(){
	vgk.quadern = mkQuadern0();
	if (vgk.explt_id) fusionQuadern0();

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCreaQuadern0; 
	params.txt = o2s(vgk.quadern.clase2ObjDB());
	ajaxPostTopol(params);
}

function ecoGet1Explt4Q(xhr){
		var loTopol = JSON.parse(xhr.responseText);
		vgk.explt_id = loTopol._id;
		vgk.explt = new Explt("",[]);
		vgk.explt.objDB2Clase(loTopol);

		creaArbolQuadern0();
}

function get1Explt4Q(_id){
	vgk.explt_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Explt4Q;
	params.topolId = _id;

	ajaxGet1Topol(params);

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
	params.org = vgk.user.org;

	ajaxGetMetasByOrg(params);
 }


function creaQuadernOrigen(){
	var ok = confirm('Crear Cuaderno Original ?');
	if (!ok) return;
	cargaExplt4Q();
}

//------------------------------------------------------------------- Init
function sesionQuadernOK(sesion){
	vgk.postLoadTextos = initAppsQuadern;
	ajaxGetMenuPag('Quadern');
	ajaxGetTextPag('Quadern');
	ajaxGetClasesPag();
	ajaxGetQuaderns();
}

function initQuadern(){

	initAppsGlobal();
//	initAppsQuadern();

	validaSesion('usrMenu',sesionQuadernOK); // libK1_sesion.js

}
