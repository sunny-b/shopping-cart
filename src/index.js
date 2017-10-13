import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WrappedShoppingCart from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WrappedShoppingCart />, document.getElementById('root'));
registerServiceWorker();
