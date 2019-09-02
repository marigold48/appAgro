function borraItemRec(){
	var itrec = vgk.appModal.item;
	vgk.riego.borraNodo(itrec);
	updateRiego();
	vgk.appModal.show = false;
	showItemRecs();
}

function grabaItemRec(){
	var itrec = vgk.appModal.item;
	console.log('Grabar: ' + itrec.tag);
	vgk.riego.updtNodoSelf(itrec);
	showItemRecs();
	updateRiego();
	vgk.appModal.show = false;
}

function editItemRec(id){
	var itrec = vgk.riego.getNodoById(id);
	editaItem('ITEMREC',itrec,grabaItemRec,borraItemRec);
}


function grabaCanal(){
	var canal = vgk.appModal.item;
	console.log('Grabar: ' +o2s(canal));
	vgk.riego.updtArcoSelf(canal);
	vgk.appModal.show = false;
	updateRiego();
}

function borraCanal(){
	var arco = vgk.appModal.item;
	vgk.riego.borraArco(arco);
	updateRiego();
	vgk.appModal.show = false;
	showItemRecs();
}

function editCanal(canal){
	console.log('Canal: '+ o2s(canal));
	editaItem('CANAL',canal,grabaCanal,borraCanal);
}

function showItemRecs(){
	vgk.trazo.clearDivsNodo();
	vgk.trazo.showNodosGrafo(vgk.riego.nodos);
	
	var dims = vgk.riego.getDimsArcos();
	vgk.trazo.canvas.reset();
	vgk.trazo.canvas.pintaArcos(dims);

}

function initMover(){
	vgk.trazo = new rTrazo('divBase');
	vgk.trazo.fnDrop = onDrop;
	vgk.trazo.fnKeyBase = onKeyBase;
	vgk.trazo.fnKeyDivI = onKeyDivI;
	vgk.trazo.fnKeyDivF = onKeyDivF;
	vgk.trazo.grid = 10;
	vgk.trazo.activaCanvas();
	showItemRecs();
}



//------------------------------------------------------------------- Riegos
function ecoUpdateRiego(xhr){
	console.log('Eco Updt Riego: ');
}
function updateRiego(){

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoUpdateRiego;
	params.txt = o2s(vgk.riego.clase2ObjDB());
	params.topolId = vgk.riego_id;
	ajaxPutTopol(params);
	return false;
}

function ecoGet1Riego(xhr){
	var loTopol = JSON.parse(xhr.responseText);
	vgk.riego_id = loTopol._id;
	vgk.riego = new Riego("",[]);
	vgk.riego.objDB2Clase(loTopol);
	initMover();
}

function get1Riego(_id){
	vgk.riego_id = _id;
	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Riego;
	params.topolId = _id;

	ajaxGet1Topol(params);

	return false;
}



//------------------------------------------------------------------- Init
function creaNuevoRiego(){
	var nom = prompt('Nombre Riego?');
	if (!nom) return false;
	var riego = new Riego(nom,[]);

	var params = vgApp.paramsXHR;
	params.base = '/alfaAgro/';
	params.eco = ecoGet1Riego;
	params.txt = o2s(riego.clase2ObjDB());
	ajaxPostTopol(params);
	return false;
}

function cargaRiego(){
	var _id = vgk.appModal.idAct;
	get1Riego(_id);
	vgk.appModal.show = false;
}
function showListaRiegos(){
	vgk.appModal.items = vgk.listaRiegos;
	if (vgk.listaRiegos.length) vgk.appModal.idAct = vgk.listaRiegos[0]._id;
	vgk.appModal.conds = {retol : 'Lista Riegos'};
	vgk.appModal.modo = 'modal-container';
	vgk.appModal.edit_t = 'LISTA';
	vgk.appModal.show = true;
}


function ecoGetListaRiegos(xhr){
	var objs = JSON.parse(xhr.responseText);
	if (!objs.length)  creaNuevoRiego();
	else vgk.listaRiegos = objs;
}

function cargaListaRiegos() {
	var params = vgApp.paramsXHR;
	params.base = '/metasByOrg/';
	params.eco = ecoGetListaRiegos;
	params.iam = 'Riego';
	params.org = vgk.user.org;

	ajaxGetMetasByOrg(params);
 }

function sesionRiegoOK(sesion){
	ajaxGetClasesPag();

	var _id = vgk.params._id;
	if  (! _id) cargaListaRiegos();
	else get1Riego(_id); 
}

function initRiego(){
	initAppsGlobal();
	validaSesion('usrMenu',sesionRiegoOK); // libK1_sesion.js
}


//=================================================================== TECLAS
//------------------------------------------------------------------- TRL Base
function onKeyBase(cod,pntX,pntY){
	if (cod == 'CTRL'){
		var tag = prompt('Tag?','Nuevo');
		if (!tag) return false;

		var nodo = new ItemRec(tag);
		nodo.dim = {x:pntX,y:pntY,w:120,h:60};
		console.log(o2s(nodo));
		vgk.riego.addNodo(nodo);
		vgk.trazo.addDivNodo(nodo);
		vgk.tecla = null;
	}
}

//------------------------------------------------------------------- CTRL Down
function onKeyDivI(cod,id){
	if (cod == 'CTRL'){
		vgk.arcoId0 = id;
	}
}

//------------------------------------------------------------------- CTRL Down
function ctrlKeyON(id){
	if (vgk.arcoId0 == id){
		console.log('Arco sobre mismo Nodo');
		return false;}
	else {
		var nodoI = vgk.riego.getNodoById(vgk.arcoId0);
		var nodoF = vgk.riego.getNodoById(id);
		var canal = new Canal(nodoI.tag+'-'+nodoF.tag,nodoI,nodoF,0);
		var yaEsta = vgk.riego.existArco(canal);
		if (yaEsta){
			canal = vgk.riego.getArcoById(canal.id0);
			editCanal(canal);}
		else {
			vgk.riego.addArco(canal)};
			updateRiego();
		}
	showItemRecs();
}

//------------------------------------------------------------------- MAY Down
function shiftKeyON(id){
	editItemRec(id);
}

//-------------------------------------------------------------------
function onKeyDivF(cod,id){
//	console.log('onKeyDivF: '+cod);
	if (cod == 'CTRL')	ctrlKeyON(id);
	else if (cod == 'SHIFT') shiftKeyON(id);
}

//------------------------------------------------------------------- DROP (stop Move)
function onDrop(div){
//	console.log('Drop: '+ div.id)
// Actualiza posición del nodo en el grafo
	var divX = parseInt(div.style.left.replace('px',''));
	var divY = parseInt(div.style.top.replace('px',''));
	
	var nodo = vgk.riego.getNodoById(parseInt(div.id));
	nodo.dim.x = divX;
	nodo.dim.y = divY;

	var dims = vgk.riego.getDimsArcos();
	vgk.trazo.canvas.reset();
	vgk.trazo.canvas.pintaArcos(dims);

	var itrec = vgk.riego.getNodoById(div.id);

}

