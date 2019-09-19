
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

import {vgk}  from '/k1/libK1_Utils.js'

export var vgApp = {
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

export function goPag(pag,_id){
	var idSess = vgk.params.idSess;
	switch (pag){
		case 'APOYOS':
			if (!_id) return;
			else window.open('apoyos.html?idSess='+idSess+'&_id='+_id,'_blank');
			break;

		case 'BARRAS':
			window.open('BarrasClick.html?idSess='+idSess, '_blank');
			break;

		case 'CALEND':
			window.open('calendario.html?idSess='+idSess,'_blank');
			break;

		case 'CLIMA':
			window.location = 'clima.html?idSess='+idSess;
			break;

		case 'CROQUIS':
			window.location = 'croquis.html?idSess='+idSess+'&_id='+_id;
			break;

		case 'CUADERNO':
			window.location = 'cuaderno.html?idSess='+idSess;
			break;

		case 'CULTS':
			window.location = 'cultivos.html?idSess='+idSess;
			break;

		case 'DASH': 
			window.location = 'dashboard.html?idSess='+idSess;
			break;

		case 'ECONOM':
			if (!vgk.escenario_id){alert('No hay escenario');return;}
			window.open('evalEconomica.html?idSess='+idSess+'&_id='+vgk.escenario_id, '_blank');
			break;

		case 'EXPLOT':
			window.location = 'explotacion.html?idSess='+idSess;
			break;

		case 'FRAPPE':
			if (utils.vgk.escenario_id){
				window.open('frappeGantt.html?idSess='+idSess+'&_id='+utils.vgk.escenario_id,'_blank');
			}
			else if (utils.vgk.grafoTasks_id){
				window.open('frappeGantt.html?idSess='+idSess+'&_id='+utils.vgk.grafoTasks_id,'_blank');
			}
			else alert('No hay escenario / Grafo de tasks');
			break;

		case 'GANTT':
			if (utils.vgk.escenario_id){
				window.open('tasks_Gantt.html?idSess='+idSess+'&_id='+utils.vgk.escenario_id,'_blank');
			}
			else if (utils.vgk.grafoTasks_id){
				window.open('tasks_Gantt.html?idSess='+idSess+'&_id='+utils.vgk.grafoTasks_id,'_blank');
			}
			break;

		case 'IDIOMA':
			window.location = 'idioma.html?idSess='+idSess;
			break;

		case 'INCOMP':
			window.open('incompatibles.html?idSess='+idSess,'_blank');
			break;

		case 'INFO':
			window.open('agroInfo.html','_blank');
			break;

		case 'MAPAF':
			window.location = 'mapa.html?idSess='+idSess+'&_id='+utils.vgk.finca_id;
			break;

		case 'MATRIZ':
			window.location = 'matrices.html?idSess='+idSess;
			break;

		case 'MENUS':
			window.location = 'menusML.html?idSess='+idSess;
			break;

		case 'PLANTAS':
			window.location = 'plantas.html?idSess='+idSess;
			break;

		case 'REPO':
			window.open('repositorio.html','_blank');
			break;

		case 'RIEGO':
			window.location = 'riego.html?idSess='+idSess;
			break;

		case 'ROTAC':
			window.open('rotaciones.html?idSess='+idSess,'_blank');
			break;

		case 'SUELO':
			window.location = 'suelo.html?idSess='+idSess;
			break;

		case 'TAREAS':
			window.open('tareas.html?idSess='+idSess,'_blank');
			break;

		case 'TARTA':
			window.open('Tarta.html?idSess='+idSess, '_blank');
			break;
		case 'TASKSG':
			window.open('tasks_Grafo.html?idSess='+idSess+'&_id='+_id,'_blank');
			break;

		case 'TOPOLS':
			window.location = 'topologias.html?idSess='+idSess;
			break;
	}
}

