// agro_Clases.js
//=================================================================== SUELO
/*
Building the regex from the rules (in an order of convenience):

	+ both upper and lower case => use case insensitive flag //i
	+ letters, numbers, underscore and period => [\w.]*
	+ 3-25 characters => ^[\w.]{3,25}$
	+ cannot begin or end with period or underscore => (?!^[\W_]|[W_]$)
		(notice uppercase \W meaning not \w)
	+ cannot contain 2 punctuation in a row => (?![\W_]{2})
	+ checking the negative lookahead in every position => (?:(?!...)[\w.]){3,25}
		(using non-capturing group (?:) instead of () because we don't need to save the group)
	+ at least 2 letters => (?:.*[a-z]){2} assuming i flag

	wrap into lookahead (not consuming any characters) so we can check multiple conditions => (?=(?:...))

The final regex literal:

/^(?=(?:.*[a-z]){2})(?:(?!^[\W_]|[\W_]{2}|[\W_]$)[\w.]){3,25}$/i
Para permitir espacios y no punto: [\w ]
*/

import utils  from '/k1/libK1_Utils.js'
import topol  from '/k1/libK1_Topol.js'
import tiempo from '/k1/libK1_Tiempo.js'

function inputOK(formato,texto){
	var regexp = null;
	switch (formato){
		case 'TAG':
			regexp = new RegExp(/^[A-z0-9-_ ]{3,25}$/);
			break;
		case 'COD':
			regexp = new RegExp(/^[A-Z0-9-_.]{2,15}$/);
			break;
		case 'DSC':
			regexp = new RegExp(/^[A-z0-9-_ .:;]{2,150}$/);
			break;
		case 'INT':
			regexp = new RegExp(/^\+?(0|[1-9]\d*)$/);
			break;
		case 'DEC':
			regexp = new RegExp(/^\d+\.\d{0,8}$/);
			break;
		case 'IMG':
			regexp = new RegExp(/^([A-z0-9-_]+\/)*([A-z0-9-_]+\.(gif|jpg|jpeg|tiff|png))$/);
			break;
	
	}

	console.log(formato+' | '+texto+' : '+regexp.test(texto));
	if (regexp) return regexp.test(texto);
	else return true;
}
//------------------------------------------------------------------- Fincas
class Finca extends topol.rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Finca';
		this.meta.org = utils.vgk.user.org;
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = objDB.meta.iam;
		this.meta.org = objDB.meta.org;
	}

	getNodoByCod(cod){
		var nodox = null;
		var raiz = this.getRaiz();
		if (raiz.obj.codFinca == cod) nodox = raiz;
		var zonas = this.getRaspa();
		zonas.map(function(zona){
			if (zona.obj.codZona == cod) nodox = zona;
			var bancales = this.getHijosNodo(zona);
			bancales.map(function(bancal){
				if (bancal.obj.codBancal == cod) nodox = bancal;
			})
		}.bind(this));
		return nodox;
	}
}

//------------------------------------------------------------------- InfoFinca
export class InfoFinca extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'InfoFinca';
		this.obj = {
			codFinca : '',
			descripc : '',
			area : 0,
			lat: '0.0',
			lon: '0.0',
			geo_id : ''
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;	
	}
	
	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.codFinca.ok = inputOK('COD',this.obj.codFinca);
		conds.valid.descripc.ok = inputOK('DSC',this.obj.descripc);
		conds.valid.area.ok = inputOK('INT',this.obj.area);
		conds.valid.lat.ok =inputOK('DEC',this.obj.lat);
		conds.valid.lon.ok =inputOK('DEC',this.obj.lon);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Finca');
		nodoML.obj.clase = 'InfoFinca'
		nodoML.obj.retol =  {ES : 'Finca',CAT :'Finca'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				codFinca:'Err:Obligatorio. Deben ser letras A-Z',
				descripc:'Err: Max caracteres =  20',
				area:'Err: Debe ser un número entero',
				lat:'Err: Debe ser un número decimal',
				lon:'Err: Deben ser un número decimal'
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				codFinca:'Err:Obligatori. Deuen ser lletras A-Z',
				descripc:'Err: Max caracters = 20',
				area:'Err:Ha de ser un número sencer',
				lat:'Err:Ha de ser un número decimal',
				lon:'Err:Ha de ser un número decimal'
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Zonas
export class Zona extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Zona';
		this.obj = {
			codZona : '',
			area : 0,
			geo_id : null,
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.codZona.ok = inputOK('COD',this.obj.codZona);
		conds.valid.area.ok = inputOK('INT',this.obj.area);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Zona');
		nodoML.obj.clase = 'Zona';
		nodoML.obj.retol ={ES:'Zona', CAT:'Zona'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				codZona:'Err:Obligatorio. Deben ser letras A-Z',
				area:'Err: Debe ser un número entero',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				codZona:'Err:Obligatori. Deuen ser lletras A-Z',
				area:'Err:Ha de ser un número sencer',
			}
		}
		return nodoML;
	}
}

