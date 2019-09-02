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
		console.log(iam+' : '+regNum);
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
//							console.log(nodo2.tag.split(': ')[0]+' ? '+(regNum+letra))
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

	fusionaNodo(nodo){
		console.log('Nodo: '+ o2s(nodo));
		var padre = this.getPadreByIam(nodo.iam);
		console.log('Fusiona '+nodo.tag+' en '+padre.tag);
		this.addNodoHijo(padre,nodo);
	}
}

//------------------------------------------------------------------- Campanya (Nodo Raiz)
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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

	vale(conds){
		conds.valid.tag.ok =  inputOK('TAG',this.tag);
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
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01A('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01B('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01C('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01D('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg01E('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg02('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg03('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg04('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg05A('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg05B('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg06('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg07('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg08('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg09('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg10A('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg10B('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

	var clase = new Reg11('x');
	var nodoML = clase.getNodoML();
	vgk.clasesML.addTextosEdit(nodoML);

}


//------------------------------------------------------------------- Quadern Original
function mkQuadern0(){

	var raiz = new Campanya('Campanya 0');
	var quadern0 = new Quadern('Quadern Original',[raiz]);
	console.log(raiz.tag);

// Portada
	var portada = new rNodo('0: Portada');
	quadern0.addNodoHijo(raiz,portada);
	console.log(portada.tag);

	var titular = new Reg00('Titular');
	quadern0.addNodoHijo(portada,titular);
	console.log(o2s(titular));

	var assesor = new Reg00('Assesor');
	quadern0.addNodoHijo(portada,assesor);
	console.log(o2s(assesor));

// 1. Relació de personal i maquinària de tractaments.

	var pers_maq = new rNodo('1: Personal i maquinària');
	quadern0.addNodoHijo(raiz,pers_maq);
	console.log(o2s(pers_maq));


	var plant = new rNodo('1A: Personal plantilla');
	quadern0.addNodoHijo(pers_maq,plant);
	for (var i=1;i<5;i++){
		var nodo = new Reg01A('R1A-'+i); nodo.obj.orden = 'A-'+i;
//		quadern0.addNodoHijo(plant,nodo);
	}
	console.log(o2s(plant));

	var contr = new rNodo('1B: Personal contractat');
	quadern0.addNodoHijo(pers_maq,contr);
	for (var i=1;i<5;i++){
		var nodo = new Reg01B('R1B-'+i); nodo.obj.orden = 'B-'+i;
//		quadern0.addNodoHijo(contr,nodo);
	}
	console.log(o2s(contr));

	var empr = new rNodo('1C: Empresas serveis');
	quadern0.addNodoHijo(pers_maq,empr);
	for (var i=1;i<5;i++){
		var nodo = new Reg01C('R1C-'+i); nodo.obj.orden = 'C-'+i;
//		quadern0.addNodoHijo(empr,nodo);
	}
	console.log(o2s(empr));

	var maqProp = new rNodo('1D: Maquinaria propia');
	quadern0.addNodoHijo(pers_maq,maqProp);
	for (var i=1;i<5;i++){
		var nodo = new Reg01D('R1D-'+i); nodo.obj.orden = 'D-'+i;
//		quadern0.addNodoHijo(maqProp,nodo);
	}
	console.log(o2s(maqProp));

	var maqLlog = new rNodo('1E: Maquinaria llogada');
	quadern0.addNodoHijo(pers_maq,maqLlog);
	for (var i=1;i<5;i++){
		var nodo = new Reg01E('R1E-'+i); nodo.obj.orden = 'E-'+i;
//		quadern0.addNodoHijo(maqLlog,nodo);
	}
	console.log(o2s(maqLlog));

// 2. Identificació de les parcel·les de cultiu ecològic.
	var parcelas = new rNodo('2: Parcelas ecologicas');
	quadern0.addNodoHijo(raiz,parcelas);
	
	// Pendiente de poner loop a los bancales
	var nodo1 = new Reg02('La Rectoria');
	quadern0.addNodoHijo(parcelas,nodo1);
	var nodo2 = new Reg02('Cal Penjarella');
	quadern0.addNodoHijo(parcelas,nodo2);

	console.log(o2s(parcelas));

// 3. Registres de treballs i adobats
	var tascas = new rNodo('3: Treballs i adobats');
	quadern0.addNodoHijo(raiz,tascas);
	for (var i=1;i<5;i++){
		var nodo = new Reg03('R3-'+i);
		quadern0.addNodoHijo(tascas,nodo);
	}
	console.log(o2s(tascas));

// 4. Registre de tractaments fitosanitaris i altres mètodes de lluita
	var tratFS = new rNodo('4: Tractaments fitosanitaris');
	quadern0.addNodoHijo(raiz,tratFS);
	for (var i=1;i<5;i++){
		var nodo = new Reg04('R4-'+i);
		quadern0.addNodoHijo(tratFS,nodo);
	}
	console.log(o2s(tratFS));

// 5. Registre d’altres tractaments fitosanitaris
	var otrosTFS = new rNodo('5: Altres tractaments fitosanitaris');
	quadern0.addNodoHijo(raiz,otrosTFS);
	console.log(o2s(otrosTFS));

// 5A- Registre d'ús de llavor tractada
	var tfsLlavor = new rNodo('5A: Llavor tractada');
	quadern0.addNodoHijo(otrosTFS,tfsLlavor);
	for (var i=1;i<5;i++){
		var nodo = new Reg05A('R5A-'+i);
		quadern0.addNodoHijo(tfsLlavor,nodo);
	}
	console.log(o2s(tfsLlavor));

// 5B- tractaments postcollita / en locals d'emmagatzematge / en els mitjans de transport
	var tfsPost = new rNodo('5B: Postcollita, locals i transport');
	quadern0.addNodoHijo(otrosTFS,tfsPost);
	for (var i=1;i<5;i++){
		var nodo = new Reg05B('R5B-'+i);
		quadern0.addNodoHijo(tfsPost,nodo);
	}
	console.log(o2s(tfsPost));

// 6. Registre d’anàlisi de residus de productes fitosanitaris
	var resid = new rNodo('6: Anàlisi de residus');
	quadern0.addNodoHijo(raiz,resid);
	for (var i=1;i<5;i++){
		var nodo = new Reg06('R6-'+i);
		quadern0.addNodoHijo(resid,nodo);
	}
	console.log(o2s(resid));

// 7. Registre de compra de matèries primeres
	var compra = new rNodo('7: Compra de matèries primeres');
	quadern0.addNodoHijo(raiz,compra);
	for (var i=1;i<5;i++){
		var nodo = new Reg07('R7-'+i);
		quadern0.addNodoHijo(compra,nodo);
	}
	console.log(o2s(compra));

// 8. Registre de venda de productes
	var venta = new rNodo('8: Venda de productes');
	quadern0.addNodoHijo(raiz,venta);
	for (var i=1;i<5;i++){
		var nodo = new Reg08('R8-'+i);
		quadern0.addNodoHijo(venta,nodo);
	}
	console.log(o2s(venta));

// 9. Registre de totals recol·lectats i càlcul de rendiments
	var total = new rNodo('9: Totals i rendiments');
	quadern0.addNodoHijo(raiz,total);
	for (var i=1;i<5;i++){
		var nodo = new Reg09('R9-'+i);
		quadern0.addNodoHijo(total,nodo);
	}
	console.log(o2s(total));

// 10. Altres dades i incidències
	var otrosDatos = new rNodo('10: Altres dades i incidències');
	quadern0.addNodoHijo(raiz,otrosDatos);
	console.log(o2s(otrosDatos));

	var ambient = new rNodo('10A: Dades ambientals');
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

	console.log(o2s(ambient));

	var incid = new rNodo('10B: Incidències');
	quadern0.addNodoHijo(otrosDatos,incid);
	for (var i=1;i<5;i++){
		var nodo = new Reg10B('R10B-'+i);
		quadern0.addNodoHijo(incid,nodo);
	}
	console.log(o2s(incid));

// 11. Registre de reclamacions de clients
	var recl = new rNodo('11: Reclamacions de clients');
	quadern0.addNodoHijo(raiz,recl);
	for (var i=1;i<5;i++){
		var nodo = new Reg11('R11-'+i);
		quadern0.addNodoHijo(recl,nodo);
	}
	console.log(o2s(recl));
	return quadern0;
}