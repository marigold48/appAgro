var vgApp = {
	paramsXHR : {
		fase : 'beta',
		url : 'http://' + window.location.hostname,
		port : 3202,
		base : '/betaAgro',
		otro : '',
		iam : '',
		eco : null
	},
	sqlite : {
		base   : '/shell/sqlite',
		userDB : 'usersBeta.sqlite',
		sessDB : 'sessBeta.sqlite',
		pathDB : 'apps/Agro/sqlite/beta',
		repoDB : 'repoBetaAgro.sqlite',
		stmtDB : '',
	},
	encript : {
		base   : '/shell/encript',
	}
}

function goHome(){
	window.location = 'dashboard.html?idSess='+vgk.params.idSess;
}
function goInfo(){
	window.open('agroInfo.html','_blank');
}

function goRepositorio(){
	window.open('repositorio.html','_blank');
}

function goExplotacion(){
	window.location = 'explotacion.html?idSess='+vgk.params.idSess;
}

function goIdioma(){
	window.location = 'idioma.html?idSess='+vgk.params.idSess;
}

function goMenusML(){
	window.location = 'menusML.html?idSess='+vgk.params.idSess;
}

function goEsqArbolado(_id){
	if (! _id) creaEsqArbolado();
	else window.open('arbolado.html?idSess='+vgk.params.idSess+'&_id='+_id,'_blank');
}
function goSuelo(){
	window.location = 'suelo.html?idSess='+vgk.params.idSess;
}

function goPlantas(){
	window.location = 'plantas.html?idSess='+vgk.params.idSess;
}

function goLaminas(){
	window.location = 'laminas.html?idSess='+vgk.params.idSess;
}
function goCuaderno(){
	window.location = 'cuaderno.html?idSess='+vgk.params.idSess;
}

function goTasksGantt(){
	if (!vgk.escenario_id){alert('No hay escenario');return;}
	window.open('tasks_Gantt.html?idSess='+vgk.params.idSess+'&_id='+vgk.escenario_id,'_blank');
}

function goRotaciones(){
	window.open('rotaciones.html?idSess='+vgk.params.idSess,'_blank');
}

function goTareas(){
	window.open('tareas.html?idSess='+vgk.params.idSess,'_blank');
}

function goTasksGrafo(_id){
	window.open('tasks_Grafo.html?idSess='+vgk.params.idSess+'&_id='+_id,'_blank');

}
function goCalendario(){
	window.open('calendario.html?idSess='+vgk.params.idSess,'_blank');

}

function goIncompatibles(){
	window.open('incompatibles.html?idSess='+vgk.params.idSess,'_blank');
}

function goMatrices(){
	window.location = 'matrices.html?idSess='+vgk.params.idSess;
}

function goCultivos(){
	window.location = 'cultivos.html?idSess='+vgk.params.idSess;
}

function goCroquis(_id){
	window.location = 'croquis.html?idSess='+vgk.params.idSess+'&_id='+_id;
}

function goMapaFinca(){
	window.location = 'mapa.html?idSess='+vgk.params.idSess+'&_id='+vgk.finca_id;
}

function goBarrasClick(){
	window.open('BarrasClick.html?idSess='+vgk.params.idSess, '_blank');
}
function goEvalEconomica(){
	if (!vgk.escenario_id){alert('No hay escenario');return;}
	window.open('evalEconomica.html?idSess='+vgk.params.idSess+'&_id='+vgk.escenario_id, '_blank');
}

function goTarta(){
	window.open('Tarta.html?idSess='+vgk.params.idSess, '_blank');
}