//------------------------------------------------------------------- Bancales
export class Bancal extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Bancal';
		this.obj = {
			codBancal : '',
			area : 0,
			geo_id : null, // GeoJSON. No usado de momento
			apoyos_id : null, //si se plantan frutales
			sigpac : ''
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}

	getNodoCol(){
		var nodo = new topol.rNodo(this.tag);
		nodo.id0 = this.id0;
		nodo.rol = 'COL';
		nodo.obj = {
			codBancal : this.obj.codBancal,
		}
		return nodo;
	}

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.codBancal.ok = inputOK('COD',this.obj.codBancal);
		conds.valid.area.ok = inputOK('INT',this.obj.area);
		conds.valid.sigpac.ok = this.obj.sigpac.length < 20;
		return conds;
	}
	getNodoML(){
		var nodoML = new rNodoClase('Bancal');
		nodoML.obj.clase = 'Bancal';
		nodoML.obj.retol = {ES:'Bancal',CAT:'Feixa'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				codBancal:'Err:Obligatorio. Deben ser letras A-Z',
				area:'Err: Debe ser un número entero',
				sigpac:'Err: Max caracters = 20',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				codBancal:'Err:Obligatori. Deuen ser lletras A-Z',
				area:'Err:Ha de ser un número sencer',
				sigpac:'Err: Max caracters = 20',
			}
		}
		return nodoML;
	}
}


//=================================================================== PLANTAS
//------------------------------------------------------------------- Horta
class Horta extends topol.rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Horta';
		this.meta.org = utils.vgk.user.org;
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = objDB.meta.iam;
		this.meta.org = objDB.meta.org;
	}
}

export class GrpHorta extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'GrpHorta';
		this.obj = {
			descripc : '',
			tasks_id :''
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.descripc.ok = inputOK('DSC',this.obj.descripc);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('GrpHorta');
		nodoML.obj.clase = 'GrpHorta';
		nodoML.obj.retol = {ES:'Hortalizas',CAT:'Hortalisses'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				descripc:'Err: Max caracteres =  20',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				descripc:'Err: Max caracters = 20',
			}
		}
		return nodoML;

	}
}



export class EspHorta extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'EspHorta';
		this.obj = {
			codEspec : '',
			genero : '',
			especie : '',
			img : 'img/verduras.png',
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.codEspec.ok = inputOK('COD',this.obj.codEspec);
		conds.valid.genero.ok = this.obj.genero.length < 20;
		conds.valid.especie.ok = this.obj.especie.length < 20;
		conds.valid.img.ok = inputOK('IMG',this.obj.img);
		return conds;
	}
	getNodoML(){
		var nodoML = new rNodoClase('EspHorta');
		nodoML.obj.clase = 'EspHorta';
		nodoML.obj.retol = {ES:'Especie-H',CAT:'Especie-H'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				codEspec:'Err:Obligatorio. Deben ser letras A-Z',
				genero:'Err: Latín (Ej: Allium)',
				especie:'Err: Latín (Ej: vulgaris)',
				img:'Err: Max caracteres =  120',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				codEspec:'Err:Obligatori. Deuen ser lletras A-Z',
				genero:'Err: Latín (Ex: Allium)',
				especie:'Err: Latín (Ex: vulgaris)',
				img:'Err: Max caracteres =  120',
			}
		}
		return nodoML;

	}

}

export class VarHorta extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'VarHorta';
		this.obj = {
			codVard : '',
			genero : '',
			especie : '',
			coste: 5,  // precio semillas en cts
			dPlts : 100, // dist entre plantas en cms
			dLins : 100, // dist entre lineas en cms
			venta : 50, // cts / Kg
			rendm : 100, // Kgs / area (100 m2)
			img :'img/verduras.png',
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}

	getNodoRow(){
		var nodo = new topol.rNodo(this.tag);
		nodo.id0 = this.id0;
		nodo.rol = 'ROW';
		nodo.obj = {
			codVard : this.obj.codVard,
			img : this.obj.img
		}
		return nodo;
	}
	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.codVard.ok = inputOK('COD',this.obj.codVard);
		conds.valid.genero.ok = this.obj.genero.length < 20;
		conds.valid.especie.ok = this.obj.especie.length < 20;
		conds.valid.coste.ok = inputOK('INT',this.obj.coste);
		conds.valid.dPlts.ok = inputOK('INT',this.obj.dPlts);
		conds.valid.dLins.ok = inputOK('INT',this.obj.dLins);
		conds.valid.venta.ok = inputOK('INT',this.obj.venta);
		conds.valid.rendm.ok = inputOK('INT',this.obj.rendm);
		conds.valid.img.ok = inputOK('IMG',this.obj.img);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('VarHorta');
		nodoML.obj.clase = 'VarHorta';
		nodoML.obj.retol = {ES:'Variedad-H',CAT:'Varietat-H'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				codVard:'Err:Obligatorio. Deben ser letras A-Z',
				genero:'Err: Latín (Ej: Allium)',
				especie:'Err: Latín (Ej: vulgaris)',
				coste:'Err: Debe ser un número entero',
				dPlts:'Err: Debe ser un número entero',
				dLins:'Err: Debe ser un número entero',
				venta:'Err: Debe ser un número entero',
				rendm:'Err: Debe ser un número entero',
				img:'Err: Max caracteres =  120',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				codVard:'Err:Obligatori. Deuen ser lletras A-Z',
				genero:'Err: Latín (Ex: Allium)',
				especie:'Err: Latín (Ex: vulgaris)',
				coste:'Err: Ha de ser un número sencer',
				dPlts:'Err: Ha de ser un número sencer',
				dLins:'Err: Ha de ser un número sencer',
				venta:'Err: Ha de ser un número sencer',
				rendm:'Err: Ha de ser un número sencer',
				img:'Err: Max caracteres =  120',
			}
		}
		return nodoML;

	}

}
//------------------------------------------------------------------- Fruta
class Fruta extends topol.rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Fruta';
		this.meta.org = utils.vgk.user.org;
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta = objDB.meta;
	}
}

