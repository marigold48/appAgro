//agro_CCPAE.js .- Clases para modelizar el Quadern d'explotació


/*


Reg00
Reg01A
Reg01B
Reg01C
Reg01D
Reg01E
Reg02
Reg03
Reg04
Reg05A
Reg05B
Reg06
Reg07
Reg08
Reg09
Reg10A
Reg10B
Reg11

El quadern consta dels següents registres:
0. Portada
	Identificació de l’operador, assessor (si s’escau) i compromisos de l’operador.
1. Relació de personal i maquinària de tractaments.
	Registrar les persones que realitzen els tractaments i la maquinària utilitzada pels tractaments.
	A)	Plantilla
	B)	Contratados
	C) Empresas
	D) Maquinaria propia
	E) Maquinaria alquilada
2. Identificació de les parcel·les de cultiu ecològic.
	Relacionar el número d’ordre intern amb les dades del SIGPAC i el tipus de maneig de cada parcel·la.
3. Registres de treballs i adobats
	Registrar els treballs de camp i adobs aplicats
4. Registre de tractaments fitosanitaris i altres mètodes de lluita
	Registrar l’ informació referent a les aplicacions de fitosanitaris i altres mètodes de lluita.
5. Registre d’altres tractaments fitosanitaris
	Registrar les aplicacions realitzades sobre les llavors, tractaments postcollita, ins-tal·lacions d’emmagatzematge i transports.
6. Registre d’anàlisi de residus de productes fitosanitaris
	Registrar els resultats de les anàlisis multiresidus realitzats als cultius o collites de l’explotació.
7. Registre de compra de matèries primeres
	Registrar les entrades de matèries primeres a l’explotació
8. Registre de venda de productes
	Registrar les vendes de productes
9. Registre de totals recol·lectats i càlcul de rendiments
	Registrar les produccions i rendiments
10. Altres dades i incidències
	A)
		Masas de agua potable
		Zonas urbanas o específicas
	B)
		Incidències i observacions
11. Registre de reclamacions de clients
	Registrar les reclamacions rebudes pels clients.

Nota: El present quadern compleix les disposicions del RD 1311/2012 
que regula la informació mínima que cal registrar sobre l’ús de productes fitosanitaris.
*/

import utils from '/k1/libK1_Utils.js'
import topol from '/k1/libK1_Topol.js'

// Quadern
class Quadern extends topol.rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Quadern';
		this.ixRegIam = {};
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = 'Quadern';
	}

	fusionaNodo(nodo){
		console.log('Nodo: '+ utils.o2s(nodo));
		switch (nodo.iam){
			case 'Reg00':
				var padre = this.getNodoById(this.ixRegIam[nodo.iam]);
				var hijos = padre.hijos;
				if (nodo.tag == 'Titular'){
					console.log ('Titular: '+nodo.tag)
					var titular = this.getNodoById(hijos[0]);
					titular.obj = nodo.obj;
				}
				else if (nodo.tag == 'Assesor'){
					console.log ('Assesor: '+nodo.tag)
					var asesor = this.getNodoById(hijos[1]);
					asesor.obj = nodo.obj;
				}
				else console.log ('No vale: '+nodo.tag)
				break;
			case 'Reg01A':
			case 'Reg01B':
			case 'Reg01C':
			case 'Reg01D':
			case 'Reg01E':
			case 'Reg02':
			case 'Reg03':
			case 'Reg04':
			case 'Reg05A':
			case 'Reg05B':
			case 'Reg06':
			case 'Reg07':
			case 'Reg08':
			case 'Reg09':
			case 'Reg10A':
			case 'Reg10B':
			case 'Reg11':
				var padre = this.getNodoById(this.ixRegIam[nodo.iam]);
				console.log('Fusiona '+nodo.tag+' en '+padre.tag);
				this.addNodoHijo(padre,nodo);
				break;

		}
	};
}

