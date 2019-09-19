import src from '/js/repositorioSrc.js'
import {vgApp,goPag}    from '/js/agro_VGlob.js'

window.vgApp = vgApp;
window.goPag = goPag;

function initRepositorio(){
	src.initAppRepo();
	src.setWeb4info('WIKI_ES');
	src.getEspeciesList('FLORA');

}

window.onload = initRepositorio;
//  lista links : http://worldplants.webarchiv.kit.edu
//http://ww2.bgbm.org/mcl/results.asp?name=Acanthus+mollis&area1=&bool1=&mclStatus1=&order=name&count=4&advanced=&family=&Submit=Query
//https://www.ncbi.nlm.nih.gov/gquery/?term=Acanthus+mollis