class GrpFruta extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'GrpFruta';
		this.obj = {
			descripc : '',
			tasks_id :''
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}
	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.descripc.ok = inputOK('DSC',this.obj.descripc);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('GrpFruta');
		nodoML.obj.clase = 'GrpFruta';
		nodoML.obj.retol = {ES:'Frutales',CAT:'Fruiters'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				descripc:'Err: Max caracteres =  20',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				descripc:'Err: Max caracters = 20',
			}
		}
		return nodoML;

	}

}


class EspFruta extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'EspFruta';
		this.obj = {
			codEspec : '',
			genero : '',
			especie : '',
			fenologia : {A:0,B:0,C:0,D:0,E:0}, // dias entre fases
			img : 'img/verduras.png',
			rect : null
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}
	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.codEspec.ok = inputOK('COD',this.obj.codEspec);
		conds.valid.genero.ok = this.obj.genero.length < 20;
		conds.valid.especie.ok = this.obj.especie.length < 20;
		conds.valid.img.ok = inputOK('IMG',this.obj.img);
		return conds;
	}
	getNodoML(){
		var nodoML = new rNodoClase('EspFruta');
		nodoML.obj.clase = 'EspFruta';
		nodoML.obj.retol = {ES:'Especie-F',CAT:'Especie-F'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				codEspec:'Err:Obligatorio. Deben ser letras A-Z',
				genero:'Err: Latín (Ej: Allium)',
				especie:'Err: Latín (Ej: vulgaris)',
				img:'Err: Max caracteres =  120',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				codEspec:'Err:Obligatori. Deuen ser lletras A-Z',
				genero:'Err: Latín (Ex: Allium)',
				especie:'Err: Latín (Ex: vulgaris)',
				img:'Err: Max caracteres =  120',
			}
		}
		return nodoML;

	}
}

class VarFruta extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'VarFruta';
		this.obj = {
			codVard : '',
			codOEVV : '', // Oficina Espanyola de Variedades Vegetales
			genero : '',
			especie : '',
			coste: 5,  // precio semillas en cts
			marco : {ePlts : 100, eLins : 100}, // cms entre plantas/entre lineas
			venta : 50, // cts / Kg
			rendm : 100, // Kgs / area (100 m2)
			img :'img/verduras.png',
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}

	getNodoRow(){
		var nodo = new rNodo(this.tag);
		nodo.id0 = this.id0;
		nodo.rol = 'ROW';
		nodo.obj = {
			codVard : this.obj.codVard,
			img : this.obj.img
		}
		return nodo;
	}

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.codVard.ok = inputOK('COD',this.obj.codVard);
		conds.valid.genero.ok = this.obj.genero.length < 20;
		conds.valid.especie.ok = this.obj.especie.length < 20;
		conds.valid.coste.ok = inputOK('INT',this.obj.coste);
		conds.valid.dPlts.ok = inputOK('INT',this.obj.dPlts);
		conds.valid.dLins.ok = inputOK('INT',this.obj.dLins);
		conds.valid.venta.ok = inputOK('INT',this.obj.venta);
		conds.valid.rendm.ok = inputOK('INT',this.obj.rendm);
		conds.valid.img.ok = inputOK('IMG',this.obj.img);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('VarFruta');
		nodoML.obj.clase = 'VarFruta';
		nodoML.obj.retol = {ES:'Variedad-H',CAT:'Varietat-H'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				codVard:'Err:Obligatorio. Deben ser letras A-Z',
				genero:'Err: Latín (Ej: Allium)',
				especie:'Err: Latín (Ej: vulgaris)',
				coste:'Err: Debe ser un número entero',
				dPlts:'Err: Debe ser un número entero',
				dLins:'Err: Debe ser un número entero',
				venta:'Err: Debe ser un número entero',
				rendm:'Err: Debe ser un número entero',
				img:'Err: Max caracteres =  120',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				codVard:'Err:Obligatori. Deuen ser lletras A-Z',
				genero:'Err: Latín (Ex: Allium)',
				especie:'Err: Latín (Ex: vulgaris)',
				coste:'Err: Ha de ser un número sencer',
				dPlts:'Err: Ha de ser un número sencer',
				dLins:'Err: Ha de ser un número sencer',
				venta:'Err: Ha de ser un número sencer',
				rendm:'Err: Ha de ser un número sencer',
				img:'Err: Max caracteres =  120',
			}
		}
		return nodoML;
	}
}

