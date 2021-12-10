const preloadedState = { producto: {}, productos: [] };

const store = Redux.createStore(producto_store.reducer, preloadedState);

let latest_state;

store.subscribe( () => {
    let current_state = store.getState();
    if (latest_state != current_state) {
        latest_state = current_state;
        ui.render_form(current_state.producto);
        ui.render_table(current_state.productos);
    }
});

ui.onFormSubmit = (producto) => {
    if (producto.index) {
        store.dispatch(producto_store.producto_modificado(producto));
    }else{
        store.dispatch(producto_store.producto_agregado(producto));
    }

    store.dispatch(producto_store.producto_seleccionado(null));
};

ui.on_eliminar_click = (index) => store.dispatch(producto_store.producto_eliminado(index));

ui.on_editar_click = (index) => store.dispatch(producto_store.producto_seleccionado(index));