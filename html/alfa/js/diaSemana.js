function cala_weekday( x_nMonth, x_nDay, x_nYear) {

 if(x_nMonth >= 3){ 
 x_nMonth -= 2;
 }
 else {
 x_nMonth += 10;
 }

 if( (x_nMonth == 11) || (x_nMonth == 12) ){
 x_nYear--;
 }

 var nCentNum = parseInt(x_nYear / 100);
 var nDYearNum = x_nYear % 100;

 var g = parseInt(2.6 * x_nMonth - .2);

 g +=  parseInt(x_nDay + nDYearNum);
 g += nDYearNum / 4; 
 g = parseInt(g);
 g += parseInt(nCentNum / 4);
 g -= parseInt(2 * nCentNum);
 g %= 7;
 
 if(x_nYear >= 1700 && x_nYear <= 1751) {
 g -= 3;
 }
 else {
 if(x_nYear <= 1699) {
 g -= 4;
 }
 }
 
 if(g < 0){
 g += 7;
 }
 
 return g;
}