class Planton extends VarFruta {
	constructor(tag){
		super(tag);
		this.iam = 'Planton';
		this.obj = {
			pie : '',
			fecha : '',
			img :'img/fruta/planton0.jpg',
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}


	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.codVard.ok = inputOK('COD',this.obj.codVard);
		conds.valid.genero.ok = this.obj.genero.length < 20;
		conds.valid.especie.ok = this.obj.especie.length < 20;
		conds.valid.coste.ok = inputOK('INT',this.obj.coste);
		conds.valid.dPlts.ok = inputOK('INT',this.obj.dPlts);
		conds.valid.dLins.ok = inputOK('INT',this.obj.dLins);
		conds.valid.venta.ok = inputOK('INT',this.obj.venta);
		conds.valid.rendm.ok = inputOK('INT',this.obj.rendm);
		conds.valid.img.ok = inputOK('IMG',this.obj.img);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('VarFruta');
		nodoML.obj.clase = 'VarFruta';
		nodoML.obj.retol = {ES:'Variedad-H',CAT:'Varietat-H'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				codVard:'Err:Obligatorio. Deben ser letras A-Z',
				genero:'Err: Latín (Ej: Allium)',
				especie:'Err: Latín (Ej: vulgaris)',
				coste:'Err: Debe ser un número entero',
				dPlts:'Err: Debe ser un número entero',
				dLins:'Err: Debe ser un número entero',
				venta:'Err: Debe ser un número entero',
				rendm:'Err: Debe ser un número entero',
				img:'Err: Max caracteres =  120',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				codVard:'Err:Obligatori. Deuen ser lletras A-Z',
				genero:'Err: Latín (Ex: Allium)',
				especie:'Err: Latín (Ex: vulgaris)',
				coste:'Err: Ha de ser un número sencer',
				dPlts:'Err: Ha de ser un número sencer',
				dLins:'Err: Ha de ser un número sencer',
				venta:'Err: Ha de ser un número sencer',
				rendm:'Err: Ha de ser un número sencer',
				img:'Err: Max caracteres =  120',
			}
		}
		return nodoML;
	}
}

//=================================================================== CULTIVOS
//------------------------------------------------------------------- Escenarios
// Un Escenario es un grupo de cultivos
// Se implementa como una malla, cuyos nodos ROW y COL son los bancales y variedades
// y los NUDOs, con las carateristicas de ambos nodos, permiten evaluar el cultivo
// Basado en MallaTree

class Escenario extends topol.rMallaTree {
	constructor (nombre,nodos){
		super(nombre,nodos);
		this.meta.iam = 'Escenario';
	}

	getCultivos(){
		var cults = this.getNudos();
		return cults;
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta = objDB.meta;
	}

	borraCultivo(cult){
		this.borraNudo(cult);
	}
}

class RaizEsc extends topol.rNodo {
	constructor (tag){
		super(tag);
		this.iam = 'RaizEsc';
		this.obj = {
			esqma : null, // esquema arbolado para frutales
		}
	}

}
// Un escenario de Hortalizas tiene varios Bancales
// y un Cultivo por cada bancal/variedad plantada

class EscHorta extends Escenario {
	constructor (nombre,nodos){
		super(nombre,nodos);
		this.meta.iam = 'EscHorta';
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta = objDB.meta;
	}	
}

// Un escenario de Frutales tiene un único Bancal
// y un Cultivo por cada variedad plantada
class EscFruta extends Escenario {
	constructor (nombre,nodos){
		super(nombre,nodos);
		this.meta.iam = 'EscFruta';
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta = objDB.meta;
	}	
}

class AgroJar extends Escenario {
	constructor (nombre,nodos){
		super(nombre,nodos);
		this.meta.iam = 'AgroJar';
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta = objDB.meta;
	}	
}

//------------------------------------------------------------------- Cultivo Hortalizas
// Los cultivos son la aplicación del conjunto de plantas sobre el conjunto de bancales
// Cada cultivo representa una planta concreta (variedad) sobre un bancal
// Hereda de ambos las características para hacer una evaluación económica (previsión)
// Más tarde, sirve de base para la elaboración del Cuaderno de Campo / Campanya / AgroJar.
// Un escenario es un grupo de cultivos, expresados como una Malla.
// Los nodos ROW y COL son los nodos del bancal y la planta.
// El cultivo es el NUDO que los une.

class Cultivo extends topol.rNudo {
	constructor(tag,vardd,bancal){
		super(tag,vardd,bancal,0,0);
		this.iam = 'Cultivo';
		this.obj = {};
		if (vardd && bancal) this.inicio(vardd,bancal);
	}
	inicio(vardd,bancal){
		this.obj = {
			tipo : null, // HORTA|FRUTA
			fechaI : '5/5/2019', // Fecha inicio del cultivo
			fechaF : '8/9/2019', // Fecha final del cultivo
			tagZ  : bancal.tag,  // Tag del bancal
			codZ  : bancal.obj.codBancal,  // codigo del bancal
			tagP  : vardd.tag,  // Tag de la planta
			codP  : vardd.obj.codVard,  // Codigo de la planta
			area  : bancal.obj.area, //  m2, según Bancal
			coste : vardd.obj.coste, // precio semillas en cts
			dPlts : vardd.obj.dPlts, // dist entre plantas en cms
			dLins : vardd.obj.dLins, // dist entre lineas en cms
			venta : vardd.obj.venta, // cts / Kg
			rendm : vardd.obj.rendm, // Kgs / area (100 m2)
			tasks_id : null, // tasks a efectuar en el cultivo
		}

	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;

	}

