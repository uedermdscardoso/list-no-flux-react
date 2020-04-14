import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './data/reducers'; //Acessa index

//Store da aplicação (única)
//O middleware do redux-thunk será aplicado na store
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware)); 

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
/*
  Redux Thunk e Saga ambos são middlewares.
  Redux Thunk (intercepta o fluxo da aplicação)
    --> Fluxo Principal (Action -> Dispatcher -> Store -> View)
      Caso uma action retorna uma função (ex.: ItemService.remove()), o fluxo é desviado para executar a função chamada e volta somente ao fluxo quando o dispatcher é executado.  
  Redux Saga
    --> Action continua o seu caminho sem interroper o seu fluxo apesar que a ação (ex.: ItemService.remove()) foi executada
    --> Parece que está executando um código ao mesmo tempo que o fluxo principal sem interferir nele.
    --> É basicamente um código executado paralelamente na aplicação responsável apenas por tarefas secundárias
    --> Cuidando dos efeitos colaterais da aplicação (operações secundárias)

  Exemplo de Redux Thunk
    export const remove = (id) => {
        return async (dispatch) => {
            await ItemService.remove(id); //Remove
            dispatch({ //E Volta ao fluxo principal
                type: ITEM_REMOVE,
                id
            })
        }
    }

  Exemplo de Redux Saga
    return {
        type: ITEM_CREATE,
        description
    };

*/

