const preloadedState = { producto: {}, productos: [] };

const middlewares = Redux.applyMiddleware(
    logger_middleware,
    agregar_o_modificar_producto_middleware,
    generador_codigo_producto_builder(0),
    );

const store = Redux.createStore(reducer, preloadedState, middlewares);

store.subscribe(dispatch_on_change(store.getState, (state) => {
    ui.render_form(state.producto);
    ui.render_table(state.productos);
}));

ui.onFormSubmit = (producto) => store.dispatch(agregar_o_modificar_producto(producto));
ui.on_eliminar_click = (index) => store.dispatch(producto_eliminado(index));
ui.on_editar_click = (index) => store.dispatch(producto_seleccionado(index));

function dispatch_on_change(getState, dispatch){
    let latest_state;
    return function(){
        let current_state = getState();
        if (latest_state != current_state) {
            latest_state = current_state;
            dispatch(current_state);
        }
    }
}