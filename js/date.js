const d1 = new Date();
console.log(d1);
const d2 = new Date("08/05/2021");
console.log(d2);
const mil = d1 - d2;
const days = mil/(1000*60*60*24);
console.log(days);
if(days)