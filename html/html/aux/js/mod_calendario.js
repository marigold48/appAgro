function grabaDia(){
	var dia = vgk.appModal.item;
	vgk.appModal.show = false;
	showKronos(vgk.appMes.mes);
}
function setDia(id0){
	var dia = vgk.kronos.getNodoById(id0)
	console.log(o2s(dia));
	editaItem('DIA',dia,grabaDia);
}
function avantJar(){
	var jar = vgk.kronos.jar;
	vgk.kronos = new rKronos('x',[],jar+1);
	showKronos(0);
}
function atrasJar(){
	var jar = vgk.kronos.jar;
	vgk.kronos = new rKronos('x',[],jar-1);
	showKronos(11);
}

function showKronos(mes){
	var filas = vgk.kronos.getFilasMes(mes);
	vgk.appMes.actualiza(filas);
	vgk.appMes.mes = parseInt(mes);
	var tag = vgk.kronos.getTagMes(mes);
	vgk.appMes.actualizaTag(tag)
}

//------------------------------------------------------------------- Init
function sesionCalendarioOK(sesion){
	ajaxGetClasesPag();
	var hoy = new Date();
	var jar = hoy.getFullYear();
	var mes = hoy.getMonth();
	console.log(mes+'/'+jar);
	vgk.kronos= new rKronos('x',[],jar);
	showKronos(mes); // pkg_tasksGrafo.js
}

function initCalendario(){
	initAppsGlobal();
	initAppsKronos();

	validaSesion('usrMenu',sesionCalendarioOK);// libK1_Sesion.js
}
