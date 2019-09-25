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
class Finca extends rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Finca';
		this.meta.org = vgk.user.org;
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
class InfoFinca extends rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'InfoFinca';
		this.obj = {
			codFinca : '',
			descripc : '',
			area : null,
			lat: null,
			lon:null,
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
class Zona extends rNodo {
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
class Bancal extends rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Bancal';
		this.obj = {
			codBancal : '',
			area : 0,
			geo_id : '', // coordenadas GeoJSON. No usado de momento
			sigpac : ''
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}

	getNodoCol(){
		var nodo = new rNodo(this.tag);
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
class Horta extends rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Horta';
		this.meta.org = vgk.user.org;
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = objDB.meta.iam;
		this.meta.org = objDB.meta.org;
	}
}

class GrpHorta extends rNodo {
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



class EspHorta extends rNodo {
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

class VarHorta extends rNodo {
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
class Fruta extends rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Fruta';
		this.meta.org = vgk.user.org;
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta = objDB.meta;
	}
}

class GrpFruta extends rNodo {
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


class EspFruta extends rNodo {
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

class VarFruta extends rNodo {
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

class Escenario extends rMallaTree {
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
}

class RaizEsc extends rNodo {
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

class Cultivo extends rNudo {
	constructor(tag,vardd,bancal){
		super(tag,vardd,bancal,0,0);
		this.iam = 'Cultivo';
		this.obj = {};
		if (vardd && bancal) this.inicio();
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

//=================================================================== ESQUEMA
// El Esquema de Arbolado modeliza la disposición física de los frutales.
// Es como una cuadrícula.
// Hay 1 ó varias lineas. (L1,L2, ...)
// Cada linea tiene 1 o más tramos (L1T1, L1T2, ... , L2T1, L2T2,...)
// Cada tramo tiene 1 o más árboles :
// L1T1N1 L1T1N2 ... L1T2N1 L1T2N2 ... L1T3N1 L1T3N2 ...
// L2T1N1 L2T1N2 ... L2T2N1 L2T2N2 ... L2T3N1 L2T3N2 ...
// L3T1N1 L3T1N2 ... L3T2N1 L3T2N2 ... L3T3N1 L3T3N2 ...
// etc etc
// Cada esquema se refiere a UN cultivo.
// Obviamente, en un mismo bancal pueden coexistir difrentes variedades
// Hay por tanto varios esquemas, aunque la cuadrícula es la misma
// La UNION de los diferentes esquemas de un bancal --> esquema completo
//------------------------------------------------------------------- Esqma arbolado
class Esqma extends rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Esqma';
		this.meta.org = vgk.user.org;
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

class NodoEsqma extends rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'NodoEsqma';
		this.obj = {
			descripc : 'Descripción',
			codBancal : '', // para Croquis
			finca_id : null,
			codVardd : '', 
			grupo_id : null,
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}
}

class NodoLinea extends rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'NodoLinea';
		this.obj = {
			codLinea : '',
			descripc : 'Descripción',
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = objDB.iam;
		this.obj = objDB.obj;
	}
}

class NodoTramo extends rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'NodoTramo';
		this.obj = {
			descripc : 'Descripción',
			plantas :''
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
class GrafoTasks extends rGrafo{
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam='GrafoTasks';
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam='GrafoTasks';
		console.log('GrafoTask: '+this.nodos.length);
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
		console.log(nodo0.tag + o2s(nodo0.obj.fecha));
		var veins = this.getVecinos(nodo0); // array arcos-nodos {n: <nodo>,a:<arco>}
		veins.map(function(vei){
			var nodo1 = vei.n;
			var gap = parseInt(vei.a.obj.gap);
			var tau = nodo0.obj.fecha.uta+nodo0.obj.fecha.tau+gap;
			nodo1.obj.fecha = new rLapso(tau,30);
			this.setFechasTasks(nodo1);
		}.bind(this))
	}
	setDimsTasks(nivel){
		this.nodos.map(function(nodo){
			if (nodo.obj.fecha){
				nodo.dim.x = nodo.obj.fecha.uta;
				nodo.dim.y = 50+(3*nivel)+(60*nivel);
				nodo.dim.w = nodo.obj.fecha.tau;
				nodo.dim.h = 30;
			}

		}.bind(this))
	}

}

//------------------------------------------------------------------- Task Links (arcos)
class TaskLnk extends rArco {
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

}
//------------------------------------------------------------------- Tasks (nodos/drags)
class Task extends rDrag {
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

//------------------------------------------------------------------- Gantt Tasks
class GanttTasks extends rGrafo {
	constructor(tag,nodos,agroJar){
		super(tag,nodos);
		this.meta.iam='GanttTasks';
		this.agroJar = agroJar;
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam='GanttTasks';
		if (objDB2Clase.agroJar) this.agroJar = objDB.agroJar;
	}

	getTasks(){
		var tasks =[];
		this.nodos.map(function(nodo){
			if (nodo.iam == 'Task') tasks.push(nodo);
		})
		return tasks;
	}
}

//=================================================================== Explotacion


class Explt extends rArbol {
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

class ItemExplt extends rNodo {
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
class Proveedor extends rNodo{
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
class Producto extends rNodo{
	constructor(tag){
		super(tag);
		this.iam = 'Producto';
		this.obj = {
			codProd : '',
		}
	}

}

//------------------------------------------------------------------- Oferta
class Oferta extends rNudo {
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
class Compras extends rMalla {
	constructor (nombre,nodos){
		super(nombre,nodos);
		this.meta.iam = 'Compras';
		this.meta.org = vgk.user.org;
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
	var clase = new Task('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);
}

function addClases2Clases(){
	addClasesSuelo();
	addClasesPlantas();
	addClasesCultivos();
	addClasesExplotacion();
	addClasesTasks();
}
