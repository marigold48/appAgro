
function ecoCreaQuadernOrigen(xhr){
	var respTxt = xhr.responseText;
	vgk.loTopol = JSON.parse(respTxt);
	vgk.quadern_id = vgk.loTopol._id;
	vgk.quadern = new Quadern("",[]);
	vgk.quadern.objDB2Clase(vgk.loTopol);
	var item = {_id:vgk.quadern_id,tag:vgk.quadern.meta.tag};
	vgk.listaQuaderns = [item];
	actualizaAppsQuadern();
}


function creaQuadernOrigen(){
	var raiz = new Campanya('Campanya');
	vgk.quadern = new Quadern('Quadern Original',[raiz]);
	console.log(raiz);

// Portada
	var portada = new rNodo('0: Portada');
	vgk.quadern.addNodoHijo(raiz,portada);
	console.log(o2s(portada));

	var titular = new Reg00('Titular');
	vgk.quadern.addNodoHijo(portada,titular);
	console.log(o2s(titular));

	var assesor = new Reg00('Assesor');
	vgk.quadern.addNodoHijo(portada,assesor);
	console.log(o2s(assesor));

// 1. Relació de personal i maquinària de tractaments.

	var pers_maq = new rNodo('1: Personal i maquinària');
	vgk.quadern.addNodoHijo(raiz,pers_maq);
	console.log(o2s(pers_maq));


	var plant = new rNodo('1A: Personal plantilla');
	vgk.quadern.addNodoHijo(pers_maq,plant);
	for (var i=1;i<5;i++){
		var nodo = new Reg01A('R1A-'+i); nodo.obj.orden = 'A-'+i;
		vgk.quadern.addNodoHijo(plant,nodo);
	}
	console.log(o2s(plant));

	var contr = new rNodo('1B: Personal contractat');
	vgk.quadern.addNodoHijo(pers_maq,contr);
	for (var i=1;i<5;i++){
		var nodo = new Reg01B('R1B-'+i); nodo.obj.orden = 'B-'+i;
		vgk.quadern.addNodoHijo(contr,nodo);
	}
	console.log(o2s(contr));

	var empr = new rNodo('1C: Empresas serveis');
	vgk.quadern.addNodoHijo(pers_maq,empr);
	for (var i=1;i<5;i++){
		var nodo = new Reg01C('R1C-'+i); nodo.obj.orden = 'C-'+i;
		vgk.quadern.addNodoHijo(empr,nodo);
	}
	console.log(o2s(empr));

	var maqProp = new rNodo('1D: Maquinaria propia');
	vgk.quadern.addNodoHijo(pers_maq,maqProp);
	for (var i=1;i<5;i++){
		var nodo = new Reg01D('R1D-'+i); nodo.obj.orden = 'D-'+i;
		vgk.quadern.addNodoHijo(maqProp,nodo);
	}
	console.log(o2s(maqProp));

	var maqLlog = new rNodo('1E: Maquinaria llogada');
	vgk.quadern.addNodoHijo(pers_maq,maqLlog);
	for (var i=1;i<5;i++){
		var nodo = new Reg01E('R1E-'+i); nodo.obj.orden = 'E-'+i;
		vgk.quadern.addNodoHijo(maqLlog,nodo);
	}
	console.log(o2s(maqLlog));

// 2. Identificació de les parcel·les de cultiu ecològic.
	var parcelas = new rNodo('2: Parcelas ecologicas');
	vgk.quadern.addNodoHijo(raiz,parcelas);
	
	// Pendiente de poner loop a los bancales
	var nodo1 = new Reg02('La Rectoria');
	vgk.quadern.addNodoHijo(parcelas,nodo1);
	var nodo2 = new Reg02('Cal Penjarella');
	vgk.quadern.addNodoHijo(parcelas,nodo2);

	console.log(o2s(parcelas));

// 3. Registres de treballs i adobats
	var tascas = new rNodo('3: Treballs i adobats');
	vgk.quadern.addNodoHijo(raiz,tascas);
	for (var i=1;i<5;i++){
		var nodo = new Reg03('R3-'+i);
		vgk.quadern.addNodoHijo(tascas,nodo);
	}
	console.log(o2s(tascas));

// 4. Registre de tractaments fitosanitaris i altres mètodes de lluita
	var tratFS = new rNodo('4: Tractaments fitosanitaris');
	vgk.quadern.addNodoHijo(raiz,tratFS);
	for (var i=1;i<5;i++){
		var nodo = new Reg04('R4-'+i);
		vgk.quadern.addNodoHijo(tratFS,nodo);
	}
	console.log(o2s(tratFS));

// 5. Registre d’altres tractaments fitosanitaris
	var otrosTFS = new rNodo('5: Altres tractaments fitosanitaris');
	vgk.quadern.addNodoHijo(raiz,otrosTFS);
	console.log(o2s(otrosTFS));

// 5A- Registre d'ús de llavor tractada
	var tfsLlavor = new rNodo('5A: Llavor tractada');
	vgk.quadern.addNodoHijo(otrosTFS,tfsLlavor);
	for (var i=1;i<5;i++){
		var nodo = new Reg05A('R5A-'+i);
		vgk.quadern.addNodoHijo(tfsLlavor,nodo);
	}
	console.log(o2s(tfsLlavor));

// 5B- tractaments postcollita / en locals d'emmagatzematge / en els mitjans de transport
	var tfsPost = new rNodo('5B: Postcollita, locals i transport');
	vgk.quadern.addNodoHijo(otrosTFS,tfsPost);
	for (var i=1;i<5;i++){
		var nodo = new Reg05B('R5B-'+i);
		vgk.quadern.addNodoHijo(tfsPost,nodo);
	}
	console.log(o2s(tfsPost));

// 6. Registre d’anàlisi de residus de productes fitosanitaris
	var resid = new rNodo('6: Anàlisi de residus');
	vgk.quadern.addNodoHijo(raiz,resid);
	for (var i=1;i<5;i++){
		var nodo = new Reg06('R6-'+i);
		vgk.quadern.addNodoHijo(resid,nodo);
	}
	console.log(o2s(resid));

// 7. Registre de compra de matèries primeres
	var compra = new rNodo('7: Compra de matèries primeres');
	vgk.quadern.addNodoHijo(raiz,compra);
	for (var i=1;i<5;i++){
		var nodo = new Reg07('R7-'+i);
		vgk.quadern.addNodoHijo(compra,nodo);
	}
	console.log(o2s(compra));

// 8. Registre de venda de productes
	var venta = new rNodo('8: Venda de productes');
	vgk.quadern.addNodoHijo(raiz,venta);
	for (var i=1;i<5;i++){
		var nodo = new Reg08('R8-'+i);
		vgk.quadern.addNodoHijo(venta,nodo);
	}
	console.log(o2s(venta));

// 9. Registre de totals recol·lectats i càlcul de rendiments
	var total = new rNodo('9: Totals i rendiments');
	vgk.quadern.addNodoHijo(raiz,total);
	for (var i=1;i<5;i++){
		var nodo = new Reg09('R9-'+i);
		vgk.quadern.addNodoHijo(total,nodo);
	}
	console.log(o2s(total));

// 10. Altres dades i incidències
	var otrosDatos = new rNodo('10: Altres dades i incidències');
	vgk.quadern.addNodoHijo(raiz,otrosDatos);
	console.log(o2s(otrosDatos));

	var ambient = new rNodo('10A: Dades ambientals');
	vgk.quadern.addNodoHijo(otrosDatos,ambient);

	var publ = new Reg10A('Area publica');
	publ.obj.situac = 'L’explotació o una part de la mateixa es troba confrontant a una via o àrea pública urbana';
	vgk.quadern.addNodoHijo(ambient,publ);

	var pozoIN = new Reg10A('Pozos dentro');
	pozoIN.obj.situac = 'Hi ha pous o masses d’aigua per consum humà en l’explotació';
	vgk.quadern.addNodoHijo(ambient,pozoIN);

	var pozoOUT = new Reg10A('Pozos cerca');
	pozoOUT.obj.situac = 'Hi ha pous o masses d’aigua per consum humà en una zona propera a l’explotació';
	vgk.quadern.addNodoHijo(ambient,pozoOUT);

	var zonaEsp = new Reg10A('Zonas espec');
	zonaEsp.obj.situac = 'Hi ha parcel·les que totalment o parcialment es troben en zones específiques';
	vgk.quadern.addNodoHijo(ambient,zonaEsp);

	console.log(o2s(ambient));

	var incid = new rNodo('10B: Incidències');
	vgk.quadern.addNodoHijo(otrosDatos,incid);
	for (var i=1;i<5;i++){
		var nodo = new Reg10B('R10B-'+i);
		vgk.quadern.addNodoHijo(incid,nodo);
	}
	console.log(o2s(incid));

// 11. Registre de reclamacions de clients
	var recl = new rNodo('11: Reclamacions de clients');
	vgk.quadern.addNodoHijo(raiz,recl);
	for (var i=1;i<5;i++){
		var nodo = new Reg11('R11-'+i);
		vgk.quadern.addNodoHijo(recl,nodo);
	}
	console.log(o2s(recl));
//................................................................... Grabar
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoCreaQuadernOrigen; 
	params.iam = 'Quadern';
	params.txt = o2s(vgk.quadern.clase2ObjDB());
	ajaxPostTopol(params);
}


//------------------------------------------------------------------- userMenu/vueApp cascade
function actualizaVueApps(){
	if (vgk.user.rol == 'ADMIN'){
		vgk.appTareas.actualiza(vgk.tasksLst.getRaspa());
		vgk.appH3Tareas.actualiza(vgk.tasksLst.meta.tag);
	}
	else alert('No es Admin');
}


//------------------------------------------------------------------- Init
function sesionQuadernOK(sesion){
	ajaxGetQuaderns();
}

function initQuadern(){

	initAppsGlobal();
	initAppsQuadern();

	validaSesion('usrMenu',sesionQuadernOK); // libK1_sesion.js

}
