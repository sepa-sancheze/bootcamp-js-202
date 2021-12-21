import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

const container = document.getElementById('root');

const App = () => (
    <div className='app'>
        <h1>Hola React</h1>
    </div>
);

ReactDom.render(<App/>, container);