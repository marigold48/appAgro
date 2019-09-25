
//------------------------------------------------------------------- userMenu/vueApp cascade
function mostrarMenuML(){
	vgk.treeData = vgk.explt.reto2vue();
	vgk.appMenuML.actualiza(vgk.treeData);
}

//------------------------------------------------------------------- Init
function sesionMenuML_OK(sesion){
	vgk.postGetLaMenuML = mostrarMenuML;
	ajaxGetLaMenuML(); // pkg_MenuML.js
}

function initMenuML(){
	initAppsGlobal();
	initAppsMenuML();

	validaSesion('usrMenu', sesionMenuML_OK); // libK1_Sesion.js
}
