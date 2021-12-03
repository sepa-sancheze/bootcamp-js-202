//<---------------------------------------------------------------->
// Función que devuelve una función
/* function saludar(prefijo){
    return function(texto){
        return prefijo + " " + texto;
    }
} */

// Forma de llamarlas
/* const hola = saludar('hola');
const adios = saludar('adios');

console.log(hola('mundo'));
console.log(adios('mundo')); */

//<---------------------------------------------------------------->
// Enviando una función como parámetro
/* function saludar(prefijo, formateador){
    return function(texto){
        return formateador(prefijo, texto);
    }
}

const formato_bienvenida = function(prefijo, texto){
    return "¡" + prefijo + " " + texto + "!";
}

const formato_despedida = function(prefijo, texto){
    return prefijo + " " + texto + "... Bye";
}
// Forma de llamarlas
const hola = saludar('hola', formato_bienvenida);
const adios = saludar('adios', formato_despedida);

console.log(hola('mundo'));
console.log(adios('mundo')); */

//<---------------------------------------------------------------->
// Arrow functions
const mensaje = (prefijo, formateador) => (texto) => formateador(prefijo, texto);

// Forma de llamarlas
const hola = mensaje('hola', (prefijo, texto) => `¡${prefijo} ${texto}!`);
// También se pueden usar como parámetros directos
const adios = mensaje('adios', (prefijo, texto) => `${prefijo} ${texto}... Bye`);

console.log(hola('mundo'));
console.log(adios('mundo'));
