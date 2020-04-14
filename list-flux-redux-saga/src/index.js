import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './data/reducers'; //Acessa index
import ItemSaga from './data/sagas/ItemSaga';

//Store da aplicação (única)
const sagaMiddleware = createSagaMiddleware(); //Trabalhando com Redux saga
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware,sagaMiddleware)); //Importando dois middlewares 
sagaMiddleware.run(ItemSaga); //Executa Saga 'ItemSaga'

//Tem acesso a store
ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('root'));


serviceWorker.unregister();


//Explicação
//Redux Thunk - função retornada por outra função
//Redux Saga é uma biblioteca para facilidade o gerenciamento de atividades secundárias como enviar dados ao servidor (é uma operação secundário porque não influencia a lógica da  aplicação)
