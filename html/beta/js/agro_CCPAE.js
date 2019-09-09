//agro_CCPAE.js .- Clases para modelizar el Quadern d'explotació


/*
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

// Quadern
class Quadern extends rArbol {
	constructor(tag,nodos){
		super(tag,nodos);
		this.meta.iam = 'Quadern';
	}

	objDB2Clase(objDB){
		super.objDB2Clase(objDB);
		this.meta.iam = 'Quadern';
	}

	getPadreByIam(iam){
		var padre = null;
		var regNum = parseInt(iam.substr(3,2));
		var raspa = this.getRaspa();
		raspa.map(function(nodo1){
			if (regNum == parseInt(nodo1.tag.split(': ')[0])){
				switch(regNum){
					case 1:
					case 5:
					case 10:
					console.log('regNum: '+regNum);
						var letra = iam.substr(-1);
						var idsHijos = nodo1.hijos;
						idsHijos.map(function(idH){
							var nodo2 = this.getNodoById(idH);
							console.log(nodo2.tag.split(': ')[0]+' ? '+(regNum+letra))
							if (nodo2.tag.split(': ')[0] == (regNum+letra)) padre = nodo2
						}.bind(this))
						break;
					default:
						padre = nodo1;
				}
			}
		}.bind(this))
		return padre;
	}
}

// Campanya (Nodo Raiz)
class Campanya extends rNodo {
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
}

// Portada
class Reg00 extends rNodo {
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
}

//------------------------------------------------------------------- Registro 1
// 1. Relació de personal i maquinària de tractaments.
// Plantilla
class Reg01A extends rNodo {
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
}

// Contratados
class Reg01B extends rNodo {
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
}
// Empresas
class Reg01C extends rNodo {
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
}

// Maquinaria tratamientos propia
class Reg01D extends rNodo {
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
}

// Maquinaria tratamientos llogada
class Reg01E extends rNodo {
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
}

//------------------------------------------------------------------- Registro 2
// 2. Identificació de les parcel·les de cultiu ecològic.
class Reg02 extends rNodo {
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
class Reg03 extends rNodo {
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
class Reg04 extends rNodo {
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
}

//------------------------------------------------------------------- Registro 5
// 5. Registre d’altres tractaments fitosanitaris
// 5A- Registre d'ús de llavor tractada
class Reg05A extends rNodo {
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
}

// 5B- tractaments postcollita / en locals d'emmagatzematge / en els mitjans de transport
class Reg05B extends rNodo {
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
class Reg06 extends rNodo {
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
class Reg07 extends rNodo {
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
class Reg08 extends rNodo {
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
class Reg09 extends rNodo {
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
class Reg10A extends rNodo {
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
}

class Reg10B extends rNodo {
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
}

//------------------------------------------------------------------- Registro 11
// 11. Registre de reclamacions de clients
class Reg11 extends rNodo {
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
}