	getCCPAE(){
		var ccpae = new Reg02(this.tag);
		ccpae.obj.orden = 'E-';
		ccpae.obj.finca = this.obj.tagZ;
		ccpae.obj.sigpac = {
				munic: 'XYZ',
				polig: '12',
				parce: '34',
				recin: '45',
				uso: 'XX',
			}
		ccpae.obj.cultiu = this.obj.tagP;
		ccpae.obj.superf = this.obj.area;
		ccpae.obj.sistem = {
				s31:'X', //S (secà), M (manta), G (goteig), A (aspersió), X (altres)
				s32:'L' // L (a l’aire lliure) I (hivernacle), Z (altres )
			}
		ccpae.obj.vinya = false;
		return ccpae;
	}
	vale(conds){
		if (!this.obj.tagZ || !this.obj.tagZ.match('[a-z]+')) conds.valid.tagZ.ok = false;
		if (!this.obj.tagP || !this.obj.tagP.match('[a-z]+')) conds.valid.tagP.ok = false;
		return conds;
	}
	getNodoML(){
		var nodoML = new rNodoClase('Cultivo');
		nodoML.obj.clase = 'Cultivo';
		nodoML.obj.retol = {ES:'Cultivo',CAT:'Cultiu'};
		nodoML.obj.valid = {
			ES : {
				fechaI:'Err: Debe ser fecha válida (dd/mm/aaaa)',
				fechaF:'Err: Debe ser fecha válida (dd/mm/aaaa)',
				tagZ:'Err: Deben ser letras a-z',
				codZ:'Err: Deben ser letras a-z',
				tagP:'Err: Deben ser letras a-z',
				codP:'Err: Deben ser letras a-z',
				area:'Err: Deben ser número entero',
				coste:'Err: Debe ser un número entero',
				dPlts:'Err: Debe ser un número entero',
				dLins:'Err: Debe ser un número entero',
				venta:'Err: Debe ser un número entero',
				rendm:'Err: Debe ser un número entero',
			},
			CAT : {
				fechaI:'Err: Ha de ser data válida (dd/mm/aaaa)',
				fechaF:'Err: Ha de ser data válida (dd/mm/aaaa)',
				tagZ:'Err: Han de ser lletres a-z',
				codZ:'Err: Han de ser lletres a-z',
				tagP:'Err: Han de ser lletres a-z',
				codP:'Err: Han de ser lletres a-z',
				area:'Err: Ha de ser número sencer',
				coste:'Err: Ha de ser un número sencer',
				dPlts:'Err: Ha de ser un número sencer',
				dLins:'Err: Ha de ser un número sencer',
				venta:'Err: Ha de ser un número sencer',
				rendm:'Err: Ha de ser un número sencer',
			}
		}
		return nodoML;

	}

}

class CultHorta extends Cultivo {
	constructor (tag,vardd,bancal){
		super(tag,vardd,bancal);
		this.iam = 'CultHorta';
		this.obj.tipo = 'HORTA';
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.obj = objDB.obj;
		this.obj.tipo = 'HORTA';
	}
	getNodoML(){
		var nodoML = super.getNodoML();
		nodoML.obj.clase = 'CultHorta';
		return nodoML;
	}
}

class CultFruta extends Cultivo {
	constructor (tag,vardd,bancal){
		super(tag,vardd,bancal);
		this.iam = 'CultFruta';
		this.obj.tipo = 'FRUTA';
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj.tipo = 'FRUTA';
	}
	getNodoML(){
		var nodoML = super.getNodoML();
		nodoML.obj.clase = 'CultFruta';
		return nodoML;
	}
}

//=================================================================== APOYOS
// El esquema de Apoyos del Arbolado modeliza la disposición física de los frutales.
// Es como una cuadrícula.
// Hay 1 ó varias lineas. (L1,L2, ...)
// Cada linea tiene 1 o más tramos (L1T1, L1T2, ... , L2T1, L2T2,...)
// Cada tramo tiene 1 o más árboles :
// L1T1N1 L1T1N2 ... L1T2N1 L1T2N2 ... L1T3N1 L1T3N2 ...
// L2T1N1 L2T1N2 ... L2T2N1 L2T2N2 ... L2T3N1 L2T3N2 ...
// L3T1N1 L3T1N2 ... L3T2N1 L3T2N2 ... L3T3N1 L3T3N2 ...
// etc etc
//------------------------------------------------------------------- Apoyos arbolado
class Apoyos extends topol.rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Apoyos';
		this.meta.org = utils.vgk.user.org;
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = objDB.meta.iam;
		this.meta.org = objDB.meta.org;
	}

	nodo2vue(nodo,vueObj){
		vueObj.id0 = nodo.id0;
		vueObj.tag = nodo.tag;
		vueObj.iam = nodo.iam;
		if (nodo.iam == 'Item' && nodo.obj.descrip.length>0) vueObj.descrip = '('+nodo.obj.descrip+')';
		vueObj.hijos = [];
		var n = nodo.hijos.length;
		if (!n) return;
		for (var i=0;i<n;i++){
			var nodoH = this.getNodoById(nodo.hijos[i]);
			var vueH = {};
			this.nodo2vue(nodoH,vueH);
			vueObj.hijos.push(vueH);
		}
	}

	reto2vue(){
		var vueObj = {};
		var raiz = this.nodos[0];
		this.nodo2vue(raiz,vueObj);
		return vueObj;
	}

}

