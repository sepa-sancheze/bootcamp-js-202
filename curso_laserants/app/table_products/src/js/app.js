import { applyMiddleware, createStore } from 'redux';
import { ui } from './ui';
import * as $store from './store';

const preloadedState = { producto: {}, productos: [] };

const middlewares = applyMiddleware(
    $store.logger_middleware,
    $store.agregar_o_modificar_producto_middleware,
    $store.generador_codigo_producto_builder(0),
    );

const store = createStore($store.reducer, preloadedState, middlewares);

store.subscribe(dispatch_on_change(store.getState, (state) => {
    ui.render_form(state.producto);
    ui.render_table(state.productos);
}));

ui.onFormSubmit = (producto) => store.dispatch($store.agregar_o_modificar_producto(producto));
ui.on_eliminar_click = (index) => store.dispatch($store.producto_eliminado(index));
ui.on_editar_click = (index) => store.dispatch($store.producto_seleccionado(index));

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