//------------------------------------------------------------------- Campanya (Nodo Raiz)
export class Campanya extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Campanya';
		this.obj = {
			jar1: null,	
			jar2: null,
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Campanya';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Campanya');
		nodoML.obj.clase = 'Campanya'
		nodoML.obj.retol =  {ES : 'Campaña',CAT :'Campanya'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

// Portada. Propietario y tecnico
export class Reg00 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg00';
		this.obj = {
			nom: null,	
			nif: null,	
			reg: null
		}
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg00';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg00');
		nodoML.obj.clase = 'Reg00'
		nodoML.obj.retol =  {ES : 'Reg00',CAT :'Reg00'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 1
// 1. Relació de personal i maquinària de tractaments.
// Plantilla
export class Reg01A extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg01A';
		this.obj = {
			orden: null,
			nombre: null,
			nif: null,
			carnet: null,
			nivel: null // QUALIFICAT | BASIC
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg01A';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg01A');
		nodoML.obj.clase = 'Reg01A'
		nodoML.obj.retol =  {ES : 'Reg01A',CAT :'Reg01A'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

// Contratados
export class Reg01B extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg01B';
		this.obj = {
			orden: null,
			nombre: null,
			nif: null,
			carnet: null,
			nivel: null // QUALIFICAT | BASIC
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg01B';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg01B');
		nodoML.obj.clase = 'Reg01B'
		nodoML.obj.retol =  {ES : 'Reg01B',CAT :'Reg01B'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}
// Empresas
export class Reg01C extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg01C';
		this.obj = {
			orden: null,
			nombre: null,
			nif: null,
			carnet: null, // num registro
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg01C';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg01C');
		nodoML.obj.clase = 'Reg01C'
		nodoML.obj.retol =  {ES : 'Reg01C',CAT :'Reg01C'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

// Maquinaria tratamientos propia
export class Reg01D extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg01D';
		this.obj = {
			orden: null,
			tipus: null,
			fecha: null,
			nROMA: null, 
			fInsp: null // ultima inspeccion
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg01D';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg01D');
		nodoML.obj.clase = 'Reg01D'
		nodoML.obj.retol =  {ES : 'Reg01D',CAT :'Reg01D'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

// Maquinaria tratamientos llogada
export class Reg01E extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg01E';
		this.obj = {
			orden: null,
			tipus: null,
			fecha: null,
			nROMA: null, 
			fInsp: null // ultima inspeccion
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg01E';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg01E');
		nodoML.obj.clase = 'Reg01E'
		nodoML.obj.retol =  {ES : 'Reg01E',CAT :'Reg01E'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 2
// 2. Identificació de les parcel·les de cultiu ecològic.
export class Reg02 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg02';
		this.obj = {
			orden: null,
			finca: null,
			sigpac: {
				munic: null,
				polig: null,
				parce: null,
				recin: null,
				uso: null,
			},
			cultiu: null, 
			superf: null,
			sistem: {
				s31:null, //S (secà), M (manta), G (goteig), A (aspersió), X (altres)
				s32:null // L (a l’aire lliure) I (hivernacle), Z (altres )
			},
			vinya : null
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg02';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg02');
		nodoML.obj.clase = 'Reg02'
		nodoML.obj.retol =  {ES : 'Reg02',CAT :'Reg02'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}
/* Codigos de tipo Parcela
TA Terra campa
TH Horta
IV Hivernacles
FY Fruiters
CI Cítrics
FS Fruita seca
OV Olivera
VI Vinya
IM Improductius
FO Forestal
PA Pastures arbrades
PR Pastures arbustives
PS Pastius
ED Edificacions
ZU Zona urbana
CA Vials
AG Corrents i superfícies d’aigua
OF Associació olivera-fruiter
VO Associació olivera-vinya
VF Associació vinya-fruiter
FV Associació fruita seca -vinya
FL Associació fruita seca -olivera
ZC Zona de concentració parcel·lària
ZV Zona censurada
*/

//------------------------------------------------------------------- Registro 3
// 3. Registres de treballs i adobats
export class Reg03 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg03';
		this.obj = {
			fecha: null,
			finca: null,
			cultiu: null,
			superf: null,
			tareas: null,
			adobat:{
				nombre: null,
				compos: null,
				cantid: null,
				fertirr: false // false|true
			},
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg03';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg03');
		nodoML.obj.clase = 'Reg03'
		nodoML.obj.retol =  {ES : 'Reg03',CAT :'Reg03'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 4
/*
• Data del tractament: 
	Data (dia/mes/any) en qual es realitza el tractament.
• Número finca: 
	Número de la parcel·la agrícola. 
	El número és el que s’ha assignat a les finques de l’explotació en la Reg0ió 2 
• Cultiu: 
	Nom del cultiu (nom comú i varietat) afectat pel tractament.
• Nom de la plaga o malaltia a controlar: 
	Justificarem el tractament indicant el nom de la plaga/malaltia. 
	S’ha de tenir en compte que en agricultura ecològica no està permès l’ús d’herbicides.
• Superfície tractada (ha): 
	Superfície tractada de la parcel·la en hectàrees.
• Número ordre aplicador: 
	Posarem el número amb que s’ha identificat a la persona que fa el tractament 
	(Número ordre dels tres quadres del personal que realitza els tractaments, apartat 1 del quadern).
• Número ordre màquina: 
	Posarem el número amb que s’ha identificat cada màquina de tractaments emprada a l’explotació 
	(apartat 1 del quadern), ja sigui pròpia o llogada.
• Kg. o litres de brou emprats: 
	Anotarem els Kg o litres de brou per hectàrea de producte utilitzats per cada tractament.
• Nom comercial i matèria activa: 
	Anotarem el nom comercial del producte 
	amb el percentatges de cada matèria activa que compon el producte. 
	En el cas d’un altre mitja de lluita indicar el mètode 
	(captura massiva, confusió sexual, cartonatge, depredador, etc).
• Número de registre: 
	S’ha d’anotar el número de registre al Registre oficial de productes fitosanitaris. 
	Aquest número es pot trobar a l’etiqueta del producte i a la pàgina web 
	http://www.magrama.gob.es/es/agricultura/temas/sanidad-vegetal/productos-fitosanitarios/registro/menu.asp
• Dosi: 
	Indicarem la dosi aplicada per cada producte i tractament. 
	Sempre hem d’indicar la dosi utilitzada (ml/hl, l/ha, kg/ha, g/ha, %, difusors/ha,etc).
• Valoració eficàcia: 
	Realitzarem una valoració del tractament sobre l’eficàcia del control de la plaga o malaltia, 
	d’acord al següent barem: 
	0 =nul·la, 1 = dolenta, 2 = regular, 3 = bona
*/

// 4. Registre de tractaments fitosanitaris i altres mètodes de lluita
export class Reg04 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg04';
		this.obj = {
			fecha: null,
			finca: null, //num orden
			cultiu: null,
			plaga: null,
			superf: null,
			payes: null,  //num orden
			apero: null, // num orden
			quant: null, // Kg o litros / Ha
			prod:{
				nombre: null,
				regist: null,
				dosis: null
			},
			eficac: null // 0 = nul·la, 1 = dolenta, 2 = regular, 3 = bona.
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg04';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg04');
		nodoML.obj.clase = 'Reg04'
		nodoML.obj.retol =  {ES : 'Reg04',CAT :'Reg04'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 5
// 5. Registre d’altres tractaments fitosanitaris
// 5A- Registre d'ús de llavor tractada
export class Reg05A extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg05A';
		this.obj = {
			fecha: null,
			finca: null, //num orden
			cultiu: null,
			superf: null,
			quant: null, // de llavor
			prod:{
				nombre: null,
				regist: null,
			},
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg05A';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg05A');
		nodoML.obj.clase = 'Reg05A'
		nodoML.obj.retol =  {ES : 'Reg05A',CAT :'Reg05A'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

// 5B- tractaments postcollita / en locals d'emmagatzematge / en els mitjans de transport
export class Reg05B extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg05B';
		this.obj = {
			fecha: null,
			tipo: null, //Producte|Local/Vehicle
			cultiu: {espec:null,varied:null},
			local:{tipo:null,direcc:null},
			vehic:{tipo:null,model:null,matric:null},
			probl: null,
			quant: null, //Quantitat (Tm) o volum (m 3 ) tractat
			prod:{
				nombre: null,
				regist: null,
				quant:null 
			},
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg05B';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg05B');
		nodoML.obj.clase = 'Reg05B'
		nodoML.obj.retol =  {ES : 'Reg05B',CAT :'Reg05B'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 6
/*
• Data del mostreig: 
	Indicaren la data de la recollida de la mostra.
• Cultiu o collita mostrejada: 
	Indicarem el nom comú i varietat del cultiu o collita mostrejada.
• Substàncies actives detectades i quantificació: 
	si el resultat és positiu indicarem els plaguicides detectats i la quantitat, 
	si és negatiu indicarem “no detectades”. 
	En cas de resultats positius, s’haurà d’informar al CCPAE.
• Referència del butlletí d’anàlisi i laboratori que l’ha realitzat: 
	indicarem la referència assignada pel laboratori a la mostra i el nom del laboratori.
*/

// 6. Registre d’anàlisi de residus de productes fitosanitaris
export class Reg06 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg06';
		this.obj = {
			fecha: null,
			cultiu: null,
			sustAct: null,
			quant: null, //Quantitat ppm
			refer:{
				boletin: null,
				laborat: null,
			},
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg06';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg06');
		nodoML.obj.clase = 'Reg06'
		nodoML.obj.retol =  {ES : 'Reg06',CAT :'Reg06'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 7
/*
• Data: 
	Indicarem la data (dia/mes/any) de la compra o entrada del producte.
• Producte: 
	anotarem el nom o la marca comercial del producte. 
	Si es tracta de fem també indicarem el tipus de bestiar (per exemple “fem d’ovella”), 
	el sistema de cria (extensiva, no intensiva, intensiva) i 
	la marca oficial de l’explotació. 
	Si es tracta de llavor o planter també indicarem la varietat.
• Qualificació: 
	quan es tracti de llavors, planter d’hortalisses i fem 
	hem de comprovar la qualificació mitjançant 
	l’albarà de compra, i/o l’etiqueta del producte i 
	marcar la casella corresponent:
		ECO: llavor o planter de cultiu ecològic, fem de ramaderia ecològica;
		CVL: llavor, planter o fem convencional
		AUT: llavor convencional no tractada amb autorització del CCPAE.
• Quantitat: 
	anotarem els quilos, litres o unitats de producte.
• Proveïdor: 
	anotarem el nom del proveïdor i, 
	si es un operador ecològic certificat, el seu número d’operador.
• Núm. albarà: 
	anotarem el número d’albarà de la compra.
*/

// 7. Registre de compra de matèries primeres
export class Reg07 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg07';
		this.obj = {
			fecha: null,
			produc: null,  // abono, planters, etc
			qualif: {eco:false,cvl:false,aut:false}, //ECO: ecològic; CVL: convenc.; AUT: autorització CCPAE.
			quantt: null, //Quantitat: Kgs, litros, unids
			provee: {nom:null,numOp:null},
			albara: null,
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg07';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg07');
		nodoML.obj.clase = 'Reg07'
		nodoML.obj.retol =  {ES : 'Reg07',CAT :'Reg07'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 8
/*
• Albarà: 
	Indicarem la data i el número de l’albarà de cada venda.
• Producte: 
	Anotarem el producte (cultiu i varietat) que s’ha venut.
• Quantitat: 
	anotarem els quilos o unitats del producte venut.
• Dades traçabilitat: 
	indicarem el número de lot o la dada que ens permet la traçabilitat o seguiment del producte.
• Qualificació: 
	marcarem la casella corresponent a la qualificació del producte venut:
		ECO: agricultura ecològica;
		CON: en conversió a l’agricultura ecològica;
		CVL: producte venut com a convencional.
• Nom i adreça del client o receptor: 
	anotarem el nom i adreça del client o receptor del producte. 
	Si només s’indica el nom del client o receptor, caldrà adjuntar al quadern, 
	un registre de clients amb el nom i l’adreça.
*/

// 8. Registre de venda de productes
export class Reg08 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg08';
		this.obj = {
			albara: {fecha:null,num:null},
			produc: null,  // cultiu i varietat
			quantt: null, //Quantitat: Kgs, litros, unids
			trazab: null, // lote, etc
			qualif: {eco:false,con:null,cvl:false}, //ECO: ecològic; CON: conversion; CVL: convenc.;
			client: {nom:null,direcc:null},
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg08';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg08');
		nodoML.obj.clase = 'Reg08'
		nodoML.obj.retol =  {ES : 'Reg08',CAT :'Reg08'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 9
/*
• Campanya: 
	Anotarem la campanya de la recol·lecció.
• Producte recol·lectat (cultiu i varietat): 
	Indicarem el cultiu i varietat del producte recol·lectat. 
	També indicaren els subproductes del cultiu (per exemple la palla del blat) 
	si es recol·lecten per a la venda o el autoconsum.
• Data de recol·lecció: 
	Indicarem la data d’inici i la data final de recol·lecció.
• Parcel·les recol·lectades: 
	Anotarem el número de la parcel·la o parcel·les agrícoles recol·lectades.
• Superfície recol·lectada total (ha): 
	Sumarem i indicarem la superfície total recol·lectada en hectàrees.
• Quilos: 
	Sumarem i indicarem els quilos de producte recol·lectat destinats a 
		venda
		autoconsum (consum dins l’explotació, p. ex farratge pel bestiar o gra per llavor). 
		total de quilos (venda + autoconsum).
• Rendiment kg/ha: 
	Dividirem el total de quilos per la superfície i 
	indicarem el rendiment en kg/ha del producte recol·lectat.
*/
// 9. Registre de totals recol·lectats i càlcul de rendiments
export class Reg09 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg09';
		this.obj = {
			jarAgr: {jarI:null,jarF:null},  // Campaña, año agricola
			produc: null, // especie + variedad (Ej: Tomate PERA)
			fechas: {fechaI:null,fechaF:null},
			fincas: null, // codigos de finca p. ej: [1,2,5]
			superf: null, // Has totales por producto
			quilos: {venta:null,self:null,total:null}, // Kgs
			redmto: null // rendimiento en Kgs/Ha
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg09';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg09');
		nodoML.obj.clase = 'Reg09'
		nodoML.obj.retol =  {ES : 'Reg09',CAT :'Reg09'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}


//------------------------------------------------------------------- Registro 10
/*
Situaciones:
L’explotació o una part de la mateixa es troba confrontant a una via o àrea pública urbana ?
	[Fincas]
Hi ha pous o masses d’aigua per consum humà en l’explotació?
	[Fincas]
Hi ha pous o masses d’aigua per consum humà en una zona propera a l’explotació?
	[Fincas,distancia]
Hi ha parcel·les que totalment o parcialment es troben en zones específiques?
	[Fincas]
*/
// 10. Altres dades i incidències
export class Reg10A extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg10A';
		this.obj = {
			situac: null, 
			fincas: null, // codigos de finca p. ej: [1,2,5]
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg10A';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg10A');
		nodoML.obj.clase = 'Reg10A'
		nodoML.obj.retol =  {ES : 'Reg10A',CAT :'Reg10A'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

export class Reg10B extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg10B';
		this.obj = {
			fecha: null,
			texto: null
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg10B';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg10B');
		nodoML.obj.clase = 'Reg10B'
		nodoML.obj.retol =  {ES : 'Reg10B',CAT :'Reg10B'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

//------------------------------------------------------------------- Registro 11
// 11. Registre de reclamacions de clients
export class Reg11 extends topol.rNodo {
	constructor(tag){
		super(tag);
		this.iam = 'Reg11';
		this.obj = {
			orden: null, // num orden : 1,2,3,4 ....
			f_Ini: null,
			motiu: null,
			quien: null,
			soluc: null,
			f_Fin: null
		}
	}
	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.iam = 'Reg11';
		this.obj = objDB.obj;
	}

	vale(conds){
		conds.valid.tag.ok =  utils.inputOK('TAG',this.tag);
		return conds;
	}

	getNodoML(){
		var nodoML = new rNodoClase('Reg11');
		nodoML.obj.clase = 'Reg11'
		nodoML.obj.retol =  {ES : 'Reg11',CAT :'Reg11'};
		nodoML.obj.valid = {
			ES : {
				tag:'Err:Obligatorio. Deben ser letras a-z',
			},
			CAT : {
				tag:'Err:Obligatori. Deuen ser lletras a-z',
			}
		};
		return nodoML;
	}
}

function addClasesQuadern(){
	var clase = new Reg00('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01A('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01B('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01C('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01D('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01E('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg02('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg03('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg04('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg05A('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg05B('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg06('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg07('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg08('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg09('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg10A('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg10B('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg11('x');
	var nodoML = clase.getNodoML();
	utils.vgk.clasesML.addTextosEdit(nodoML);

}

//------------------------------------------------------------------- Explotacion CCPAE
function mkExpltCCPAE(){
	var raiz = new ItemCCPAE('Datos '+utils.vgk.user.org);
	var CCPAE = new agro.CCPAE('CCPAE_'+utils.vgk.user.org,[raiz]);

	var portada = new topol.rNodo('Portada'); CCPAE.addNodoHijo(raiz,portada);
	var prop = new Reg00('Propiet');CCPAE.addNodoHijo(portada,prop);
	var tecn = new Reg00('Tecnico');CCPAE.addNodoHijo(portada,tecn);

	var personal = new topol.rNodo('Personal');CCPAE.addNodoHijo(raiz,personal);
	var pers1 = new Reg01A('Pers 1');CCPAE.addNodoHijo(personal,pers1);
	var pers2 = new Reg01A('Pers 1');CCPAE.addNodoHijo(personal,pers2);
	var pers3 = new Reg01A('Pers 1');CCPAE.addNodoHijo(personal,pers3);

	var contrat = new topol.rNodo('Contratados');CCPAE.addNodoHijo(raiz,contrat);
	var contr1 = new Reg01B('Contr 1');CCPAE.addNodoHijo(contrat,contr1);
	var contr2 = new Reg01B('Contr 2');CCPAE.addNodoHijo(contrat,contr2);
	var contr3 = new Reg01B('Contr 3');CCPAE.addNodoHijo(contrat,contr3);

	var empresas = new topol.rNodo('Empresas');CCPAE.addNodoHijo(raiz,empresas);
	var empr1 = new Reg01C('Empr 1');CCPAE.addNodoHijo(empresas,empr1);
	var empr2 = new Reg01C('Empr 2');CCPAE.addNodoHijo(empresas,empr2);
	var empr3 = new Reg01C('Empr 3');CCPAE.addNodoHijo(empresas,empr3);

	var maquinas = new topol.rNodo('Maquinas');CCPAE.addNodoHijo(raiz,maquinas);
	var maqn1 = new Reg01D('Máqn 1');CCPAE.addNodoHijo(maquinas,maqn1);
	var maqn2 = new Reg01D('Máqn 2');CCPAE.addNodoHijo(maquinas,maqn2);
	var maqn3 = new Reg01D('Máqn 3');CCPAE.addNodoHijo(maquinas,maqn3);

	var mlloguer = new topol.rNodo('Maq. lloguer');CCPAE.addNodoHijo(raiz,mlloguer);
	var llog1 = new Reg01E('Lloguer 1');CCPAE.addNodoHijo(mlloguer,llog1);
	var llog2 = new Reg01E('Lloguer 2');CCPAE.addNodoHijo(mlloguer,llog2);
	var llog3 = new Reg01E('Lloguer 3');CCPAE.addNodoHijo(mlloguer,llog3);

	return CCPAE;
}
//------------------------------------------------------------------- Quadern Original
function mkQuadern0(){

	var raiz = new Campanya('Campanya 0');
	var quadern0 = new Quadern('Quadern Original',[raiz]);
	console.log(raiz.tag);

// Portada
	var portada = new topol.rNodo('0: Portada');
	quadern0.addNodoHijo(raiz,portada);
	quadern0.ixRegIam['Reg00'] = portada.id0;
	console.log(portada.tag);

	var titular = new Reg00('Titular');
	quadern0.addNodoHijo(portada,titular);
	console.log(utils.o2s(titular));

	var assesor = new Reg00('Assesor');
	quadern0.addNodoHijo(portada,assesor);
	console.log(utils.o2s(assesor));

// 1. Relació de personal i maquinària de tractaments.

	var pers_maq = new topol.rNodo('1: Personal i maquinària');
	quadern0.addNodoHijo(raiz,pers_maq);
	console.log(utils.o2s(pers_maq));


	var plant = new topol.rNodo('1A: Personal plantilla');
	quadern0.addNodoHijo(pers_maq,plant);
	quadern0.ixRegIam['Reg01A'] = plant.id0;

	for (var i=1;i<5;i++){
		var nodo = new Reg01A('R1A-'+i); nodo.obj.orden = 'A-'+i;
		quadern0.addNodoHijo(plant,nodo);
	}
	console.log(utils.o2s(plant));

	var contr = new topol.rNodo('1B: Personal contractat');
	quadern0.addNodoHijo(pers_maq,contr);
	quadern0.ixRegIam['Reg01B'] = contr.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg01B('R1B-'+i); nodo.obj.orden = 'B-'+i;
		quadern0.addNodoHijo(contr,nodo);
	}
	console.log(utils.o2s(contr));

	var empr = new topol.rNodo('1C: Empresas serveis');
	quadern0.addNodoHijo(pers_maq,empr);
	quadern0.ixRegIam['Reg01C'] = empr.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg01C('R1C-'+i); nodo.obj.orden = 'C-'+i;
		quadern0.addNodoHijo(empr,nodo);
	}
	console.log(utils.o2s(empr));

	var maqProp = new topol.rNodo('1D: Maquinaria propia');
	quadern0.addNodoHijo(pers_maq,maqProp);
	quadern0.ixRegIam['Reg01D'] = maqProp.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg01D('R1D-'+i); nodo.obj.orden = 'D-'+i;
		quadern0.addNodoHijo(maqProp,nodo);
	}
	console.log(utils.o2s(maqProp));

	var maqLlog = new topol.rNodo('1E: Maquinaria llogada');
	quadern0.addNodoHijo(pers_maq,maqLlog);
	quadern0.ixRegIam['Reg01E'] = maqLlog.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg01E('R1E-'+i); nodo.obj.orden = 'E-'+i;
		quadern0.addNodoHijo(maqLlog,nodo);
	}
	console.log(utils.o2s(maqLlog));

// 2. Identificació de les parcel·les de cultiu ecològic.
	var parcelas = new topol.rNodo('2: Parcelas ecologicas');
	quadern0.addNodoHijo(raiz,parcelas);
	quadern0.ixRegIam['Reg02'] = parcelas.id0;
	
	// Pendiente de poner loop a los bancales
	var nodo1 = new Reg02('La Rectoria');nodo1.orden = 'LR';
	quadern0.addNodoHijo(parcelas,nodo1);
	var nodo2 = new Reg02('Cal Penjarella');nodo2.orden = 'CP';
	quadern0.addNodoHijo(parcelas,nodo2);

	console.log(utils.o2s(parcelas));

// 3. Registres de treballs i adobats
	var tascas = new topol.rNodo('3: Treballs i adobats');
	quadern0.addNodoHijo(raiz,tascas);
	quadern0.ixRegIam['Reg03'] = tascas.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg03('R3-'+i);
		quadern0.addNodoHijo(tascas,nodo);
	}
	console.log(utils.o2s(tascas));

// 4. Registre de tractaments fitosanitaris i altres mètodes de lluita
	var tratFS = new topol.rNodo('4: Tractaments fitosanitaris');
	quadern0.addNodoHijo(raiz,tratFS);
	quadern0.ixRegIam['Reg04'] = tratFS.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg04('R4-'+i);
		quadern0.addNodoHijo(tratFS,nodo);
	}
	console.log(utils.o2s(tratFS));

// 5. Registre d’altres tractaments fitosanitaris
	var otrosTFS = new topol.rNodo('5: Altres tractaments fitosanitaris');
	quadern0.addNodoHijo(raiz,otrosTFS);
	console.log(utils.o2s(otrosTFS));

// 5A- Registre d'ús de llavor tractada
	var tfsLlavor = new topol.rNodo('5A: Llavor tractada');
	quadern0.addNodoHijo(otrosTFS,tfsLlavor);
	quadern0.ixRegIam['Reg05A'] = tfsLlavor.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg05A('R5A-'+i);
		quadern0.addNodoHijo(tfsLlavor,nodo);
	}
	console.log(utils.o2s(tfsLlavor));

// 5B- tractaments postcollita / en locals d'emmagatzematge / en els mitjans de transport
	var tfsPost = new topol.rNodo('5B: Postcollita, locals i transport');
	quadern0.addNodoHijo(otrosTFS,tfsPost);
	quadern0.ixRegIam['Reg05B'] = tfsPost.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg05B('R5B-'+i);
		quadern0.addNodoHijo(tfsPost,nodo);
	}
	console.log(utils.o2s(tfsPost));

// 6. Registre d’anàlisi de residus de productes fitosanitaris
	var resid = new topol.rNodo('6: Anàlisi de residus');
	quadern0.addNodoHijo(raiz,resid);
	quadern0.ixRegIam['Reg06'] = resid.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg06('R6-'+i);
		quadern0.addNodoHijo(resid,nodo);
	}
	console.log(utils.o2s(resid));

// 7. Registre de compra de matèries primeres
	var compra = new topol.rNodo('7: Compra de matèries primeres');
	quadern0.addNodoHijo(raiz,compra);
	quadern0.ixRegIam['Reg07'] = compra.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg07('R7-'+i);
		quadern0.addNodoHijo(compra,nodo);
	}
	console.log(utils.o2s(compra));

// 8. Registre de venda de productes
	var venta = new topol.rNodo('8: Venda de productes');
	quadern0.addNodoHijo(raiz,venta);
	quadern0.ixRegIam['Reg08'] = venta.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg08('R8-'+i);
		quadern0.addNodoHijo(venta,nodo);
	}
	console.log(utils.o2s(venta));

// 9. Registre de totals recol·lectats i càlcul de rendiments
	var total = new topol.rNodo('9: Totals i rendiments');
	quadern0.addNodoHijo(raiz,total);
	quadern0.ixRegIam['Reg09'] = total.id0;
	for (var i=1;i<5;i++){
		var nodo = new Reg09('R9-'+i);
		quadern0.addNodoHijo(total,nodo);
	}
	console.log(utils.o2s(total));

// 10. Altres dades i incidències
	var otrosDatos = new topol.rNodo('10: Altres dades i incidències');
	quadern0.addNodoHijo(raiz,otrosDatos);
	console.log(utils.o2s(otrosDatos));

	var ambient = new topol.rNodo('10A: Dades ambientals');
	quadern0.addNodoHijo(otrosDatos,ambient);

	var publ = new Reg10A('Area publica');
	publ.obj.situac = 'L’explotació o una part de la mateixa es troba confrontant a una via o àrea pública urbana';
	quadern0.addNodoHijo(ambient,publ);

	var pozoIN = new Reg10A('Pozos dentro');
	pozoIN.obj.situac = 'Hi ha pous o masses d’aigua per consum humà en l’explotació';
	quadern0.addNodoHijo(ambient,pozoIN);

	var pozoOUT = new Reg10A('Pozos cerca');
	pozoOUT.obj.situac = 'Hi ha pous o masses d’aigua per consum humà en una zona propera a l’explotació';
	quadern0.addNodoHijo(ambient,pozoOUT);

	var zonaEsp = new Reg10A('Zonas espec');
	zonaEsp.obj.situac = 'Hi ha parcel·les que totalment o parcialment es troben en zones específiques';
	quadern0.addNodoHijo(ambient,zonaEsp);

	console.log(utils.o2s(ambient));

	var incid = new topol.rNodo('10B: Incidències');
	quadern0.addNodoHijo(otrosDatos,incid);
	for (var i=1;i<5;i++){
		var nodo = new Reg10B('R10B-'+i);
		quadern0.addNodoHijo(incid,nodo);
	}
	console.log(utils.o2s(incid));

// 11. Registre de reclamacions de clients
	var recl = new topol.rNodo('11: Reclamacions de clients');
	quadern0.addNodoHijo(raiz,recl);
	for (var i=1;i<5;i++){
		var nodo = new Reg11('R11-'+i);
		quadern0.addNodoHijo(recl,nodo);
	}
	console.log(utils.o2s(recl));
	return quadern0;
}

export default {mkQuadern0, Quadern,addClasesQuadern}