class NodoApoyos extends topol.rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'NodoApoyos';
		this.obj = {
			descripc : 'Descripción',
			codBancal : '', // para Croquis
			finca_id : null,
			grupo_id : null,
			vardds :[] // variedades bajo estos apoyos
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}
}

class NodoLinea extends topol.rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'NodoLinea';
		this.obj = {
			codLinea : '',
			descripc : 'Descripción',
			tramos : 0
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}
}

class NodoTramo extends topol.rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'NodoTramo';
		this.obj = {
			descripc : 'Descripción',
			lista : [],
			plantas :0
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}
}

//=================================================================== TASKS
/*
	Modelizan las tareas agrícolas
	Se representan como un Grafo, un Gantt o un Almanaque/Agenda
	El grafo se una para UN cultivo
	El gantt para la campaña completa
	El almanaque para visualizar las jornadas de las tareas para la campaña

	Tanto el grafo como el gantt usan la librería del kernel libK1_Trazo.js
	El almanaque/agenda usa la libreria del kernel libK1_Tiempo.js
*/
//------------------------------------------------------------------- Grafo Tasks
class GrafoTasks extends topol.rGrafo{
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam='GrafoTasks';
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam='GrafoTasks';
	}
	getTaskIni(){
		var aux = this.index.slice(0);
		this.arcos.map(function(arco){
			var ix = aux.indexOf(arco.id1);
			if (ix != -1) aux.splice(ix,1);
		})
		return aux; // los id0s de los nodos que no tienen arco de entrada
	}

	setFechasTasks(nodo0){
		var veins = this.getVecinos(nodo0); // array arcos-nodos {n: <nodo>,a:<arco>}
		veins.map(function(vei){
//			console.log('Veí: '+o2s(vei));
			var nodo1 = vei.n;
			var gap = parseInt(vei.a.obj.gap);
			var tau = nodo0.obj.fecha.uta+nodo0.obj.fecha.tau+gap;
			nodo1.obj.fecha = new rLapso(tau,30);
//			console.log('Set F:' + o2s(nodo1));
			this.setFechasTasks(nodo1);
		}.bind(this))
	}

	setDimsTasks(nivel,lapsoTotal){
		this.nodos.map(function(nodo){
			if (nodo.obj.fecha){
				nodo.dim.x = nodo.obj.fecha.uta - lapsoTotal.uta;
				nodo.dim.y = 50+(3*nivel)+(60*nivel);
				nodo.dim.w = nodo.obj.fecha.tau;
				nodo.dim.h = 30;
			}
//			console.log('Dims '+nodo.tag+' : '+o2s(nodo.dim))
		}.bind(this))
	}

}

//------------------------------------------------------------------- Task Links (arcos)
export class TaskLnk extends topol.rArco {
	constructor(tag,nodo0,nodo1,n){
		super(tag,nodo0,nodo1,n);
		this.iam = "TaskLnk";
		this.obj= {gap:0}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = "TaskLnk";
		this.obj.gap = objDB.obj.gap;
	}
	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.gap.ok = inputOK('INT',this.obj.gap);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('TaskLnk');
		nodoML.obj.clase = 'TaskLnk'
		nodoML.obj.retol =  {ES : 'Arco Tareas',CAT :'Arc Tascas'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				gap:'Err: Debe ser un número entero',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				gap:'Err:Ha de ser un número sencer',
			}
		};
		return nodoML;
	}

}
//------------------------------------------------------------------- Tasks (nodos/drags)
export class Task extends topol.rDrag {
	constructor(tag){
		super(tag);
		this.iam = 'Task';
		this.obj = {
			fase : 'SEED',
			pages : 'NADIE',
			fecha : null, // rLapso. Cuando no hay fecha, uta = null
			ratio : 1, // granos/area P. ej : si cada area necesita 15 min., ratio = 3
			apero : null,
			coste : 10 // euros/hora
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Task';
		this.obj = objDB.obj;
		if (objDB.obj.fecha){
			this.obj.fecha = new rLapso(null,null);
			this.obj.fecha.objDB2Clase(objDB.obj.fecha);
		}
	}

	ajustarDim(){
		this.dim.x = this.obj.fecha.uta;
		this.dim.w = this.obj.fecha.tau;
	}
	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.pages.ok = inputOK('COD',this.obj.pages);
		conds.valid.ratio.ok = inputOK('INT',this.obj.ratio);
		conds.valid.coste.ok =inputOK('DEC',this.obj.coste);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Task');
		nodoML.obj.clase = 'Task'
		nodoML.obj.retol =  {ES : 'Tarea',CAT :'Tasca'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				pages:'Err:Obligatorio. Deben ser letras A-Z',
				ratio:'Err: Debe ser un número entero',
				coste:'Err: Debe ser un número decimal',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				pages:'Err:Obligatori. Deuen ser lletras A-Z',
				ratio:'Err:Ha de ser un número sencer',
				coste:'Err:Ha de ser un número decimal',
			}
		};
		return nodoML;
	}

}

