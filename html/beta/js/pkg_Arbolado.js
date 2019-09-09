
/*
*/


//===================================================================	Show/Edit Esqma (Inventario)

function showEsqmaVue(){
	var vueEsqma = vgk.esquema.reto2vue();
	vgk.appEsqma.actualiza(vueEsqma);
}
//------------------------------------------------------------------- Crear Esqma / Propietario

function addNuevoItem(id0){
	var padre = vgk.esquema.getNodoById(id0);
	var item = new NodoTramo(padre.tag+'T'+(padre.hijos.length+1));
	vgk.esquema.addNodoHijo(padre,item);
	showEsqmaVue(vgk.esquema);
	updateEsqma();
}

function grabaNuevoItem(){
	var item = vgk.appEdit.item;

	if (vgk.appEdit.editON) vgk.esquema.updtNodoSelf(item);
	else{ 
		alert('No es Edit??');
	}
	showEsqmaVue(vgk.esquema);
	updateEsqma();
	vgk.appEdit.showModal = false;

}

function borraItem(){
	var item = vgk.appEdit.item;

	vgk.esquema.borraNodoSelf(item);

	showEsqmaVue(vgk.esquema);
	updateEsqma();
	vgk.appEdit.showModal = false;

}

function addNuevoHijo(){
	var item = vgk.appEdit.item;

	if (vgk.appEdit.editON){
		var nuevo = new Item('Nuevo');
		vgk.esquema.addNodoHijo(item,nuevo);
	}
	else{ 
		alert('No es Edit??');
	}
	showEsqmaVue(vgk.esquema);
	updateEsqma();
	vgk.appEdit.showModal = false;

}

function showTramo(tramo){
	var items = [];
	var raiz = vgk.esquema.getRaiz();
	var vardds = raiz.obj.vardds[0];
	console.log(o2s(vardds));
	console.log(o2s(tramo.obj.descripc));
	tramo.obj.descripc.split('').map(function(c){
		var tag = vardds[c];
		console.log(tag);
		var item = new rNodo(tag);
		items.push(item);
	})
	vgk.appTramo.actualiza(items);
}
function editItem(model){
	var item = vgk.esquema.getNodoById(model.id0);
	switch(item.iam){
		case 'NodoEsqma' : 
			editaItem('ESQMA',item,grabaNuevoItem,borraItem);
			break;
		case 'NodoLinea' : 
			editaItem('LINEA',item,grabaNuevoItem,borraItem);
			break;
		case 'NodoTramo' :
			showTramo(item); 
			break;
	}
	
}


//------------------------------------------------------------------- Update Esq. Arbolado

function ecoUpdateEsqma(xhr){
	var resp = JSON.parse(xhr.responseText);
	console.log('Actualizado esquema: ' + resp._id);
	return false;
}

function updateEsqma(){
	if (vgk.esquema.meta.org != vgk.user.org){
		alert('Esqma sin ORG:' + vgk.esquema.meta.org +':'+ vgk.user.org);
		vgk.esquema.meta.org = vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoUpdateEsqma;
	params.txt = o2s(vgk.esquema.clase2ObjDB());
	params.topolId = vgk.esquema_id;
	ajaxPutTopol(params);
	return false;
}

//------------------------------------------------------------------- Pick Esqma
function ecoGet1Esqma(xhr){
		var respTxt = xhr.responseText;
		vgk.loTopol = JSON.parse(respTxt);
		vgk.esquema_id = vgk.loTopol._id;
		vgk.esquema = new Esqma("",[]);
		vgk.esquema.objDB2Clase(vgk.loTopol);

		vgk.postGet1Esqma();
}

function get1Esqma(_id){
	vgk.esquema_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/betaAgro/';
	params.eco = ecoGet1Esqma;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

