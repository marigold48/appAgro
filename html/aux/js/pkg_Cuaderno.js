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
	if (vgk.appEdit.editON)	vgk.quadern.updtNodoSelf(nodo);
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
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.quadern_id = vgk.loTopol._id;
	vgk.quadern = new Quadern("",[]);
	vgk.quadern.objDB2Clase(vgk.loTopol);
	var item = {_id:vgk.quadern_id,tag:vgk.quadern.meta.tag};
	vgk.listaQuaderns = [item];
	actualizaAppsQuadern();
}


function ecoDuplicaQuadern(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.quadern_id = vgk.loTopol._id;
	vgk.quadern = new Quadern("",[]);
	vgk.quadern.objDB2Clase(vgk.loTopol);

	//cambios al original
	var campanya = prompt('Campanya? (ej: 2018-2019');
	var patron=new RegExp('^[2][0-9]{3}[-][2][0-9]{3}$');
 	if (!patron.test(campanya)){
		alert('Formato erróneo')
		borraQuadern();
		return;
	} 
	vgk.quadern.meta.tag = 'Campanya '+campanya;
	var raiz = vgk.quadern.getRaiz();
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
	else alert('Debe cargarse el "Quadern Original"');
}

//------------------------------------------------------------------- Borra Quadern
function ecoBorraQuadern(xhr){
	vgk.quadern = null;
	vgk.quadern_id = null;

	console.log('Quadern borrado');
	ajaxGetQuaderns();
}
function borraQuadern(){
	if (!vgk.quadern_id){alert('No hay Quadern activo'); return false;}
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoBorraQuadern;
	params.topolId = vgk.quadern_id;

	ajaxDeleteTopol(params);
	vgk.appEdit.showModal = false;
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
	vgk.appEdit.showModal = false;
	return false;
}

function carga1Quadern(){
	get1Quadern(vgk.appEdit.idAct);
}

//------------------------------------------------------------------- Crear Lista de Quaderns
function ecoGetQuaderns(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && obj.meta.iam == 'Quadern') items.push(obj);
	})

	if (items.length){
		vgk.listaQuaderns = items;
	}
	else creaQuadernOrigen();
}

function ajaxGetQuaderns() {

	var params = vgApp.paramsXHR;
	params.base = '/metas/';
	params.eco = ecoGetQuaderns;
	params.iam = 'Quadern';

	ajaxGetMetas(params);
 }

function showListaQuaderns(){
	vgk.appEdit.items = vgk.listaQuaderns;
	if (vgk.listaQuaderns.length) vgk.appEdit.idAct = vgk.listaQuaderns[0]._id;
	vgk.appEdit.edit_t = 'LISTA';
	vgk.appEdit.showModal = true;
}