class Epoca extends topol.rDrag {
	constructor(tag){
		super(tag);
		this.iam = 'Epoca';
		this.obj = {
			lapso : null,
			nivel : 0
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Epoca';
		this.obj = objDB.obj;
		if (objDB.obj.lapso){
			this.obj.lapso = new rLapso(null,null);
			this.obj.lapso.objDB2Clase(objDB.obj.lapso);
		}
	}
}

//=================================================================== RIEGO
//------------------------------------------------------------------- Riego
class Riego extends topol.rGrafo{
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam='Riego';
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam='Riego';
	}

}

//------------------------------------------------------------------- Canal (arcos)
class Canal extends topol.rArco {
	constructor(tag,nodo0,nodo1,n){
		super(tag,nodo0,nodo1,n);
		this.iam = "Canal";
		this.obj= {largo:0}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = "Canal";
		this.obj = objDB.obj;
	}
	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.largo.ok =inputOK('INT',this.obj.largo);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Canal');
		nodoML.obj.clase = 'Canal'
		nodoML.obj.retol =  {ES : 'Canal',CAT :'Canal'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				largo:'Err: Debe ser un número entero',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				largo:'Err:Ha de ser un número sencer',
			}
		};
		return nodoML;
	}

}
//------------------------------------------------------------------- Items Rec (nodos/drags)
class ItemRec extends topol.rDrag {
	constructor(tag){
		super(tag);
		this.iam = 'ItemRec';
		this.obj = {
			caudal : 10 // litros/min
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'ItemRec';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.caudal.ok =inputOK('INT',this.obj.caudal);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Item Rec');
		nodoML.obj.clase = 'ItemRec'
		nodoML.obj.retol =  {ES : 'Item Riego',CAT :'Item Rec'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				caudal:'Err: Debe ser un número entero',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				caudal:'Err:Ha de ser un número sencer',
			}
		};
		return nodoML;
	}

}
//=================================================================== ALMANAQUE
//------------------------------------------------------------------- Almanaque Agro
class rAlmanak extends tiempo.rKronos {
	constructor (tag,nodos,jar){
		super(tag,nodos,jar);
		this.meta.iam = 'rAlmanak';
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = 'rAlmanak';
	}


	getDiaByLapso(lapso){
		var date = lapso.toDateI();
		var ixMes = date.getMonth(); // 0-11
		var nodoMes = this.getRaspa()[ixMes];
		var ixDia = date.getDate(); // 1-31
		var idDia = nodoMes.hijos[ixDia-1];
		var nodoDia= this.getNodoById(idDia);

		return nodoDia;
	}
	getAgenda(){
		var agenda = [];
		this.nodos.map(function(nodo){
			if (nodo.iam =='Task')agenda.push(nodo);
		})
		return agenda;
	}

	generaFila(fila,diasIds,tagMes,iMes){
		console.log(o2s(diasIds));
		diasIds.map(function(id){
			var dia = this.getNodoById(id);
			var tag = ''+dia.obj.dM+' '+tagMes; //+' '+this.jar;
			var idsTasks = dia.hijos;
			var tasks = [];
			idsTasks.map(function(id){
				var nodoTask = this.getNodoById(id);
				var task = {tag:nodoTask.tag,id0:nodoTask.id0};
				tasks.push(task);
			}.bind(this))

			switch(dia.obj.dS){

				case 1: fila['L'] ={tag: tag,mes:iMes,tasks:tasks}; break;
				case 2: fila['M'] ={tag: tag,mes:iMes,tasks:tasks}; break;
				case 3: fila['X'] ={tag: tag,mes:iMes,tasks:tasks}; break;
				case 4: fila['J'] ={tag: tag,mes:iMes,tasks:tasks}; break;
				case 5: fila['V'] ={tag: tag,mes:iMes,tasks:tasks}; break;
				case 6: fila['S'] ={tag: tag,mes:iMes,tasks:tasks}; break;
				case 0: fila['D'] ={tag: tag,mes:iMes,tasks:tasks}; break;
			}

		}.bind(this))
		return fila;

	}

	getFilasSem(s){
		var filas = [];
		var acum = 0;
		var mesX = null;
		var iMes = 0;
		var raspa = this.getRaspa();

		var ene = raspa[0];
		var d1E = this.getNodoById(ene.hijos[0]); // dia 1 de enero
		var gap = ((d1E.obj.dS) ? d1E.obj.dS: 7 )-1; // dia de la semana.Si es 0 --> 7 (Domingo)
		var dias = s*7-(gap);


		for (var i=0;i<raspa.length;i++){
			if (acum < dias) {
				acum += raspa[i].hijos.length;
				mesX = raspa[i];

				iMes = i;
				}
			else break;
		}

		var d1 = this.getNodoById(mesX.hijos[0]);

		if ((dias - d1.obj.dJ) > 7){
			fila = {};
			var ixDia = dias - d1.obj.dJ - 6;
			var idsDias = mesX.hijos.slice(ixDia,ixDia+7);
			var fila = this.generaFila(fila,idsDias,mesX.tag,iMes);
			filas.push(fila);
		}

		else {
			var fila = {};
			var idsDias = mesX.hijos.slice(0,(8-d1.obj.dS));
			var fila = this.generaFila(fila,idsDias,mesX.tag);

			if (!iMes) {filas.push(fila); return filas;} // si es Enero, no hay más dias

			var mesY = raspa[iMes-1];
			console.log('Mes ant.: '+mesY.tag);
			var ultDias = mesY.hijos.slice(-(d1.obj.dS-1));
			var fila = this.generaFila(fila,ultDias,mesY.tag);

			filas.push(fila);
		}

		return filas;
	}

}

