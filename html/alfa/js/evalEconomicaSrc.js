

//------------------------------------------------------------------- Evaluación Económica
// Cada asign debe contener :
// bancal : area
// vard : marco, coste semilla
// tareas : por cada tarea : coste tarea por ud

/*
function evalEconomica(){
	var asignacs = utils.vgk.escenario.getAsignacs();
	if (!asignacs.length){
		alert('No hay asignaciones');
		return;
	}
	var raiz = new NodoCalc('Eval Escenario');
	raiz.obj.cod = 'SUMA';
	raiz.obj.formula = '·VENTAS·-·COSTES·';
	
	var calc = new ArbolCalc('Eval Escenario',[raiz]);

	var ventas = new NodoCalc('Ventas');
	ventas.obj.kVariab = 'VENTAS';
	ventas.obj.valor = 1000;

	var costes = new NodoCalc('Costes');
	costes.obj.kVariab = 'COSTES';
//	costes.obj.valor = 100;

	costes.obj.formula = '·SEEDS·+·LABOR·';



	var seeds = new NodoCalc('Seeds');
	seeds.obj.kVariab = 'SEEDS';
//	seeds.obj.valor = 100;

	var labor = new NodoCalc('Labor');
	labor.obj.kVariab = 'LABOR';
//	labor.obj.valor = 150;


	calc.addNodoHijo(raiz,ventas);
	calc.addNodoHijo(raiz,costes);

	calc.addNodoHijo(costes,seeds);
	calc.addNodoHijo(costes,labor);

	var formulaSeeds = [];
	var formulaLabor = [];

	asignacs.map(function(asg){
		console.log(utils.o2s(asg));

		var marco = asg.obj.marco;
		if (marco) var Q = bancal.area/vard.marco;
		else Q = bancal.area;

		var costeSeeds = Q*vard.coste;

		var ns = new NodoCalc(bancal.tag);
		ns.obj.kVariab = bancal.obj.codBancal;
		ns.obj.valor = costeSeeds;
		calc.addNodoHijo(seeds,ns);
		formulaSeeds.push( '·'+bancal.obj.codBancal+'·')

		var costeLabor = 0;
		tareas.map(function(task){
			if (task.tipo == 'MANUAL') costeLabor += task.coste * Q;
			else costeLabor += task.coste * area;  // 'MECANZ'

		})
		var nl = new NodoCalc(bancal.tag);
		nl.obj.kVariab = bancal.obj.codBancal;
		nl.obj.valor = costeLabor;
		calc.addNodoHijo(labor,nl);
		formulaLabor.push( '·'+bancal.obj.codBancal+'·')
	})

	seeds.obj.formula = formulaSeeds.join('+');
	labor.obj.formula = formulaLabor.join('+');
	
	alert(calc.evaluaNodo(raiz));

}

*/

/*
	Unidades:
	+ Area : los m2 del bancal
	+ Marco : en cms (dist entre plantas x dist entre lineas)
	+ Coste : en cts de euro
	+ Rendimiento : Kgs de producto por Ha
	+ Venta : pvp del producto en cts de euro

	Calculos:
	+ Num. areas (areas) = Area/100 
	+ dist entre Plantas (distP) = Marco.ePlts/100
	+ dist entre Lineas (distL) = Marco.eLins/100
	+ unidades (uds) = (10/distP)*(10/distL)*areas

*/
import utils  from '/k1/libK1_Utils.js'
import ajax from '/k1/libK1_Ajax.js'
import topol from '/k1/libK1_Topol.js'

import agro from '/js/agro_Clases.js'

function initAppCalcs(){
	if(utils.r$('divCalcs')){
		utils.vgk.appCalcs = new Vue({
			el: '#divCalcs',
			data : {
				heads : ['Planta','Bancal','Superf.','Marco','Unids.','Coste','Gastos','Labor','Rendmto','Venta','Ventas','Beneficio'],
				items : [],
				idAct : 0,
			},
		methods :{
			actualiza : function(calcs){

				this.items = calcs;
			},
		}
		})
	}	
}


