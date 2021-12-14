const ActionTypes = {
    productoAgregado : 'producto-agregado',
    productoModificado : 'producto-modificado',
    productoEliminado : 'producto-eliminado',
    productoSeleccionado : 'producto-seleccionado',
    productoAgregadoOModificado : 'producto-agregado-o-modificado'
};

const reducer = (state, action) => {

    switch (action.type) {
        case ActionTypes.productoAgregado:
            return producto_agregado_reducer(state, action);
        case ActionTypes.productoModificado:
            return producto_modificado_reducer(state, action);
        case ActionTypes.productoEliminado:
            return producto_eliminado_reducer(state, action);
        case ActionTypes.productoSeleccionado:
            return producto_seleccionado_reducer(state, action);
        default:
            return state;
    }    
};

/* FUNCTIONS */

const producto_seleccionado = (index) => ({
    type: ActionTypes.productoSeleccionado,
    payload: { index }
});

const producto_eliminado = (index) => ({
    type: ActionTypes.productoEliminado,
    payload: { index }
});

const producto_modificado = (data) => ({
    type: ActionTypes.productoModificado,
    payload: {
        index: data.index,
        nombre: data.nombre,
        cantidad: data.cantidad,
        precio: data.precio,
        categoria: data.categoria
    }
});

const producto_agregado = (data) => ({
    type: ActionTypes.productoAgregado,
    payload: {
        nombre: data.nombre,
        cantidad: data.cantidad,
        precio: data.precio,
        categoria: data.categoria
    }
});

const agregar_o_modificar_producto = (data) => ({
    type: ActionTypes.productoAgregadoOModificado,
    payload: {
        nombre: data.nombre,
        cantidad: data.cantidad,
        precio: data.precio,
        categoria: data.categoria
    }
});


/* REDUCER FUNCTIONS */

function producto_agregado_reducer(state, action) {
    let producto = action.payload;
    let total = producto.cantidad * producto.precio;
    return {
        ...state,
        productos: [...state.productos, {
            ...producto,
            total
        }]
    };
}

function producto_modificado_reducer(state, action) {
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
    };
}

function producto_seleccionado_reducer(state, action) {
    const codigo = action.payload.index;
    return {
        ...state,
        producto: state.productos.find(x => x.index == codigo) || {}
    };
}

function producto_eliminado_reducer(state, action) {
    const codigo = action.payload.index;
    const productos = state.productos.filter((item) => item.index != codigo);
    return {
        ...state,
        productos
    };
}

/* MIDDLEWARES */
function generador_codigo_producto_builder(last_id){
    let index = last_id;
    return store => next => action => {
        if (action.type != ActionTypes.productoAgregado) {
            return next(action);
        }

        index++;  

        const action_to_dispatch = {
            ...action,
            payload: {
                ...action.payload,
                index
            }
        };

        return next(action_to_dispatch);
    };
}

const logger_middleware = store => next => action => {
    console.log('dispatching', action);
    const result = next(action);
    return result;
};

const agregar_o_modificar_producto_middleware = store => next => action => {
    if (action.type != ActionTypes.productoAgregadoOModificado) {
        return next(action);
    }

    const producto = action.payload;
    let action_to_dispatch = producto.index ? producto_modificado(producto) : producto_agregado(producto);

    store.dispatch(action_to_dispatch);
    return store.dispatch(producto_seleccionado(null));
};