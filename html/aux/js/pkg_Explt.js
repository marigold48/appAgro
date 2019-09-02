
/*
*/


//===================================================================	Show/Edit Explt (Inventario)

function showExpltVue(){
	var vueExplt = vgk.explt.reto2vue();
	vgk.appExplt.actualiza(vueExplt);
}
//------------------------------------------------------------------- Crear Explt / Propietario
function borraItem(){
	alert('borraItem');
}
function addNuevoItem(id0){
	var item = new ItemExplt('Nuevo');
	var padre = vgk.explt.getNodoById(id0);
	vgk.explt.addNodoHijo(padre,item);
	showExpltVue(vgk.explt);
	updateExplt();
}

function grabaNuevoItem(){
	var item = vgk.appModal.item;

	if (vgk.appModal.editON) vgk.explt.updtNodoSelf(item);
	else{ 
		alert('No es Edit??');
	}
	showExpltVue(vgk.explt);
	updateExplt();
	vgk.appModal.show = false;

}

function addNuevoHijo(){
	var item = vgk.appModal.item;

	if (vgk.appModal.editON){
		var nuevo = new ItemExplt('Nuevo');
		vgk.explt.addNodoHijo(item,nuevo);
	}
	else{ 
		alert('No es Edit??');
	}
	showExpltVue(vgk.explt);
	updateExplt();
	vgk.appModal.show = false;

}

function editItem(model){
	var item = vgk.explt.getNodoById(model.id0);
	vgk.appModal.item = item;
	vgk.appModal.edit_t = "ITEM";
	vgk.appModal.editON = true;
	vgk.appModal.show = true;
}

//------------------------------------------------------------------- Nueva Explotacion
function ecoGrabaExplt(xhr){
	var resp = JSON.parse(xhr.responseText);
	vgk.explt_id = resp._id;
	console.log ('Grabado nuevo explt: ' + resp._id);
	return false;
}

function grabaNuevaExplt(){
	var raiz = new ItemExplt('Datos '+vgk.user.org);
	vgk.explt = new Explt('Explt_'+vgk.user.org,[raiz]);
	showExpltVue();
	vgk.explt.meta.org = vgk.user.org;

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGrabaExplt; 
	params.iam = 'Explt';
	params.txt = o2s(vgk.explt.clase2ObjDB());
	ajaxPostTopol(params);

	vgk.appModal.show = false;
}

//------------------------------------------------------------------- Update Explotacion

function ecoUpdateExplt(xhr){
	var resp = JSON.parse(xhr.responseText);
	console.log('Actualizado explt: ' + resp._id);
	return false;
}

function updateExplt(){
	if (vgk.explt.meta.org != vgk.user.org){
		alert('Explt sin ORG:' + vgk.explt.meta.org +':'+ vgk.user.org);
		vgk.explt.meta.org = vgk.user.org;
	};

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateExplt;
	params.txt = o2s(vgk.explt.clase2ObjDB());
	params.topolId = vgk.explt_id;
	ajaxPutTopol(params);
	return false;
}

//------------------------------------------------------------------- Pick Explt
function ecoGetUnExplt(xhr){
		var respTxt = xhr.responseText;
		vgk.loTopol = JSON.parse(respTxt);
		vgk.explt_id = vgk.loTopol._id;
		vgk.explt = new Explt("",[]);
		vgk.explt.objDB2Clase(vgk.loTopol);

		vgk.postGetLaExplt();
}

function getUnaExplt(_id){
	vgk.explt_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetUnExplt;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}

function ecoGetLaExplt(xhr){
	var respTxt = xhr.responseText;
	var objs = JSON.parse(respTxt);
	var items = [];
	objs.map(function(obj){
		if (obj.meta.org == vgk.user.org && obj.meta.iam == 'Explt') items.push(obj);
	})
	if (items.length > 0){
		getUnaExplt(items[0]._id); // hay una sola lista
	}
	else {
		grabaNuevaExplt();
	}
}

function ajaxGetLaExplt() {

	var params = vgApp.paramsXHR;
	params.base = '/metas/';
	params.eco = ecoGetLaExplt;
	params.iam = 'Explt';

	ajaxGetMetas(params);
 }
