// Others
let index = 0;

const reducer = (state, action) => {
    if (action.type == 'producto-agregado') {
        index++;
        let producto = action.payload;
        let total = producto.cantidad * producto.precio;
        return {
            ...state,
            productos: [...state.productos, {
                ...producto,
                index,
                total
            }]
        };
    }

    if (action.type == 'producto-modificado') {
        const producto = action.payload;
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const total = producto.precio * producto.cantidad;
        const old = productos.find((item) => item.codigo == codigo);
        const indice = productos.indexOf(old);
        productos[indice] = { ...producto, total };
        return {
            ...state,
            productos
        }
    }

    if (action.type == 'producto-eliminado') {
        const codigo = action.payload.index;
        const productos = state.productos.filter((item) => item.index != codigo);
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

const producto_seleccionado = (index) => ({
    type: 'producto-seleccionado',
    payload: { index }
});

const producto_eliminado = (index) => ({
    type: 'producto-eliminado',
    payload: { index }
});

const producto_modificado = (data) => ({
    type: 'producto-modificado',
    payload: {
        index: data.index,
        nombre: data.nombre,
        cantidad: data.cantidad,
        precio: data.precio,
        categoria: data.categoria
    }
});

const producto_agregado = (data) => ({
    type: 'producto-agregado',
    payload: {
        nombre: data.nombre,
        cantidad: data.cantidad,
        precio: data.precio,
        categoria: data.categoria
    }
});

const producto_store = {
    reducer,
    producto_seleccionado,
    producto_eliminado,
    producto_modificado,
    producto_agregado,
}