//=================================================================== GANTT TASKS
//------------------------------------------------------------------- Gantt Tasks
class GanttTasks extends topol.rGrafo {
	constructor(tag,nodos,agroJar){
		super(tag,nodos);
		this.meta.iam='GanttTasks';
		this.agroJar = agroJar;
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam='GanttTasks';
//		if (objDB.agroJar) this.agroJar = objDB.agroJar; (agroJar no se incluye en clase2ObjDB)
	}

	getTasks(){
		var tasks =[];
		this.nodos.map(function(nodo){
			if (nodo.iam == 'Task') tasks.push(nodo);
		})
		return tasks;
	}

	getTasksSVG(){
		var tasks =[];
		this.nodos.map(function(nodo){
			if (nodo.iam == 'Task'){
				var task = {};
				task['name'] = nodo.tag;
				task['id']   = "Task_"+nodo.id0,
				task['start']= nodo.obj.fecha.toStr_I('YYYY-MM-DD'),
				task['end']  = nodo.obj.fecha.toStr_F('YYYY-MM-DD'),
				task['progress'] = 0,
//				task['dependencies'] = 'Task 2'
				tasks.push(task);
			}
		})
		return tasks;
	}
	getEpocas(){
		var epoks =[];
		this.nodos.map(function(nodo){
			if (nodo.iam == 'Epoca') epoks.push(nodo);
		})
		return epoks;
	}
}

//=================================================================== Explotacion


class Explt extends topol.rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Explt';
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = objDB.meta.iam;
	}

	nodo2vue(nodo,vueObj){
		vueObj.id0 = nodo.id0;
		vueObj.tag = nodo.tag;
		vueObj.iam = nodo.iam;
		if (nodo.iam == 'Item' && nodo.obj.descrip.length>0) vueObj.descrip = '('+nodo.obj.descrip+')';
		vueObj.hijos = [];
		var n = nodo.hijos.length;
		if (!n) return;
		for (var i=0;i<n;i++){
			var nodoH = this.getNodoById(nodo.hijos[i]);
			var vueH = {};
			this.nodo2vue(nodoH,vueH);
			vueObj.hijos.push(vueH);
		}
	}

	reto2vue(){
		var vueObj = {};
		var raiz = this.nodos[0];
		this.nodo2vue(raiz,vueObj);
		return vueObj;
	}

}

class ItemExplt extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'ItemExplt'
		this.obj = {
			descripc : ''
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;	
	}
	
	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
		conds.valid.descripc.ok = inputOK('DSC',this.obj.descripc);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Finca');
		nodoML.obj.clase = 'ItemExplt'
		nodoML.obj.retol =  {ES : 'Item',CAT :'Item'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
				descripc:'Err: Max caracteres =  20',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
				descripc:'Err: Max caracters = 20',
			}
		};
		return nodoML;
	}

}


//=================================================================== MATRIZ COMPRAS
//------------------------------------------------------------------- Proveedor
class Proveedor extends topol.rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'Proveedor';
		this.obj = {
			cod:'',
			nombre : '',
			nif : ''
		}
	}

}

//------------------------------------------------------------------- Producto
class Producto extends topol.rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'Producto';
		this.obj = {
			codProd : '',
		}
	}

}

//------------------------------------------------------------------- Oferta
class Oferta extends topol.rNudo {
	constructor(tag,nRow,nCol,n,valor){
		super(tag,nRow,nCol,n,valor);
		this.iam = 'Oferta';
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Oferta';
	}
}

//------------------------------------------------------------------- Compras
class Compras extends topol.rMalla {
	constructor (nombre,nodos){
		super(nombre,nodos);
		this.meta.iam = 'Compras';
		this.meta.org = utils.vgk.user.org;
	}

	getOferta(){
		return this.nudos;
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = 'Compras';
		this.meta.org = objDB.meta.org;
	}
}

//===================================================================  Add Clases a Idiomas
function addClasesSuelo(){
	var clase = new InfoFinca('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Zona('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Bancal('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);
}

function addClasesPlantas(){
	var clase = new GrpHorta('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new EspHorta('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new VarHorta('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new GrpFruta('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new EspFruta('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new VarFruta('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);
}

function addClasesCultivos(){
	var clase = new Cultivo('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new CultHorta('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new CultFruta('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);
}

function addClasesExplotacion(){
	var clase = new ItemExplt('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);
}

function addClasesTasks(){
	var clase = new TaskLnk('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Task('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);
}

function addClasesRiego(){
	var clase = new Canal('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new ItemRec('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);
}

function addClases2Clases(){
	addClasesSuelo();
	addClasesPlantas();
	addClasesCultivos();
	addClasesExplotacion();
	addClasesTasks();
	addClasesRiego();
	addClasesQuadern(); // agro_CCPAE.js
}

export default {
	Finca,Zona,Bancal,
	Horta,GrpHorta,EspHorta,VarHorta,
	RaizEsc,EscHorta,EscFruta,
	CultHorta,CultFruta,
	Task,TaskLnk,GrafoTasks
}