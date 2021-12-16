// HTML elements by tag name
const form = document.getElementsByTagName('form')[0];
const t_body = document.getElementsByTagName('tbody')[0];
const form_cantidad_total = document.getElementById('cantidad_total');
const form_precios_totales = document.getElementById('precio_total');
const form_gran_total = document.getElementById('gran_total');

// HTML elements by ID
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

// Redux
let latest_state;

// Others
let index = 0;
const preloadedState = { producto: {}, productos: [] };

const reducer = (state, action) => {
    if (action.type == 'producto-agregado') {
        index++;
        let producto = action.payload;
        let total = producto.cantidad * producto.precio;
        return {
            ...state,
            productos: [ ...state.productos, {
                    ...producto,
                    index,
                    total } ]
        };
    }
    
    if (action.type == 'producto-modificado') {
        const producto = action.payload;
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const total = producto.precio * producto.cantidad;
        const old = productos.find( (item) => item.codigo == codigo);
        const indice = productos.indexOf(old);
        productos[indice] = {  ...producto, total };
        return {
            ...state,
            productos
        }
    }

    if (action.type == 'producto-eliminado') {
        const codigo = action.payload.index;
        const productos = state.productos.filter( (item) => item.index != codigo );
        return {
            ...state,
            productos
        }
    }

    if (action.type == 'producto-seleccionado') {
        const codigo = action.payload.index;
        return {
            ...state,
            producto: state.productos.find(x => x.index == codigo) || {}
        }
    }

    return state;
};

const store = Redux.createStore(reducer, preloadedState);

store.subscribe( () => {
    let current_state = store.getState();
    if (latest_state != current_state) {
        latest_state = current_state;
        console.log(current_state);
        render_form(current_state.producto);
        render_table(current_state.productos);
    }
});

form.addEventListener('submit', onSubmit);

/** @param {Event} event  */
function onSubmit(event){
    event.preventDefault();

    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;
    
    const codigo = parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad = parseInt(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = parseInt(frmCategoria[1]);

    if (codigo) {
        store.dispatch({
            type: 'producto-modificado',
            payload: {
                index: codigo,
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    }else{
        store.dispatch({
            type: 'producto-agregado',
            payload: {
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    }

    store.dispatch({
        type: 'producto-seleccionado',
        payload: {
            index: null
        }
    });
}

function render_form(producto){
    input_codigo.value = producto.index;
    input_nombre.value = producto.nombre || '';
    input_cantidad.value = producto.cantidad || '';
    input_precio.value = producto.precio || '';
    select_categoria.value = producto.categorias || 1;
}

/** @param {Array} productos */
function render_table(productos){
    const filas = productos.map((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.index}</td>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.total}</td>
            <td>
                <div class="btn-group">
                    <a title="Editar" href="#" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-pencil"></i>
                    </a> 
                    <a title="Eliminar" href="#" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                    </a>
                </div>
            </td>
        `;

        const [editar, eliminar] = tr.getElementsByTagName('a');

        eliminar.addEventListener('click', (event) => {
            event.preventDefault();
            store.dispatch({
                type: 'producto-eliminado',
                payload: {
                    index: item.index
                }
            });
        });

        editar.addEventListener('click', (event) => {
            event.preventDefault();
            store.dispatch({
                type: 'producto-seleccionado',
                payload: {
                    index: item.index
                }
            });
        });

        return tr;
    });


    t_body.innerHTML = '';
    filas.forEach( (item) => {
        t_body.appendChild(item);
    });

    function sum(elementos, selector){
        return elementos.map(selector).reduce( (a, b) => a + b, 0);
    }

    form_cantidad_total.innerText = sum(productos, x => x.cantidad);
    form_precios_totales.innerText = sum(productos, x => x.precio);
    form_gran_total.innerText = sum(productos, x => x.total);
}

store.dispatch({
    type: 'producto-agregado',
    payload: {
        nombre: 'Prueba a',
        precio: 15,
        cantidad: 2        
    }
});