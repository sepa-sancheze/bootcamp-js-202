const form = document.getElementsByTagName('form')[0];
const t_body = document.getElementsByTagName('tbody')[0];
const form_cantidad_total = document.getElementById('cantidad_total');
const form_precios_totales = document.getElementById('precio_total');
const form_gran_total = document.getElementById('gran_total');

/** @type {HTMLInputElement} */
const input_codigo = document.getElementById('codigo');
/** @type {HTMLInputElement} */
const input_nombre = document.getElementById('nombre');
/** @type {HTMLInputElement} */
const input_cantidad = document.getElementById('cantidad');
/** @type {HTMLInputElement} */
const input_precio = document.getElementById('precio');
/** @type {HTMLSelectElement} */
const select_categoria = document.getElementById('categoria');

let index = 0;
let cantidad_total = 0;
let precios_totales = 0;
let gran_total = 0;
let currentRow;

form.addEventListener('submit', onSubmit);

/**
 * 
 * @param {Event} event 
 */
function onSubmit(event){
    event.preventDefault();

    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;
    
    let codigo = frmCodigo[1];
    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    const total = cantidad * precio;

    cantidad_total += parseFloat(cantidad);
    precios_totales += parseFloat(precio);
    gran_total += parseFloat(total);

    let tr;

    if (!codigo) {
        index++;
        codigo = index;
        tr = document.createElement('tr');
        t_body.appendChild(tr);
    }else{
        tr = currentRow;
    }

    tr.dataset.categoria = categoria;

    tr.innerHTML = `
        <td>${index}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a></td>
    `;


    form_cantidad_total.innerText = cantidad_total;
    form_precios_totales.innerText = precios_totales;
    form_gran_total.innerText = gran_total;

    form.reset();

}

/**
 * 
 * @param {Event} event 
 */
function onEdit(event){
    event.preventDefault();

    /** @type {HTMLAnchorElement} */
    const anchor = event.target;
    const tr = anchor.parentElement.parentElement;
    const celdas = tr.getElementsByTagName('td');

    const [td_codigo, td_nombre, td_cantidad, td_precio] = celdas;

    input_codigo.value = td_codigo.innerText;
    input_nombre.value = td_nombre.innerText;
    input_cantidad.value = td_cantidad.innerText;
    input_precio.value = td_precio.innerText;
    select_categoria.value = tr.dataset.categoria;

    currentRow = tr;
}

/**
 * 
 * @param {Event} event 
 */
function onDelete(event){
    event.preventDefault();

    /** @type {HTMLAnchorElement} */
    const anchor = event.target;
    const tr = anchor.parentElement.parentElement;
    t_body.removeChild(tr);
    
}