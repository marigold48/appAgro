
/*
sed -i 's/alfaAgro/betaGrafo/g' mod_cuaderno.js 
const Fase = 'ALFA',

function getPathsDB(piam,peco){
	var params = null;

	switch(Fase){
		case 'ALFA':
			params = {
				base : '/alfaAgro/',
				meta : '/metas/',
				org  : '/metasByOrg/'
				md5  : '/shell/encript/',
				sql  : '/shell/sqlite',
				iam  : piam,
				eco  : peco
				url  : 'http://' + window.location.hostname,
				port : 3102,
				user : 'usersAlfa.sqlite',
				sess : 'sessAlfa.sqlite',
				path : 'apps/Agro/sqlite/alfa',
				repo : 'repoAlfaAgro.sqlite',
			}
			break;

		case 'BETA':
			params = {
				base : '/betaAgro/',
				meta : '/metas/',
				org  : '/metasByOrg/'
				md5  : '/shell/encript/',
				sql  : '/shell/sqlite',
				iam  : piam,
				eco  : peco
				url  : 'http://' + window.location.hostname,
				port : 3202,
				user : 'usersBeta.sqlite',
				sess : 'sessBeta.sqlite',
				path : 'apps/Agro/sqlite/beta',
				repo : 'repoBetaAgro.sqlite',
			}
			break;
	}

	return params;
}
*/
var vgApp = {
	paramsXHR : {
		fase : 'alfa',
		url : 'http://' + window.location.hostname,
		port : 3102,
		base : '/alfaAgro',
		otro : '',
		iam : '',
		eco : null
	},
	sqlite : {
		base   : '/shell/sqlite',
		userDB : 'usersAlfa.sqlite',
		sessDB : 'sessAlfa.sqlite',
		pathDB : 'apps/Agro/sqlite/alfa',
		repoDB : 'repoAlfaAgro.sqlite',
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

function goTopologias(){
	window.location = 'topologias.html?idSess='+vgk.params.idSess;
}

function goClima(){
	window.location = 'clima.html?idSess='+vgk.params.idSess;
}

function goRiego(){
	window.location = 'riego.html?idSess='+vgk.params.idSess;
}

function goMenusML(){
	window.location = 'menusML.html?idSess='+vgk.params.idSess;
}

function goApoyos(_id){
	if (! _id) return;
	else window.open('apoyos.html?idSess='+vgk.params.idSess+'&_id='+_id,'_blank');
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

function goFrappeGantt(){
	if (vgk.escenario_id){
		window.open('frappeGantt.html?idSess='+vgk.params.idSess+'&_id='+vgk.escenario_id,'_blank');
	}
	else if (vgk.grafoTasks_id){
		window.open('frappeGantt.html?idSess='+vgk.params.idSess+'&_id='+vgk.grafoTasks_id,'_blank');
	}
	else alert('No hay escenario / Grafo de tasks');
}

function goTasksGantt(){
	if (vgk.escenario_id){
		window.open('tasks_Gantt.html?idSess='+vgk.params.idSess+'&_id='+vgk.escenario_id,'_blank');
	}
	else if (vgk.grafoTasks_id){
		window.open('tasks_Gantt.html?idSess='+vgk.params.idSess+'&_id='+vgk.grafoTasks_id,'_blank');
	}
	else alert('No hay escenario / Grafo de tasks');
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
