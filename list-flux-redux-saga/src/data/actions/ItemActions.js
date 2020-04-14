import { ItemService } from '../services/ItemService';

export const ITEM_LIST = 'ITEM_LIST'; //Para iniciar a requisição
export const ITEM_LIST_RESPONSE = 'ITEM_LIST_RESPONSE'; 

export const ITEM_CREATE = 'ITEM_CREATE';
export const ITEM_CREATE_RESPONSE = 'ITEM_CREATE_RESPONSE';

export const ITEM_UPDATE = 'ITEM_UPDATE';
export const ITEM_REMOVE = 'ITEM_REMOVE';
export const ITEM_CLEAR = 'ITEM_CLEAR';

/*
    Todas as funções retornam objetos e não funções. Inteiramente, redux saga.
*/

export const list = () => {
    return {
        type: ITEM_LIST
    };
}
export const listResponse = (itemList) => { //Enviando a lista pelo ITEM_LIST_RESPONSE
    return {
        type: ITEM_LIST_RESPONSE,
        itemList
    };
}

//Lê o create e executa o createResponse
export const create = (description) => {
    return {
        type: ITEM_CREATE, //Lido pelo watcher saga
        description
    }; //Envia direto para store
}
export const createResponse = (newItem) => {
    return {
        type: ITEM_CREATE_RESPONSE,
        newItem
    };
}

export const update = (item) => {
    return {
        type: ITEM_UPDATE,
        item
    };
}

export const remove = (id) => {
    return {
        type: ITEM_REMOVE,
        id
    };
}

export const clear = () => {
    return {
        type: ITEM_CLEAR
    };
}
