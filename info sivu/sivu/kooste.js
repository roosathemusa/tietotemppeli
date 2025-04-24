let peli1=number=(sessionStorage.getItem('peli1'));
let peli2=number=(sessionStorage.getItem('peli2'));
let peli3=number=(sessionStorage.getItem('peli3'));
let peli4=number=(sessionStorage.getItem('peli4'));

let pisteet=peli1+peli2+peli3+peli4;

let pointElem=document.getElementById('points');

pointElem.textContent='yhteispisteet:'+pisteet;