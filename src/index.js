import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./store/main";
import {actions} from "./store/actions";



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} actions={actions}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
