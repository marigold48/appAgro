
//------------------------------------------------------------------- userMenu/vueApp cascade
function mostrarEsqma(){
	vgk.treeData = vgk.esquema.reto2vue();
	vgk.appEsqma.actualiza(vgk.treeData);
}

//------------------------------------------------------------------- Init
function sesionEsqmaOK(sesion){
	ajaxGetClasesPag();

	if (vgk.params._id){
		vgk.postGet1Esqma = mostrarEsqma;
		get1Esqma(vgk.params._id); // pkg_Esqma.js
	}
	else {
		alert('No se especifica Esquema');
		cierraSesion();
	}
}

function initEsqma(){
	initAppsGlobal();
	initAppsEsqma();

	validaSesion('usrMenu', sesionEsqmaOK);
}
