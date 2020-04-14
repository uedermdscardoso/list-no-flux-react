import { ItemService } from '../services/ItemService';

export const ITEM_LIST = 'ITEM_LIST';
export const ITEM_CREATE = 'ITEM_CREATE';
export const ITEM_UPDATE = 'ITEM_UPDATE';
export const ITEM_REMOVE = 'ITEM_REMOVE';
export const ITEM_CLEAR = 'ITEM_CLEAR';

export const list = () => {
    //Aceita dois params (dispatch, getState) - getState() pega dados da store
    return async (dispatch) => {
        const items = await ItemService.list();
        dispatch({
            type: ITEM_LIST,
            items
        }); //Envia direto para reducer
    }; //Precisa passar pela api
}

export const create = (description) => {
    return async (dispatch) => {
        const newItem = await ItemService.create({
            description, 
            isChecked: false
        });
        dispatch({
            type: ITEM_CREATE,
            newItem
        });
    };
    /*return {
        type: ITEM_CREATE,
        description
    };*/ //Envia direto para store
}

export const update = (item) => {
    return async (dispatch) => {
        await ItemService.update(item);
        dispatch({
            type: ITEM_UPDATE,
            item
        });
    };
    /*return {
        type: ITEM_UPDATE,
        item
    };*/
}

export const remove = (id) => {
    return async (dispatch) => {
        await ItemService.remove(id);
        dispatch({
            type: ITEM_REMOVE,
            id
        });
    };
    /*return {
        type: ITEM_REMOVE,
        id
    };*/
}

export const clear = () => {
    return (dispatch, getState) => {
        //getState - retorna os dados da store
        const itemList = getState().ItemReducer;
        itemList.forEach(item => {
            if(item.isChecked)
                ItemService.remove(item.id); //Remove items que foram marcados
        });
        dispatch({
            type: ITEM_CLEAR
        });
    };
    /*return {
        type: ITEM_CLEAR
    };*/
}
