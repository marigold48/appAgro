import topol from '/k1/libK1_Topol.js'
import utils from '/k1/libK1_Utils.js'

function init(){

	var appMalla = new Vue({
		el: "#appMalla",
		data:{
	    tabla : []
	  }
	})

class myMalla extends topol.rMallaTree{
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.tag = 'myMalla';
		this.init();
	}

	init(){
		var raiz = this.getRaiz();
		console.log('Raiz: '+utils.o2s(raiz));
		var rows = new topol.rNodo('Rows'); rows.cod = 'ROWS';
		var cols = new topol.rNodo('Cols'); cols.cod = 'COLS';
		var nudos = new topol.rNodo('Nudos'); nudos.cod = 'NUDOS';

		this.addNodoHijo(raiz,rows);
		this.addNodoHijo(raiz,cols);
		this.addNodoHijo(raiz,nudos);

	}

}
	utils.vgk.user = {org:'PBAS'};

	var raiz = new topol.rNodo('Raiz');
	var malla = new myMalla('Malla1',[raiz]);
	var rows = new topol.rNodo('Rows'); rows.cod = 'ROWS';
	var cols = new topol.rNodo('Cols'); cols.cod = 'COLS';
	var nudos = new topol.rNodo('Nudos'); nudos.cod = 'NUDOS';

	malla.addNodoHijo(raiz,rows);
	malla.addNodoHijo(raiz,cols);
	malla.addNodoHijo(raiz,nudos);

	var row1 = new topol.rNodo('Row 1');
	var col1 = new topol.rNodo('Col 1');
	var nudo11 = new topol.rNudo('Nudo 1.1',row1,col1,0,0);
	console.log(utils.o2s(row1));
	console.log(utils.o2s(col1));
	console.log(utils.o2s(nudo11)+':'+nudo11.getId0Real());
	malla.addNodoRow(row1);
	malla.addNodoCol(col1);
	malla.addNudo(nudo11);
	var matriz = malla.getMatrizVue()
	console.log(utils.o2s(matriz));
	appMalla.tabla = matriz;
}

window.onload = init;