//------------------------------------------------------------------- Eval Economica
function ecoGetTasksCult(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	utils.vgk.calculos.map(function(calc){
		if (calc.tasks_id == loTopol._id){
			var labor = 0;
			var grafoTasks = new topol.rGrafo('x',[]);
			grafoTasks.objDB2Clase(loTopol);
			grafoTasks.nodos.map(function(nodo){
				var ratio = nodo.obj.ratio;
				var coste = nodo.obj.coste;
				labor += calc.areas * ratio * coste;
				console.log('Calc Task '+nodo.tag+' : '+labor);
			}) 
			calc.labor = Math.round(labor);

		}
	utils.vgk.appCalcs.actualiza(utils.vgk.calculos);		

	})
}

function evalTasksCult(tasks_id){
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGetTasksCult;
	params.topolId = tasks_id;

	ajax.ajaxGet1Topol(params);
	return false;
}

function evalCultivo(cult){
	console.log(cult.tag);
	var calc = {};
	calc['tasks_id']=cult.obj.tasks_id;
	calc['labor']=0;
	calc['planta']=cult.obj.tagP;
	calc['bancal']=cult.obj.tagZ;

	calc['sup'] = cult.obj.area;

	var areas = cult.obj.area/100; // 1 area = 1 Ha /100
	calc['areas'] = areas;

	var distP = cult.obj.dPlts; // distancia en m. entre plantas
	var distL = cult.obj.dLins; // distancia en m. lineas
	var marco = ''+distP+' x '+distL;
	calc['marco'] = marco;

	var uds = Math.round((10/(distP/100)) * (10/(distL/100)) * areas); // num de plantones
	calc['uds'] = uds;

	console.log('Plantas: '+uds+ 'con Marco: '+marco+' y '+areas+' areas');

	var coste = cult.obj.coste/100; // euros por coste semilla
	calc['coste']= cult.obj.coste;
	var gastos = Math.round(coste * uds);
	console.log('Gastos: '+gastos+'='+uds+'*'+coste );
	calc['gastos']=gastos;

	calc['venta'] = cult.obj.venta; // cts

	var rendm = areas * cult.obj.rendm; // Kgs/area de producto
	calc['rendm'] = Math.round(rendm);

	var ventas = Math.round(rendm * cult.obj.venta/100);
	calc['ventas'] = ventas;

	console.log('Ventas: '+ventas+'='+areas+'*'+rendm+'*'+cult.obj.venta );

	var benef = ventas - gastos;
	calc['benef'] = benef;

	console.log('Benef: '+benef+'='+ventas+'-'+gastos);
	return calc;
}

function evalEconomica(){
	utils.vgk.calculos = [];
	var cultivos = utils.vgk.escenario.getCultivos();
	cultivos.map(function(cult){
		var calc = evalCultivo(cult);
		utils.vgk.calculos.push(calc);
		if (cult.obj.tasks_id) evalTasksCult(cult.obj.tasks_id);
	})

	utils.vgk.appCalcs.actualiza(utils.vgk.calculos);

}
//===================================================================

function ecoGet1Escenario(xhr){
	utils.vgk.loTopol = JSON.parse(xhr.responseText);
	utils.vgk.escenario_id = utils.vgk.loTopol._id;
	utils.vgk.escenario = new agro.Escenario("",[]);
	utils.vgk.escenario.objDB2Clase(utils.vgk.loTopol);
	console.log(utils.o2s(utils.vgk.escenario.meta));
	evalEconomica();
}

function get1Escenario(_id){
	utils.vgk.escenario_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Escenario;
	params.topolId = _id;

	ajax.ajaxGet1Topol(params);
	return false;
}

export default {initAppCalcs,get1Escenario}