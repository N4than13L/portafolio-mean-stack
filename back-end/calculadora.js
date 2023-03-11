"use strict";

var params = process.argv.slice(2);

var numero_1 = parseFloat(params[0]);
var numero_2 = parseFloat(params[1]);

var plantilla = `
La suma es: ${numero_1 + numero_2}
La resta es: ${numero_1 - numero_2}
La multiplicacion es: ${numero_1 * numero_2}
La division es: ${numero_1 / numero_2}
`;
console.log(plantilla);

// console.log("Hola mundo con node Js")
