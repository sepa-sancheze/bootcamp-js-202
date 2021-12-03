const juan = {
    nombre: 'Juan',
    apellido: 'Sánchez',
    edad: 30,
    direccion: {
        departamento: 'GT',
        municipio: 'Gt'
    }
}

// const juan2 = Object.assign({}, juan, {apellido: 'Perez'});
const juan2 = {
    ...juan, 
    apellido: 'Perez', 
    telefono: '55604545',
    direccion: {
        ...juan.direccion,
        municipio: "Quetgo"
    }
};

// console.log('Juan', juan);
// console.log('Juan2', juan2);

// Arreglos inmutables
const numeros = [1, 2, 3];
const numeros2 = [...numeros, 4];

const index = numeros.indexOf(2);
const numeros3 = [
    ...numeros.slice(0, index),
    1.5,
    ...numeros.slice(index)
]

const numeros4 = numeros.filter(x => x != 2);
const numeros5 = numeros.map(x => x == 2 ? 100: x);

console.log('numeros: ', numeros);
console.log('numeros 2: ', numeros2);
console.log('numeros 3: ', numeros3);
console.log('numeros 4: ', numeros4);
console.log('numeros 5: ', numeros5);
